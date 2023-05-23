import String2Html from '@/components/String2Html'
import { db } from '@/firebase'
import { Button, Collapse, Divider, Skeleton, Tabs, message, Image, Modal } from 'antd'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import style from '@/styles/component.module.scss'
import TicketQuery from '@/components/TicketQuery'
import Header from '@/components/Header'
import SHome from '@/components/skeleton/SHome'
import SHeader from '@/components/skeleton/SHeader'



export default function Ferry({ data, cruizeData, activityData }) {


  const [msg, showMsg] = message.useMessage()
  const [openModal, setOpenModal] = useState(false)
  const [modalData, setModalData] = useState({})

  if (data == undefined) {
    return (
      <>
        <SHeader/>
        <SHome/>
      </>
    )
  }

  const tabItem = [
    {
      label: `About ${data.name}`,
      key: 1,
      children: <String2Html id={'aboutFerry'} string={data.about} />,
    },
    {
      label: `Terms and Conditions`,
      key: 2,
      children: <String2Html id={'termAndCondtionFerry'} string={data.termAndCondtion} />,
    }
  ]

  const bookStyle = { flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'center' }




  return (
    <main>
      <Head>
        <title>{data.name}</title>
        <meta name="description" content={data.metaDescription} />
        <meta property='og:image' content={data.image}></meta>
      </Head>

      <div>
        {showMsg}
        
        <Header activityData={activityData} cruizeData={cruizeData} />

        <div
          data-aos="fade-down"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="2000"
          style={{ display: 'flex', alignItems: 'flex-end' }}>

          <img src={data.image} alt={data.name}
            style={{ height: 450, width: '100%', objectFit: 'cover' }}
          />
        </div>

        <div
          className='backCurve5'
          style={{ display: 'flex', justifyContent: 'center', }}>

          <div style={{ width: '90%', display: "flex", gap: '3%', marginTop: '3%' }}>
            <div style={{ width: "65%", background: 'white', padding: '3%', display: 'flex', flexDirection: 'column', gap: 15 }}>
              <Tabs
                size='large'
                type='card'
                items={tabItem}

              />

            </div>

            <div style={{ width: '35%', height: 'fit-content' }} id='ticketCollapse'>
              <h2 style={{ marginBottom: '5%' }}>Get Instant Ticket</h2>
              {data.ticket.map((tk, i) => {
                const classes = data.classes.filter(f => {
                  return f.ticketId == tk.ticketId
                })
                return (
                  <div
                    data-aos="fade-up"
                    data-aos-anchor-placement="top-bottom"
                    data-aos-duration="2000"
                    id='ticketCollapse'
                    key={i}
                  >
                    <Collapse accordion style={{ border: "none", marginBottom: '4%', background: 'white' }}>
                      <Collapse.Panel
                        showArrow={false}
                        header={
                          <div
                            style={{ display: 'flex', gap: '3%' }}>
                            <div style={{ width: '70%' }}>
                              <p>From</p>
                              <p style={{ color: style.secondaryColor }}><b>{tk.from} {">>"} {tk.to}</b></p>
                              <p>Dep: {tk.departure} | Arr: {tk.arrival}</p>
                              <Divider>
                                <p style={{ color: 'white', background: style.secondaryColor, padding: '2px 10px', borderRadius: 20 }}>Distance {tk.distance}</p>
                              </Divider>
                            </div>

                            <div style={{ flexDirection: 'column', display: 'flex', width: '30%' }}>
                              <div style={{ ...bookStyle, height: '63%', }}>
                                <p><b>Duration:</b></p>
                                <p><b>{tk.duration}</b></p>
                              </div>
                              <div style={{ ...bookStyle, background: style.primaryColor, height: '30%' }}>
                                <p style={{ color: 'white' }}><b>Book Here</b></p>
                              </div>
                            </div>
                          </div>
                        }
                      >
                        <div>
                          {classes.map((cl, j) => (
                            <div key={j} >
                              <div style={{ display: 'flex', gap: '3%' }}>

                                <div style={{ width: '60%' }}>
                                  <p style={{ marginBottom: 15 }}>Class: <span style={{ fontWeight: 'bold', fontSize: '130%' }}>{cl.className}</span></p>
                                  <p>For Kids (0-1 yrs): </p> <p>No Charges</p>
                                </div>

                                <div style={{ flexDirection: 'column', display: 'flex', width: '40%', alignItems: 'center' }}>
                                  <div style={{ ...bookStyle, height: '50%', }}>
                                    <p><b>Price:</b></p>
                                    <p><span style={{ fontWeight: 'bold', fontSize: '130%' }}>₹ {cl.price}</span> /adult</p>
                                  </div>
                                  <div style={{ height: '50%', marginTop: 15 }}>
                                    <Button
                                      onClick={() => { setOpenModal(true); setModalData({ ...tk, ...cl, ferryName: data.name }) }}
                                      style={{ background: style.primaryColor, color: 'white', borderRadius: 20 }}>Book Now</Button>
                                  </div>

                                </div>
                              </div>

                              {j != classes.length - 1 &&
                                <Divider />
                              }
                            </div>
                          ))}
                        </div>
                      </Collapse.Panel>
                    </Collapse>
                  </div>
                )
              })

              }
            </div>
          </div>

        </div>

        <TicketQuery
          open={openModal}
          cancel={() => setOpenModal(false)}
          data={modalData}
        />

      </div>

    </main>
  )
}


export const getStaticPaths = async () => {
  const entries = await db.collection("ferry").get()
  const paths = entries.docs.map(entry => ({
    params: {
      ferryName: entry.data().slug
    }
  }));
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (context) => {
  const { ferryName } = context.params;
  const res = await db.collection("ferry").where("slug", "==", `/ferry/${ferryName}`).get()
  // console.log(res)

  const entry = res.docs.map((entry) => {
    return ({ id: entry.id, ...entry.data() })
  });

  if (entry.length == 0) {
    return {
      notFound: true
    };
  }

  //Getting Cruize Data
  const cruize = await db.collection("ferry").get()
  const cruizeData = cruize.docs.map((item, i) => {
    const data = item.data()
    return { name: data.name, slug: data.slug, image: data.image }
  })

  //Getting Activity Data

  const activity = await db.collection("activity").get()
  const activityData = activity.docs.map((item, i) => {
    const data = item.data()
    return { name: data.name, slug: data.slug, thumbnail: data.thumbnail }
  })


  return {
    props: {
      data: entry[0],
      cruizeData, activityData
    },
    revalidate: 60,

  }

}

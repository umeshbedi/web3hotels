import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { mobile } from '@/components/variables'
import { Row, Col } from 'antd'
import SearchDiv from '@/components/SearchDiv'
import SearchPage from '@/components/SearchPage'
import Header from '@/components/Header'
import { db } from '@/firebase'


export default function Search({cruizeData, activityData}) {

  const [isMobile, setIsMobile] = useState(false)
  const query = useRouter().query

  useEffect(() => {
    setIsMobile(mobile())

  }, [isMobile])

  return (
    <main>
      <Head>
        <title>search hotels</title>
      </Head>
      <Header cruizeData={cruizeData} activityData={activityData}/>
      <div>
        <div
          className='homeBanner'
          style={{
            backgroundImage: `linear-gradient(
            90deg,rgba(0,0,0, 0.75),
            rgba(0,0,0, 0),rgba(0,0,0, 0)
            ), 
            url('/images/andman-sea-image.jpg')`,
            height: 500
          }}
        >
          <Row style={{ width: '95%' }}>
            <Col span={isMobile ? 18 : 10} style={{}}>
              <h1 style={{ fontSize: isMobile ? 35 : 45, color: 'white' }}>Hotels in {query.location}</h1>
              <br />
              <p style={{ color: 'white' }}>Find {query.category} Hotels/Resorts in {query.location} with Best Experience</p>
            </Col>
          </Row>

        </div>
        <SearchDiv />
        

        <div style={{ display: 'flex', alignItems: 'center', margin: '50px 0', flexDirection: 'column' }}>
        <SearchPage query={query} />
          
        </div>

      </div>
    </main>
  )
}

export const getStaticProps = async (context) => {
  
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
      cruizeData, activityData
    },
    revalidate: 60,

  }

}

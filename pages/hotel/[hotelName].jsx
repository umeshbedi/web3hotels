import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import Link from 'next/link'
import style from '@/styles/component.module.scss'
import { Button, Divider, Menu, Select, Skeleton, TreeSelect, message } from 'antd'
import dynamic from 'next/dynamic'
import Cart from '@/components/hotel/Cart'

import { db } from '@/firebase'
import SHeader from '@/components/skeleton/SHeader'
import SHome from '@/components/skeleton/SHome'
import Header from '@/components/Header'
import String2Html from '@/components/String2Html'
import { mobile } from '@/components/variables'

const MainImage = dynamic(() => import('@/components/hotel/MainImage'), {
  ssr: false,
  loading: () => <Skeleton />
});
const HotelMenu = dynamic(() => import('@/components/hotel/HotelMenu'), {
  ssr: false,
  loading: () => <Skeleton.Input />
});
const Rooms = dynamic(() => import('@/components/hotel/Rooms'), {
  ssr: false,
  loading: () => <Skeleton />
});
const Location = dynamic(() => import('@/components/hotel/Location'), {
  ssr: false,
  loading: () => <Skeleton />
});


export default function Hotel({ hotelData, roomData, cruizeData, activityData }) {

  // console.log(hotelData)

  const [loading, setLoading] = useState(true)
  // const [hotelData, setHotelData] = useState({})
  // const [roomData, setRoomData] = useState([])
  const [msg, shoMsg] = message.useMessage()

  const [cartItem, setCartItem] = useState([])
  const [cartElement, setCartElement] = useState(<Cart />)
  const [selectedMenu, setSelectedMenu] = useState('rooms')
  const [menuContent, setMenuContent] = useState("")

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])


  if (hotelData == undefined) {
    return (
      <>
        <SHeader />
        <SHome />
      </>
    )
  }


  function RoomContent() {
    return (
      <div>
        {roomData.map((room) => (
          <>
            <Rooms roomData={room} cart={(e) => {
              const isRoom = cartItem.findIndex(f => f.roomName == e.roomName)
              if (isRoom == -1) {
                cartItem.push(e)
                msg.success("Room Added to Cart!")
              } else {
                cartItem[isRoom] = e
                msg.success("Cart is Updated!")
              }
              setTimeout(() => {
                setCartElement(
                  <Cart
                    cartData={{
                      hotelName: hotelData.title,
                      hotelId: hotelData.id,
                      hotelAddress: hotelData.address,
                      rooms: cartItem,
                      serviceCharge: hotelData.serviceCharge,
                      gstCharge: hotelData.gstCharge
                    }} />
                )
              }, 500)
            }} />
            <Divider />
          </>
        ))

        }
      </div>
    )
  }





  return (
    <main>
      <Head>
        <title>{hotelData.title}</title>
        <meta name="description" content={hotelData.seo_description} />
      </Head>
      <Header activityData={activityData} cruizeData={cruizeData} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {shoMsg}
        <div style={{ width: '90%', paddingTop: '3%' }}>
          <div style={{ width: '100%', display: isMobile ? "block" : 'flex' }}>
            <div style={{ width: isMobile ? '100%' : '75%' }}>
              <div
                style={{
                  backgroundColor: 'white',
                  padding: '1%',
                  borderRadius: 3,
                  boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.07)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <h1 style={{ fontSize: '150%' }}>{hotelData.title} </h1>
                  <p style={{ backgroundColor: 'rgba(0,0,0,.1)', padding: '.3% 1%', borderRadius: 100, marginLeft: '1%' }}>{hotelData.type}</p>
                </div>
                <p>
                  {<FaMapMarkerAlt color={style.primaryColor} />}
                  {hotelData.address}
                  <Link style={{ color: style.primaryColor, fontWeight: 'bold' }} href={"#"}>
                    (View Map)</Link> </p>

                <MainImage extraImage={hotelData.images} receptionImages={hotelData.reception_images} roomImages={roomData} />
                <Divider style={{ marginBottom: 0 }} />
                <HotelMenu menuClick={(e) => setSelectedMenu(e)} />

                <div>

                  {selectedMenu == "rooms" &&
                    <RoomContent />
                  }

                  {selectedMenu == "location" &&
                    <Location location={hotelData.location} />
                  }
                  <div style={{padding:10}}>

                    {selectedMenu == "amenties" &&
                      <String2Html id={"amenties"} string={hotelData.amenties} />
                    }
                    {selectedMenu == "abouthotel" &&
                      <String2Html id={"aboutHotel"} string={hotelData.about_hotel} />
                    }

                    {selectedMenu == "facilities" &&
                      <String2Html id={"facilites"} string={hotelData.facilities} />

                    }
                    {selectedMenu == "policies" &&
                      <String2Html id={"policies"} string={hotelData.policies} />
                    }
                  </div>
                </div>


              </div>
            </div>

            {/* Right side container */}
            <div id='cartItem' style={{ width: isMobile ? "100%" : '25%', paddingLeft: '1%' }}>
              <div style={{ position: 'sticky', top: '10%', transition: ".5s", marginTop: isMobile ? 20 : 0 }}>
                {cartElement}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


export const getStaticPaths = async () => {
  const entries = await db.collection("hotels").get()
  const paths = entries.docs.map(entry => ({
    params: {
      hotelName: entry.data().slug
    }
  }));
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (context) => {
  const { hotelName } = context.params;

  // console.log(hotelName)

  const res = await db.collection("hotels")
    .where("status", "==", "Published")
    .where("slug", "==", `/hotel/${hotelName}`).get()
  
    const hotelData = res.docs.map((entry) => {
    return ({ id: entry.id, ...entry.data() })
  });

  if (hotelData.length == 0) {
    return {
      notFound: true
    };
  }

  const { createdAt, ...otherData } = hotelData[0]


  
  const getRoomData = await db.doc(`hotels/${hotelData[0].id}`).collection("rooms").get()
  const roomData = getRoomData.docs.map((d) => (d.data()))


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
      hotelData: otherData,
      roomData, cruizeData, activityData
    },
    revalidate: 60,

  }

}
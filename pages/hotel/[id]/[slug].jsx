import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import Link from 'next/link'
import style from '@/styles/component.module.scss'
import { Button, Divider, Menu, Select, Skeleton, TreeSelect, message } from 'antd'
import dynamic from 'next/dynamic'
import Cart from '@/components/hotel/Cart'
import { useRouter } from 'next/router'
import { db } from '@/firebase'

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


export default function Hotel() {
  const { query } = useRouter()
  const [loading, setLoading] = useState(true)
  const [hotelData, setHotelData] = useState({})
  const [roomData, setRoomData] = useState([])
  const [msg, shoMsg] = message.useMessage()

  useEffect(() => {
    // console.log(query)
    if (query.id != undefined) {
      const hotels = db.doc(`hotels/${query.id}`)
      hotels.get().then((snap) => {
        setHotelData(snap.data())
      }).catch((err) => msg.error(err.message))

      hotels.collection('rooms').get()
        .then((snap) => {
          const roomTemp = []
          snap.forEach((room) => {
            roomTemp.push(room.data())
          })
          setRoomData(roomTemp);
          setLoading(false)
        })
    }
  }, [query])

  if (loading) return <div style={{ height: "50vh", padding: '5%' }}><Skeleton active /></div>
  return (
    <main>
      <Head>
        <title>{hotelData.title}</title>
        <meta name="description" content={hotelData.seo_description} />
      </Head>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {shoMsg}
        <div style={{ width: '90%', paddingTop: '3%' }}>
          <div style={{ width: '100%', display: 'flex' }}>
            <div style={{ width: '75%' }}>
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
                <h1 style={{ fontSize: '150%' }}>{hotelData.title}</h1>
                <p>{<FaMapMarkerAlt color={style.primaryColor} />} {hotelData.address} <Link style={{ color: style.primaryColor, fontWeight: 'bold' }} href={"#"}>(View Map)</Link> </p>

                <MainImage />
                <Divider style={{ marginBottom: 0 }} />
                <HotelMenu />
                {roomData.map((room) => (
                  <>
                    <Rooms roomData={room} />
                    <Divider />
                  </>
                ))

                }


                <div >
                  <Location location={hotelData.location} />
                </div>

              </div>
            </div>

            {/* Right side container */}
            <div style={{ width: '25%', paddingLeft: '1%' }}>
              <div style={{ position: 'sticky', top: '10%', transition: ".5s" }}>
                <Cart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

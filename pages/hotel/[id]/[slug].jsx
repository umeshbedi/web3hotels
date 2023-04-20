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

  const [cartItem, setCartItem] = useState([])
  const [cartElement, setCartElement] = useState(<Cart />)
  const [selectedMenu, setSelectedMenu] = useState('rooms')
  const [menuContent, setMenuContent] = useState("")

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
                      hotelId: query.id,
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

  function MenuDiv() {
    return <div id='menuContent' />
  }

  useEffect(() => {
    if (selectedMenu == "amenties") {
      document.getElementById("amenties").innerHTML = hotelData.amenties
    }
    else if (selectedMenu == "abouthotel") {
      document.getElementById("abouthotel").innerHTML = hotelData.about_hotel
    }
    else if (selectedMenu == "facilities") {
      document.getElementById("facilities").innerHTML = hotelData.facilities
    }
    else if (selectedMenu == "policies") {
      document.getElementById("policies").innerHTML = hotelData.policies
    }
  }, [selectedMenu])

  function onMenuClick(e) {
    console.log(e)
  }

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
                  {selectedMenu == "amenties" &&
                    <div id='amenties' />
                  }
                  {selectedMenu == "abouthotel" &&
                    <div id='abouthotel' />
                  }
                  {selectedMenu == "rooms" &&
                    <RoomContent />
                  }
                  {selectedMenu == "location" &&
                  <Location location={hotelData.location} />
                  }
                  {selectedMenu == "facilities" &&
                  <div id='facilities' />
                  }
                  {selectedMenu == "policies" &&
                  <div id='policies' />
                  }
                </div>

                {/* <div >
                  <Location location={hotelData.location} />
                </div> */}

              </div>
            </div>

            {/* Right side container */}
            <div style={{ width: '25%', paddingLeft: '1%' }}>
              <div style={{ position: 'sticky', top: '10%', transition: ".5s" }}>
                {cartElement}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

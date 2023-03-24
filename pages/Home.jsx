import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Typography, Select, Space } from 'antd'
const { Text, Title, Link } = Typography
import { db } from '../firebase'
import Head from 'next/head'
import style from '@/styles/component.module.scss'
import { cityName, starHotels, mobile } from '@/components/variables'
import { SearchOutlined, StepBackwardOutlined } from '@ant-design/icons'


export default function Home() {

  const [cityDropDown, setCityDropDown] = useState([])
  const [starHotel, setStarHotel] = useState([])
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(()=>{
    setIsMobile(mobile())
  },[isMobile])

  useEffect(() => {
    var cityTemp = []
    var starHotelTemp = []
    cityName.map((city) => {
      cityTemp.push({
        value: city.split(" ").join(""),
        label: city
      })
    })
    starHotels.map((hotel) => {
      starHotelTemp.push({
        value: hotel.split(" ").join(""),
        label: hotel
      })
    })
    setStarHotel(starHotelTemp)
    setCityDropDown(cityTemp)

  }, [])

  console.log(starHotel)


  return (
    <main>
      <Head>
        <title>Hello this is homepage</title>
        <meta name='description' content='This is testing for home' />
      </Head>
      <div>
        <div
          style={{
            width: '100%',
            height: 500,
            backgroundImage: `linear-gradient(
            90deg,rgba(0,0,0, 0.75),
            rgba(0,0,0, 0),rgba(0,0,0, 0)
            ), url('https://andamantourtravel.com/assets/img/banner-or3.jpg')`,
            backgroundSize: 'cover',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '5%'
          }}
        >
          <Row style={{ width: '95%' }}>
            <Col span={isMobile?18:10} style={{}}>
              <p style={{ color: style.primaryColor, fontSize: 20, fontFamily: 'Dancing Script' }}>Relax and Enjoy ! </p>
              <br />
              <h1 style={{ fontSize: isMobile?35:45, color: 'white' }}>Make Your Holiday Memorable</h1>
              <br />
              <p style={{ color: 'white' }}>Find Hotel and Ticket with Best Experience</p>
            </Col>
          </Row>

        </div>

        {/* Search div */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {cityDropDown.length != 0 && starHotel.length != 0 &&
            <div style={{
              width: isMobile ? '80%' : '70%',
              backgroundColor: 'white',
              marginTop: -40,
              borderRadius: 3,
              boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 20px',
              gap: 15,
              flexDirection: isMobile ? 'column' : 'row'
            }}
            >


              <Select
                size='large'
                options={cityDropDown}
                style={{ width: '100%' }}
                placeholder={cityDropDown[0].label}
              />
              <Select
                size='large'
                options={starHotel}
                style={{ width: '100%' }}
                placeholder={starHotel[0].label}
              />
              <Button
                type='primary'
                size='large'
                icon={<SearchOutlined />}
                block={isMobile?true:false}
              >
                Search
              </Button>

            </div>
          }
        </div>
        
        <div style={{height:500, display:'flex'}}>

        </div>
      </div>
    </main>
  )
}

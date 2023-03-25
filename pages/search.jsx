import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { mobile } from '@/components/variables'
import { Row, Col } from 'antd'
import SearchDiv from '@/components/SearchDiv'

export default function Search() {

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
              <p style={{ color: 'white' }}>Find {query.star} in {query.location} with Best Experience</p>
            </Col>
          </Row>

        </div>
        <SearchDiv />

        <div style={{ display: 'flex', alignItems: 'center', margin: '50px 0', flexDirection: 'column' }}>
          <h1 style={{color:'grey'}}>Hotels for {query.location} will display here...</h1>
          <p style={{color:'grey'}}>{query.star} </p>
        </div>

      </div>
    </main>
  )
}

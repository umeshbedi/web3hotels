import { Divider } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import style from '@/styles/component.module.scss'
import { FaPhoneAlt } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'
import { mobile } from './variables'
import { db } from '@/firebase'

export default function Footer() {
  
  const [ferryList, setFerryList] = useState([])
  const [isMobile, setIsMobile] = useState(false)
  const [activityList, setActivityList] = useState([])

  async function getData () {
  
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
  
    setFerryList(cruizeData)
    setActivityList(activityData)
  }
  
  
  useEffect(() => {
    setIsMobile(mobile())
    getData()
  }, [isMobile])
  


  

  function Element({ heading, items }) {
    return (
      <div>
        <h2 style={{ paddingBottom: 15, borderBottom: `2px solid ${style.primaryColor}`, display: 'inline' }}>{heading}</h2>
        <div style={{ marginTop: 30 }}>
          {items.map((item, i) => (
            <div key={i} style={{ marginBottom: 7 }}><Link target='blank' href={item.link}>{item.name}</Link></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='footerdiv' style={{ flexDirection: isMobile?"column":'row', marginTop:'3%', gap:25 }}>
        <div style={{ width: isMobile?"100%":'25%' }}>
          <Link href={'/'}>
            <img src="/images/WEB3 Logo Final_h80.png" alt="web3hotel logo" height={60} />
          </Link>
          <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500.
          </p>
        </div>

        <Element
          heading={"Cruises"}
          items={ferryList.map((ferry, i) => {
            return {
              name: ferry.name,
              link: ferry.slug
            }
          })}
        />

        <Element
          heading={"Activity"}
          items={activityList.map((ferry, i) => {
            return {
              name: ferry.name,
              link: ferry.slug
            }
          }).slice(0,8)}
        />

        <Element
          heading={"Useful Links"}
          items={[
            { name: "Terms & Condition", link: '/terms-and-condition' },
            { name: "Disclaimer", link: '/disclaimer' },
            { name: "Privacy Policy", link: '/privacy-policy' },
          ]}
        />
        
        <Element
          heading={"Contact with Us"}
          items={[
            { name: <><FaPhoneAlt /> +91 8900984766</>, link: "tel:+918900984766" },
            { name: <><FaPhoneAlt /> +91 9679556315</>, link: "tel:+919679556315" },
            { name: <><FiMail /> web3hotel@gmail.com</>, link: 'mailto:web3hotel@gmail.com' },
            
          ]}
        />
      </div>
      <div>
        <p style={{ textAlign: 'center', padding: '20px 0', backgroundColor: '#e1e1e1', color: 'grey' }}>© 2023 <Link href={'/'}> Web3hotels.com </Link> - All rights reserved</p>
      </div>
    </div>
  )
}

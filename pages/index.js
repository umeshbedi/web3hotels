import React, { lazy, Suspense } from 'react'
import dynamic from 'next/dynamic'
import SHome from '@/components/skeleton/SHome'
import { Skeleton } from 'antd'
import SHeader from '@/components/skeleton/SHeader'
import { db } from '@/firebase'

const Home = dynamic(() => import('../components/Home'), {ssr: false,loading: () => <SHome />})
const Header = dynamic(() => import('../components/Header'), {ssr: false,loading: () => <SHeader />});

export default function index({cruizeData, activityData}) {

  return (
    <>
      <Header cruizeData={cruizeData} activityData={activityData}/>
      <Home />
    </>
  )
}

export const getStaticProps = async (context) => {
  
  //Getting Cruize Data
  const cruize = await db.collection("ferry").get()
  const cruizeData = cruize.docs.map((item, i)=>{
    const data = item.data()
    return {name:data.name, slug:data.slug, image:data.image, data}
  })

  //Getting Activity Data
  
  const activity = await db.collection("activity").get()
  const activityData = activity.docs.map((item, i)=>{
    const data = item.data()
    return {name:data.name, slug:data.slug, thumbnail:data.thumbnail, data}
  })

  return {
      props: {
          cruizeData,
          activityData
      },
      revalidate: 60,

  }

}


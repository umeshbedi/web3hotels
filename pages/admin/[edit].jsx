import { auth } from '@/firebase'
import { Skeleton } from 'antd'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const AddHotelContent = dynamic(()=>import('@/components/admin/AddHotelContent'), {
    ssr:false, 
    loading:()=><div style={{height:"50vh"}}><Skeleton active/></div>
})

export default function Edit() {
    const { query, push } = useRouter()
    
    
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if (user==null) {
            console.log("user not found")
            push("/admin")
          } 
        })
      }, [])
      
      

    
    // console.log(query.edit)
    return (
        <div style={{padding:"3% 5% 0% 5%"}}>
            <AddHotelContent id={query.edit} />
        </div>
    )
}

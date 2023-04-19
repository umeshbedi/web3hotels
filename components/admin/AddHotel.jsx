import { db } from '@/firebase'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import AddHotelContent from './AddHotelContent'
import { PlusOutlined } from '@ant-design/icons'

export default function AddHotel() {
    const {push} = useRouter()
    const [content, setContent] = useState(<Button size='large' onClick={addHotel}><PlusOutlined/> Click to Add New Hotel/Resort</Button>)
  
    function addHotel(){
        db.collection("hotels").add({
            title:"untitled",
            about_hotel:"",
            amenties:"",
            facilities:"",
            address:"",
            category:"Budget",
            city:"Port Blair",
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
            gstCharge:0,
            images:[],
            reception_images:[],
            location:"12.661714069830882, 92.87828318571059",
            order_placed:0,
            policies:"",
            primary_price:0,
            primary_price_offer:0,
            serviceCharge:0,
            slug:"",
            status:"Draft",
            star:2,
            type:"Hotel",
            seo_description:"",
            seo_tag:""
        })
        .then((res)=>{
          setContent(<AddHotelContent id={res.id}/>)
        })
    }



  return (<div>{content}</div>)


}

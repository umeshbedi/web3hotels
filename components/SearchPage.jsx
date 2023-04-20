import React, { useEffect, useState } from 'react'
import { mobile, images } from './variables'
import { Button, Checkbox, Divider, Empty } from 'antd'

import SingleHotel from './hotel/SingleHotel'
import { db } from '@/firebase'

export default function SearchPage({ query }) {

    const hotels = db.collection("hotels")

    const [hotelData, setHotelData] = useState([])
    const [notFound, setNotFound] = useState("")
    
    const [price, setPriceRange] = useState([])

    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])

    useEffect(() => {
        console.log(query)
        setHotelData([])
        if(Object.keys(query).length!==0){
            hotels.where("city", "==", query.location).where("category", "==", query.category).where("status", "==", "Published").get()
                .then(snap => {
                    if (snap.size != 0) {
                        const hotelTemp = []
                        snap.forEach(item => {
                            const id= item.id;
                            var roomImages = [];
                            
                            hotels.doc(`${id}`).collection("rooms").get()
                            .then((rooms)=>{
                                rooms.forEach((room)=>{
                                    const roomData = room.data()
                                    roomImages.extend(roomData.images)
                                })
                                roomImages.extend(item.data().images)
                            })
                            
                            hotelTemp.push({
                                id:id, 
                                hotel:item.data(), 
                                images:roomImages
                            })
                        })

                        setHotelData(hotelTemp)
                        setNotFound("")
                    } else {
                       setNotFound("Oops! Hotels were not found in this Search Results")
                    }
                })
                .catch((err) => console.log(err.message))
        }
    }, [query])

// console.log(hotelData)

    return (
        <div style={{ width: '90%', display: 'flex' }}>

            {/* Left side container */}
            <div style={{ width: isMobile ? '0%' : '25%', padding: isMobile ? 0 : 15, visibility: isMobile ? 'hidden' : 'visible'}}>
                <div style={{ backgroundColor: 'white', padding: 15, borderRadius: 3, boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.07)', position:'sticky', top:'13%'}}>
                    <h2>FILTERS</h2>
                    <Divider style={{}} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <h3>Price Range</h3>
                        <Checkbox.Group
                            options={["Upto ₹4999", "₹5000 - ₹4999", "₹10000 - ₹14999", "₹15000 +"]}
                            style={{ flexDirection: 'column', gap: 10 }}
                            onChange={(e) => setPriceRange(e)}
                        />

                    </div>
                </div>
            </div>

            {/* Right side container */}
            <div style={{ width: isMobile ? '100%' : '75%', padding: 15, display: 'flex', flexDirection: 'column', gap: 30 }}>
                {notFound!==""&&
                    <div>
                        <Empty description={notFound}/>
                    </div>
                }
                {hotelData.map((hotel, index)=>(
                    <SingleHotel key={index} hotelData={hotel}/>
                ))

                }
            </div>
        </div>
    )
}

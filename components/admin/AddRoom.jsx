import { db } from '@/firebase'
import { DeleteFilled } from '@ant-design/icons'
import { Input, Space, Image } from 'antd'
import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react'
import firebase from 'firebase/compat/app'

const AddRoom = forwardRef(({ hotelId, roomData, UpButton, Index }, ref)=> {
    const [images, setImages] = useState([])
    const roomAddress = db.doc(`hotels/${hotelId}`).collection('rooms').doc(`${roomData.id}`)
    
    const [roomName, setRoomName] = useState(roomData.name)
    const [orderNo, setOrderNo] = useState(roomData.order)
    //Pricing Variables
    const [noMealSingle, setNoMealSingle] = useState(roomData.no_Meal_single)
    const [noMealDouble, setNoMealDouble] = useState(roomData.no_Meal_double)
    const [noMealThird, setNoMealThird] = useState(roomData.no_Meal_third)
    const [noMealChild, setNoMealChild] = useState(roomData.no_Meal_child)

    const [noMealSingleOffer, setNoMealSingleOffer] = useState(roomData.no_Meal_single_offer)
    const [noMealDoubleOffer, setNoMealDoubleOffer] = useState(roomData.no_Meal_double_offer)
    const [noMealThirdOffer, setNoMealThirdOffer] = useState(roomData.no_Meal_third_offer)
    const [noMealChildOffer, setNoMealChildOffer] = useState(roomData.no_Meal_child_offer)
    
    const [withBreakFastSingle, setWithBreakfastSingle] = useState(roomData.with_Breakfast_single)
    const [withBreakFastDouble, setWithBreakfastDouble] = useState(roomData.with_Breakfast_double)
    const [withBreakFastThird, setWithBreakfastThird] = useState(roomData.with_Breakfast_third)
    const [withBreakFastChild, setWithBreakfastChild] = useState(roomData.with_Breakfast_child)

    const [withBreakFastSingleOffer, setWithBreakfastSingleOffer] = useState(roomData.with_Breakfast_single_offer)
    const [withBreakFastDoubleOffer, setWithBreakfastDoubleOffer] = useState(roomData.with_Breakfast_double_offer)
    const [withBreakFastThirdOffer, setWithBreakfastThirdOffer] = useState(roomData.with_Breakfast_third_offer)
    const [withBreakFastChildOffer, setWithBreakfastChildOffer] = useState(roomData.with_Breakfast_child_offer)
    
    const [withBreakfastDinnerSingle, setwithBreakfastDinnerSingle] = useState(roomData.with_Breakfast_and_Dinner_single)
    const [withBreakfastDinnerDouble, setwithBreakfastDinnerDouble] = useState(roomData.with_Breakfast_and_Dinner_double)
    const [withBreakfastDinnerThird, setwithBreakfastDinnerThird] = useState(roomData.with_Breakfast_and_Dinner_third)
    const [withBreakfastDinnerChild, setwithBreakfastDinnerChild] = useState(roomData.with_Breakfast_and_Dinner_child)

    const [withBreakfastDinnerSingleOffer, setwithBreakfastDinnerSingleOffer] = useState(roomData.with_Breakfast_and_Dinner_single_offer)
    const [withBreakfastDinnerDoubleOffer, setwithBreakfastDinnerDoubleOffer] = useState(roomData.with_Breakfast_and_Dinner_double_offer)
    const [withBreakfastDinnerThirdOffer, setwithBreakfastDinnerThirdOffer] = useState(roomData.with_Breakfast_and_Dinner_third_offer)
    const [withBreakfastDinnerChildOffer, setwithBreakfastDinnerChildOffer] = useState(roomData.with_Breakfast_and_Dinner_child_offer)

    useImperativeHandle(ref, ()=>({
        updateRoom(){
            roomAddress.update({
                with_Breakfast_single: withBreakFastSingle,
                with_Breakfast_and_Dinner_single: withBreakfastDinnerSingle,
                no_Meal_single: noMealSingle,

                with_Breakfast_double: withBreakFastDouble,
                with_Breakfast_and_Dinner_double: withBreakfastDinnerDouble,
                no_Meal_double: noMealDouble,
                
                with_Breakfast_third: withBreakFastThird,
                with_Breakfast_and_Dinner_third: withBreakfastDinnerThird,
                no_Meal_third: noMealThird,
                
                with_Breakfast_child: withBreakFastChild,
                with_Breakfast_and_Dinner_child: withBreakfastDinnerChild,
                no_Meal_child: noMealChild,
                
                with_Breakfast_single_offer: withBreakFastSingleOffer,
                with_Breakfast_and_Dinner_single_offer: withBreakfastDinnerSingleOffer,
                no_Meal_single_offer: noMealSingleOffer,
                
                with_Breakfast_double_offer: withBreakFastDoubleOffer,
                with_Breakfast_and_Dinner_double_offer: withBreakfastDinnerDoubleOffer,
                no_Meal_double_offer: noMealDoubleOffer,
                
                with_Breakfast_third_offer: withBreakFastThirdOffer,
                with_Breakfast_and_Dinner_third_offer: withBreakfastDinnerThirdOffer,
                no_Meal_third_offer: noMealThirdOffer,
                
                with_Breakfast_child_offer: withBreakFastChildOffer,
                with_Breakfast_and_Dinner_child_offer: withBreakfastDinnerChildOffer,
                no_Meal_child_offer: noMealChildOffer,
                
                name:roomName,
                order:orderNo
  
            })
        },
    }))

    function deleteRoom(){
        roomAddress.delete()
    }

    function UploadedImage({ image, onDelete }) {
        return (
            <div style={{  height: 80, width: 80, display: 'flex', justifyContent: 'center', border:"solid .5px #d9d9d9",borderRadius: 10 }} >
                <Image src={image} height={'100%'} />
                <div>
                    <DeleteFilled style={{ color: 'red', cursor: 'pointer', position: 'absolute' }}
                        onClick={onDelete} />
                </div>
            </div>
        )
    }

    return (
        <div >
            <div onBlur={() => console.log("changed")} style={{ gap: 20, display: 'flex', flexDirection: 'column', padding: '2%', backgroundColor: 'white', marginBottom: '2%' }}>
                <h3
                    style={{ marginBottom: 5 }}>Room #{Index+1} | <span
                        style={{ color: 'orange', cursor: 'pointer' }}
                        onClick={deleteRoom}
                        > 
                        <DeleteFilled /> Remove</span>
                </h3>
                <Space>
                    <p style={{ marginBottom: 5 }}>Order No.:</p>
                    <Input type='number' defaultValue={orderNo} size='large' onChange={(e)=>setOrderNo(e.target.valueAsNumber)}/>
                </Space>
                <div>
                    <p style={{ marginBottom: 5 }}>Room Type Name:</p>
                    <input defaultValue={roomName} placeholder='Enter Room Type Name' size='large' onChange={(e)=>setRoomName(e.target.value)}/>
                </div>
                <div>
                    <p style={{ marginBottom: 5 }}>Price with No Meal (Actual Price):</p>
                    <Space>
                        <Input defaultValue={noMealSingle} placeholder='Single' type='number' size='large' onChange={(e)=>setNoMealSingle(e.target.valueAsNumber)}/>
                        <Input defaultValue={noMealDouble} placeholder='Double' type='number' size='large' onChange={(e)=>setNoMealDouble(e.target.valueAsNumber)}/>
                        <Input defaultValue={noMealThird} placeholder='Third' type='number' size='large' onChange={(e)=>setNoMealThird(e.target.valueAsNumber)}/>
                        <Input defaultValue={noMealChild} placeholder='Child' type='number' size='large' onChange={(e)=>setNoMealChild(e.target.valueAsNumber)}/>
                    </Space>
                </div>
                <div>
                    <p style={{ marginBottom: 5 }}>Price with No Meal (Strike/Offer Price):</p>
                    <Space>
                        <Input defaultValue={noMealSingleOffer} placeholder='Single' type='number' size='large' onChange={(e)=>setNoMealSingleOffer(e.target.valueAsNumber)}/>
                        <Input defaultValue={noMealDoubleOffer} placeholder='Double' type='number' size='large' onChange={(e)=>setNoMealDoubleOffer(e.target.valueAsNumber)}/>
                        <Input defaultValue={noMealThirdOffer} placeholder='Third' type='number' size='large' onChange={(e)=>setNoMealThirdOffer(e.target.valueAsNumber)}/>
                        <Input defaultValue={noMealChildOffer} placeholder='Child' type='number' size='large' onChange={(e)=>setNoMealChildOffer(e.target.valueAsNumber)}/>
                    </Space>
                </div>
                <div>
                    <p style={{ marginBottom: 5 }}>Price with Breakfast (Actual Price):</p>
                    <Space>
                        <Input defaultValue={withBreakFastSingle} placeholder='Single' type='number' size='large' onChange={(e)=>setWithBreakfastSingle(e.target.valueAsNumber)}/>
                        <Input defaultValue={withBreakFastDouble} placeholder='Double' type='number' size='large' onChange={(e)=>setWithBreakfastDouble(e.target.valueAsNumber)}/>
                        <Input defaultValue={withBreakFastThird} placeholder='Third' type='number' size='large' onChange={(e)=>setWithBreakfastThird(e.target.valueAsNumber)}/>
                        <Input defaultValue={withBreakFastChild} placeholder='Child' type='number' size='large' onChange={(e)=>setWithBreakfastChild(e.target.valueAsNumber)}/>
                    </Space>
                </div>
                <div>
                    <p style={{ marginBottom: 5 }}>Price with Breakfast (Strike/Offer Price):</p>
                    <Space>
                        <Input defaultValue={withBreakFastSingleOffer} placeholder='Single' type='number' size='large' onChange={(e)=>setWithBreakfastSingleOffer(e.target.valueAsNumber)}/>
                        <Input defaultValue={withBreakFastDoubleOffer} placeholder='Double' type='number' size='large' onChange={(e)=>setWithBreakfastDoubleOffer(e.target.valueAsNumber)}/>
                        <Input defaultValue={withBreakFastThirdOffer} placeholder='Third' type='number' size='large' onChange={(e)=>setWithBreakfastThirdOffer(e.target.valueAsNumber)}/>
                        <Input defaultValue={withBreakFastChildOffer} placeholder='Child' type='number' size='large' onChange={(e)=>setWithBreakfastChildOffer(e.target.valueAsNumber)}/>
                    </Space>
                </div>
                <div>
                    <p style={{ marginBottom: 5 }}>Price with Breakfast and Dinner (Actual Price):</p>
                    <Space>
                        <Input defaultValue={withBreakfastDinnerSingle} placeholder='Single' type='number' size='large' onChange={(e)=>setwithBreakfastDinnerSingle(e.target.valueAsNumber)}/>
                        <Input defaultValue={withBreakfastDinnerDouble} placeholder='Double' type='number' size='large' onChange={(e)=>setwithBreakfastDinnerDouble(e.target.valueAsNumber)}/>
                        <Input defaultValue={withBreakfastDinnerThird} placeholder='Third' type='number' size='large' onChange={(e)=>setwithBreakfastDinnerThird(e.target.valueAsNumber)}/>
                        <Input defaultValue={withBreakfastDinnerChild} placeholder='Child' type='number' size='large' onChange={(e)=>setwithBreakfastDinnerChild(e.target.valueAsNumber)}/>
                    </Space>
                </div>
                <div>
                    <p style={{ marginBottom: 5 }}>Price with Breakfast and Dinner (Strike/Offer Price):</p>
                    <Space>
                        <Input defaultValue={withBreakfastDinnerSingleOffer} placeholder='Single' type='number' size='large' onChange={(e)=>setwithBreakfastDinnerSingleOffer(e.target.valueAsNumber)}/>
                        <Input defaultValue={withBreakfastDinnerDoubleOffer} placeholder='Double' type='number' size='large' onChange={(e)=>setwithBreakfastDinnerDoubleOffer(e.target.valueAsNumber)}/>
                        <Input defaultValue={withBreakfastDinnerThirdOffer} placeholder='Third' type='number' size='large' onChange={(e)=>setwithBreakfastDinnerThirdOffer(e.target.valueAsNumber)}/>
                        <Input defaultValue={withBreakfastDinnerChildOffer} placeholder='Child' type='number' size='large' onChange={(e)=>setwithBreakfastDinnerChildOffer(e.target.valueAsNumber)}/>
                    </Space>
                </div>
                <div>
                    <p style={{ marginBottom: 5 }}>Add Room Images:</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, transition: ".5s" }}>
                        {roomData.images.map((image, index) => (
                            <UploadedImage 
                                key={index}
                                image={image}
                                onDelete={() => {
                                    roomAddress.update({
                                        images:firebase.firestore.FieldValue.arrayRemove(image)
                                    })
                                }}
                            />
                        ))
                        }
                        {UpButton}
                    </div>
                </div>
            </div>

        </div>
    )
});
AddRoom.displayName="AddRoom"
export default AddRoom;

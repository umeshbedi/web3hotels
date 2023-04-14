import React, { useEffect, useRef, useState } from 'react'
import ImageGallery from 'react-image-gallery'
import { MinusPlus, images } from '../variables'
import { Button, Divider, Modal, Select, message } from 'antd'
import style from '@/styles/component.module.scss'
import { CheckOutlined, RightOutlined } from '@ant-design/icons'
export default function Rooms({ roomData }) {
    const fullRef = useRef()

    const [selection, setSelection] = useState("withBreakfast")

    const [roomNumber, setRoomNumber] = useState(1)
    const [adult, setAdult] = useState(1)
    const [child, setChild] = useState(0)
    const [child6, setChild6] = useState(0)

    const [price, setPrice] = useState(roomData.with_Breakfast_single)
    const [priceOffer, setPriceOffer] = useState(roomData.with_Breakfast_single_offer)

    const [msg, showMsg] = Modal.useModal()

    function priceWithBreakFast(e) {
        if(e==1){
            console.log(e)
            setPrice(
                (roomData.with_Breakfast_single*adult)+
                (roomData.with_Breakfast_child*child6)
                )
            setPriceOffer(
                (roomData.with_Breakfast_single_offer*adult)+
                (roomData.with_Breakfast_child_offer*child6)
                )
        }
        else if(e==2){
            console.log(e)
            const double = adult%roomNumber
            const single = adult-(double*2)
            console.log(double, single)
            setPrice(
                (roomData.with_Breakfast_single*single)+
                (roomData.with_Breakfast_double*double)+
                (roomData.with_Breakfast_child*child6)
                )
            setPriceOffer(
                (roomData.with_Breakfast_single_offer*single)+
                (roomData.with_Breakfast_double_offer*double)+
                (roomData.with_Breakfast_child_offer*child6)
                )
        }
        else if(e==3){
            console.log("third")
            const third = adult%roomNumber
            console.log(third)
            setPrice(
                (roomData.with_Breakfast_third*third)+
                (roomData.with_Breakfast_double*roomNumber)+
                (roomData.with_Breakfast_child*child6)
                )
            setPriceOffer(
                (roomData.with_Breakfast_third_offer*third)+
                (roomData.with_Breakfast_double_offer*roomNumber)+
                (roomData.with_Breakfast_child_offer*child6)
                )
        }
    }

    function priceWithBreakFastDinner(e) {
        if(e==1){
            console.log(e)
            setPrice(
                (roomData.with_Breakfast_and_Dinner_single*adult)+
                (roomData.with_Breakfast_and_Dinner_child*child6)
                )
            setPriceOffer(
                (roomData.with_Breakfast_and_Dinner_single_offer*adult)+
                (roomData.with_Breakfast_and_Dinner_child_offer*child6)
                )
        }
        else if(e==2){
            console.log(e)
            const double = adult%roomNumber
            const single = adult-(double*2)
            console.log(double, single)
            setPrice(
                (roomData.with_Breakfast_and_Dinner_single*single)+
                (roomData.with_Breakfast_and_Dinner_double*double)+
                (roomData.with_Breakfast_and_Dinner_child*child6)
                )
            setPriceOffer(
                (roomData.with_Breakfast_and_Dinner_single_offer*single)+
                (roomData.with_Breakfast_and_Dinner_double_offer*double)+
                (roomData.with_Breakfast_and_Dinner_child_offer*child6)
                )
        }
        else if(e==3){
            console.log("third")
            const third = adult%roomNumber
            console.log(third)
            setPrice(
                (roomData.with_Breakfast_and_Dinner_third*third)+
                (roomData.with_Breakfast_and_Dinner_double*roomNumber)+
                (roomData.with_Breakfast_and_Dinner_child*child6)
                )
            setPriceOffer(
                (roomData.with_Breakfast_and_Dinner_third_offer*third)+
                (roomData.with_Breakfast_and_Dinner_double_offer*roomNumber)+
                (roomData.with_Breakfast_and_Dinner_child_offer*child6)
                )
        }
    }
    function priceWithNoMeal(e) {
        if(e==1){
            console.log(e)
            setPrice(
                (roomData.no_Meal_single*adult)+
                (roomData.no_Meal_child*child6)
                )
            setPriceOffer(
                (roomData.no_Meal_single_offer*adult)+
                (roomData.no_Meal_child_offer*child6)
                )
        }
        else if(e==2){
            console.log(e)
            const double = adult%roomNumber
            const single = adult-(double*2)
            console.log(double, single)
            setPrice(
                (roomData.no_Meal_single*single)+
                (roomData.no_Meal_double*double)+
                (roomData.no_Meal_child*child6)
                )
            setPriceOffer(
                (roomData.no_Meal_single_offer*single)+
                (roomData.no_Meal_double_offer*double)+
                (roomData.no_Meal_child_offer*child6)
                )
        }
        else if(e==3){
            console.log("third")
            const third = adult%roomNumber
            console.log(third)
            setPrice(
                (roomData.no_Meal_third*third)+
                (roomData.no_Meal_double*roomNumber)+
                (roomData.no_Meal_child*child6)
                )
            setPriceOffer(
                (roomData.no_Meal_third_offer*third)+
                (roomData.no_Meal_double_offer*roomNumber)+
                (roomData.no_Meal_child_offer*child6)
                )
        }
    }

    useEffect(()=>{
        if (selection == "withBreakfast") {
            if((adult/roomNumber)==1){
                priceWithBreakFast(1)
            }else if((adult/roomNumber)<2 && (adult/roomNumber)>1){
                priceWithBreakFast(2)
            }
            else if((adult/roomNumber)<=3 && (adult/roomNumber)>=2){
                priceWithBreakFast(3)
            }
        }
        else if (selection == "withBreakfastDinner") {
            if((adult/roomNumber)==1){
                priceWithBreakFastDinner(1)
            }else if((adult/roomNumber)<2 && (adult/roomNumber)>1){
                priceWithBreakFastDinner(2)
            }
            else if((adult/roomNumber)<=3 && (adult/roomNumber)>=2){
                priceWithBreakFastDinner(3)
            }
        }
        else if (selection == "noMeal") {
            if((adult/roomNumber)==1){
                priceWithNoMeal(1)
            }else if((adult/roomNumber)<2 && (adult/roomNumber)>1){
                priceWithNoMeal(2)
            }
            else if((adult/roomNumber)<=3 && (adult/roomNumber)>=2){
                priceWithNoMeal(3)
            }
        }
    },[selection, adult, child6])

    
    return (
        <div>
            {showMsg}
            <div style={{ display: 'flex', gap: '5%' }}>
                <div style={{ width: '40%' }}>
                    <h1 style={{ marginBottom: '3%' }}>{roomData.name}</h1>
                    <ImageGallery
                        ref={fullRef}
                        items={roomData.images.map((img) => {
                            return ({
                                original: img,
                                thumbnail: img
                            })
                        })}
                        lazyLoad={true}
                        showPlayButton={false}
                        useTranslate3D={true}
                        // showThumbnails={false}
                        showFullscreenButton={false}
                        onClick={() => fullRef.current.fullScreen()}

                    />

                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6%' }}>
                    <p><b> Guest and Room Option</b></p>

                    <Select
                        size='large'
                        options={[
                            { value: 'withBreakfast', label: 'With BreakFast' },
                            { value: 'withBreakfastDinner', label: 'With BreakFast & Dinner' },
                            { value: 'noMeal', label: 'No Meal' },
                        ]}
                        defaultValue={"withBreakfast"}
                        placeholder={'Select Food Option'}
                        onSelect={(e) =>setSelection(e)}
                    />

                    <MinusPlus
                        text={'Room'}
                        number={roomNumber}
                        minusOnPress={() => {
                            if (roomNumber > 1) {
                                setRoomNumber(roomNumber - 1)
                                setAdult((roomNumber - 1) * 2)
                                if (((roomNumber) / child6) == 1) {
                                    setChild6((roomNumber - 1) * 1)
                                }
                                if (((roomNumber) / child) == 1) {
                                    setChild((roomNumber - 1) * 1)
                                }
                            }
                        }}
                        pluOnPress={() => {
                            setRoomNumber(roomNumber + 1);
                            setAdult((roomNumber + 1) * 2)
                        }}
                    />

                    <MinusPlus
                        text={'Adults'}
                        number={adult}
                        minusOnPress={() => {
                            if ((adult / roomNumber) > 1) {
                                if (adult > 1) {
                                    setAdult(adult - 1)
                                }
                            } else {
                                msg.error({ title: "Attention!", content: "You can't decrease more adults in selected numbers of room. Please decrease numbers of room." })
                            }
                        }}
                        pluOnPress={() => {
                            if ((adult / roomNumber) < 3) {
                                setAdult(adult + 1);
                                if (child6 != 0) {
                                    if ((adult / roomNumber) > 1 || adult==1) {
                                        setChild6(child6 - 1)
                                    }
                                }
                                if (child != 0) {
                                    if ((adult / roomNumber) > 1 || adult==1) {
                                        setChild(child - 1)
                                    }
                                }
                            } else {
                                msg.error({ title: "Attention!", content: "You can't add more adults in selected numbers of room. Please Increase numbers of room." })
                            }

                        }}
                    />

                    <MinusPlus
                        text={'Childs'}
                        subText={"(0-5 Y)"}
                        number={child}
                        minusOnPress={() => {
                            if (child > 0) {
                                setChild(child - 1)
                            }
                        }}
                        pluOnPress={() => {
                            const target = (roomNumber * 3) - adult;
                            if (child >= target || child>=roomNumber) {
                                msg.error({ title: "Attention!", content: "You can't add more childs in selected numbers of rooms and adults. Please Increase room or decrease adults."})
                            } else {
                                setChild(child + 1);
                            }
                        }}
                    />
                    <MinusPlus
                        text={'Childs'}
                        subText={"(5-12 Y)"}
                        number={child6}
                        minusOnPress={() => {
                            if (child6 > 0) {
                                setChild6(child6 - 1)
                            }
                        }}
                        pluOnPress={() => {
                            const target = (roomNumber * 3) - adult;
                            if (child6 >= target || child6>=roomNumber) {
                                msg.error({ title: "Attention!", content: "You can't add more childs in selected numbers of rooms and adults. Please Increase room or decrease adults."})
                            } else {
                                setChild6(child6 + 1);
                            }

                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <p> <b> Available</b></p>
                        <p> <CheckOutlined /> Rooms Available!</p>
                        <p> <CheckOutlined /> {roomNumber} Room Selected!</p>
                        <p><CheckOutlined /> Cancel 7 Day Before For Full Refund</p>
                    </div>
                    <Divider />
                    <div>
                        <p style={{ textDecoration: 'line-through' }}>₹{priceOffer}</p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h1 style={{ fontSize: '200%' }}>₹{price}</h1>
                            <p style={{ marginLeft: 3 }}>/Night</p>
                        </div>
                        <p style={{ color: style.primaryColor }}><b>You Saved ₹{priceOffer - price}</b></p>
                        <br />
                        <Button type='primary' size='large'>
                            Select Room
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    )
}

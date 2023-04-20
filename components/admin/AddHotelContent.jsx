import { db } from '@/firebase';
import { Input, Select, Space, message, Button, Divider, Rate, Modal, Upload, Image, Skeleton } from 'antd'
import React, { use, useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { category, cityName } from '../variables';
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import style from "@/styles/admin.module.scss"
import dynamic from 'next/dynamic';
import AddRoom from './AddRoom';
import firebase from 'firebase/compat/app';
import { FaShare } from 'react-icons/fa';
import { useRouter } from 'next/router';

const borderStyle = 'solid .5px #d9d9d9'
const uploadgrid = { height: 80, width: 80, border: borderStyle, borderRadius: 10 }

export default function AddHotelContent({ id }) {
    const [messageApi, contextHolder] = message.useMessage()
    const { push } = useRouter()
    const roomRef = useRef()
    const hotels = db.doc(`hotels/${id}`)
    const hotelType = [{ value: 'hotel', label: 'Hotel' }, { value: 'resorts', label: 'Resorts' }]

    const [loading, setLoading] = useState(false)
    const [componentLoading, setComponentLoading] = useState(true)

    const [extraImage, setExtraImage] = useState([]);
    const [receptionImage, setReceptionImage] = useState([]);
    const [rooms, setRooms] = useState([]);

    const [imageObj, setImageObj] = useState(null)
    const [uploadImageTo, setUploadImageTo] = useState("")
    const [roomId, setRoomId] = useState("")

    // getting and Updating Individual data
    const slugRef = useRef()
    const [title, setTitle] = useState("")
    const [address, setAddress] = useState("")
    const [hotelCategory, setHotelCategory] = useState("")
    const [city, setCity] = useState("")
    const [gstCharge, setGstCharge] = useState(0)
    const [serviceCharge, setServiceCharge] = useState(0)
    const [location, setLocation] = useState("")
    const [policies, setPolicies] = useState('')
    const [about, setAbout] = useState("")
    const [primaryPrice, setPrimaryPrice] = useState(0)
    const [primaryPOffer, setPrimaryPOffer] = useState(0)
    const [slug, setSlug] = useState("")
    const [status, setStatus] = useState('')
    const [rating, setRating] = useState(0)
    const [type, setType] = useState("")
    const [seoDescription, setSeoDescription] = useState("")
    const [seoTag, setSeoTag] = useState("")
    const [amenties, setAmenties] = useState("")
    const [facilities, setFacilities] = useState("")

    useEffect(() => {
        hotels.collection("rooms").onSnapshot((snap) => {
            setComponentLoading(true)
            const roomTemp = []
            snap.forEach((data) => {
                const roomD = data.data()
                roomTemp.push({ id: data.id, ...roomD })
            })
            setRooms(roomTemp)
            setComponentLoading(false)
        })
    }, [])

    useEffect(() => {
        hotels.onSnapshot((snap) => {
            setComponentLoading(true)
            const data = snap.data()
            setReceptionImage(data.reception_images)
            setExtraImage(data.images)
            setTitle(data.title)
            setAddress(data.address)
            setHotelCategory(data.category)
            setCity(data.city)
            setGstCharge(data.gstCharge)
            setServiceCharge(data.serviceCharge)
            setLocation(data.location)
            setPrimaryPrice(data.primary_price)
            setPrimaryPOffer(data.primary_price_offer)
            setSlug(data.slug.split("/")[3])
            setStatus(data.status)
            setRating(data.star)
            setType(data.type)
            setSeoDescription(data.seo_description)
            setSeoTag(data.seo_tag)
            setAmenties(data.amenties)
            setFacilities(data.facilities)
            setAbout(data.about_hotel)
            setPolicies(data.policies)
            setComponentLoading(false)
        })
    }, [])
// console.log(slug)
    function updateHotel(i) {
        // setLoading(true)
        if(slug==""||slug==undefined){
            messageApi.error("url should not be empty. Please enter some url and submit again.")
        }else{
            hotels.update({
                title, 
                address: address,
                category: hotelCategory,
                city, 
                gstCharge, 
                serviceCharge,
                location, 
                about_hotel: about,
                primary_price: primaryPrice,
                primary_price_offer: primaryPOffer,
                slug: `/hotel/${id}/${slug}`,
                status: i == 0 ? "Draft" : "Published",
                star: rating, 
                type,
                seo_description: seoDescription,
                seo_tag: seoTag, 
                amenties, 
                facilities,
                policies,
            })
                .then(() => {
                    setLoading(false);
                    messageApi.success("Updated successfully!")
                })
                .catch((err) => {
                    setLoading(false);
                    messageApi.error(err.message)
                })
        }
    }
//

    useEffect(() => {
        if (imageObj != null) {
            messageApi.open({ key: 'updatable', type: 'loading', content: 'Loading...', duration: 0 })
            var formdata = new FormData();
            formdata.append("image", imageObj);

            var requestOptions = {
                method: 'POST',
                headers: { "Authorization": "Client-ID " + process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID + "" },
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://api.imgur.com/3/image", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        const data = result.data

                        if (uploadImageTo == "extra") {
                            hotels.update({
                                images: firebase.firestore.FieldValue.arrayUnion(data.link)
                            }).then(() => messageApi.open({ key: 'updatable', type: 'success', content: 'Loaded' }))
                        }
                        else if (uploadImageTo == "reception") {
                            // setReceptionImage([...receptionImage, data.link])
                            hotels.update({
                                reception_images: firebase.firestore.FieldValue.arrayUnion(data.link)
                            }).then(() => messageApi.open({ key: 'updatable', type: 'success', content: 'Loaded' }))
                        }
                        else {
                            hotels.collection('rooms').doc(`${roomId}`).update({
                                images: firebase.firestore.FieldValue.arrayUnion(data.link)
                            }).then(() => messageApi.open({ key: 'updatable', type: 'success', content: 'Loaded' }))
                        }


                    } else {
                        messageApi.error(result.data.error)
                    }
                    console.log(result.data)
                    setImageObj(null)
                })
        }

    }, [imageObj])

    function UploadButton({ to, RoomId }) {
        return (
            <Upload
                showUploadList={false}
                accept="image/png, image/jpeg"
                onChange={({ file }) => {
                    setImageObj(file.originFileObj)
                    setUploadImageTo(to)
                    setRoomId(RoomId)
                }}
            >
                <div style={{ ...uploadgrid, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <div style={{ display: "flex", alignItems: 'center', flexDirection: 'column' }}>
                        <PlusOutlined />
                        <div style={{ marginTop: 8, }}>Add Image</div>
                    </div>
                </div>
            </Upload>
        )
    }


    function UploadedImage({ image, onDelete }) {
        return (
            <div style={{ ...uploadgrid, display: 'flex', justifyContent: 'center' }} >
                <Image src={image} height={'100%'} />
                <div>
                    <DeleteFilled style={{ color: 'red', cursor: 'pointer', position: 'absolute' }}
                        onClick={onDelete} />
                </div>
            </div>
        )
    }


    function addNewRoom() {
        const roomItems = {
            order: rooms.length,
            name: "",
            images: [],
            with_Breakfast_single: 0,
            with_Breakfast_and_Dinner_single: 0,
            no_Meal_single: 0,

            with_Breakfast_double: 0,
            with_Breakfast_and_Dinner_double: 0,
            no_Meal_double: 0,

            with_Breakfast_third: 0,
            with_Breakfast_and_Dinner_third: 0,
            no_Meal_third: 0,

            with_Breakfast_child: 0,
            with_Breakfast_and_Dinner_child: 0,
            no_Meal_child: 0,

            with_Breakfast_single_offer: 0,
            with_Breakfast_and_Dinner_single_offer: 0,
            no_Meal_single_offer: 0,

            with_Breakfast_double_offer: 0,
            with_Breakfast_and_Dinner_double_offer: 0,
            no_Meal_double_offer: 0,

            with_Breakfast_third_offer: 0,
            with_Breakfast_and_Dinner_third_offer: 0,
            no_Meal_third_offer: 0,

            with_Breakfast_child_offer: 0,
            with_Breakfast_and_Dinner_child_offer: 0,
            no_Meal_child_offer: 0
        }
        hotels.collection("rooms").add(roomItems)
    }

    if (componentLoading) return <div style={{ height: "50vh" }}><Skeleton active /></div>
    
    return (
        <div>
            {contextHolder}
            <div style={{ display: 'flex' }}>
                {/* left Side container */}
                <div style={{ gap: 20, width: '70%', display: 'flex', flexDirection: 'column', paddingBottom: '2%' }}>

                    <div>
                        <p style={{ marginBottom: 5 }}>Hotel Name:</p>
                        <input defaultValue={title} placeholder='Enter Hotel Name'
                            onChange={(e) => {
                                const v = e.target.value;
                                setTitle(v);
                            }} />
                    </div>

                    <div>
                        <Space style={{ width: '100%' }}>
                            <p style={{ marginBottom: 5 }}>Url: https://web3hotels.com/hotel/{id}/</p>
                            <input ref={slugRef} defaultValue={slug} placeholder='change url' onBlur={(e) => {
                                const value = e.target.value.split(" ").join("-")
                                setSlug(value)
                                slugRef.current.value = value.split(" ").join("-")
                            }}
                            />
                            <FaShare style={{ color: 'orange', cursor: 'pointer' }} onClick={() => window.open(`https://web3hotels.com/hotel/${id}/${slug}`, "_blank")} />
                        </Space>
                    </div>

                    <div>
                        <p style={{ marginBottom: 5 }}>Address:</p>
                        <input defaultValue={address} placeholder='Enter Hotel Address' onChange={(f) => setAddress(f.target.value)} />
                    </div>
                    <div>
                        <p style={{ marginBottom: 5 }}>Add Room</p>
                        <div style={{ border: borderStyle, padding: '2%' }}>
                            {rooms.map((roomData, i) => (
                                <AddRoom
                                    key={i}
                                    roomData={roomData}
                                    UpButton={<UploadButton to={'room'} RoomId={roomData.id} />}
                                    hotelId={id}
                                    Index={i}
                                    ref={roomRef}
                                />
                            ))}
                            <Button type='dashed' size='large' style={{ color: 'white', background: 'grey' }} onClick={addNewRoom}><PlusOutlined />  Add New Room</Button>
                        </div>
                    </div>
                    <div>
                        <p style={{ marginBottom: 5 }}>Add Reception Images:</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, transition: ".5s" }}>
                            {receptionImage.map((image, index) => (
                                <UploadedImage
                                    key={index}
                                    image={image}
                                    onDelete={() => {
                                        hotels.update({
                                            reception_images: firebase.firestore.FieldValue.arrayRemove(image)
                                        })
                                    }}
                                />
                            ))
                            }
                            <UploadButton to={'reception'} />
                        </div>
                    </div>
                    <div>
                        <p style={{ marginBottom: 5 }}>Add Extra Hotel Images:</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, transition: ".5s" }}>
                            {extraImage.map((image, index) => (
                                <UploadedImage
                                    key={index}
                                    image={image}
                                    onDelete={() => {
                                        hotels.update({
                                            images: firebase.firestore.FieldValue.arrayRemove(image)
                                        })
                                    }}
                                />
                            ))
                            }
                            <UploadButton to={'extra'} />
                        </div>
                    </div>
                    <div>
                        <p style={{ marginBottom: 5 }}>About:</p>
                        <ReactQuill theme='snow' value={about} onChange={setAbout} style={{ height: 200, backgroundColor: 'white', marginBottom: 50 }} />
                    </div>
                    <div>
                        <p style={{ marginBottom: 5 }}>Facilities:</p>
                        <ReactQuill theme='snow' value={facilities} onChange={setFacilities} style={{ height: 200, backgroundColor: 'white', marginBottom: 50 }} />
                    </div>
                    <div>
                        <p style={{ marginBottom: 5 }}>Amenties:</p>
                        <ReactQuill theme='snow' value={amenties} onChange={setAmenties} style={{ height: 200, backgroundColor: 'white', marginBottom: 50 }} />
                    </div>
                    <div>
                        <p style={{ marginBottom: 5 }}>Policies:</p>
                        <ReactQuill theme='snow' value={policies} onChange={setPolicies} style={{ height: 200, backgroundColor: 'white', marginBottom: 50 }} />
                    </div>
                    <Divider orientation="left" plain>SEO Content</Divider>

                    <div>
                        <p style={{ marginBottom: 5 }}>Short Meta Description:</p>
                        <input defaultValue={seoDescription} placeholder='Enter Short Description of your hotel' size='large' onChange={(e) => setSeoDescription(e.target.value)} />
                    </div>
                    <div>
                        <p style={{ marginBottom: 5 }}>Meta Tags (comma, separated):</p>
                        <input defaultValue={seoTag} placeholder='Enter comma separated keywords' size='large' onChange={(e) => setSeoTag(e.target.value)} />
                    </div>
                    <Divider />


                </div>

                {/* Right Side */}
                <div style={{ marginLeft: '2%', width: '25%', display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div className={style.RightSubContainer}>
                        <p style={{ marginBottom: 5 }}>Hotel Type | Category | City | Map Location (<a style={{ color: 'orange' }} href="https://www.google.com/maps">from google map</a>) | Rating</p>
                        <Space direction='vertical' style={{ width: '100%' }}>
                            <Select
                                style={{ width: '100%', }}
                                placeholder={"Select Type"}
                                defaultValue={type}
                                size='large'
                                options={hotelType}
                                onSelect={(e) => setType(hotelType.find(f => f.value == e).label)}
                            />
                            <Select
                                style={{ width: '100%' }}
                                placeholder={"Select Category"}
                                defaultValue={hotelCategory}
                                size='large'
                                options={category.map(c => {
                                    return ({
                                        value: c,
                                        label: c
                                    })
                                })}
                                onSelect={(e) => setHotelCategory(e)}
                            />
                            <Select
                                style={{ width: '100%' }}
                                placeholder={"Select City"}
                                defaultValue={city}
                                size='large'
                                options={cityName.map(c => {
                                    return ({
                                        value: c,
                                        label: c
                                    })
                                })}
                                onSelect={(e) => setCity(e)}
                            />
                            <Input defaultValue={location} placeholder='Location longitude and latitude from google map' size='large' width={"100%"} onChange={(e) => setLocation(e.target.value)} />
                            <Rate allowHalf onChange={(e) => setRating(e)} defaultValue={rating} />
                        </Space>
                    </div>
                    <div className={style.RightSubContainer}>
                        <p style={{ marginBottom: 5 }}>Price to Show (₹)</p>
                        <Space direction='vertical' style={{ width: '100%' }}>
                            <Input defaultValue={primaryPrice} placeholder='Actual Price' type='number' size='large' onChange={(e) => setPrimaryPrice(e.target.valueAsNumber)} />
                            <Input defaultValue={primaryPOffer} placeholder='Strike/Offer Price' type='number' size='large' onChange={(e) => setPrimaryPOffer(e.target.valueAsNumber)} />

                        </Space>
                    </div>
                    <div className={style.RightSubContainer}>
                        <p style={{ marginBottom: 5 }}>Extra Charge</p>
                        <Space direction='vertical' style={{ width: '100%' }}>
                            <Input defaultValue={serviceCharge} placeholder='Service Charge (₹)' type='number' size='large' onChange={(e) => {setServiceCharge(e.target.valueAsNumber)}} />
                            <Input defaultValue={gstCharge} placeholder='GST' type='number' size='large' onChange={(e) => setGstCharge(e.target.valueAsNumber)} />

                        </Space>
                    </div>
                    <div className={style.RightSubContainer}>
                        <Space style={{ width: '100%', marginBottom: "10%" }}>
                            <p>status: {status}</p>
                        </Space>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            {status == "Draft" &&
                                <Button loading={loading} onClick={() => { updateHotel(0); roomRef.current.updateRoom() }} style={{ backgroundColor: 'grey', color: 'white' }} size='large'>Save Draft</Button>
                            }
                            <Button loading={loading}
                                onClick={() => { updateHotel(1); roomRef.current.updateRoom() }}
                                type='primary' size='large'>Publish</Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

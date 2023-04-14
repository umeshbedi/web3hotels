import { db } from '@/firebase';
import { Input, Select, Space, message, Button } from 'antd'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AddHotel() {
    const [messageApi, contextHolder] = message.useMessage()
    
    const hotels = db.collection("hotels")

    const [loading, setLoading] = useState(false)
    const [policies, setPolicies] = useState('')
    const [about, setAbout] = useState("")



    function updateHotel() {
        setLoading(true)
        hotels.doc("qngyHw4W0eI6iJjgSi9m")
            .collection("rooms").doc("CIM0v8y6A4dSPqgN4RO3")
            .update({
                with_Breakfast_single: 1000,
                with_Breakfast_and_Dinner_single: 1200,
                no_Meal_single: 800,

                with_Breakfast_double: 1200,
                with_Breakfast_and_Dinner_double: 1800,
                no_Meal_double: 1000,
                
                with_Breakfast_third: 800,
                with_Breakfast_and_Dinner_third: 900,
                no_Meal_third: 700,
                
                with_Breakfast_child: 700,
                with_Breakfast_and_Dinner_child: 800,
                no_Meal_child: 600,
                
                with_Breakfast_single_offer: 1200,
                with_Breakfast_and_Dinner_single_offer: 1400,
                no_Meal_single_offer: 1000,
                
                with_Breakfast_double_offer: 1400,
                with_Breakfast_and_Dinner_double_offer: 2000,
                no_Meal_double_offer: 1200,
                
                with_Breakfast_third_offer: 1000,
                with_Breakfast_and_Dinner_third_offer: 1100,
                no_Meal_third_offer: 900,
                
                with_Breakfast_child_offer: 900,
                with_Breakfast_and_Dinner_child_offer: 1000,
                no_Meal_child_offer: 800
            })
            .then(()=>{
                setLoading(false); 
                messageApi.success("Updated successfully!")
            })
            .catch((err)=>{
                setLoading(false);
                messageApi.error(err.message)
            })
    }

    return (
        <div>
            {contextHolder}
            <div style={{ gap: 20, width: '70%', display: 'flex', flexDirection: 'column', paddingBottom: '2%' }}>

                <div>
                    <p style={{ marginBottom: 5 }}>Hotel Name:</p>
                    <Input placeholder='Enter Hotel Name' size='large' />
                </div>
                <div>
                    <p style={{ marginBottom: 5 }}>Hotel Type | Category | Location - longitude and latitude (<a style={{ color: 'orange' }} href="https://www.google.com/maps">from google map</a>)</p>
                    <Space>
                        <Select
                            placeholder={"Select Type"}
                            size='large'
                            options={[{ value: 'hotel', label: 'Hotel' }, { value: 'resorts', label: 'Resorts' }]}
                        />
                        <Select
                            placeholder={"Select Category"}
                            size='large'
                            options={[
                                { value: 'Budget', label: 'Budget' },
                                { value: 'Standard', label: 'Standard' },
                                { value: 'Premium', label: 'Premium' },
                                { value: 'Luxury', label: 'Luxury' }
                            ]}
                        />
                        <Input placeholder='Location longitude and latitude from google map' size='large' />
                    </Space>
                </div>
                <div>
                    <p style={{ marginBottom: 5 }}>Address:</p>
                    <Input placeholder='Enter Hotel Address' size='large' />
                </div>
                <div>
                    <p style={{ marginBottom: 5 }}>About:</p>
                    <ReactQuill theme='snow' value={about} onChange={setAbout} style={{ height: 200, backgroundColor: 'white', marginBottom: 50 }} />
                </div>
                <div>
                    <p style={{ marginBottom: 5 }}>Policies:</p>
                    <ReactQuill theme='snow' value={policies} onChange={setPolicies} style={{ height: 200, backgroundColor: 'white', marginBottom: 50 }} />
                </div>
                <div>
                    <Button loading={loading} onClick={updateHotel} type='primary' size='large'>Save</Button>
                </div>
            </div>
        </div>
    )
}

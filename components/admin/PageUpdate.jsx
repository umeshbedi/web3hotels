import { db } from '@/firebase';
import { Button, message } from 'antd';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function PageUpdate({pageName}) {
    const [value, setValue] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    
    function Submit(){
        db.collection('pages').doc(`${pageName}`).set({
            data:value
        }).then((e)=>{
            messageApi.success("Page Updated Successfully!")
        }).catch((err)=>{
            messageApi.error(err.message)
        })
    }

    return (
    <div style={{padding:'2%'}}>
        {contextHolder}

        <h1 style={{fontSize:'200%', marginBottom:20}}>{pageName}</h1>
        <ReactQuill theme="snow" value={value} onChange={setValue} style={{height:400}}/>        
        <Button onClick={Submit} type='primary' size='large' style={{marginTop:'8%'}}>Save</Button>
    </div>
  )
}

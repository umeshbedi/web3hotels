import React, { useEffect, useState } from 'react'
import ContactForm from './ContactForm'
import style from '@/styles/component.module.scss'
import { Table } from 'antd';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { mobile } from './variables';

export default function ContactUsPage() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
      setIsMobile(mobile())
    }, [isMobile])

    const dataSource = [
        {
            key: 'Email',
            value: '10 Downing Street',
        },
        {
            key: 'John',
            value: '10 Downing Street',
        },
    ];

    return (
        <>
            <h1 style={{color:style.secondaryColor}}><span style={{color:style.primaryColor}}>Connect</span> With Us</h1><br />
            <p>We would love to respond to your queries and help you succeed.</p>
            <p>Feel free to get in touch with us.</p>
            <br />
            <br />
            <div style={{ display: 'grid', gridTemplateColumns: isMobile?"auto":"60% 40%" }}>
                <div style={{ background: 'white', padding: '5%', height: 'fit-content' }}>
                    <ContactForm
                        packageName={"Contact Us"}
                        packageDetail={"Message from Contact Us Page"}
                    />
                </div>
                <div style={{ background:"black", padding: '5%', flexDirection:'column', display:'flex', justifyContent:'space-between' }}>
                    <div style={{display:'flex',color:'white', flexDirection:'column', alignItems:'center', gap:10}}>
                        <FiMapPin style={{fontSize:35}}/>
                        <h2 style={{color:style.primaryColor}}>Address</h2>
                        <p style={{textAlign:'center', lineHeight:'140%'}}>
                        Deen Street , Thomas Colony , Junglighat, Port Blair , S.Andaman
                            </p>
                        <hr style={{width:'80%'}}/>
                    </div>
                    <div style={{display:'flex',color:'white', flexDirection:'column', alignItems:'center', gap:10}}>
                        <FiMail style={{fontSize:35}}/>
                        <h2 style={{color:style.primaryColor}}>Email</h2>
                        <p style={{textAlign:'center', lineHeight:'140%'}}>web3hotels@gmail.com</p>
                        <hr style={{width:'80%'}}/>
                    </div>
                    <div style={{display:'flex',color:'white', flexDirection:'column', alignItems:'center', gap:10}}>
                        <FiPhone style={{fontSize:35}}/>
                        <h2 style={{color:style.primaryColor}}>Contact No.</h2>
                        <p style={{textAlign:'center', lineHeight:'140%'}}>+91 8900984766, +91 9679556315</p>
                        
                    </div>
                </div>

            </div>
        </>
    )
}

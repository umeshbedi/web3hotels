import React, { useState } from 'react'
import { db } from '../firebase'
import { Button, Input, Space, message, Form } from 'antd'
import style from '@/styles/component.module.scss'

import { FiUser, FiLock } from 'react-icons/fi'


export default function AdminLogin({login}) {
    
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)


    return (
        <div className={style.AdminLogin}>
            <Space direction='vertical'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img height={50} alt='web3 icons' src='/images/WEB3 Icon.ico' />
                </div>
                <Form
                    style={{ maxWidth: 300 }}
                    onFinish={()=>login(email, password)}
                    autoComplete={'on'}
                >
                    <Input
                        required
                        type='email'
                        size='large'
                        prefix={<FiUser />}
                        placeholder='Enter Admin Email'
                        onChange={(e) => setEmail(e.target.value)}
                        style={{marginBottom:10}}
                    />

                    <Input.Password
                        required
                        size='large'
                        prefix={<FiLock />}
                        placeholder='Enter Admin Email'
                        onChange={(e) => setPassword(e.target.value)}
                        style={{marginBottom:10}}
                    />

                    <Button
                        type='primary'
                        block
                        size='large'
                        htmlType='submit'
                    >
                        Login
                    </Button>
                </Form>
            </Space>
        </div>
    )
}

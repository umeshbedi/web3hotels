import React, { useState } from 'react'
import AdminLogin from '../components/AdminLogin'
import { message } from 'antd';

export default function Dashboard() {

  const [messageApi, contextHolder] = message.useMessage();

  const [isLogin, setIsLogin] = useState(false)


  function Login(email, password) {
    messageApi.info("got it your "+email+" and "+password)
    
  }

  if (!isLogin) {
    return (
      <>
      {contextHolder}
        <AdminLogin login={(email, password) => Login(email, password)} />
      </>
    )
  }

  return (
    <div>This is Admin Dashboard</div>
  )
}

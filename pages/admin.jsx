import React, { useEffect, useState } from 'react'
import AdminLogin from '../components/AdminLogin'
import { message, Layout, theme } from 'antd';
const { Header, Sider, Content } = Layout

import { auth, db } from '@/firebase';
import Head from 'next/head';
import MenuAdmin from '@/components/admin/MenuAdmin';

export default function Dashboard() {

  const [messageApi, contextHolder] = message.useMessage();

  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {token: { colorBgContainer }} = theme.useToken();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        setIsLogin(true);
      } else {
        console.log("User Not found");
      }
    })
  }, [])

  function Login(email, password) {
    setIsLoading(true)
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        messageApi.success("Signed In Successfully!");
        setIsLogin(true);
        setIsLoading(false)
      })
      .catch((error) => {
        messageApi.error(error.message, 5);
        setIsLoading(false)
      })


  }

  if (!isLogin) {
    return (
      <>
        {contextHolder}
        <AdminLogin
          login={(email, password) => Login(email, password)}
          isloading={isLoading}
        />
      </>
    )
  }

  return (
    <main>
      <Head>
        <title>Admin Panel</title>
      </Head>
      
      <Layout>
        <Header>

        </Header>
        
        <Layout>
          <Sider 
          width={200} 
          style={{
            background: colorBgContainer,
          }}
          >
            <MenuAdmin />
          </Sider>
        
        <Layout>
          <Content
           style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
          }}
          >
            Content
          </Content>
        </Layout>
        </Layout>
      </Layout>
    </main>
  )
}

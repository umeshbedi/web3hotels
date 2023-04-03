import React, { useEffect, useState } from 'react'
import AdminLogin from '../components/AdminLogin'
import { message, Layout, theme } from 'antd';
const { Header, Sider, Content } = Layout
import { UserOutlined } from '@ant-design/icons'
import { auth, db } from '@/firebase';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import MenuAdmin from '@/components/admin/MenuAdmin';
import Hompage from '@/components/admin/Hompage';
// import PageUpdate from '@/components/admin/PageUpdate';
const PageUpdate = dynamic(()=>import('../components/admin/PageUpdate'),{ssr:false})


export default function Dashboard() {

  const [messageApi, contextHolder] = message.useMessage();

  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState([])
  const [content, setContent] = useState(<Hompage/>)
  const { token: { colorBgContainer } } = theme.useToken();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.providerData[0])
        setIsLogin(true);
      } else {
        console.log("User Not found");
      }
    })
  }, [])

  function onClick(e){
    if (e=='term&cond') {
      setContent(<PageUpdate pageName={"Terms and Condition"}/>)
    }
  }

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

      <Layout
        style={{ minHeight: '100vh' }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(e) => setCollapsed(e)}
          style={{backgroundColor:'rgb(27, 27, 27)'}}
          collapsedWidth={30}
          
        >
          <div
            style={{
              // background: 'rgba(255, 255, 255, 0.2)',
              color: 'rgba(256,256,256, .7)',
              padding: '15px 15px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <UserOutlined
              style={{
                fontSize: 50,
                border: '2px solid',
                padding: 5,
                borderRadius: 50
              }}
            />
            <p>{user.email}</p>
          </div>
          <MenuAdmin 
          menuClick={(e)=>onClick(e)}
          />
        </Sider>
        <Layout>
          <Header style={{ paddingLeft: 20, background: 'rgba(0,0,0,.05)', }}>
          </Header>
          
          {content}
        </Layout>

      </Layout>
    </main>
  )
}

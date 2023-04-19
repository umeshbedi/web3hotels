import React, { useEffect, useState } from 'react'
import { message, Layout, Skeleton, Dropdown } from 'antd';
const { Header, Sider } = Layout
import { UserOutlined, LogoutOutlined, MailOutlined } from '@ant-design/icons'
import { auth, db } from '@/firebase';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import MenuAdmin from '@/components/admin/MenuAdmin';

const PageUpdate = dynamic(() => import('../../components/admin/PageUpdate'), { ssr: false, loading: () => <Skeleton /> })
const Dashboard = dynamic(() => import('../../components/admin/Dashboard'), { ssr: false, loading: () => <Skeleton /> })
const Hompage = dynamic(() => import('../../components/admin/Hompage'), { ssr: false, loading: () => <Skeleton /> })
const AdminLogin = dynamic(() => import('../../components/admin/AdminLogin'), { ssr: false, loading: () => <Skeleton /> })
const AddHotel = dynamic(() => import('../../components/admin/AddHotel'), { ssr: false, loading: () => <Skeleton /> })
const HotelList = dynamic(() => import('../../components/admin/HotelList'), { ssr: false, loading: () => <Skeleton /> })


export default function Admin() {

  const [messageApi, contextHolder] = message.useMessage();

  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState([])
  const [content, setContent] = useState(< AddHotel />)


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

  const items = [
    {
      label: user.email,
      key: 'email',
      icon: <MailOutlined />,
    },
    {
      label: 'Logout',
      key: 'logout',
      icon: <LogoutOutlined />,
      onClick: (e) => {
        auth.signOut()
          .then(() => {
            setIsLogin(false);
          });
      }
    },
  ]

  function onMenuClick(e) {
    if (e == 'homepage') {
      setContent(<Hompage />)
    }
    else if(e == 'dashboard'){
      setContent(<Dashboard />)
    }
    else if(e == 'addhotel'){
      setContent(<AddHotel />)
    }
    else if(e == 'hotellist'){
      setContent(<HotelList />)
    }
    else if(e == 'addcruises'){
      alert(e)
    }
    else if(e == 'cruiseslist'){
      alert(e)
    }
    else{
      setContent(<PageUpdate pageName={e} />)
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
          style={{ backgroundColor: 'rgb(27, 27, 27)' }}
          collapsedWidth={30}
          width={'inherit'}
          
        >

          <MenuAdmin
            menuClick={(e) => onMenuClick(e)}
          />
        </Sider>
        <Layout>
          <Header style={{ background: 'inherit', display: 'flex', justifyContent: 'flex-end' }}>
            <div>
              <Dropdown.Button
                menu={{ items }}
                icon={<UserOutlined />}
                placement='bottomRight'
                size='large'

              >
                Admin
              </Dropdown.Button>
            </div>

          </Header>
          <div style={{ padding: '0% 2%' }}>
            {content}
          </div>
        </Layout>

      </Layout>
    </main>
  )
}

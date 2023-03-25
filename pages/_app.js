import '@/styles/globals.scss'
import Head from 'next/head'
import { ConfigProvider, Layout } from 'antd'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {useEffect, useState} from 'react'

export default function App({ Component, pageProps }) {
  const [path, setPath] = useState('/')
  useEffect(()=>{
    setPath(window.location.pathname)
  },[])
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#fc4131',
            borderRadius: 0,

          }
        }}
      >
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/images/WEB3 Icon.ico" />
        </Head>
        <Layout>
          <Header />
          <Component {...pageProps} />
          
          {path!=='/admin'&&
            <Footer />
          }
        </Layout>
      </ConfigProvider>
    </>
  )
}

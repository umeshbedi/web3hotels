import '@/styles/globals.scss'
import "react-image-gallery/styles/scss/image-gallery.scss";
import Head from 'next/head'
import { ConfigProvider, Layout } from 'antd'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import SHeader from '@/components/skeleton/SHeader'

import AOS from 'aos';
import 'aos/dist/aos.css';

const Footer = dynamic(() => import('../components/Footer'), {ssr:false, loading:()=><></>});



export default function App({ Component, pageProps }) {
  const [path, setPath] = useState('/')
  useEffect(() => {
    setPath(window.location.pathname)
    AOS.init();
  }, [])
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
          
          <Component {...pageProps} />

          {path !== '/admin' &&
            <Footer />
          }
        </Layout>
      </ConfigProvider>
    </>
  )
}

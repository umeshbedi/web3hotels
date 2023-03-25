import PageHeader from '@/components/PageHeader'
import Head from 'next/head'
import React from 'react'


export default function AboutUs() {
    return (
        <main>
            <Head>
                <title>About Us</title>
            </Head>

            <div>
                <PageHeader
                    pageTitle={'About Us'}
                    image={'https://www.way2webworld.com/images/aboutbanner.jpg'}
                />
                <div
                    style={{
                        height: 200,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <p>Some Content Here</p>
                </div>
            </div>
        </main>
    )
}

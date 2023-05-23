// import PageHeader from '@/components/PageHeader'
import ContactUsPage from '@/components/ContactUsPage'
import Header from '@/components/Header'
import String2Html from '@/components/String2Html'
import SHeader from '@/components/skeleton/SHeader'
import SHome from '@/components/skeleton/SHome'
import { db } from '@/firebase'
import { Skeleton, message } from 'antd'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const PageHeader = dynamic(() => import("@/components/PageHeader"), { ssr: false, loading: () => <Skeleton /> })

export default function Pages({ data, cruizeData, activityData, path }) {


    if (data == undefined) {
        return (
            <>
                <SHeader />
                <SHome />
            </>
        )
    }

    return (
        <main>
            <Head>
                <title>{data.title}</title>
                <meta name="description" content={data.metaDescription} />
            </Head>
            <div>
                <Header activityData={activityData} cruizeData={cruizeData} />
                <PageHeader
                    pageTitle={data.title}
                    image={data.image}
                />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
                    <div style={{ width: '80%' }}>
                        <String2Html id={'pages'} string={data.about} />
                        {path == "contact-us" &&
                            <ContactUsPage/>
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}


export const getStaticPaths = async () => {
    const entries = await db.collection("pages").get()
    const paths = entries.docs.map(entry => ({
        params: {
            pages: entry.id
        }
    }));
    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async (context) => {
    const { pages } = context.params;
    // console.log(pages)
    const res = await db.doc(`pages/${pages}`).get()

    if (res.data() == undefined) {
        return {
            notFound: true
        };
    }

    //Getting Cruize Data
    const cruize = await db.collection("ferry").get()
    const cruizeData = cruize.docs.map((item, i) => {
        const data = item.data()
        return { name: data.name, slug: data.slug, image: data.image }
    })

    //Getting Activity Data

    const activity = await db.collection("activity").get()
    const activityData = activity.docs.map((item, i) => {
        const data = item.data()
        return { name: data.name, slug: data.slug, thumbnail: data.thumbnail }
    })

    return {
        props: {
            data: res.data(),
            cruizeData, activityData,
            path: res.id
        },
        revalidate: 60,

    }

}

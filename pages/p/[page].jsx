import PageHeader from '@/components/PageHeader'
import { db } from '@/firebase'
import { message } from 'antd'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function TermsAndCondition() {
    const [messageApi, contextHolder] = message.useMessage()
    const {query, push} = useRouter()
    useEffect(() => {
        db.collection('pages').doc(`${query.page}`).get()
            .then((snap) => {
                const data = snap.data().data
                document.getElementById('content').innerHTML = data
            })
            .catch((err)=>{
                // push('/'+query.page)
            })
    }, [])

    return (
        <main>
            <Head>
                <title>{query.page}</title>
            </Head>
            <div>
                {contextHolder}
                <PageHeader
                    pageTitle={query.page}
                    image={"https://academyofcheese.org/wp-content/uploads/2021/06/Terms-and-conditions-hero.jpg"}
                />
                <div style={{display:'flex', justifyContent:'center',}}>
                    <div style={{ width: '80%', margin:'2% 0%' }} id='content' />
                </div>
            </div>
        </main>
    )
}

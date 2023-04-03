import PageHeader from '@/components/PageHeader'
import { db } from '@/firebase'
import Head from 'next/head'
import React, { useEffect } from 'react'

export default function TermsAndCondition() {
    useEffect(() => {
        db.collection('pages').doc('Terms and Condition').get()
            .then((snap) => {
                const data = snap.data().data
                document.getElementById('content').innerHTML = data
            })
    }, [])

    return (
        <main>
            <Head>
                <title>Terms and Condition</title>
            </Head>
            <div>
                <PageHeader
                    pageTitle={"Terms and Condition"}
                    image={"https://academyofcheese.org/wp-content/uploads/2021/06/Terms-and-conditions-hero.jpg"}
                />
                <div style={{display:'flex', justifyContent:'center',}}>
                    <div style={{ width: '80%', margin:'2% 0%' }} id='content' />
                </div>
            </div>
        </main>
    )
}

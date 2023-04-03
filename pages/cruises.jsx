import { useRouter } from 'next/router'
import React from 'react'

export default function cruises() {
    const { query } = useRouter()
    console.log(query)
    return (
        <div>cruises</div>
    )
}

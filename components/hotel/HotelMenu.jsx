import { Menu } from 'antd'
import Link from 'next/link'
import React from 'react'

export default function HotelMenu() {
    return (
        <Menu
            mode='horizontal'
            style={{position:'sticky', top:'9%', zIndex:5, fontSize:17}}

        >
            <Menu.Item key={'rooms'}>
                <Link href={'/'}>Rooms</Link>
            </Menu.Item>
            <Menu.Item key={'amenties'}>
                <Link href={'#'}>Amenties</Link>
            </Menu.Item>
            <Menu.Item key={'abouthotel'}>
                <Link href={'#'}>About</Link>
            </Menu.Item>
            <Menu.Item key={'location'}>
                <Link href={'#'}>Location</Link>
            </Menu.Item>
            <Menu.Item key={'facilities'}>
                <Link href={'#'}>Facilities</Link>
            </Menu.Item>

            <Menu.Item key={'policies'}>
                <Link href={'/about-us'}>Policies</Link>
            </Menu.Item>

        </Menu>
    )
}

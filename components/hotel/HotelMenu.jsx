import { Menu } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'

export default function HotelMenu({menuClick}) {
    const [active, setActive] = useState('rooms')
    return (
        <Menu
            mode='horizontal'
            style={{position:'sticky', top:'9%', zIndex:5, fontSize:17}}
            onClick={(e) => {menuClick(e.key);setActive(e.key)}}
            activeKey={active}
        >
            <Menu.Item key={'rooms'}>
                Rooms
            </Menu.Item>
            <Menu.Item key={'amenties'}>
            Amenties
            </Menu.Item>
            <Menu.Item key={'abouthotel'}>
            About
            </Menu.Item>
            <Menu.Item key={'location'}>
            Location
            </Menu.Item>
            <Menu.Item key={'facilities'}>
            Facilities
            </Menu.Item>

            <Menu.Item key={'policies'}>
            Policies
            </Menu.Item>

        </Menu>
    )
}

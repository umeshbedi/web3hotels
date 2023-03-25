import React, {useState, useEffect} from 'react'
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

import { mobile } from '../variables';

export default function MenuAdmin() {
    
    const [isMobile, setIsMobile] = useState(false)
    const [active, setActive] = useState('home')
    
    useEffect(() => {
      setIsMobile(mobile())
    }, [isMobile])

  return (
    <div>
        <Menu
        mode={'inline'}
        style={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
          height: '100%',
          borderRight: 0,
        }}
        disabledOverflow
        onClick={(e) => setActive(e.key)}
        activeKey={active}
        theme={'dark'}
      >

        <Menu.Item key={'homepage'}>
          <HomeOutlined/> Homepage
        </Menu.Item>
        <Menu.Item key={'addhotel'}>
          <PlusOutlined/> Add Hotels
        </Menu.Item>
        <Menu.Item key={'addCruises'}>
        <PlusOutlined/> Add Cruises
        </Menu.Item>
        
      </Menu>
    </div>
  )
}

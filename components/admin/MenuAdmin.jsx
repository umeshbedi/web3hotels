import React, {useState, useEffect} from 'react'
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import {FaNewspaper} from 'react-icons/fa'
import { Menu } from 'antd';

import { mobile } from '../variables';

export default function MenuAdmin({menuClick}) {
    
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
          // backgroundColor:'green'
        }}
        disabledOverflow
        onClick={(e) => console.log(e)}
        
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
        <Menu.SubMenu title={<p><FaNewspaper/> Pages</p>}>
          <Menu.Item key={'about-us'} onClick={(e)=>menuClick(e.key)}>
           <p>About Us</p>
          </Menu.Item>
          <Menu.Item key={'terms-and-condition'} onClick={(e)=>menuClick(e.key)}>
           <p>Terms & Cond.</p>
          </Menu.Item>
          <Menu.Item key={'privacy-policy'} onClick={(e)=>menuClick(e.key)}>
           <p>Privacy Policy</p>
          </Menu.Item>
          <Menu.Item key={'disclaimer'} onClick={(e)=>menuClick(e.key)}>
           <p>Disclaimer</p>
          </Menu.Item>
        </Menu.SubMenu>
        
        
      </Menu>
    </div>
  )
}

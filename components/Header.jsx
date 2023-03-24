import React, { useEffect, useState } from 'react'
import { Menu, Col, Row, Button, Drawer } from 'antd'
import { } from 'react-icons/fi'
import Link from 'next/link';
import { cityName } from './variables';
import { mobile } from './variables';
import { FaAngleDown } from 'react-icons/fa'
import { IoIosMenu } from 'react-icons/io'
import style from '@/styles/component.module.scss'

export default function Header() {

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])



  function RespMenu() {
    return (
      <Menu
        mode={isMobile ? 'inline' : 'horizontal'}
        style={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
          float: 'right',
          width: isMobile ? '100%' : 'auto',
          border: 'none'
        }}
        disabledOverflow
        onClick={(e) => setActive(e.key)}
        activeKey={active}

      >

        <Menu.Item key={'home'}>
          <Link href={'/'}>Home</Link>
        </Menu.Item>
        <Menu.Item key={'about'}>
          <Link href={'/about-us'}>About Us</Link>
        </Menu.Item>

        <Menu.SubMenu title={<p style={{ fontSize: 14 }}>Star Hotels {isMobile ? null : <FaAngleDown />}</p>}>
          <Menu.SubMenu title={'2 Star Hotels'}>
            {cityName.map((item) => {
              const key = "2star-" + item.split(" ").join("-")
              return (
                <Menu.Item key={key}>
                  <Link href={'/' + key}>{item}</Link>
                </Menu.Item>
              )
            })}
          </Menu.SubMenu>
          <Menu.SubMenu title={'3 Star Hotels'}>
            {cityName.map((item) => {
              const key = "3star-" + item.split(" ").join("-")
              return (
                <Menu.Item key={key}>
                  <Link href={'/' + key}>{item}</Link>
                </Menu.Item>
              )
            })}
          </Menu.SubMenu>
          <Menu.SubMenu title={'4 Star Hotels'}>
            {cityName.map((item) => {
              const key = "4star-" + item.split(" ").join("-")
              return (
                <Menu.Item key={key}>
                  <Link href={'/' + key}>{item}</Link>
                </Menu.Item>
              )
            })}
          </Menu.SubMenu>
          <Menu.SubMenu title={'5 Star Hotels'}>
            {cityName.map((item) => {
              const key = "5star-" + item.split(" ").join("-")
              return (
                <Menu.Item key={key}>
                  <Link href={'/' + key}>{item}</Link>
                </Menu.Item>
              )
            })}
          </Menu.SubMenu>
        </Menu.SubMenu>

        <Menu.Item key={'activity'}>
          <Link href={'/activity'}>Activity</Link>
        </Menu.Item>
        <Menu.Item key={'cruises'}>
          <Link href={'/cruises'}>Cruises</Link>
        </Menu.Item>
        <Menu.Item key={'contact'}>
          <Link href={'/contact-us'}>Contact Us</Link>
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <div style={{ padding: '1% 5% 0 5%', backgroundColor: 'white', }}>

      <Drawer
        placement='right'
        width={'70%'}
        open={open}
        onClose={() => setOpen(false)}

      >
        <RespMenu />
      </Drawer>

      <Row>
        <Col span={18} push={6}>
          {isMobile ?
            (
              <p
                style={{ float: 'right', fontSize:35, color:style.primaryColor }}
                onClick={() => setOpen(true)}
              >
                <IoIosMenu />
              </p>
            ) :
            <RespMenu />
          }
        </Col>
        <Col span={6} pull={18} style={{}}>
          <Link href={'/'}>
            <img src='/images/WEB3 Logo Final_110355.png' height={40} />
          </Link>
        </Col>
      </Row>



    </div>
  )
}

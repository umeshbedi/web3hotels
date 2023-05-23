import React, { useEffect, useState } from 'react'
import { Menu, Col, Row, Button, Drawer } from 'antd'
import { } from 'react-icons/fi'
import Link from 'next/link';
import { cityName, category } from './variables';
import { mobile } from './variables';
import { FaAngleDown } from 'react-icons/fa'
import { IoIosMenu } from 'react-icons/io'
import style from '@/styles/component.module.scss'

export default function Header({ activityData, cruizeData }) {

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
          border: 'none',

        }}
        disabledOverflow
        onClick={(e) => setActive(e.key)}
        activeKey={active}

      >

        <Menu.Item key={'home'}>
          <Link target='blank' href={'/'}>Home</Link>
        </Menu.Item>
        <Menu.Item key={'about'}>
          <Link target='blank' href={'/about-us'}>About Us</Link>
        </Menu.Item>

        <Menu.SubMenu title={<p style={{ fontSize: 14 }}>Hotels/Resorts{isMobile ? null : <FaAngleDown />}</p>}>

          <Menu.Item key={'Budget'}>
            <Link target='blank' href={'/search?location=Andaman and Nicobar Islands&category=' + category[0]}>Budget</Link>
          </Menu.Item>
          <Menu.Item key={'Standard'}>
            <Link target='blank' href={'/search?location=Andaman and Nicobar Islands&category=' + category[1]}>Standard</Link>
          </Menu.Item>
          <Menu.Item key={'Premium'}>
            <Link target='blank' href={'/search?location=Andaman and Nicobar Islands&category=' + category[2]}>Premium</Link>
          </Menu.Item>
          <Menu.Item key={'Luxury'}>
            <Link target='blank' href={'/search?location=Andaman and Nicobar Islands&category=' + category[3]}>Luxury</Link>
          </Menu.Item>

        </Menu.SubMenu>

        <Menu.SubMenu
          title={<p style={{ fontSize: 14 }}>Activity{isMobile ? null : <FaAngleDown />}</p>}
        >
          <div style={{ display: 'grid', gridTemplateColumns: "repeat(4, auto)" }}>
            {activityData.map((act, key) => (
              <Menu.Item key={key}>
                <Link target='blank' href={act.slug}>{act.name}</Link>
              </Menu.Item>
            ))

            }
          </div>
        </Menu.SubMenu>

        <Menu.SubMenu title={<p style={{ fontSize: 14 }}>Cruises {isMobile ? null : <FaAngleDown />}</p>}>
          {cruizeData.map((item, i) => (
            <Menu.Item key={item.name+i}>
              <Link target='blank' href={item.slug}>{item.name}</Link>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
        <Menu.Item key={'contact'}>
          <Link target='blank' href={'/contact-us'}>Contact Us</Link>
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 5 }}>

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
                  style={{ float: 'right', fontSize: 35, color: style.primaryColor }}
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
              <img src='/images/WEB3 Logo Final_h80.png' height={40} />
            </Link>
          </Col>
        </Row>



      </div>
    </div>
  )
}

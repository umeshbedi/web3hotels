import { Divider } from 'antd'
import React from 'react'

export default function Cart({cartData}) {
  return (
    <div style={{ backgroundColor: 'white', padding: '2%' }} className='stickyCart'>
      <h2 style={{textAlign:'center', marginTop:'3%'}}>Cart Items</h2>
      <Divider/>
      <div style={{ display: 'flex', flexDirection: 'column', }}>
        <div>
          <img src="/images/nocart-612x612.jpg" alt="no cart items images" style={{width:'100%'}}/>
          <p style={{textAlign:'center'}}>No cart Items</p>
        </div>
      </div>
    </div>
  )
}

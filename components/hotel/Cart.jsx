import { Button, DatePicker, Divider, Form, Input, Space, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { CheckOutlined, CloseCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons'

export default function Cart({ cartData, deleteCart }) {
  // console.log(cartData)
  const [loading, setLoading] = useState(false)
  const [msg, showMsg] = Modal.useModal()
  
  const [date, setDate] = useState([])
  let allRoomPrice = 0;


  async function sendEmail(e) {
    const htmlBody = []
    cartData.rooms.map((room) => {
      htmlBody.push(`
      <div>
      <h3>${room.roomName}</h3>
      <p><b>Room Price: ₹${room.totalPrice}</b></p>
      <p>✓ Room with ${room.foodType}</p>
      <p>✓ ${room.roomSelected} Room </p>
      <p>✓ ${room.adults} Adults</p>
      <p>✓ ${room.child0} Childs (0-5Y)</p>
      <p>✓ ${room.child6} Childs (0-6Y)</p>
      </div>
      <hr/>
      `)
    })
    const emailBody = {
      "sender": { "name": "Web3hotels", "email": "no-reply@web3hotels.com" },
      "to": [{ "email": "web3hotels@gmail.com", "name": "Web3hotels" }],
      "htmlContent": `<!DOCTYPE html> 
      <html> 
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
      <div>
      <p>Name: <span style="font-weight: bold;"> ${e.name}</span></p>
      <p>Mobile: <span style="font-weight: bold;">${e.mobile}</span></p>
      <p>Hotel Ordered: <span style="font-weight: bold;">${cartData.hotelName}</span></p>
      <p>Address of Hotel: <span style="font-weight: bold;">${cartData.hotelAddress}</span></p>
      <p>Date of Staying: <span style="font-weight: bold;">From ${date[0]} To ${date[1]}</span></p>
      </div>
      <hr/>
      ${htmlBody.join("")} 
      <p>Total: <span style="font-weight: bold;">₹${allRoomPrice}</span></p>
      <p>Service Charge: <span style="font-weight: bold;">₹${cartData.serviceCharge}</span></p>
      <p>GST Charge: <span style="font-weight: bold;">${cartData.gstCharge}%</span></p>
      <hr/>
      <hr/>
      <h2>Grand Total: ${document.getElementById("grandTotal").innerText}</h2>
      </body> </html>`,

      "subject": "New Hotel Booking",
      "replyTo": { "email": "no-reply@web3hotels.com", "name": "web3hotels" },
      "tags": ["hotel", "room"]
    }
    setLoading(true)

    fetch("https://api.sendinblue.com/v3/smtp/email", {
      method: 'POST',
      headers: {
        "api-key": process.env.NEXT_PUBLIC_SEND_EMAIL,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(emailBody)
    })
      .then(res => res.json())
      .then(res => {
        msg.success({
          title: "Booking Confirmed!",
          content: "Congratulations! Your booking is confirmed. Our representative will contact you soon with email or phone. Happy Holidays!"
        });
        setLoading(false)
      })
      .catch(err => { console.log(err); setLoading(false) })

  }


  return (
    <div style={{ backgroundColor: 'white', padding: '2%' }} className='stickyCart'>
      {showMsg}
      <h2 style={{ textAlign: 'center', marginTop: '3%' }}> < ShoppingCartOutlined /> Cart Items</h2>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: "10%" }}>
        {
          cartData == undefined ?
            <div>
              <img src="/images/nocart-612x612.jpg" alt="no cart items images" style={{ width: '100%' }} />
              <p style={{ textAlign: 'center' }}>No cart Items</p>
            </div>
            :
            <div>
              <div id='cartContent'>
                {
                  cartData.rooms.map((room, i) => {
                    allRoomPrice += room.totalPrice
                    return (
                      <div key={i} style={{ border: "solid .5px rgb(234, 234, 234)", marginBottom: "8%" }}>
                        <div style={{ backgroundColor: "rgb(234, 234, 234)", padding: '2%', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'rgba(0,0,0,.6)' }}>
                          {/* <CloseCircleOutlined style={{position:'absolute', right:"5%", cursor:'pointer'}} onClick={()=>deleteCart(room.roomName)}/> */}
                          <h3 style={{ textAlign: "center" }}>{room.roomName}</h3>
                          <h2 style={{ textAlign: "center", fontSize: "180%" }}>₹{room.totalPrice}</h2>
                          <div style={{ height: 15, width: 15, backgroundColor: "rgb(234, 234, 234)", transform: "rotate(45deg)", marginBottom: -11 }} />
                        </div>
                        <div style={{ padding: '8% 2% 3% 3%', display: 'flex', flexDirection: 'column', gap: 5, }}>
                          <p> <CheckOutlined /> Room with {room.foodType}</p>
                          <p> <CheckOutlined /> {room.roomSelected} Room </p>
                          <p> <CheckOutlined /> {room.adults} Adults</p>
                          <p> <CheckOutlined /> {room.child0} Childs (0-5Y)</p>
                          <p> <CheckOutlined /> {room.child6} Childs (0-6Y)</p>
                        </div>
                      </div>
                    )
                  }
                  )
                }

                <div style={{ display: 'grid', gridTemplateColumns: "70% auto", fontWeight: 'bold', marginTop: '5%', rowGap: 5 }}>
                  <p>Total</p>
                  <p>₹{allRoomPrice}</p>

                  <p>Service Charge</p>
                  <p>₹{cartData.serviceCharge}</p>

                  <p>GST</p>
                  <p>{cartData.gstCharge}%</p>

                </div>
                <div style={{ backgroundColor: "rgb(234, 234, 234)", padding: '2%', display: 'grid', gridTemplateColumns: "auto auto", alignContent: 'center', marginTop: '2%', color: 'rgba(0,0,0,.6)' }}>
                  <h3>Grand Total</h3>
                  <h2 id='grandTotal' style={{ fontSize: "160%" }}>₹{
                    (allRoomPrice +
                      cartData.serviceCharge +
                      ((allRoomPrice * cartData.gstCharge) / 100)
                    ).toFixed(2)

                  }</h2>
                </div>

              </div>

              <div>
                <Form style={{ margin: "5% 0" }} 
                onFinish={(e) => {
                  if(date.length!=0){
                    sendEmail(e)
                  }else{msg.error({title:"Attention!", content:"All fields are required."})}
                  }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <Form.Item name={"name"} style={{ margin: 0 }} required >
                      <Input size='large' placeholder='Enter Your Name' required />
                    </Form.Item>
                    <Form.Item name={"mobile"} style={{ margin: 0 }} required >
                      <Input size='large' type='number' placeholder='Enter Mobile Number' required />
                    </Form.Item>
                    <Form.Item name={"email"} style={{ margin: 0 }} required >
                      <Input size='large' type='email' placeholder='Enter Email ID' required />
                    </Form.Item>
                    <DatePicker.RangePicker size='large'
                      onChange={(e, d) => setDate(d)}
                      format={"DD-MM-YYYY"}
                    />

                    <Button type='primary' htmlType='submit' size='large' loading={loading}>Book Your Room</Button>
                  </div>
                </Form>
              </div>

            </div>
        }
      </div>
    </div>
  )
}

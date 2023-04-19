import React, {useEffect, useRef, useState} from 'react'
import ImageGallery from 'react-image-gallery'
import { ImageFooter, images } from '../variables'


export default function MainImage({extraImage, roomImages, receptionImages}) {

    const allFullRef = useRef()
    const [imageToShow, setImageToShow] = useState([])
    const [allImages, setAllImages] = useState([])
    const [allRoomImages, setAllRoomImages] = useState([])
    
    useEffect(()=>{
        const allImageTemp=[]
        const allroomImagesTemp=[]
        extraImage.forEach((e)=>{
            allImageTemp.push(e)
        })
        receptionImages.forEach((r)=>{
            allImageTemp.push(r)
        })
        roomImages.map((room)=>{
            room.images.forEach((r)=>{
                allImageTemp.push(r)
                allroomImagesTemp.push(r)
            })
            // console.log(room)
        })
        setAllImages(allImageTemp)
        setImageToShow(allImageTemp)
        setAllRoomImages(allroomImagesTemp)
    },[])

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <ImageGallery items={imageToShow.map((img)=>{
                    return({
                        original:img,
                        thumbnail:img
                    })
                })}
                    ref={allFullRef}
                    lazyLoad={true}
                    showPlayButton={false}
                    useTranslate3D={true}
                    showThumbnails={false}
                    autoPlay={true}
                    onScreenChange={(e) => {
                        if (!e) {
                            console.log("ended")
                            setImageToShow(allImages)
                        }
                    }}

                />
                <ImageFooter
                    text={'View All Images'}
                    onPress={() => allFullRef.current.fullScreen()}
                />
            </div>
            <div style={{ width: '40%', marginLeft: '2%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div
                    style={{
                        height: '48%',
                        background: `url('${roomImages[0].images[0]}')`,
                        backgroundSize: 'cover',
                        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
                    }}
                >
                    <ImageFooter
                        text={'Room Images'}
                        onPress={() => {
                            setImageToShow(allRoomImages)
                            allFullRef.current.fullScreen()
                        }}
                    />
                </div>

                <div
                    style={{
                        height: '48%',
                        background: `url('${receptionImages[0]}')`,
                        backgroundSize: 'cover',
                        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
                    }}
                >
                    <ImageFooter
                        text={'Reception Images'}
                        onPress={() => {
                            setImageToShow(receptionImages)
                            allFullRef.current.fullScreen()
                        }}
                    />

                </div>

            </div>
            <div>

            </div>
        </div>
    )
}

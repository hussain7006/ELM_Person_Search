import React, { useEffect, useState } from 'react'
import ImageGallery from "react-image-gallery";


import "./image-gallery.css"
import { constants } from '../../constants/constants';


const ImageSlider = ({ redisImages }) => {
    const [images, setImages] = useState([
        {
            original: "/images/male-user.png",
            thumbnail: "/images/male-user.png",
        },
        {
            original: "/images/male-user.png",
            thumbnail: "/images/male-user.png",
        },
        {
            original: "/images/male-user.png",
            thumbnail: "/images/male-user.png",
        },
        {
            original: "/images/male-user.png",
            thumbnail: "/images/male-user.png",
        },
        // {
        //     original: "/images/male-user.png",
        //     thumbnail: "/images/male-user.png",
        // },
        // {
        //     original: "/images/male-user.png",
        //     thumbnail: "/images/male-user.png",
        // },
        // {
        //     original: "/images/male-user.png",
        //     thumbnail: "/images/male-user.png",
        // },
        // {
        //     original: "/images/male-user.png",
        //     thumbnail: "/images/male-user.png",
        // },
        // {
        //     original: "/images/male-user.png",
        //     thumbnail: "/images/male-user.png",
        // },

        // {
        //     original: "https://picsum.photos/id/1019/1000/600/",
        //     thumbnail: "https://picsum.photos/id/1019/250/150/",
        // },
        // {
        //     original: "https://picsum.photos/id/1015/1000/600/",
        //     thumbnail: "https://picsum.photos/id/1015/250/150/",
        // },
        // {
        //     original: "https://picsum.photos/id/1019/1000/600/",
        //     thumbnail: "https://picsum.photos/id/1019/250/150/",
        // },
    ])
    useEffect(() => {
        console.log("images");
        console.log(images);
        if (redisImages) {
            const structuredImages = redisImages.map((item) => {

                let path = item.split("public")
                path = path[1].replace(/\\/g, "/")
                if (path.startsWith("//")) {
                    path = path.slice(1); // Remove the leading slash if there are two
                }
                return {
                    original: path,
                    thumbnail: path,

                }
            })

            setImages([...structuredImages])
        }
    }, [redisImages])



    // console.log(images);
    return (
        <div style={{
            boxSizing: "border-box",
            width: "100%",
            // height: "50vh",
            // border: constants.showBorders ? "5px solid red" : "none",
            // border: "5px solid red",
        }}>
            <ImageGallery
                items={images}
                slideDuration={450}
                showThumbnails={true}
                showFullscreenButton={true}
                lazyLoad={true}
                thumbnailPosition="bottom" // top, right, left
                useTranslate3D={true}
                showPlayButton={false}
                isRTL={false}
                showBullets={false}
                showIndex={false}
                autoPlay={false}
                loading="lazy" // eager
                additionalClass="image-gallery-custom"
                originalHeight={true}
            />
        </div>
    )
}

export default ImageSlider
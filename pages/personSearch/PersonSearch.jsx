import React, { useEffect, useState } from 'react'
import { constants } from '../../constants/constants'
import ImageSlider from '../../components/imageSlider/ImageSlider'
import { Oval } from 'react-loader-spinner'

import styles from "./personSearch.module.css"
import { Slider, Tooltip, Typography, styled } from '@mui/material'
import PropTypes from 'prop-types';

const PersonSearch = () => {

    const [isStreamRunning, setIsStreamRunning] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [threshold, setThreshold] = useState(200);
    const [topN, setTopN] = useState(5);

    const [redisImages, setRedisImages] = useState(null)


    const flaskUrl = constants.baseUrl;

    const handleStartStream = async () => {
        setIsStreamRunning(true)
    }
    const handleStopStream = () => {
        setIsStreamRunning(false)
    }

    const handleImageUploadOnchange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]);

        // console.log();
    };

    const handleUploadImageButton = async () => {
        if (!selectedFile) {
            alert("Please select a file first!");
            return;
        }

        var formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('top_n',topN);
        formData.append('threshold', threshold);


        const url = flaskUrl + '/upload';

        console.log("url:", url);

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                // const responseImagesContainer = document.getElementById('response-images');
                // responseImagesContainer.innerHTML = '';

                console.log(data.result_path);

                if (data?.result_path) {
                    setRedisImages(data.result_path)
                }

                // data.result_path.forEach((outputPath, index) => {
                //     const imageContainer = document.createElement('div');
                //     imageContainer.classList.add('response-image-container');

                //     const imageElement = document.createElement('img');
                //     imageElement.src = outputPath.split('/').pop();
                //     imageElement.alt = 'Processed Image';
                //     imageElement.classList.add('response-image');

                //     const timeElement = document.createElement('div');
                //     timeElement.classList.add('response-time');
                //     timeElement.innerText = data.result_timestamp[index] || 'No time available';

                //     imageContainer.appendChild(imageElement);
                //     imageContainer.appendChild(timeElement);
                //     responseImagesContainer.appendChild(imageContainer);
                // });
            })
            .catch(error => {
                console.error('Error:', error);
            });








        // console.log(formData);

        // try {
        //     const response = await axios.post('YOUR_API_ENDPOINT', formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     });

        //     setSelectedFile(null);
        //     console.log('Image uploaded successfully:', response.data);
        // } catch (error) {
        //     alert("Something went wrong")
        //     setSelectedFile(null);
        //     console.error('Error uploading image:', error);
        // }
    };



    const CameraStream = ({ feedType, device }) => {
        const videoUrl = `${flaskUrl}/video_feed/${feedType}/${device}`;

        // console.log("videoUrl:", videoUrl);
        return (
            <div>
                {!isStreamRunning && (
                    <button className={styles.streamButtons} onClick={handleStartStream}> START </button>
                )}
                {isStreamRunning && (
                    <div className="img-container" style={{ height: "50vh", width: "98%", border: "2px solid rgba(0,0,0,0.1)", borderRadius: 5 }}>
                        <img
                            src={videoUrl}
                            alt={`${feedType} Stream`}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain"
                            }}
                        />
                    </div>
                )}
            </div>
        )



        // return (
        //     <div className="img-container" style={{ height: "50vh" }}>
        //         <img
        //             src={videoUrl}
        //             alt={`${feedType} Stream`}
        //             style={{
        //                 width: "100%", height: "100%",
        //                 objectFit: "contain"
        //             }}
        //         />
        //     </div>
        // );



    };

    // useEffect(() => {

    //     async function checkApi() {

    //         const response = await fetch(`http://192.168.18.101:5000/dummy`);

    //         console.log(response);
    //     }

    //     checkApi();
    // }, [])
    function ValueLabelComponent(props) {
        const { children, value } = props;

        return (
            <Tooltip enterTouchDelay={0} placement="top" title={value}>
                {children}
            </Tooltip>
        );
    }
    ValueLabelComponent.propTypes = {
        children: PropTypes.element.isRequired,
        value: PropTypes.number.isRequired,
    };

    const PrettoSlider = styled(Slider)({
        color: '#52af77',
        height: 8,
        '& .MuiSlider-track': {
            border: 'none',
        },
        '& .MuiSlider-thumb': {
            height: 24,
            width: 24,
            backgroundColor: '#fff',
            border: '2px solid currentColor',
            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                boxShadow: 'inherit',
            },
            '&::before': {
                display: 'none',
            },
        },
        '& .MuiSlider-valueLabel': {
            lineHeight: 1.2,
            fontSize: 12,
            background: 'unset',
            padding: 0,
            width: 32,
            height: 32,
            borderRadius: '50% 50% 50% 0',
            backgroundColor: '#52af77',
            transformOrigin: 'bottom left',
            transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
            '&::before': { display: 'none' },
            '&.MuiSlider-valueLabelOpen': {
                transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
            },
            '& > *': {
                transform: 'rotate(45deg)',
            },
        },
    });
    return (
        <main
            style={{
                // border: constants.showBorders ? "1px solid" : "none",
                boxSizing: "border-box",
                maxHeight: "calc(100vh - 60px)",
                height: "calc(100vh - 60px)",
                padding: "5px 15px",
                display: "flex", flexDirection: "column", gap: 5,
                background: "rgba(237,237,237,1)"
            }}
        >
            {/* Upload image section */}
            <section
                style={{
                    border: constants.showBorders ? "5px solid red" : "none",
                    borderBottom: !constants.showBorders ? "5px solid rgba(56, 65, 74, 0.1)" : "5px solid red",
                    boxSizing: "border-box",
                    height: "150px",
                    display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "", gap: 20,
                    padding: "0px 10px",


                }}
            >
                <div style={{
                    border: constants.showBorders ? "5px solid brown" : "none",
                    borderBottom: constants.showBorders && "5px solid red",
                    boxSizing: "border-box",
                    display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", gap: 20,
                    height: "100%",
                }}>
                    <label htmlFor="uploadImage" style={{ background: "lightgray", width: "max-content", padding: "5px 10px", fontSize: 25, borderRadius: "5px", fontWeight: "bold", color: "rgba(0,0,0,0.7)" }}>FIND PERSON</label>
                    <div>
                        <input id='uploadImage' className={styles.uploadImage} type="file" onChange={handleImageUploadOnchange} />
                        <button className={styles.uploadButton} onClick={handleUploadImageButton}>UPLOAD</button>
                    </div>
                </div>
                <div style={{
                    border: constants.showBorders ? "5px solid brown" : "none",
                    borderBottom: constants.showBorders && "5px solid red",
                    boxSizing: "border-box",
                    display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", gap: 20,
                    height: "100%", width: "18vw", padding: "0px 8px",
                    position: "relative"
                }}>
                    <label htmlFor="threshold" style={{ position: "relative", top: "10", background: "lightgray", width: "max-content", padding: "5px 10px", fontSize: 25, borderRadius: "5px", fontWeight: "bold", color: "rgba(0,0,0,0.7)" }}>THRESHOLD</label>
                    <div style={{
                        width: "100%", height: 40,
                        position: "relative", bottom: 0
                    }}>
                        {/* <Typography gutterBottom>Tooltip value label</Typography> */}
                        {/* <Slider
                            valueLabelDisplay="auto"
                            slots={{
                                valueLabel: ValueLabelComponent,
                            }}
                            aria-label="custom thumb label"
                            defaultValue={20}
                        /> */}
                        <PrettoSlider
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            defaultValue={350}
                            step={50}
                            max={1000}
                            onChange={(e) => setThreshold(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Display steam and image slider section */}
            <section
                style={{
                    border: constants.showBorders ? "5px solid green" : "none",
                    boxSizing: "border-box",
                    // height: "100%",
                    height: "calc(100vh - 60px - 150px)",
                    display: "flex", gap: 5
                }}
            >
                {/* Stream section */}
                <div
                    style={{
                        border: constants.showBorders ? "5px solid blue" : "none",
                        borderRight: !constants.showBorders ? "5px solid rgba(56, 65, 74, 0.1)" : "5px solid blue",
                        boxSizing: "border-box",
                        width: "50%",
                        display: "flex", flexDirection: "column",
                        padding: "10px 0px"

                    }}
                >
                    <div style={{ background: "lightgray", width: "max-content", padding: "0px 10px", borderRadius: "10px", fontSize: 28, fontWeight: "bold", color: "rgba(0,0,0,0.7)", marginBottom: "2vh" }}>STREAM</div>
                    <div
                        style={{
                            border: constants.showBorders ? "5px solid pink" : "none",
                            boxSizing: "border-box",
                            display: "flex", flexDirection: "column", gap: 10,
                            width: "100%",
                            height: "100%"
                        }}
                    >



                        <div style={{ position: "relative" }}>
                            {/* <img src="/images/personSearch.png" alt="Stream"
                                style={{
                                    width: "100%", height: "100%",
                                    objectFit: "contain"
                                }}
                            /> */}

                            {/* {
                                streamImg ?
                                    <img src={streamImg} alt="Stream"
                                        style={{
                                            width: "100%", height: "100%",
                                            objectFit: "contain"
                                        }}
                                    /> :
                                    <div style={{ color: "gray", fontSize: 20, fontWeight: "bold", width: "100%", height: "45vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        Offline Stream
                                    </div>
                            } */}


                            <CameraStream feedType="camera" device="0" />


                            {
                                isLoading &&
                                <div style={{
                                    boxSizing: "border-box", width: "100%", height: "100%",
                                    display: "flex", justifyContent: "center", alignItems: "center",
                                    background: "rgba(255,255,255,0.3)",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                }}>
                                    <Oval
                                        visible={true}
                                        height="50"
                                        width="50"
                                        color="#fff"
                                        ariaLabel="oval-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    />
                                </div>
                            }

                        </div>
                        <div style={{
                            border: constants.showBorders ? "5px solid orange" : "none",
                            display: "flex", justifyContent: "center", alignItems: "center"

                        }}>
                            {/* {
                                isStreamRunning ?
                                    <button className={styles.streamButtons} onClick={handleStopStream}> STOP </button>
                                    :
                                    <button className={styles.streamButtons} onClick={handleStartStream}> START </button>
                            } */}
                        </div>
                    </div>
                </div>

                {/* Result Section */}
                <div
                    style={{
                        border: constants.showBorders ? "5px solid blue" : "none",
                        borderRight: !constants.showBorders ? "5px solid rgba(56, 65, 74, 0.1)" : "5px solid blue",
                        boxSizing: "border-box",
                        width: "50%",
                        display: "flex", flexDirection: "column",
                        padding: "10px 0px"

                    }}
                >
                    <div style={{ background: "lightgray", width: "max-content", padding: "0px 10px", borderRadius: "10px", fontSize: 28, fontWeight: "bold", color: "rgba(0,0,0,0.7)", marginBottom: "2vh" }}>RESULTS</div>
                    <div style={{
                        border: constants.showBorders ? "5px solid pink" : "none",
                        boxSizing: "border-box",
                        display: "flex",
                        width: "100%",
                        height: "100%"
                    }}>

                        <ImageSlider redisImages={redisImages} />
                    </div>
                </div>

            </section>
        </main >
    )
}

export default PersonSearch
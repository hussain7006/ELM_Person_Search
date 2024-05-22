import React, { useEffect, useState } from 'react'
import { constants } from '../../constants/constants'
import ImageSlider from '../../components/imageSlider/ImageSlider'
import { Oval } from 'react-loader-spinner'

import styles from "./personSearch.module.css"

const PersonSearch = () => {

    const [isStreamRunning, setIsStreamRunning] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);

    const [redisImages, setRedisImages] = useState(null)


    const flaskUrl = `http://192.168.18.101:5000`

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
        formData.append('top_n', 5);



        fetch(flaskUrl + '/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                // const responseImagesContainer = document.getElementById('response-images');
                // responseImagesContainer.innerHTML = '';

                console.log(data);

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
                    display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", gap: 20,
                    padding: "0px 10px",


                }}
            >
                <label htmlFor="uploadImage" style={{ background: "lightgray", width: "max-content", padding: "5px 10px", fontSize: 25, borderRadius: "5px", fontWeight: "bold", color: "rgba(0,0,0,0.7)" }}>Find Person</label>
                <div>
                    <input id='uploadImage' className={styles.uploadImage} type="file" onChange={handleImageUploadOnchange} />
                    <button className={styles.uploadButton} onClick={handleUploadImageButton}>UPLOAD</button>
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
                <section
                    style={{
                        border: constants.showBorders ? "5px solid blue" : "none",
                        borderRight: !constants.showBorders ? "5px solid rgba(56, 65, 74, 0.1)" : "5px solid blue",
                        boxSizing: "border-box",
                        width: "50%",
                        display: "flex", flexDirection: "column",
                        padding: "10px 0px"

                    }}
                >
                    <div style={{ background: "lightgray", width: "max-content", padding: "0px 10px", borderRadius: "10px", fontSize: 28, fontWeight: "bold", color: "rgba(0,0,0,0.7)", marginBottom: "2vh" }}>Stream</div>
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


                            <CameraStream feedType="yolo" device="0" />


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
                </section>

                {/* Result Section */}
                <section
                    style={{
                        border: constants.showBorders ? "5px solid blue" : "none",
                        borderRight: !constants.showBorders ? "5px solid rgba(56, 65, 74, 0.1)" : "5px solid blue",
                        boxSizing: "border-box",
                        width: "50%",
                        display: "flex", flexDirection: "column",
                        padding: "10px 0px"

                    }}
                >
                    <div style={{ background: "lightgray", width: "max-content", padding: "0px 10px", borderRadius: "10px", fontSize: 28, fontWeight: "bold", color: "rgba(0,0,0,0.7)", marginBottom: "2vh" }}>Results</div>
                    <div style={{
                        border: constants.showBorders ? "5px solid pink" : "none",
                        boxSizing: "border-box",
                        display: "flex",
                        width: "100%",
                        height: "100%"
                    }}>

                        <ImageSlider redisImages={redisImages} />
                    </div>
                </section>

            </section>
        </main >
    )
}

export default PersonSearch
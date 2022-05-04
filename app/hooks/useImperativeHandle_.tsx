import React, {memo, useEffect, useRef} from "react";
import Video from "../videos/Video";

const UseImperativeHandle_ = () => {
  const videoRef: any = useRef()

  useEffect(() => {
    console.log(videoRef.current)
  })

  const handlePlay = () => {
    videoRef.current.play()
  }

  const handlePause = () => {
    videoRef.current.pause()
  }

  return (
    <>
      <h1>UseImperativeHandle_</h1>
      <Video ref={videoRef} />
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
    </>
  )
}

export default memo(UseImperativeHandle_)

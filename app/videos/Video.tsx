import {forwardRef, useImperativeHandle, useRef} from "react";

const Video = (props: any, ref: any) => {
  const videoRef: any = useRef()
  useImperativeHandle(ref, () => ({
    play() {
      videoRef.current.play()
    },
    pause() {
      videoRef.current.pause()
    }
  }))

  return (
    <video ref={videoRef} src="./download.mp4" height={400} width={400} />
  )
}

export default forwardRef(Video)

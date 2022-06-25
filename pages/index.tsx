import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import {socket} from '../app/http/ws'
import {useEffect} from "react";
const Home: NextPage = () => {
  useEffect(() => {
    socket.on('chatToClient', (d) => {
      alert('chatToClient' + d)
    })
  }, [])

  return (
    <div className={styles.container}>
      <button onClick={() => {
        socket.emit('chatToServer', '2383333')
      }}>A</button>
    </div>
  )
}

export default Home

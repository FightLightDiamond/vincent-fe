import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import {useEffect} from "react";
import {io} from "socket.io-client";
import WebSocket from 'ws';
// const socket = new WebSocket("ws+unix://localhost:3333/", {
//   perMessageDeflate: false
// })


const socket = io("http://localhost:3333", {
  // extraHeaders: {
  //   Host: 'localhost:3333',
  //   Origin: 'ws://localhost:3000',
  //   Referer: 'ws://localhost:3000/'
  // },
  // secure:true,
  // forceNew: true,
  transports: ["websocket", "polling"],
  // transportOptions: {
  //   polling: {
  //     extraHeaders: {
  //
  //     }
  //   }
  // }
    // autoConnect: false,
  upgrade: true,
  protocols: '-'
});


console.log({socket})

const Home: NextPage = () => {
  useEffect(() => {
    socket.on('chatToClient', (d) => {
      console.log({d})
      alert('chatToClient' + d)
    })

    socket.on('odds_change', (d) => {
      console.log({d})
      alert('chatToClient' + d)
    })

    socket.on('joinedRoom', (d) => {
      alert('joinedRoom' + d)
      // socket.send(
      //   JSON.stringify({
      //     event: 'events',
      //     data: 'test',
      //   }),
      // );

    })
  }, [])

  return (
    <div className={styles.container}>
      <button onClick={() => {
        socket.emit('joinRoom', 'sr:match:32690467')
      }}>A</button>
    </div>
  )
}

export default Home

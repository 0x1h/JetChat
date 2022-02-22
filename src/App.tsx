import { FormEvent, useEffect, useState } from 'react';
import {io} from "socket.io-client"

function App() {
  const socket = io("http://localhost:3000")
  const [value, setValue] = useState<string>("")
  const [messages, setMessagse] = useState<any>([])
  const [room, setRoom] = useState('')
  
  useEffect(() => {
    socket.on("connect", () => {
      console.log(`You are connected to ${socket.id}`);
    })

    return () => {
      socket.disconnect();
    }
  }, [])

  useEffect(() => {
    socket.on("receive", msg => {
      setMessagse((prev: any) => [...prev,value, msg])
    })

    return () => {
      socket.disconnect();
    }
    
  }, [socket])


  const formHandler = (e: FormEvent) => {
    e.preventDefault()
  
    if(!value.trim()) return

    socket.emit("send-message", value, room)
  }

  return (
    <div className="App">
      <form onSubmit={formHandler}>
      <input type='input' value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Room code"/>
      <br />
      <br />
      <input type="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Yor message"/>
      <button type='submit'>SEND REQUEST</button>
      </form>
      <div>
        {
          messages.map((e: any, i: number) => {
            return <p key={i}>{e}</p>
          })
        }
      </div>
    </div>
  );
}

export default App;

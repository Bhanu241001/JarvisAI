import React, { useContext } from 'react'
import './App.css'
import jarvis from './assets/ai.png'
import { TiMicrophoneOutline } from "react-icons/ti";
import { datacontext } from './context/UserContext';
import speak_img from './assets/speak.gif'
import aigif from './assets/aiVoice.gif'
import ai from './assets/harvis.gif'
function App() {
 let {recognition,speaking,setSpeaking,prompt,setPrompt,response,setResponse}= useContext(datacontext)
return (  
    <div className='main'>
        <img src={ai} alt="Jarvis-AI" id='jarvis' />
        <span>I'am Jarvis. Your AI assistant</span>
        {!speaking?<button onClick={()=>{
          setPrompt("listening...")
          setSpeaking(true)
          setResponse(false)
          recognition.start()}}>Try Now <TiMicrophoneOutline /></button>: 
            <div className='response-div'>
              {!response?<img src={speak_img} alt="" id='speak_img' />: <img src={aigif} alt="" id='aigif' />}
              <p>{prompt}</p>
            </div>
          }
     </div>
  )
}

export default App

// import { run } from 'node:test'
import React, { createContext, useState } from 'react'
import run from '../gemeni'
export const datacontext=createContext()
function UserContext({children}) {
    // hook
    let [speaking,setSpeaking]=useState(false);
    let[prompt,setPrompt]=useState("listening...")
    let[response,setResponse]=useState(false)
    // speech
    function speak(text){
        let text_speak=new SpeechSynthesisUtterance(text)
        text_speak.volume=1
        text_speak.rate=1
        text_speak.pitch=1
        text_speak.lang="en-GB"
        window.speechSynthesis.speak(text_speak)
    }

    
    // speech recognition
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    let recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.onresult=(e)=>{
      let currentIndex=e.resultIndex
      let transcript=e.results[currentIndex][0].transcript
      setPrompt(transcript)
      takeCommmand(transcript.toLowerCase())
    }
    async function aiResponse(prompt){
       let text= await run(prompt)
    //    let newText=text.split("**")&&text.split("*")&&text.replace("google","Bhanu Yadav")&&text.replace("Google","Bhanu Yadav")
     let newText = text.replace(/\*\*/g, "").replace(/\*/g, "").replace(/google/gi, "Bhanu Yadav");
       setPrompt(newText)
       speak(newText)
       setResponse(true)
       setTimeout(() => {
        setSpeaking(false)
       }, 7000);
  
    //    console.log(text) 
    }
    function takeCommmand(command){
        if(command.includes("open youtube")&&command.includes("open")){
            window.open("https://www.youtube.com/","_blank")
            speak("opening youtube")
            setPrompt("opening youtube")
            setResponse(true)
            setTimeout(() => {
                setSpeaking(false)
            }, 7000);
        }else if(command.includes("open google")&&command.includes("open")){
            window.open("https://www.google.com/","_blank")
            speak("opening google")
            setPrompt("opening google")
            setResponse(true)
            setTimeout(() => {
                setSpeaking(false)
            }, 7000);
        }else if(command.includes("hello jarvis")&&command.includes("hello")){
            speak("Hello Sir, how may I be of assistance?")
            setPrompt("Hello Sir, how may I be of assistance?")
            setResponse(true)
            setTimeout(() => {
                setSpeaking(false)
            }, 7000);
        }else if(command.includes("open linkedin")&&command.includes("open")){
            window.open("https://www.linkedin.com/in/bhanu-yadav-7670b3275/","_blank")
            speak("opening linkedin")
            setPrompt("opening linkedin")
            setResponse(true)
            setTimeout(() => {
                setSpeaking(false)
            }, 7000);
        }else if(command.includes("your name")&&command.includes("name")){
            // window.open("https://www.linkedin.com/in/bhanu-yadav-7670b3275/","_blank")
            speak("I'am Jarvis. Your AI assistant")
            setPrompt("I'am Jarvis. Your AI assistant")
            setResponse(true)
            setTimeout(() => {
                setSpeaking(false)
            }, 7000);
        }else if(command.includes("date")){
            let date=new Date().toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"})
            speak("today is "+date)
            setResponse(true)
            setPrompt("today is "+date)
            setTimeout(() => {
                setSpeaking(false)
            }, 4000);
        }else if(command.includes("time")){
            let time=new Date().toLocaleTimeString(undefined,{hour:"2-digit",minute:"2-digit"})
            speak("current time is "+time)
            setResponse(true)
            setPrompt("current time is "+time)
            setTimeout(() => {
                setSpeaking(false)
            }, 4000);
        }else if(command.includes("what is my name")&&command.includes("name")){
            speak("Your name is Bhanu Yadav. You are my creator")
            setPrompt("Your name is Bhanu Yadav. You are my creator.")
            setResponse(true)
            setTimeout(() => {
                setSpeaking(false)
            }, 7000);
        }
        else{
          aiResponse(command)
        //   setResponse(true)
        }
    }
    let value={
        recognition,
        speaking,
        setSpeaking,
        prompt,
        setPrompt,
        response,
        setResponse
    }
  return (
    <div>
        <datacontext.Provider value={value}>
            {children}
        </datacontext.Provider>
    </div>
  )
}

export default UserContext
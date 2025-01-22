import  {useEffect, useRef, useState} from "react"
import Header from "./Header";
import Language from "./Language";
import Letters from "./Letters";
import Keyboard from "./Keyboard";
import {words} from "./words";
import {languages} from "./lang";
import { nanoid } from "nanoid"



export default function Hangman() {

    const alphabet='abcdefghijklmnopqrstuvwxyz'
    const [currentWord, setCurrentWord] = useState("ABFBCQ")
    const [selectedStatus,setSelectedStatus] = useState(()=>initilizeSelectedStatus())
    const turnsRef=useRef(currentWord.length-1)
    const [selectedWord,setSelectedWord]= useState([])
    console.log(turnsRef)
    console.log(selectedStatus)
    console.log(selectedWord)


    useEffect(()=>{
        turnsRef.current -=1
    },[selectedWord])

    function initilizeSelectedStatus(){
        return new Array(currentWord.length).fill(false)
    }


    function randomWord(){
        const randomIndex= Math.floor(Math.random()*words.length);
        const randomWord=words[randomIndex]
        return(randomWord.toUpperCase())

    }
    function clickEvent(prop) {
        setSelectedStatus(prevState =>{
            return prevState.map((_,index)=>{
                return currentWord[index]===prop.value?true:_
            })
        });

        setSelectedWord(prevState => {
           return [...prevState,prop.value]
        })
    }




    const letterElement = currentWord.split('').map((word, index) => (
    <Letters key={index} id={index} value={word} show={selectedStatus[index]} />
    ));


    const languageElement=languages.map((language,index)=>(
        <Language key={index}  value={language.name} id={index} style={{backgroundColor:language.backgroundColor,color:language.color}} />
    ))

    const keyboardElement=alphabet.split('').map((words,index)=>{
       return <Keyboard key={index}  selectedWord={selectedWord} selectedStatus={selectedStatus} onClick={clickEvent} value={words.toUpperCase()} id={index} />
    })




    return (
        <main>
            <Header s={false}/>
            <div className="language">
                {languageElement}
            </div>
            <div className="letters">
                    {letterElement}
            </div>
            <div className="keyboard">
                    {keyboardElement}
            </div>
        </main>
)
}

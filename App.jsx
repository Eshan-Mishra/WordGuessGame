import React, {useEffect, useRef} from "react"
import Header from "./Header";
import Language from "./Language";
import Letters from "./Letters";
import Keyboard from "./Keyboard";
import {words} from "./words";
import {languages} from "./lang";
import { nanoid } from "nanoid"



export default function Hangman() {

    const alphabet='abcdefghijklmnopqrstuvwxyz'
    const [currentWord, setCurrentWord] = React.useState("ABFBCQ")
    const [selectedWord,setSelectedWord] = React.useState(()=>initializeSelectedword())
    const turnsRef=useRef(currentWord.length-1)
    console.log(turnsRef)
    console.log(selectedWord)


    useEffect(()=>{
        turnsRef.current -=1
    },[selectedWord])

    function initializeSelectedword(){
        return new Array(currentWord.length)
            .fill(false)
            .map(()=>({
                button:null,
                buttonStatus:false
            }))


    }

    function randomWord(){
        const randomIndex= Math.floor(Math.random()*words.length);
        const randomWord=words[randomIndex]
        return(randomWord.toUpperCase())

    }
    function clickEvent(prop) {
        setSelectedWord(prevList => {
            const updatedList = prevList.map((character, index) => {
                // Check if the letter in the current word matches the clicked letter
                if (currentWord[index] === prop.value) {
                    return {
                        ...character,
                        button: prop.value,
                        buttonStatus: true
                    };
                }
                return character;
            });
            return updatedList;
        });
    }




    const letterElement = currentWord.split('').map((word, index) => (
    <Letters key={index} id={index} value={word} show={selectedWord[index].buttonStatus} />
    ));


    const languageElement=languages.map((language,index)=>(
        <Language  value={language.name} id={index} style={{backgroundColor:language.backgroundColor,color:language.color}} />
    ))

    const keyboardElement=alphabet.split('').map((words,index)=>{
       return <Keyboard onClick={clickEvent} value={words.toUpperCase()} id={index} />
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

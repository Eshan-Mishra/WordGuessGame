import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Language from "./Language";
import Letters from "./Letters";
import Keyboard from "./Keyboard";
import { words } from "./words";
import { languages } from "./lang";
import { nanoid } from "nanoid";

export default function Hangman() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const [currentWord, setCurrentWord] = useState("ABFBCQ");
    const [selectedStatus, setSelectedStatus] = useState(()=>initilizeSelectedStatus());
    const [keyStroke, setKeyStroke] = useState(()=>[]);
    const turnsRef = useRef(currentWord.length);



    console.log(turnsRef.current)
    console.log(selectedStatus)
    console.log(keyStroke)



    // useEffect(() => {
    //     turnsRef.current -= 1;
    // }, [selectedStatus]);

    function initilizeSelectedStatus() {
        return new Array(currentWord.length).fill().map(() => ['', false]);
    }

    function randomWord() {
        const randomIndex = Math.floor(Math.random() * words.length);
        const randomWord = words[randomIndex];
        return randomWord.toUpperCase();
    }

    function clickEvent(prop) {
        setSelectedStatus(prevState => {
            return prevState.map((_, index) => {
                return currentWord[index] === prop.value ? prevState[index]=[prop.value, true]:_;
                // if(currentWord[index]===prop.value){
                //     return prevState[index]=[prop.value, true]
                // }else {
                //     turnsRef.current -= 1;
                //     return _;
                // }


            });
        });
        setKeyStroke(preStroke=>[...preStroke,prop.value]);

        // if(keyStroke.includes(prop.value)){
        //     if(selectedStatus.some(item=>item[0]===prop.value)){
        //     }else {
        //         turnsRef.current -=1
        //     }
        // }
    }
    keyStroke.forEach(item => {
        let foundMatch = false;

        selectedStatus.forEach(selected => {
            if (item === selected[0]) {
                foundMatch = true;
            }
        });

        if (!foundMatch) {
            turnsRef.current -= 1;
        }
    });



    const letterElement = currentWord.split('').map((word, index) => (
        <Letters selectedStatus={selectedStatus} key={index} turnsRef={turnsRef} id={index} value={word} show={selectedStatus[index][1]} />
    ));

    const languageElement = languages.map((language, index) => (
        <Language key={index} value={language.name} id={index} style={{ backgroundColor: language.backgroundColor, color: language.color }} />
    ));

    const keyboardElement = alphabet.split('').map((words, index) => (
        <Keyboard key={index} turnsRef={turnsRef} keyStroke={keyStroke} selectedStatus={selectedStatus} onClick={clickEvent} value={words.toUpperCase()} id={index} />
    ));

    return (
        <main>
            <Header s={false} />
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
    );
}
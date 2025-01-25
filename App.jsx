import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Language from "./Language";
import Letters from "./Letters";
import Keyboard from "./Keyboard";
import { words } from "./words";
import { languages } from "./lang";
import Confetti from "react-confetti"

export default function Hangman() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const [currentWord, setCurrentWord] = useState(randomWord);
    const [selectedStatus, setSelectedStatus] = useState(initializeSelectedStatus);
    const [keyStroke, setKeyStroke] = useState([]);
    const [temp, setTemp] = useState([]);
    const turnsRef = useRef(8);
    const [overlayShown, setOverlayShown] = useState( new Set());
    const [message,setMessage]=useState(false)
    const [gameStatus, setGameStatus]=useState(false)

    console.log(currentWord)
    // console.log(gameStatus)
    // console.log(turnsRef.current)
    console.log(selectedStatus)
    // console.log(keyStroke)


    function startNewGame(){
        setCurrentWord(randomWord())
        setTemp([])
        turnsRef.current=8
        setOverlayShown(new Set())
        setMessage(false)
        setGameStatus(false)
        setKeyStroke([])
        setSelectedStatus(initializeSelectedStatus())
    }

    useEffect(() => {
        const index = 7 - turnsRef.current;
        if (index >= 0) {
            setOverlayShown(prev => new Set(prev).add(index));
        }
        if(index !==6 && index >= 0){
            setMessage(prevState=>languages[index].name)
        }

    }, [turnsRef.current]);

    useEffect(()=>{
        checkWin()
    },[selectedStatus])

    function checkWin() {
        const hasWon = selectedStatus.every(status => status[1]===true);
        if (hasWon) {
            setGameStatus(true);
        }
    }



    function initializeSelectedStatus() {
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
            });
        });
        setKeyStroke(preStroke=>[...preStroke,prop.value]);
        setTemp(preStroke=>[...preStroke,prop.value]);

    }


    temp.forEach(item => {
        const foundMatch = selectedStatus.some(selected => item === selected[0]);
        if (!foundMatch) {
            turnsRef.current -= 1;
            setTemp([])
        }else {
        setTemp([])
        }
    });








    const letterElement = currentWord.split('').map((word, index) => (
        <Letters selectedStatus={selectedStatus}
                 key={index}
                 turnsRef={turnsRef}
                 id={index}
                 value={word}
                 show={selectedStatus[index][1]}
                 gameStatus={gameStatus}
        />
    ));

    const languageElement = languages.map((language, index) => (
        <Language
            key={index}
            keyStroke={keyStroke}
            selectedStatus={selectedStatus}
            value={language.name}
            id={index}
            showOverlay={overlayShown.has(index)}
            style={{ backgroundColor: language.backgroundColor, color: language.color }}
        />
    ));

    const keyboardElement = alphabet.split('').map((words, index) => (
        <Keyboard
            key={index}
            turnsRef={turnsRef}
            keyStroke={keyStroke}
            selectedStatus={selectedStatus}
            onClick={clickEvent}
            value={words.toUpperCase()}
            id={index}
        />
    ));

    return (
        <main>
            {
                gameStatus &&
                <Confetti
                    recycle={false}
                    numberOfPieces={1000}
                />
            }
            <Header  message={message} gameStatus={gameStatus} turn={turnsRef.current} />
            <div className="language">
                {languageElement}
            </div>
            <div className="letters">
                {letterElement}
            </div>
            <div className="keyboard">
                {keyboardElement}
            </div>
            {
                (gameStatus || turnsRef.current===0) &&
                    <div className="newGame">
                        <button onClick={startNewGame} >
                            New Game
                        </button>
                    </div>

            }
        </main>
    );
}
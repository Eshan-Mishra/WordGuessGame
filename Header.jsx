import { getFarewellText } from "./utils";

export default function Header({ message, turn,gameStatus }) {
    return (
        <div>
            <div className="head">
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
                {message && (
                    <div className="status">


                        {gameStatus ? <p>You win!<br/>Well done! 🎉</p> : turn !== 0 ? getFarewellText(message) :
                            <p>Game over! <br/>You lose! Better start learning Assembly 😭</p>}


                        {/*{turn !== 0 ? getFarewellText(message) :gameStatus?<p>You win!<br/>Well done! 🎉</p>: <p>Game over! <br/>You lose! Better start learning Assembly 😭</p>}*/}
                    </div>
                )}
            </div>
        </div>
    );
}
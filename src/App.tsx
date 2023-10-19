import "./App.css";
import HangImage from "./components/HangImage";
import getWord from "./helpers/getWord";
import letters from "./helpers/letters";
import { useState, useEffect } from "react";

export default function App() {
  const [attempts, setAttempts] = useState<number>(0);
  const [word, setWord] = useState<string>(getWord);
  const [hiddenWord, setHiddenWord] = useState<string>("_ ".repeat(word.length));
  const [lose, setLose] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);

  useEffect(() => {
    if(attempts >= 9) setLose(true);
  }, [attempts])
  

  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(" ").join("");
    if(currentHiddenWord === word){
      setWon(true);
    }
  },[hiddenWord])

  function checkLetter(letter: string) {
    if (lose) return;
    if (!word.includes(letter)) {
      setAttempts(Math.min(attempts + 1, 9));
      return;
    }
   
    let hiddenWordIndent = hiddenWord.split(" ");

    for (let i = 0; i <= word.length; i++) {
      if (word[i] == letter) {
          hiddenWordIndent[i] = letter
      }
    }
    
    setHiddenWord(hiddenWordIndent.join(" "));
  }

  function newGame(){
    const newWord = getWord();
    setWord(newWord)
    setHiddenWord("_ ".repeat(newGame.length));
    setAttempts(0);
    setLose(false);
    setWon(false);
  }

  return (
    <div className="App">
      <h3>Counter Image</h3>
      <HangImage imageNumber={attempts} />

      <h3>{hiddenWord}</h3>
      <h3>Intents: {attempts}</h3>


      <h3> { lose ? <h2>"You have a lose, word is: {word}"</h2> : ""} </h3>
      <h3> { won ? <h2>"You Win"</h2> : ""} </h3>
      {letters.map((e) => (
        <button onClick={() => checkLetter(e)} key={e}>
          {e}
        </button>
      ))}
      <button onClick={newGame}>You wanna play again?</button>
    </div>
  );
}

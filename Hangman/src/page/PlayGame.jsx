import { Link, useLocation, Navigate } from "react-router-dom";
import MaskedText from "../components/MaskedText/MaskedText";
import LetterButtons from "../components/LetterButtons/LetterButtons";
import { useState } from "react";
import Hangman from "../components/HangMan/HangMan";

function PlayGame(){
    const {state} = useLocation();
    const [guessedLetters, setGuessedLetter] = useState([]);
    const [step, setStep] = useState(0);

    function handleLetterClick(letter){
        setGuessedLetter((currentLetters) =>
            currentLetters.includes(letter) ? currentLetters : [...currentLetters, letter]
        );

        if(!state.wordselected.toUpperCase().includes(letter)){
            setStep((currentStep) => currentStep + 1);
        }
    }

    if(!state?.wordselected){
        return <Navigate to="/start" replace />;
    }

    return (
    <>

         <h1>Play Game </h1>
         <MaskedText text={state.wordselected} guessedLetters={guessedLetters} ></MaskedText>
         <div> <LetterButtons text={state.wordselected} guessedLetter={guessedLetters} onLetterClick={handleLetterClick} ></LetterButtons> </div>
         <div><Hangman step={step}/></div>
        <Link to='/start' className="text-blue-400">start Game Link</Link>
     </>
   )
}

export default PlayGame;
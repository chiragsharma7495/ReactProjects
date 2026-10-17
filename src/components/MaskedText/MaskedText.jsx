import { getMaskedString } from "./MaskingUtility";
function MaskedText({text, guessedLetters}){
    const MaskedString = getMaskedString(text, guessedLetters)

    return(
        <>
            {MaskedString.map((letter, index)=> {
                return(
                    <span key={index} className="mx-1">
                        {letter}
                    </span>
                )
            })}
        </>
    )
}

export default MaskedText;
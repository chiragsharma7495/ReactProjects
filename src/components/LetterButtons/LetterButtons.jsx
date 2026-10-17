
const alphabets = "QWERTYUIOPASDFGHJKLZXCVBNM".split('');

function LetterButtons({text, guessedLetter, onLetterClick}){
    const originalLetter = new Set(text.toUpperCase().split(''));
    const GuessedLetterSet = new Set(guessedLetter);

    const buttonStyle = function(letter){
        if(GuessedLetterSet.has(letter)){
            return `${originalLetter.has(letter) ? 'bg-green-500' : 'bg-red-500'}`
        }else {
                return 'bg-blue-500';
            }
    }

    function handleLetterClick(event){
        const characterOfTheLetter = event.target.value;
        onLetterClick?.(characterOfTheLetter)
    }

    const buttons = alphabets.map(letter => {
        return (
            <button
                key={`button-${letter}`}
                value={letter}
                onClick={handleLetterClick}
                disabled={GuessedLetterSet.has(letter)}
                className={`h-12 w-12 m-1 text-white rounded-md ${buttonStyle(letter)}`}
                > {letter}
            </button>
            
        )
    })
    return buttons
}

export default LetterButtons;
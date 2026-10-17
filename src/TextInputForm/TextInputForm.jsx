import Button from "../components/Button/Button"
import TextInput from "../text/TextInput"

function TextInputForm({
    inputType,
    handleFormSubmit,
    handleTextInputForm,
    handleShowHideClick,
}){
    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <TextInput 
                    type={inputType}
                    label = " Enter you text"
                    placeholder=" Enter you word pr phrase"
                    onChangeHandler={handleTextInputForm}
                />
            </div>

            <div>
                <Button
                    styleType = "warning"
                    text = "show/hide"
                    onClickHandler={handleShowHideClick}
                />
            </div>

            <div>
                <button
                    type="submit"
                >submit</button>
            </div>
        </form>
    )
}

export default TextInputForm
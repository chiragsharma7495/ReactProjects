import { useState } from "react";
import TextInputForm from "./TextInputForm";
import { useNavigate } from "react-router-dom";

function TextInputFormContainer() {
    const [inputType, setInputType] = useState("password");
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    function handleFormSubmit(event) {
        event.preventDefault();
        console.log(" form submitted", value);

        if(value){
            navigate(`/playgame`,{state: {wordselected : value}});
        }
    }

    function handleTextInputForm(event) {
        console.log("text input change");
        console.log(event.target.value);
        setValue(event.target.value);
    }

    function handleShowHideClick() {
        setInputType((currentType) =>
            currentType === "password" ? "text" : "password"
        );
    }

    return (
        <TextInputForm
            inputType = {inputType}
            handleFormSubmit = {handleFormSubmit}
            handleTextInputForm = {handleTextInputForm}
            handleShowHideClick = {handleShowHideClick}
            />
    );
}

export default TextInputFormContainer;
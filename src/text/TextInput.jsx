function TextInput({type = "text", label, placeholder = "Enter you value here", onChangeHandler}){
    return(
        <label>
            <span className="text-gray-50">{label}</span>
            <input
            type = {type}
            className="px-4 py-2 border border-gray-500 rounded-md w-full"
            placeholder={placeholder}
            
            onChange={onChangeHandler}
            ></input>
        </label>
    )
}

export default TextInput;
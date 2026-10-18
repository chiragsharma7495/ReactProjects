function Button({text, onClickHandler, type = "button"}){
    
    return(
      <button onClick={onClickHandler}
          type={type}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700" >
        {text}
      </button>
    )
}

export default Button;
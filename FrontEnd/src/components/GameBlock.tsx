interface GameBlockProps {
    gameSet : React.RefObject<HTMLFormElement>
    index : Number
    value : Number
    isValid : Boolean
}

const GameBlock : React.FC<GameBlockProps> = ({ gameSet, index, value, isValid }) => {
    
    const checkInputValue = (e : React.KeyboardEvent<HTMLInputElement>) : void => {
        if (e.keyCode !== 8 && (!isNaN(parseInt(e.currentTarget.value, 10)) || !/^[1-9]$/.test(e.key))) {
            e.preventDefault()
        }
    }

    const checkNumberAvailability = (e : React.KeyboardEvent<HTMLInputElement>) : void => {
        const formValues = [...(gameSet.current?.elements || [])].reduce((acc, elem) =>
            elem.tagName === "INPUT" ? [...acc, (elem as HTMLInputElement).value] : acc, [] as string[]
        )
        if (formValues?.indexOf(e.key) > -1) {
            e.preventDefault()
        }
    } 

    return (
        <input
            defaultValue={value as string | number}
            className={`gameBlock ${isValid ? 'valid' : ''}`}
            type="number"
            required
            onKeyDown={(e) => {
                checkNumberAvailability(e)
                checkInputValue(e)
              }}
            name={index.toString()}
        />
    )
  }
    
  export default GameBlock
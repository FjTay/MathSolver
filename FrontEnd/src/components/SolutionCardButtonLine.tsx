import { Form } from "react-router-dom"
import { solution } from "../utils/gameData"

interface SolutionCardButtonLineProps {
    id : Number
    isUserSolutions : Boolean
    iscurrentSolutionID : Boolean
    handleSolutionContext : Function
}

const SolutionCardButtonLine : React.FC<SolutionCardButtonLineProps> = ({ id, isUserSolutions, iscurrentSolutionID, handleSolutionContext }) => {

    return (
        <div className="buttonContainer">
            <Form
                action={`userSolutions/destroy/${id}`}
                method="post"
                onSubmit={() => iscurrentSolutionID && handleSolutionContext({...solution})}
            >
                {isUserSolutions && <button type="submit">Delete Solution</button>}
            </Form>
        </div>
    )
}

export default SolutionCardButtonLine
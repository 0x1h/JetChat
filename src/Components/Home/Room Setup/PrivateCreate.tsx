import { FC } from "react";
import ServerIcon from "./ServerIcon";
import { useSelector, useDispatch } from "react-redux";
import {State} from "../../../Hooks/createRoomReducer"
import { Input } from "../Sign up/SignUp";
import "./style/private_style.css";
import PrivateInputs from "./PrivateInputs";

const PrivateCreate: FC<{ goBack: () => void }> = ({ goBack }) => {
	const roomForm = useSelector((state: {roomState: State}) => state.roomState) 
  const dispatch = useDispatch()
	const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
	

	const inputHandler = (e: Input) => {
		const name = e.target.name
		const value = e.target.value

		dispatch({type: "ROOM_OPTIONS", payload: {
			key: name,
			value: value
		}})
	}

  return (
    <form className="private_create__modal">
      <div className={darkTheme ? "create__header dark" : "create__header"}>
        <p onClick={goBack}>{"<"} Go Back</p>
        <h4>Create Room</h4>
      </div>
      <ServerIcon />
      <PrivateInputs inputHandler={inputHandler} roomForm={roomForm} darkTheme={darkTheme}/>
    </form>
  );
};

export default PrivateCreate;

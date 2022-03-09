import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import RoomInfo from "./RoomInfo";
import ConfirmChanges from "./ConfirmChanges";
import { State as RoomData } from "../../../../Hooks/Chat/RoomData";
import DeleteRoom from "./DeleteRoom";
import { Input } from "../../../Home/Sign up/SignUp";
import "./style/style.css";

const Overview = () => {
  const [changes, setChanges] = useState<boolean>(false);
  const roomData = useSelector(
    (state: { roomData: RoomData }) => state.roomData
  );
  const [unChange, setUnChange] = useState({
    room_name: roomData.room_name,
    room_icon: roomData.room_icon,
  });
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );

  const inputHandler = (e: Input) => {
    const client_id = JSON.parse(localStorage.getItem("client_id")!);

    if (roomData.owner_data.client_id !== client_id) return;

    const name = e.target.name;
    const value = e.target.value;

    setUnChange({ ...unChange, [name]: value });
  };

  useEffect(() => {
    setUnChange({
      room_name: roomData.room_name,
      room_icon: roomData.room_icon,
    });
  }, [roomData]);

	useEffect(() => {
		if(unChange.room_name.trim().length <= 3){
			setChanges(false)
		}
	}, [unChange])

	const client_id = JSON.parse(localStorage.getItem("client_id")!)

  return (
    <div className="overview-info__dashboard">
      <RoomInfo unChanged={(state: boolean) => setChanges(state)} inputHandler={inputHandler} unChange={unChange}/>
      <hr className="room-settings-hr" />
      {roomData.owner_data.client_id === client_id && <DeleteRoom />}
      <ConfirmChanges changes={changes} dark={darkTheme} newChanges={unChange}/>
    </div>
  );
};

export default Overview;

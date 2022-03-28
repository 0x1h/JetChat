import { useState } from 'react';
import { useSelector } from 'react-redux'
import { ActionType } from './MemberList';
import { State as RoomData } from "../../../../Hooks/Chat/RoomData";
import MemberList from './MemberList';
import ActionModal from "./ActionModal"
import "./style/style.css"

const SettingsMembers = () => {
	const [actionType, setActionType] = useState<ActionType>({
		type: "KICK",
		person: {
			username: "",
			client_id: ""
		}
	})
	const darkTheme = useSelector(
		(state: { themeReducer: boolean }) => state.themeReducer
	);
	const roomData = useSelector(
		(state: { roomData: RoomData }) => state.roomData
	);

	const setActionHandler = (type: ActionType) => {
		setActionType(type)
	}


	return (
		<>
			{
				actionType.person.client_id 
				&& <ActionModal 
				type={actionType.type} 
				username={actionType.person.username} 
				client_id={actionType.person.client_id} 
				cancelModal={() => setActionType((prev: ActionType) => {
					return {
						...prev,
						person: {
							...prev.person,
							client_id: ""
						}
					}
				})}
				/>
			}
			<div className='settings__members-list'>
				<input type="text" className={darkTheme ? "find-user-input dark" : "find-user-input"} placeholder="Find any member" />
				<div className='members-list-wrapper'>
					{
						roomData.active_clients.map(member => {
							return <MemberList {...member} setActionHandler={setActionHandler} />
						})
					}
				</div>
			</div>
		</>
	)
}

export default SettingsMembers
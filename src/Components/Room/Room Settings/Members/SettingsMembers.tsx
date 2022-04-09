import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { ActionType } from './MemberList';
import { State as RoomData } from "../../../../Hooks/Chat/RoomData";
import MemberList from './MemberList';
import ActionModal from "./ActionModal"
import "./style/style.css"

const SettingsMembers = () => {
	const [input, setInput] = useState("")
	const [actionType, setActionType] = useState<ActionType>({
		type: "KICK",
		person: {
			username: "",
			client_id: ""
		}
	})
	const dispatch = useDispatch()
	const darkTheme = useSelector(
		(state: { themeReducer: boolean }) => state.themeReducer
	);
	const roomData = useSelector(
		(state: { roomData: RoomData }) => state.roomData
	);
	const inputedUserList = useMemo(() => {
		const filterMembers = roomData.active_clients.filter(member => member.client_name.includes(input.trim()))

		return filterMembers
	}, [input])

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
			<div className="menu-toggler" onClick={() => dispatch({type: "TOGGLE"}) }>
        <div className={darkTheme ? "stick dark" : "stick"} />
      </div>
				<input type="text" className={darkTheme ? "find-user-input dark" : "find-user-input"} placeholder="Find any member" value={input} onChange={e => setInput(e.target.value)} />
				<div className='members-list-wrapper'>
					{
						!input.trim() ? 
						roomData.active_clients.map(member => {
							return <MemberList {...member} setActionHandler={setActionHandler} />
						}) :
						inputedUserList.map(member => {
							return <MemberList {...member} setActionHandler={setActionHandler} />
						})
					}
				</div>
			</div>
		</>
	)
}

export default SettingsMembers
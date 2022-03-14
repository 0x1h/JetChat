import { useSelector } from 'react-redux'
import MemberList from './MemberList';
import { State as RoomData } from "../../../../Hooks/Chat/RoomData";
import "./style/style.css"

const SettingsMembers = () => {
	const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
	const roomData = useSelector(
    (state: { roomData: RoomData }) => state.roomData
  );

	return (
		<div className='settings__members-list'>
				<input type="text" className={darkTheme ? "find-user-input dark" : "find-user-input"} placeholder="Find any member"/>
				<div className='members-list-wrapper'>
					{
						roomData.active_clients.map(member => {
							return <MemberList {...member}/>
						})
					}
				</div>
		</div>
	)
}

export default SettingsMembers
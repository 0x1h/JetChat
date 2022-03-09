import { FC, useEffect } from 'react'
import { State } from '../../../Hooks/Chat/roomSettings'
import { State as RoomData} from '../../../Hooks/Chat/RoomData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import Overview from './Overview/Overview'
import SettingsMembers from './SettingsMembers'
import BannedMembers from './Banned Members/BannedMembers'

const SpecificBoard: FC<{display: State}> = ({display}) => {
	const section = display.specific
	const roomData = useSelector(
    (state: { roomData: RoomData }) => state.roomData
  );
	const dispatch = useDispatch()

	const escapeClickHandler = (e: KeyboardEvent) => {
		if(e.key === 'Escape') {
			dispatch({type: "CLOSE_SETTINGS"})
			dispatch({type: "CHANGE_SPECIFIC", payload: "OVERVIEW"})
		}
	}

	useEffect(() => {
		window.addEventListener("keyup", escapeClickHandler)
		return () => {
			window.removeEventListener("keyup", escapeClickHandler)
		}
	})

	const client_id = JSON.parse(localStorage.getItem("client_id")!)
	
	return (
		<>
		<div className="settings-exist-btn" onClick={() => {
			dispatch({type: "CLOSE_SETTINGS"})
			dispatch({type: "CHANGE_SPECIFIC", payload: "OVERVIEW"})
		}}>
				<FontAwesomeIcon icon={faXmark} color={ "#FFF"}/>
			</div>
			{section === "OVERVIEW" && <Overview />}
			{client_id === roomData.owner_data.client_id && (section === "MEMBERS" && <SettingsMembers />)}
			{section === "BANS" && <BannedMembers />}
		</>
	)
}

export default SpecificBoard
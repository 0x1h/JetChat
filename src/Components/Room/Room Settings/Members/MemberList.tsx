import { useState, FC } from 'react'
import { useSelector } from 'react-redux';
import MemberOptions from './MemberOptions';

export type ActionType = {
	type: "BAN" | "KICK" | "OWNERSHIP",
	person: {
		username: string,
		client_id: string
	}
}

interface MemberProps {
	client_id: string;
	client_name: string;
	client_profile: string;
	setActionHandler: (type: ActionType) => void
}

const MemberList: FC<MemberProps> = (props) => {
	const darkTheme = useSelector(
		(state: { themeReducer: boolean }) => state.themeReducer
	);
	const [openOptions, setOpenOptions] = useState(false)
	const client_id = JSON.parse(localStorage.getItem("client_id")!)

	return (
		<div className={darkTheme ? 'settings__member-list dark' : 'settings__member-list'}>
			{openOptions && <MemberOptions closeOption={() => setOpenOptions(false)} setActionHandler={props.setActionHandler} client_id={props.client_id} username={props.client_name} />}
			<div className="user-info">
				<div className="pfp-frame">
					<img src={props.client_profile} draggable={false} />
				</div>
				<p className={darkTheme ? 'user-info-nickname dark' : 'user-info-nickname'}>{props.client_name}</p>
			</div>
			{props.client_id !== client_id && (
				<div className="member-list-options-opener" onClick={() => setOpenOptions(true)}>
					<span className="dot" />
				</div>
			)}
		</div>
	)
}

export default MemberList
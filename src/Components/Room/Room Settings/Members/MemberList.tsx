import { useState, FC } from 'react'
import { useSelector } from 'react-redux';
import MemberOptions from './MemberOptions';

interface MemberProps {
	client_id: string;
  client_name: string;
  client_profile: string;
}

const MemberList: FC<MemberProps> = (props) => {
	const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
	const [openOptions, setOpenOptions] = useState(false)
	const client_id = JSON.parse(localStorage.getItem("client_id")!)

	return (
		<div className={darkTheme ? 'settings__member-list dark' : 'settings__member-list'}>
				{openOptions && <MemberOptions closeOption={() => setOpenOptions(false)}/>}
			<div className="user-info">
				<div className="pfp-frame">
					<img src={props.client_profile}/>
				</div>
				<p className={darkTheme ? 'user-info-nickname dark' : 'user-info-nickname'}>{props.client_name}</p>
			</div>
			{props.client_id !== client_id && (
				<div className="member-list-options-opener" onClick={() => setOpenOptions(true)}>
				<span className="dot"></span>
			</div>
			)}
		</div>
	)
}

export default MemberList
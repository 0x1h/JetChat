import {FC} from 'react'
import "./style/style.css"
import { useSelector } from "react-redux";

interface JustMessageProps {
	sentBy: string //client_id
	username: string //client_username,
	sentAt: string //Date format,
	message: string,
	profile_src: string
}

const JustMessage: FC<JustMessageProps> = ({sentAt, sentBy, username, profile_src, message}) => {
	const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );

	return (
		<div className='just-message'>
			<div className="profile-picture">
				<div className="profile-picture__wrapper">
						<img src={profile_src} alt="" />
				</div>
			</div>
			<div className="main-content">
					<div className={darkTheme ? "time_username-wrapper dark" : "time_username-wrapper"}>
						{username}
					</div>
					<div className={darkTheme ? "actual__messsage dark" : "actual__messsage"}>
					{message}
					</div>
			</div>
		</div>
	)
}

export default JustMessage
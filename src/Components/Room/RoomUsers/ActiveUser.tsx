import { FC } from 'react'
import { useSelector } from 'react-redux'

interface ActiveProps {
	username: string,
	profile_src: string,
	client_id: string
}

const ActiveUser: FC<ActiveProps> = ({username,profile_src}) => {
	const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );

	return (
		<div className={darkTheme ? 'online-member dark' : 'online-member'}>
			<div className="pfp__frame">
				<img src={profile_src} alt="" />
			</div>
			<p className={darkTheme ? 'active-users__username dark' : 'active-users__username'}>{username}</p>
		</div>
	)
}

export default ActiveUser
import { useState } from 'react'
import { useSelector } from 'react-redux';
import MemberOptions from './MemberOptions';


const MemberList = () => {
	const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
	const [openOptions, setOpenOptions] = useState(false)

	return (
		<div className={darkTheme ? 'settings__member-list dark' : 'settings__member-list'}>
				{openOptions && <MemberOptions closeOption={() => setOpenOptions(false)}/>}
			<div className="user-info">
				<div className="pfp-frame">
					<img src="https://cdn.discordapp.com/guilds/951208859836485723/users/484717395722895360/avatars/f730f2bfaaeda2e0eff3a4e008a96765.png?size=4096"/>
				</div>
				<p className={darkTheme ? 'user-info-nickname dark' : 'user-info-nickname'}>callmenikk</p>
			</div>
			<div className="member-list-options-opener" onClick={() => setOpenOptions(true)}>
				<span className="dot"></span>
			</div>
		</div>
	)
}

export default MemberList
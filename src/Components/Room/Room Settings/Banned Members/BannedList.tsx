import { useSelector } from 'react-redux';


const MemberList = () => {
	const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );

	return (
		<div className={darkTheme ? 'settings__member-list dark' : 'settings__member-list'}>
			<div className="user-info">
				<div className="pfp-frame">
					<img src="https://cdn.discordapp.com/guilds/951208859836485723/users/484717395722895360/avatars/f730f2bfaaeda2e0eff3a4e008a96765.png?size=4096"/>
				</div>
				<p className={darkTheme ? 'user-info-nickname dark' : 'user-info-nickname'}>callmenikk</p>
			</div>
			<p className='settings__unban-text'>Unban</p>
		</div>
	)
}

export default MemberList
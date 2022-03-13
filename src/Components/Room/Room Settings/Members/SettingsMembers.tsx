import { useSelector } from 'react-redux'
import MemberList from './MemberList';
import "./style/style.css"

const SettingsMembers = () => {
	const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );

	return (
		<div className='settings__members-list'>
				<input type="text" className={darkTheme ? "find-user-input dark" : "find-user-input"} placeholder="Find any member"/>
				<div className='members-list-wrapper'>
					<MemberList />
				</div>
		</div>
	)
}

export default SettingsMembers
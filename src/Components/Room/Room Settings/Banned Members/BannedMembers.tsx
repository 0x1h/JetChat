import { useSelector } from 'react-redux'
import BannedList from './BannedList';
import "../Members/style/style.css"

const BannedMembers = () => {
	const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );

	return (
		<div className='settings__members-list'>
				<input type="text" className={darkTheme ? "find-user-input dark" : "find-user-input"} placeholder="Find any member"/>
				<div className='members-list-wrapper'>
					<BannedList />
					<BannedList />
					<BannedList />
					<BannedList />
					<BannedList />
					<BannedList />
					<BannedList />
					<BannedList />
					<BannedList />
					<BannedList />
					<BannedList />
					<BannedList />
					<BannedList />
					<BannedList />
					<BannedList />
					<BannedList />
					<BannedList />
					<BannedList />
					<BannedList />
					<BannedList />

				</div>
		</div>
	)
}

export default BannedMembers
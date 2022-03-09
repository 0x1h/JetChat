import { useSelector } from 'react-redux'

const DeleteRoom = () => {
	const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );

	return (
		<div className='delete-wrapper'>
			<p className={darkTheme ? 'delete-alert-text dark' : 'delete-alert-text'}>
				If you want to delete that room you must click that red button 👀 
			</p>
			<button>Delete</button>
		</div>
	)
}

export default DeleteRoom
import {FC} from 'react'
import { useSelector } from 'react-redux'

const DeleteRoom: FC<{openModal: () => void}> = ({openModal}) => {
	const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );

	return (
		<div className='delete-wrapper'>
			<p className={darkTheme ? 'delete-alert-text dark' : 'delete-alert-text'}>
				If you want to delete that room you must click that red button 👀 
			</p>
			<button onClick={openModal}>Delete</button>
		</div>
	)
}

export default DeleteRoom
import {useRef, useEffect, FC} from 'react'
import { useSelector } from 'react-redux';
import {ActionType} from "./MemberList"

interface MemberOptionsProps {
	closeOption: () => void,
	setActionHandler: (type: ActionType) => void
	username: string,
	client_id: string
}

const MemberOptions: FC<MemberOptionsProps> = ({closeOption, setActionHandler, client_id, username}) => {
	const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
	const optionRef = useRef<HTMLDivElement>(null)

	const handleClickOutside = (event: any) => {
		if (optionRef.current && !optionRef.current.contains(event.target)) {
				closeOption()
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
				document.removeEventListener('click', handleClickOutside, true);
		};
	});

	return (
		<div className={darkTheme ? 'settings__member-options dark' : 'settings__member-options'} ref={optionRef}>
			<button className='high-order-permission__btn' onClick={() => setActionHandler({
				type: "KICK",
				person: { username, client_id }
			})}>Kick</button>
			<button className='high-order-permission__btn' onClick={() => setActionHandler({
				type: "BAN",
				person: { username, client_id }
			})}>Ban</button>
			<button className='high-order-permission__btn' onClick={() => setActionHandler({
				type: "OWNERSHIP",
				person: { username, client_id }
			})}>Transfer ownership</button>
		</div>
	)
}

export default MemberOptions
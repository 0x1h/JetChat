import {useRef, useEffect, FC} from 'react'
import { useSelector } from 'react-redux';

const MemberOptions: FC<{closeOption: () => void}> = ({closeOption}) => {
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
			<button className='high-order-permission__btn'>Kick</button>
			<button className='high-order-permission__btn'>Ban</button>
		</div>
	)
}

export default MemberOptions
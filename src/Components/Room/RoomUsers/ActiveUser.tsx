import { FC, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

interface ActiveProps {
	username: string,
	profile_src: string,
	client_id: string
}

const ActiveUser: FC<ActiveProps> = ({username,profile_src}) => {
	const memberList = useRef<HTMLDivElement>(null)
	const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );


	const handleContextMenu = (e: MouseEvent) => {
		e.preventDefault()
	}


	useEffect(() => {
    memberList.current?.addEventListener("contextmenu", handleContextMenu);

    return () => {
      memberList.current?.removeEventListener("contextmenu", handleContextMenu);
    };
  });

	return (
		<div className={darkTheme ? 'online-member dark' : 'online-member'} ref={memberList}>
			<div className="pfp__frame">
				<img src={profile_src} alt="" draggable={false}/>
			</div>
			<p className={darkTheme ? 'active-users__username dark' : 'active-users__username'}>{username}</p>
		</div>
	)
}

export default ActiveUser
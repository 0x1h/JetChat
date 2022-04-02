import {FC, useRef, useEffect} from "react"
import { useSelector } from 'react-redux';

export interface MemberProps {
	username: string,
	profile_src: string,	
	client_id: string,
}

interface BannedMemberProps extends MemberProps {
	modalCloseOpen: () => void,
	setUnbanUser: (user: MemberProps) => void
}

const MemberList: FC<BannedMemberProps> = ({username, profile_src, client_id, modalCloseOpen, setUnbanUser}) => {
	const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
	const imageRef = useRef<HTMLDivElement>(null)

	const imageContext = (e: MouseEvent) => e.preventDefault()
	
	useEffect(() => {
		imageRef.current?.addEventListener("contextmenu", imageContext)

		return () => imageRef.current?.removeEventListener("contextmenu", imageContext)
	})

	return (
		<div className={darkTheme ? 'settings__member-list dark' : 'settings__member-list'}>
			<div className="user-info">
				<div className="pfp-frame" ref={imageRef}>
					<img src={profile_src} draggable={false}/>
				</div>
				<p className={darkTheme ? 'user-info-nickname dark' : 'user-info-nickname'}>{username}</p>
			</div>
			<p className='settings__unban-text' onClick={() => {
				modalCloseOpen()
				setUnbanUser({ username, profile_src, client_id })
			}}>Unban</p>
		</div>
	)
}

export default MemberList
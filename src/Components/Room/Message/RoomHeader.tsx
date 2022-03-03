import {FC} from 'react'
import "./style/messages.css"

const RoomHeader:FC<{darkTheme: boolean}> = ({darkTheme}) => {
	return (
		<header className={darkTheme ? 'room-header dark' : 'room-header'}>
			<div className="room__info">
				<div className="img-frame">
					<img src="https://cdn.discordapp.com/attachments/916412212594225242/948581891446013992/FMzOBb-X0AEPdf4.png" alt="" />
				</div>
				<p className={darkTheme ? 'room-name dark' : 'room-name'}>callmenikk's talk</p>
			</div>
			<div className="active__users-side"></div>
		</header>
	)
}

export default RoomHeader
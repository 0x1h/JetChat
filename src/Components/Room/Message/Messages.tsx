import {FC} from 'react'
import "./style/messages.css"
import Client from './Client'
import SentMessages from './SentMessages'

const Messages: FC<{socket: any}> = ({socket}) => {
	return (
		<div className='messages_container'>
			<SentMessages />
			<Client socket={socket}/>
		</div>
	)
}

export default Messages
import {FC} from 'react'
import "./style/messages.css"
import Client from './Client'
import SentMessages from './SentMessages'

const Messages= () => {
	return (
		<div className='messages_container'>
			<SentMessages />
			<Client/>
		</div>
	)
}

export default Messages
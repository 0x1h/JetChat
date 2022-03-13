import Client from './Client'
import SentMessages from './SentMessages'
import "./style/messages.css"


const Messages= () => {
	return (
		<div className='messages_container'>
			<SentMessages />
			<Client/>
		</div>
	)
}

export default Messages
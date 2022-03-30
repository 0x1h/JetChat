import Client from './Client'
import SentMessages from './SentMessages'
import { useSelector } from 'react-redux'

import "./style/messages.css"


const Messages= () => {
	const loadErrHandler = useSelector(
		(state: {loadErrHandler: {
			status: "isLoading" | "isError" | "default"
		msg: string
		}}) => state.loadErrHandler
	)
  

	return (
		<div className='messages_container'>
			<SentMessages />
			{
				loadErrHandler.msg === "You have been kicked out from room" || loadErrHandler.msg === "You are banned from this room" ? null : <Client/> 
			}
		</div>
	)
}

export default Messages
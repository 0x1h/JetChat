import React from 'react'
import ActiveUser from './ActiveUser'
import "./style/dashboard.css"

const UsersDashboard = () => {
	return (
		<div className='current_online_users'>
			<ActiveUser username='' profile_src='' client_id=''/>
		</div>
	)
}

export default UsersDashboard
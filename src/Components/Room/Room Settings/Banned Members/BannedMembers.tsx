import { useState, useEffect, useMemo } from "react"
import { useSelector } from 'react-redux'
import BannedList, { MemberProps } from './BannedList';
import NoOneBanned from "./NoOneBanned";
import hostConfig from "../../../../utils/hostconfig.json"
import UnbanConfirm from "./UnbanConfirm";
import "../Members/style/style.css"
import axios from "axios";
import { useParams } from "react-router-dom";

const BannedMembers = () => {
	const darkTheme = useSelector(
		(state: { themeReducer: boolean }) => state.themeReducer
	);
	const { roomId } = useParams()
	const [input, setInput] = useState("")
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [bannedList, setBannedList] = useState<MemberProps[]>([])
	const [openModal, setOpenModal] = useState(false)
	const [unBanningUser, setUnBanningUser] = useState({
		username: "",
		profile_src: "",
		client_id: "",
	})
	const filterBanned = useMemo(() => {
		const filterMembers = bannedList.filter(member => member.username.includes(input.trim()))

		return filterMembers
	}, [input])

	const fetchBannedUsers = async () => {
		const client_id = JSON.parse(localStorage.getItem("client_id")!)
		const authToken = JSON.parse(sessionStorage.getItem("s_t")!)

		let fetchIds: string[] = await axios.post(`${hostConfig.host}/room/join/${roomId}`, {
			authToken, requestor: client_id
		})
			.then(resp => {
				return resp.data.banned_users
			})
			.catch(() => {
				return []
			})


		await axios.all(fetchIds.map(id => axios.post(`${hostConfig.host}/user/${id}`, {
			requestor: client_id,
			authToken
		})))
			.then(resp => {
				setBannedList(resp.map(data => {
					return {
						client_id: data.data.client_id,
						profile_src: data.data.profile_src,
						username: data.data.username
					}
				}))
				setIsLoading(false)
			})
			.catch(err => {
				setIsLoading(false)
				console.log(err.response.data.err)
			})
	}

	const removeUserFromList = (client_id: string) => {
		setBannedList(prev => {
			return prev.filter(member => member.client_id !== client_id)
		})
	}

	useEffect(() => {
		fetchBannedUsers()
	}, [])

	return (
		<>
			{openModal && <UnbanConfirm {...unBanningUser} modalCloseOpen={() => setOpenModal(prev => !prev)} removeBannedFromList={removeUserFromList} />}
			<div className='settings__members-list'>
				<input type="text" className={darkTheme ? "find-user-input dark" : "find-user-input"} placeholder="Find banned member" value={input} onChange={e => setInput(e.target.value)}/>
				{
					isLoading
						? <span className="loaderr" style={{
							position: "absolute",
							top: "50%",
							right: "50%"
						}} />
						: (bannedList.length > 0 && !input.trim()) ?
						<div className='members-list-wrapper'>
							{
								bannedList.map(member => {
									return <BannedList
										{...member}
										modalCloseOpen={() => setOpenModal(prev => !prev)}
										setUnbanUser={(user) => setUnBanningUser({ ...user })}
									/>
								})
							}
						</div> :
						(input.trim().length > 0) ?
							<div className="members-list-wrapper">
								{
									filterBanned.map(member => {
										return <BannedList
											{...member}
											modalCloseOpen={() => setOpenModal(prev => !prev)}
											setUnbanUser={(user) => setUnBanningUser({ ...user })}
										/>
									}
									)
								}
							</div>	
						 :
						<NoOneBanned />
				}
			</div>
		</>
	)
}

export default BannedMembers
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import ProfileChange from './ProfileChange';
import UsernameChange from './UsernameChange';
import ChangePassword from './ChangePassword';


const Settings = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  
  return (
    <>
    <header className='catalog_select'>
      <div className={darkTheme ? "catalog dark" : "catalog"} onClick={() => navigate("/profile")}>Profile</div>
      <div className={darkTheme ? "catalog dark selected" : "catalog selected"}>Settings</div>
    </header>
    <ProfileChange isLoading={isLoading} loadHandler={(bool) => setIsLoading(bool)}/>
      <hr style={{marginBottom: "50px"}}/>
    <UsernameChange  isLoading={isLoading}/>
      <hr style={{marginBottom: "40px"}}/>
    <ChangePassword  isLoading={isLoading}/>
    </>
  )
}

export default Settings
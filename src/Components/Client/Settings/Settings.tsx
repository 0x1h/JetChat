import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 


const Settings = () => {
  const navigate = useNavigate()
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  
  return (
    <header className='catalog_select'>
      <div className={darkTheme ? "catalog dark" : "catalog"} onClick={() => navigate("/profile")}>Profile</div>
      <div className={darkTheme ? "catalog dark selected" : "catalog selected"}>Settings</div>
    </header>
  )
}

export default Settings
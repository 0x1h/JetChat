import ChangePicture from './ChangePicture';
import { useSelector } from 'react-redux';
import "./style/style.css"

const ProfileChange = () => {
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );

  return (
    <div className={darkTheme ? 'profile-change-container dark' : 'profile-change-container'}>
      <h3>Your Picture</h3>
      <div className="main-container">
        <div className="picture-remover-wrapper">
          <div className="change-profile-preview">
            <img src="https://cdn.discordapp.com/avatars/484717395722895360/5bb6147951402f72fa233c7b8ba1da0c.png?size=4096" alt="" draggable={false}/>
          </div>
          <button value="delete avatar" name="remove avatar" className='remove-avatar'>Random Avatar</button>
        </div>
        <ChangePicture />
      </div>
    </div>
  )
}

export default ProfileChange
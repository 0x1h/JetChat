import { FC, useRef, useEffect } from 'react';
import ChangePicture from './ChangePicture';
import { State } from '../../../Hooks/Settings/Photohandler';
import { useDispatch, useSelector } from 'react-redux';
import "./style/style.css"

const ProfileChange: FC<{loadHandler: (bool: boolean) => void, isLoading: boolean}> = ({loadHandler, isLoading}) => {
  const dispatch = useDispatch()
  const imageRef = useRef<HTMLDivElement>(null)
  const darkTheme = useSelector(
    (state: { themeReducer: boolean }) => state.themeReducer
  );
  const photoHandle = useSelector(
    (state: { PhotoHandler: State }) => state.PhotoHandler
  );

  const imageContext = (e: MouseEvent) => e.preventDefault()

  useEffect(() => {
    imageRef.current?.addEventListener("contextmenu", imageContext)

    return () => imageRef.current?.removeEventListener("contextmenu", imageContext)
  })

  return (
    <div className={darkTheme ? 'profile-change-container dark' : 'profile-change-container'}>
      {
        isLoading
          ? <span className={!darkTheme ? 'loaderr dark' : 'loaderr'} style={{top: "50%", left: "50%", position: "absolute", transform: "translate(-50%, -100%)"}}/>
          : <>
            <h3>Your Picture</h3>
            <div className="main-container">
              <div className="picture-remover-wrapper">
                <div className="change-profile-preview" ref={imageRef}>
                  <img src={photoHandle.new_profile_src} alt="" draggable={false} />
                </div>
                <button type='button' value="delete avatar" name="remove avatar" className='remove-avatar' onClick={() => {
                  dispatch({
                    type: "FILL_SETTINGS_DATA", payload: {
                      key: "new_profile_src",
                      value: ""
                    }
                  })
                }}>Random Avatar</button>
              </div>
              <ChangePicture isLoading={isLoading} loaderHandle={bool => loadHandler(bool)} />
            </div>
          </>
      }

    </div>
  )
}

export default ProfileChange
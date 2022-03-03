import { FC } from "react";
import AcceptImg from "./Home/Asset/accept.png";
import WarnImg from "./style/icons/warn-icon.webp"
import "./style/confirm.css"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Confirm: FC<{ msg: string, img?: boolean }> = ({ msg, img }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  return (
    <div className="accept-wrapper">
      <img src={img ? WarnImg : AcceptImg} alt="accpet-img" />
      <p>{msg}</p>
      {
        img && <button onClick={() => {
          dispatch({ type: "DEFAULT" })
          navigate("/")
      }}>Okay, I got you</button>
      }
    </div>
  );
};

export default Confirm;

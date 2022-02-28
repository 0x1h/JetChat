import { FC } from "react";
import AcceptImg from "./Home/Asset/accept.png";
import "./style/confirm.css"

const Confirm: FC<{ msg: string }> = ({ msg }) => {
  return (
    <div className="accept-wrapper">
      <img src={AcceptImg} alt="accpet-img" />
      <p>{msg}</p>
    </div>
  );
};

export default Confirm;

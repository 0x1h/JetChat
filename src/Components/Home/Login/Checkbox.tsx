import "./style/checkbox.css";
import {FC} from "react"

const Checkbox: FC<{stateChange: () => void}> = ({stateChange}) => {
  return (
      <div className="cbx">
        <input id="cbx" type="checkbox" onClick={stateChange}/>
        <label htmlFor="cbx"></label>
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
          <path d="M2 8.36364L6.23077 12L13 2"></path>
        </svg>
        <p style={{
          transform: "translateX(30px)"
        }}>Show Password</p>
      </div>
  );
};

export default Checkbox;

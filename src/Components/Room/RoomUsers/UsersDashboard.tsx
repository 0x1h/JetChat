import ActiveUser from "./ActiveUser";
import { useSelector } from "react-redux";
import { State as RoomData } from "../../../Hooks/Chat/RoomData";
import "./style/dashboard.css";

const UsersDashboard = () => {
  const roomData = useSelector(
    (state: { roomData: RoomData }) => state.roomData
  );

  return (
    <div className="current_online_users">
      {roomData.active_clients.map((member) => {
        return (
          <ActiveUser
            username={member.client_name}
            profile_src={member.client_profile}
            client_id={member.client_id}
            key={new Date().getTime().toString()}
          />
        );
      })}
    </div>
  );
};

export default UsersDashboard;

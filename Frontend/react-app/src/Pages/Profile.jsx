import { React, useContext } from "react";
import { UserContext } from "../../context/userContext.jsx";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <h1>Profile</h1>
      {!!user && <h2>Hi {user.name}!</h2>}
      <button>LogOut</button>
    </div>
  );
};

export default Profile;

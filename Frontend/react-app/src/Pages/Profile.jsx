import { React, useContext } from "react";
import { UserContext } from "../../context/userContext.jsx";

const Profile = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>Profile</h1>
      {!!user && <h2>Hi {user.name}!</h2>}
    </div>
  );
};

export default Profile;

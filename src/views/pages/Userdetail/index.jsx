import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Userdetail = () => {
    const location = useLocation();

    useEffect(() => {
    }, [location]);

    console.log(location.pathname)
  
    return (
        <div className="user-container">
            <h1>{location.state.displayName}</h1>
            <h2>Email: {location.state.email}</h2>
            <h2>NPM: {location.state.npm}</h2>
        </div>
      );
  };
  
  export default Userdetail;
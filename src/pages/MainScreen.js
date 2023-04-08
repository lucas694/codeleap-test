import "./MainScreen.css";
import CreatePost from "../components/CreatePost";
import PostList from "../components/PostList";
import{FaUserAlt} from "react-icons/fa";
import {AiOutlinePoweroff,AiOutlineArrowLeft} from "react-icons/ai";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearUserState} from "../redux/actions/userSlice";
import {useNavigate} from "react-router-dom";


const MainScreen = () => {
  const [showLogout, setShowLogout] = useState(false);
  const toggleLogout = () => {
    setShowLogout(!showLogout);
  }

  {/*Dispatch Logout*/}
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(clearUserState());
    navigate("/");
  };
  const loggedUser = useSelector(state => {
    return state.user.username
  });
  return(
    <div className={"MainScreenContainer"}>
      <div className={"MainScreenContent"}>
        <div className={"MainScreenWelcome"}>
          <h1 className={"MainScreenTitle"}>CodeLeap Network</h1>
          <div className={"MainScreenLogoutContainer"}>
            <div className={showLogout ? "hidden":"MainScreenLogoutContainer"}>
              <span className={"MainScreenLogoutText"}>{loggedUser}</span>
              <button onClick={toggleLogout}>
                <FaUserAlt className={"UserLogoutIcon"}/>
              </button>
            </div>
            <div className={showLogout ? "MainScreenLogoutContainer":"hidden"}>
              <button onClick={toggleLogout}>
                <AiOutlineArrowLeft className={"ArrowLogoutIcon"}/>
              </button>
              <button onClick={handleLogout}>
                <AiOutlinePoweroff className={"OffLogoutIcon"}/>
              </button>
            </div>
          </div>
        </div>
        <div className={"MainScreenPostsContent"}>
          <CreatePost/>
          <PostList/>
        </div>
      </div>

    </div>
  )
};export default MainScreen;
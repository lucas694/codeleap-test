import "./SignUp.css";
import BtnBase from "../components/Buttons/BtnBase";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {setUsername} from "../redux/actions/userSlice";
import {useDispatch} from "react-redux";


const SignUp = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUsername(userName));  // dispatch para username
    navigate("/MainScreen");
  };
  return(
    <div className={"SignUpContainer"}>
      <div className={"SignUpContent"}>
        <h1 className={"SignUpTitle"}>Welcome to CodeLeap network!</h1>
        <label className={"SignUpLabel"}>
          <span>Please enter your username</span>
          <input type="name"
                 name="name"
                 required
                 placeholder={"John Doe"}
                 value={userName}
                 onChange={(e) => setUserName(e.target.value)}
                 className={"SignUpInput"}
          />
        </label>
        <div className={"SignUpBtnControl"}>
          <BtnBase className={userName ? "BtnBlue uppercase": "BtnDisabled uppercase"}
                   children={"Enter"}
                   onClick={handleSubmit}
          />
        </div>
      </div>

    </div>
  )
};export default SignUp;
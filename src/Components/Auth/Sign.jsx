import "./auth.css";
import icons from "../../icons";
import createNotif from '../Notification/notification';
import  { useNavigate } from 'react-router-dom';

function Sign(props) {

    const fire = props.fire;
    const history = useNavigate();

    async function googleReg() {
        await fire.SignInGoogle();
        history("/");
    }

    async function signIn() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (password){
            const result = await fire.signIn(email, password);
            if (result.state){
                createNotif({text: "Logged in to the account successfully", title: "Logged In", mode:"success"});
                history("/");
            }else{
                createNotif({text: result.user, title: "Error", mode:"error"}, 6000);
            }
        }
    }

    return (
    <div className="loginSection">
        <div className="authContainer">

            <div className="googleContainer" onClick={googleReg}>
                <div className="googleIcon"><img src={icons.icons.google} alt="google icon" /></div>
                <div className="googleText">Login using Google</div>
            </div>

            <div className="loginContainer">
                <div className="loginItem">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="loginItem">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>
                <div className="loginItem">
                    <a href="/forgot">Forgot My Password</a>
                </div>
                <div className="logButtonContainer">
                    <button className="btn btn-primary" onClick={async () => {await signIn()}}>Sign In</button>
                </div>
            </div>
        </div>
    </div>
    );
  }
  
  export default Sign;
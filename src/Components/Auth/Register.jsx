import "./auth.css";
import icons from "../../icons";
import createNotif from '../Notification/notification';
import  { useNavigate } from 'react-router-dom';

function Register(props) {

    const fire = props.fire;
    const history = useNavigate();
    async function googleReg() {
        await fire.SignInGoogle();
        history("/");
    }

    async function register() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const verifyPassword = document.getElementById("passwordConfirm").value;

        if (password === verifyPassword){
            const result = await fire.registerUser(email, password);
            console.log(result);
            if (result.state){
                createNotif({text: "Account successfully created", title: "Account Created", mode:"success"});
                history("/");
            }else if (!result.state){
                createNotif({text: result.user, title: "Error", mode:"error"}, 6000);
            }
        }else{
            createNotif({text: "Passwords does not match", title: "Password Match Error", mode:"error"});
        }
    }

    return (
    <div className="loginSection">
        <div className="authContainer">

            <div className="googleContainer" onClick={googleReg}>
                <div className="googleIcon"><img src={icons.icons.google} alt="google icon" /></div>
                <div className="googleText">Register using Google</div>
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
                <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input type="password" name="passwordConfirm" id="passwordConfirm" />
                </div>
                <div className="logButtonContainer">
                    <button className="btn btn-primary" onClick={async () => {await register()}}>Login</button>
                </div>
            </div>
        </div>
    </div>
    );
  }
  
  export default Register;
import "./auth.css";
import  { useNavigate } from 'react-router-dom';
import createNotif from '../Notification/notification';

function Forgot(props) {
    const fire = props.fire
    const history = useNavigate();
    
    async function reset(){
        const email = document.getElementById("email").value;
        const result = await fire.passwordReset(email);
        if (result.state){
            createNotif({text: result.result, title: "Reset mail sent", mode:"success"});
            history("/");
        }else{
            createNotif({text: result.result, title: "Error", mode:"error"}, 6000);
        }
    }

    return (
    <div className="loginSection">
        <div className="authContainer">
            <div className="loginContainer">
                <b>Please enter your email adress</b>
                <div className="loginItem">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="logButtonContainer">
                    <button className="btn btn-primary" onClick={async () => {await reset()}}>Reset Password</button>
                </div>         
            </div>     
        </div>
    </div>
    );
 }
  
  export default Forgot;
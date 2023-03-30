import './Nav.css';
import {Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from 'react';

function Nav(props) {

    const fire = props.fire;
  	const history = useNavigate();

	var [path, setPath] = useState("");
	useEffect(() => {
		setPath(window.location.pathname);
	}, [window.location.pathname])

    function loggedOptions(){
        return props.user !== null ? (
            <div>
                {/* <div className="listOfNavItems">
                    <Link className='aOfNav' to={"/"}><button className={`item1 btn navBtn ${path === "/" ? "active" : ""}`}>Home</button></Link>
                    <Link className='aOfNav' to={"/Product"}><button className={`item2 btn navBtn ${path === "/sop" ? "active" : ""}`}>Product</button></Link>
                    <Link className='aOfNav' to={"/Contact"}><button className={`item3 btn navBtn ${path === "/files" ? "active" : ""}`}>Contact</button></Link>
                    <Link className='aOfNav' to={"/About"}><button className={`item2 btn navBtn ${path === "/sop" ? "active" : ""}`}>About Us</button></Link>
                </div> */}
			</div>
        ) : <></>
    }

    function authButtons() {
        return props.user === null ? (
            <div className='authButtonsNav'>
                <Link className='loginLink logA' to="/register">Register</Link>
                <Link className='loginLink logA'>/</Link>
                <Link className='loginLink logA' to="/signin">Sign In</Link>
            </div>
        ) : <></>
    }

	return (
		<div className="Nav">
			<Link to="/" className='logA'><div className="logo">Team Help</div></Link>
            {loggedOptions()}
            {authButtons()}
			{props.user === null ? <></> : <Link className='loginLink logA' onClick={fire.SignOut} to="/">Log Out</Link>}
		</div>
	);
}

export default Nav;
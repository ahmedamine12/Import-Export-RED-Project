import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Login.css";
import logo from "../Images/vinci_energies_miniature.jpg";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [showForgotPassword, setShowForgotPassword]= useState("");

async function processForgotPassword(event)
{

    event.preventDefault();
    try {
        const response = await axios.post("http://localhost:8080/forgot_password", {
            email: email,
        });

        if (response.data === "success") {
            setMessage("l'email est envoyé");
        }
        else if(response.data==="NoEmail")
        {
            setMessage("l'email n'estxite pas ")
        }
        else
        {
            setMessage("nooooooooooooo");
        }
} catch (err) {
        alert(err);
    }

}
    async function login(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/login", {
                email: email,
                password: password,
            });
            console.log(response.data);

            if (response.data === "emailF") {
                setMessage("Email not exits");
            } else if (response.data === "passF") {
                setMessage("Password Incorect");
            } else {
                // Set the "isLoggedIn" flag in local storage
                localStorage.setItem("isLoggedIn", true);
                navigate('/home');
            }
        } catch (err) {
            alert(err);
        }
    }

    // Set CSS styles for body element to prevent scrollbars and remove extra white space

    return (
        <div className="container-fluid logincontent ">
            <div className="row">
                <div className="col-md-6 left">
                    <img src={logo} width="100%" height="100%" alt="Company Logo" />
                </div>
                <div className="col-md-6 right">
                    {showForgotPassword ? (
                        <div className="login-form">
                            <h2>Reset Password</h2>
                            <hr/>
                            <form>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter Name"
                                           value={email}
                                           onChange={(event) => {
                                               setEmail(event.target.value);
                                           }}
                                    />
                                </div>
                                <a className="link_resr" onClick={() => setShowForgotPassword(false)}>  Retour vers login
                                </a>
                                <button type="submit" className="btn btn-primary" onClick={processForgotPassword} >envoyer email</button>

                                {message && <div className="alert alert-danger mt-2">{message}</div>}
                            </form>
                        </div>
                    ) : (
                    <div className="login-form" >
                        <h2>Login</h2>
                        <hr/>
                        <form>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter Name"
                                       value={email}
                                       onChange={(event) => {
                                           setEmail(event.target.value);
                                       }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Enter password"
                                       value={password}
                                       onChange={(event) => {
                                           setPassword(event.target.value);
                                       }}
                                />
                            </div>

                            <a className="link_resr" onClick={() => setShowForgotPassword(true)}>  Mot de passe oublié?
                            </a>

                            <button type="submit" className="btn btn-primary" onClick={login} >Login</button>

                            {message && <div className="alert alert-danger mt-2">{message}</div>}
                        </form>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;

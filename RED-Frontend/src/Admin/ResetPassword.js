import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Login.css";
import logo from "../Images/vinci_energies_miniature.jpg";

function ResetPassword() {


    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();


    async function UpdatePassword(event) {
        event.preventDefault();
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
console.log(token);
            if (!token) {
                setMessage('Invalid reset password token');
            }

            if (password !== confirmPassword) {
                setMessage('les mots de passe ne sont pas les meme');
            }

            const response = await axios.post("http://localhost:8080/Reset_Password?token=" + token, { newPassword: password });

            if(response.data==="success") {
                setMessage('Password updated successfully');
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                setMessage("il y a un erreur ");
            }

        } catch (err) {
            alert(err.message);
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
                        <div className="login-form" >
                            <h2>Login</h2>
                            <hr/>
                            <form>

                                <div className="form-group">
                                    <label>Nouveau mot de passe </label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter password"
                                           value={password}
                                           onChange={(event) => {
                                               setPassword(event.target.value);
                                           }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nouveau mot de passe </label>
                                    <input type="password" className="form-control" id="confirmPassword" placeholder="Enter password"
                                           value={confirmPassword}
                                           onChange={(event) => {
                                               setConfirmPassword(event.target.value);
                                           }}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={UpdatePassword} >Login</button>

                                {message && <div className="alert alert-danger mt-2">{message}</div>}
                            </form>
                        </div>

                </div>
            </div>
        </div>
    );
}

export default ResetPassword;

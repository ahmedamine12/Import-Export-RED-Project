
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function AddRespo() {
    let navigate = useNavigate();

    const [respo, setRespo] = useState({

        full_name: "",
        email: "",
    });


    const { full_name, email } = respo;

    const onInputChange = (e) => {
        setRespo({ ...respo, [e.target.name]: e.target.value });
        console.log(respo);
    }

    const onSubmit = async (e) => {

        e.preventDefault();
        await axios.post("http://localhost:8080/respoProject", respo);

        navigate("/homeRespo");
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register User</h2>

                    <form onSubmit={(e) => onSubmit(e)}>


                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">
                                Nom complet
                            </label>
                            <input
                                required
                                type={"text"}
                                className="form-control"
                                placeholder="Entrer le nom de pruduit"
                                name="full_name"
                                value={full_name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Email
                            </label>
                            <input
                                required
                                type={"Text"}
                                className="form-control"
                                placeholder="Entrer le nom du projet"
                                name="email"
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>


                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/HomeRespo">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

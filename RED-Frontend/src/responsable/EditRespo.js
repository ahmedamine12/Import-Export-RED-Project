
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
export default function EditRespo() {
    let navigate = useNavigate();



    const { id } = useParams()
    const [respo, setRespo] = useState({

        full_name: "",
        email: "",
    });
    const { full_name, email } = respo;
    const loadRespos = async () => {
        const result = await axios.get(`http://localhost:8080/getRespoById/${id}`)
        setRespo(result.data);
    }
    useEffect(() => {

        loadRespos();


    }, []);






    // pour les products






    const onInputChange = (e) => {
        setRespo({ ...respo, [e.target.name]: e.target.value });
        console.log(respo);
    }





    const onSubmit = async (e) => {

        e.preventDefault();
        await axios.put(`http://localhost:8080/UpdateRespo/${id}`, respo);

        navigate("/homeRespo");
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Modifier Responsabe</h2>

                    <form onSubmit={(e) => onSubmit(e)}>


                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">
                                Nom complet
                            </label>
                            <input
                                required
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your e-mail address"
                                name="full_name"
                                value={full_name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">
                                Nom du projet
                            </label>
                            <input
                                required
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your e-mail address"
                                name="email"
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />


                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

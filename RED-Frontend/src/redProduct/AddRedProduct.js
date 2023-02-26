
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function AddRedProduct() {
    let navigate = useNavigate();
    let selectrespo = "";
    const [respos, setrespo] = useState([]);


    useEffect(() => {

        loadRespos();


    }, []);






    const loadRespos = async () => {
        const result = await axios.get("http://localhost:8080/resposProjects")
        setrespo(result.data);
    }


    // pour les products
    const [redProduct, setRedproduct] = useState({
        num_Douan: "",
        red: "",
        date_lancement: "",
        designation: "",
        nameProject: "",
    });



    const { num_Douan, red, date_lancement, designation, nameProject } = redProduct;

    const onInputChange = (e) => {
        setRedproduct({ ...redProduct, [e.target.name]: e.target.value });
        console.log(redProduct);
    }


    const onInputChange2 = (e) => {
        selectrespo = e.target.value;


    }
    const onInputChange3 = (e) => {

        redProduct.red = e.target.value;
        console.log(redProduct);

    }

    const [message, setMessage] = useState("");

    let onSubmit = async (e) => {
        console.log(redProduct);
        e.preventDefault();
        const result = await axios.post("http://localhost:8080/redProduct/" + selectrespo, redProduct);
        setMessage(result.data);
        if (result.data === "Email Scheduled Successfully!") {
            navigate("/");
        } else {
            // Save some information before reloading the page
            const savedInfo = {
                num_Douan: redProduct.num_Douan,
                red: redProduct.red,
                designation: redProduct.designation,
                nameProject: redProduct.nameProject
            };
            localStorage.setItem("savedInfo", JSON.stringify(savedInfo));

            // Reload the page after 1 second
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };

    // After the component mounts, check if there is any saved information in localStorage
    useEffect(() => {
        const savedInfo = JSON.parse(localStorage.getItem("savedInfo"));
        if (savedInfo) {
            // If there is saved information, update the state with the saved values
            setRedproduct(prevState => ({
                ...prevState,
                num_Douan: savedInfo.num_Douan,
                red: savedInfo.red,
                designation: savedInfo.designation,
                nameProject: savedInfo.nameProject
            }));

            // Clear the saved information from localStorage
            localStorage.removeItem("savedInfo");
        }
    }, []);



    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register User</h2>
                    {message && <p className='text-center text-danger'>{message}</p>}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Numero Douane
                            </label>
                            <input
                                required
                                type={"text"}
                                className="form-control"
                                placeholder="Entrer le numéro de douan"
                                name="num_Douan"
                                value={num_Douan}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Username" className="form-label">
                                RED
                            </label>
                            <select class="form-select"
                                onChange={(e) => onInputChange3(e)}>
                                <option disabled selected value> -- Choisir une action -- </option>
                                <option
                                    value="AC"> AC
                                </option>
                                <option name="AC"
                                    value="TA"> TA</option>
                                <option name="red"
                                    value="AB">AB</option>
                                <option name="red"
                                    value="AZ">AZ</option>
                            </select>

                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Date de lancement
                            </label>
                            <input
                                required
                                type={"Date"}
                                className="form-control"
                                placeholder=""
                                name="date_lancement"
                                value={date_lancement}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">
                                Designation du produit
                            </label>
                            <input
                                required
                                type={"text"}
                                className="form-control"
                                placeholder="Entrer le nom de pruduit"
                                name="designation"
                                value={designation}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Nom du projet
                            </label>
                            <input
                                required
                                type={"text"}
                                className="form-control"
                                placeholder="Entrer le nom du projet"
                                name="nameProject"
                                value={nameProject}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Responsable
                            </label>
                            <div >
                                <select class="form-select"



                                    onChange={(e) => onInputChange2(e)}>
                                    <option disabled selected value> -- Choisir un responsable -- </option>
                                    {


                                        respos.map((respo, index) => (
                                            <option name={respo.full_name}
                                                value={respo.id}>
                                                {respo.full_name}</option>


                                        ))
                                    }
                                </select>


                            </div>
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

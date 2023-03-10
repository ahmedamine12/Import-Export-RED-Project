
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
export default function EditRedProduct() {
    let navigate = useNavigate();
    let selectrespo = "";


    const { id } = useParams()

    const [respos, setrespo] = useState([]);

    useEffect(() => {

        loadRespos();
        loadRedProduct();

    }, []);


    const loadRedProduct = async () => {
        const result = await axios.get(`http://localhost:8080/getredProduct/${id}`);
        setRedproduct(result.data);

    }
    const loadRespos = async () => {
        const result = await axios.get("http://localhost:8080/resposProjects")
        setrespo(result.data);
    }


    // pour les products
    const [redProduct, setRedproduct] = useState({
        num_Douan: "",
        red: "",
        date_lancement: "",
        date_echeance:"",
        designation: "",
        nameProject: "",
        pays:"",
        facture_export:"",
        valeur_declarer:"",
        valeur_non_decharger:"",
    });



    const { num_Douan, red, date_lancement, date_echeance, 
        designation, nameProject,pays,facture_export,
        valeur_declarer,valeur_non_decharger } = redProduct;

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


    const onSubmit = async (e) => {

        e.preventDefault();
        await axios.put(`http://localhost:8080/UpdateRedProduct/${id}/` + selectrespo, redProduct);

        navigate("/homeRedproduct");
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Modifier action</h2>

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
                            <label htmlFor="Email" className="form-label">
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
                            <label className="form-label">
                                Date d'echeance
                            </label>
                            <input
                                
                                type={"Date"}
                                className="form-control"
                                placeholder=""
                                name="date_echeance"
                                value={date_echeance}
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
                                placeholder="Enter your e-mail address"
                                name="designation"
                                value={designation}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                            Libelle projet
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
                            <label htmlFor="Username" className="form-label">
                                RED
                            </label>
                            <select className="form-select"
                                    onChange={(e) => onInputChange3(e)}>
                                <option disabled selected value> -- Choisir une action --</option>
                                <option
                                    value="ATPA"> ATPA (Admission temporaire pour perfectionnement actif)
                                </option>
                                <option
                                    value="ETPP"> ETPP (Exportation temporaire pour perfectionnement passif)
                                </option>
                                <option
                                    value="ET"> ET (Exportation temporaire)
                                </option>
                                <option
                                    value="ET-2F">ET-2F (Exportation temporaire vers Zone franche)
                                </option>
                                <option
                                    value="AT">AT (Admission temporaire)
                                </option>
                            </select>

                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                            facture_export
                            </label>
                            <input
                                required
                                type={"text"}
                                className="form-control"
                                placeholder="Entrer le nom du projet"
                                name="facture_export"
                                value={facture_export}
                                onChange={(e) => onInputChange(e)}
                            />
                            
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                            valeur_declarer
                            </label>
                            <input
                                required
                                type={"text"}
                                className="form-control"
                                placeholder="Entrer le nom du projet"
                                name="valeur_declarer"
                                value={valeur_declarer}
                                onChange={(e) => onInputChange(e)}
                            />
                            
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                            valeur_non_decharger
                            </label>
                            <input
                                required
                                type={"text"}
                                className="form-control"
                                placeholder="Entrer le nom du projet"
                                name="valeur_non_decharger"
                                value={valeur_non_decharger}
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

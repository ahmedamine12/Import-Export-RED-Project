
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function AddRespo() {
    let navigate = useNavigate();

    const [Lc, setLc] = useState({
        banque: "",
        conditions: "",
        date_fact: "",
        date_lc: "",
        date_limit: "",
        devise: "",
        fournisseur: "",
        montant_fact: "",
        montant_lc: "",
        num_facture: "",
        ref_lc: "",
    });


    const {
        banque,
        conditions,
        date_fact,
        date_lc,
        date_limit,
        devise,
        fournisseur,
        montant_fact,
        montant_lc,
        num_facture,
        ref_lc,
    } = Lc;

    const onInputChange = (e) => {
        setLc({ ...Lc, [e.target.name]: e.target.value });
        console.log(Lc);
    }

    const onSubmit = async (e) => {

        e.preventDefault();
        await axios.post("http://localhost:8080/addLc", Lc);

        navigate("/homeLc");
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Ajouter LC</h2>

                    <form onSubmit={(e) => onSubmit(e)}>


                        <div className="mb-3">
                            <label htmlFor="form-label" className="form-label">
                                Numero facture
                            </label>
                            <input
                                required
                                type={"text"}
                                className="form-control"
                                placeholder="Entrer le numero facture"
                                name="num_facture"
                                value={num_facture}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="form-label" className="form-label">
                                Date facture
                            </label>
                            <input
                                required
                                type={"Date"}
                                className="form-control"
                                placeholder="Entrer le nom de pruduit"
                                name="date_fact"
                                value={date_fact}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="form-label" className="form-label">
                                Fournisseur
                            </label>
                            <input
                                required
                                type={"text"}
                                className="form-control"
                                placeholder="Entrer le nom de Fournisseur"
                                name="fournisseur"
                                value={fournisseur}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="form-label" className="form-label">
                                Référence LC
                            </label>
                            <input
                                required
                                type={"text"}
                                className="form-control"
                                placeholder="Entrer la reference de la facture"
                                name="ref_lc"
                                value={ref_lc}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="form-label" className="form-label">
                                Date LC
                            </label>
                            <input
                                required
                                type={"date"}
                                className="form-control"

                                name="date_lc"
                                value={date_lc}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="form-label" className="form-label">
                                Banque
                            </label>
                            <input
                                required
                                type={"text"}
                                className="form-control"
                                placeholder="Entrer le nom de la banque"
                                name="banque"
                                value={banque}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="form-label" className="form-label">
                                Montant de la LC
                            </label>
                            <input
                                required
                                type={"text"}
                                className="form-control"
                                placeholder="Entrer le Montant de la LC"
                                name="montant_lc"
                                value={montant_lc}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="form-label" className="form-label">
                                Condition de paiement
                            </label>
                            <input
                                required
                                type={"text"}
                                className="form-control"
                                placeholder="Entrer la Condition de paiement"
                                name="conditions"
                                value={conditions}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="form-label" className="form-label">
                                Devise
                            </label>
                            <input
                                required
                                type={"text"}
                                className="form-control"
                                placeholder="Entrer le Devise"
                                name="devise"
                                value={devise}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="form-label" className="form-label">
                                Date Limite
                            </label>
                            <input
                                required
                                type={"date"}
                                className="form-control"

                                name="date_limit"
                                value={date_limit}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Montant de l'expédition
                            </label>
                            <input
                                required
                                type={"Text"}
                                className="form-control"
                                placeholder="Entrer le Montant de l'expédition"
                                name="montant_fact"
                                value={montant_fact}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>


                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/HomeLc">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

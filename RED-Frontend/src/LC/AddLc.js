import axios from "axios";
import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";

export default function AddLc() {
    let navigate = useNavigate();


    // pour les products
    const [Lc, setRedproduct] = useState({
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

    return (
        <form>
            <div>
                <label htmlFor="banque">Banque:</label>
                <input
                    type="text"
                    id="banque"
                    name="banque"
                    value={banque}

                />
            </div>

            <div>
                <label htmlFor="conditions">Conditions:</label>
                <input
                    type="text"
                    id="conditions"
                    name="conditions"
                    value={conditions}

                />
            </div>

            <div>
                <label htmlFor="date_fact">Date Fact:</label>
                <input
                    type="text"
                    id="date_fact"
                    name="date_fact"
                    value={date_fact}

                />
            </div>

            <div>
                <label htmlFor="date_lc">Date LC:</label>
                <input
                    type="text"
                    id="date_lc"
                    name="date_lc"
                    value={date_lc}

                />
            </div>

            <div>
                <label htmlFor="date_limit">Date Limit:</label>
                <input
                    type="text"
                    id="date_limit"
                    name="date_limit"
                    value={date_limit}

                />
            </div>

            <div>
                <label htmlFor="devise">Devise:</label>
                <input
                    type="text"
                    id="devise"
                    name="devise"
                    value={devise}

                />
            </div>

            <div>
                <label htmlFor="fournisseur">Fournisseur:</label>
                <input
                    type="text"
                    id="fournisseur"
                    name="fournisseur"
                    value={fournisseur}

                />
            </div>

            <div>
                <label htmlFor="montant_fact">Montant Fact:</label>
                <input
                    type="text"
                    id="montant_fact"
                    name="montant_fact"
                    value={montant_fact}

                />
            </div>

            <div>
                <label htmlFor="montant_lc">Montant LC:</label>
                <input
                    type="text"
                    id="montant_lc"
                    name="montant_lc"
                    value={montant_lc}

                />
            </div>
</form>
            );
}

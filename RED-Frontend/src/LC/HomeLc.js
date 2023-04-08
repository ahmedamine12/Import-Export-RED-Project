import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
export default function HomeLc() {

    const [message, setMessage] = useState();
    const [Lcs, setLcs] = useState([]);
    const { id } = useParams();
    useEffect(() => {

        loadRespo();

    }, []);
    const loadRespo = async () => {
        const result = await axios.get("http://localhost:8080/Lcs")
        setLcs(result.data);
        console.log(result.data);
    };


    const deleteLC = async (id) => {
        const result = await axios.delete(`http://localhost:8080/deletLC/${id}`)
        console.log(result)
        setMessage(result.data);
        setTimeout(() => {
            setMessage("");
        }, 4000)
        console.log(message)
        loadRespo();
    }
    return (

        <div className='container-fluid'>
            <br></br>
            <h2> Gestion du Responsable </h2>
            <div className="d-flex">
                <Link type="button" className='btn btn-primary' to="/AddLc"> Ajouter Responsable</Link>
            </div>
            {message && <p className='text-center text-danger'>{message}</p>}
            <div className='table-responsive py-4'>
                <table className="table border shadow col-12">
                    <thead className="text-center">
                    <tr>
                        <th hidden scope="col">id</th>
                        <th scope="col">Numéro de facture </th>
                        <th scope="col">Date facture</th>
                        <th scope="col">Fournisseur</th>
                        <th scope="col">Référence LC</th>
                        <th scope="col">Date LC</th>
                        <th scope="col">Banque </th>
                        <th scope="col">Montant de la LC</th>
                        <th scope="col">Condition de paiement</th>
                        <th scope="col">Devise</th>
                        <th scope="col">Date Limite</th>
                        <th scope="col">Montant de l'expédition</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    {Lcs.map((Lc, index) => (
                        <tr style={{ whiteSpace: 'nowrap' }}>

                            <td hidden>{Lc.id}</td>
                            <td>{Lc.num_facture }</td>
                            <td>{Lc.date_fact }</td>
                            <td>{Lc.fournisseur }</td>
                            <td>{Lc.ref_lc }</td>
                            <td>{Lc.date_lc }</td>
                            <td>{Lc.banque }</td>
                            <td>{Lc.montant_lc }</td>
                            <td>{Lc.conditions }</td>
                            <td>{Lc.devise }</td>
                            <td>{Lc.date_limit }</td>
                            <td>{Lc.montant_fact }</td>
                            <td>

                                <Link className='btn btn-primary mx-2'

                                      to={`/editLc/${Lc.id}`}

                                >Edit</Link>

                                <button className='btn btn-danger mw-2'

                                        onClick={() => {
                                            if (window.confirm('Confirmer votre'))

                                                deleteLC(Lc.id)

                                        }}

                                >Delete</button>

                            </td>

                        </tr>
                    ))
                    }


                    </tbody>
                </table>
            </div>
        </div>






    )
}



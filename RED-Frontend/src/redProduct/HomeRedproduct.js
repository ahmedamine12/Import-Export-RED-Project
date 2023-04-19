import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Link, useParams,useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [navigate]);
    const [message, setMessage] = useState();
    const [redProducts, setredProduct] = useState([]);
    const { id } = useParams();
    useEffect(() => {

        loadRedProduct();

    }, []);
    const loadRedProduct = async () => {
        const result = await axios.get("http://localhost:8080/redProducts")
        setredProduct(result.data);
        console.log(result.data);
    };


    const deleteRedProduct = async (id) => {
        const result = await axios.delete(`http://localhost:8080/deleteRedProduct/${id}`)
        loadRedProduct();
    }
    const handleDownload = async () => {

        const response = await fetch('http://localhost:8080/pass_Data_to_excel');
        const data = await response.arrayBuffer();
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'REDProductDATA.xlsx');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    };
    return (

        <div className='container-fluid'>
            <br />
            <h2> Gestion du RED </h2>
            <div className="d-flex">
                <Link className='btn btn-primary me-3' to="/addredproduct"> Ajouter RED </Link>
                <button className='btn btn-primary' onClick={handleDownload}> Import Excel data </button>
            </div>
            {message && <p className='text-center text-success'>{message}</p>}
            <div className='table-responsive py-4'>
                <table className="table border shadow col-12">
                    <thead className="text-center">
                    <tr>
                        <th hidden scope="col">id</th>
                        <th scope="col">Numéro Douan</th>
                        <th scope="col">RED</th>
                        <th scope="col">Date ouverture</th>
                        <th scope="col">Date echeance</th>
                        <th scope="col">Designation marchandise</th>
                        <th scope="col">Libelle projet</th>
                        <th scope="col">pays</th>
                        <th scope="col">facture_export</th>
                        <th scope="col">valeur_declarer</th>
                        <th scope="col">valeur_non_decharger</th>
                        <th scope="col">Responsable</th>
                        <th hidden scope="col">respo_id</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {redProducts.map((redProduct, index) => (
                        <tr key={index}>
                            <td hidden>{redProduct.id}</td>
                            <td>{redProduct.num_Douan}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>{redProduct.red}</td>
                            <td>{redProduct.date_lancement}</td>
                            <td>{redProduct.date_echeance}</td>
                            <td>{redProduct.designation}</td>
                            <td>{redProduct.nameProject}</td>
                            <td>{redProduct.pays}</td>
                            <td>{redProduct.facture_export}</td>
                            <td>{redProduct.valeur_declarer}</td>
                            <td>{redProduct.valeur_non_decharger}</td>
                            <td>{redProduct.respo.full_name}</td>
                            <td hidden>{redProduct.respo.id}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link className='btn btn-primary mx-2' to={`/editredproduct/${redProduct.id}`}>Edit</Link>
                                <button className='btn btn-danger mw-2'
                                        onClick={() => {
                                            if (window.confirm('Confirmer votre')) deleteRedProduct(redProduct.id).then((res) => {
                                                setMessage("Supression reussite");
                                                setTimeout(() => {
                                                    setMessage("");
                                                }, 3000)

                                            }).catch((error) => {
                                                console.log(error);
                                            })
                                        }}>Delete</button>
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

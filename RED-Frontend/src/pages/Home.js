import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
export default function Home() {

    const [message, setMessage] = useState();
    const [redProducts, setredProduct] = useState([]);
    const { id } = useParams();
    useEffect(() => {

        loadRedProduct();

    }, []);
    const loadRedProduct = async () => {
        const result = await axios.get("http://localhost:8080/redProducts")
        setredProduct(result.data);
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

        <div className='container'>
            <br></br>
            <h2> Gestion du RED </h2>
            <div className="d-flex">
                <Link className='btn btn-primary me-3' to="/addredproduct"> Ajouter RED </Link>
                <button className='btn btn-primary' onClick={handleDownload}> Import Excel data </button>
            </div>
            {message && <p className='text-center text-success'>{message}</p>}
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th hidden scope="col">id</th>
                            <th scope="col">N Douan</th>
                            <th scope="col">RED</th>
                            <th scope="col">Durée</th>
                            <th scope="col">Produit</th>
                            <th scope="col">Projet</th>
                            <th scope="col">Responsable</th>
                            <th hidden scope="col">respo_id</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {redProducts.map((redProduct, index) => (
                            <tr>

                                <td hidden>{redProduct.id}</td>
                                <td>{redProduct.num_Douan}</td>
                                <td>{redProduct.red}</td>
                                <td>{redProduct.date_lancement}</td>
                                <td>{redProduct.designation}</td>
                                <td>{redProduct.nameProject}</td>
                                <td>{redProduct.respo.full_name}</td>
                                <td hidden>{redProduct.respo.id}</td>
                                <td>

                                    <Link className='btn btn-primary mx-2'

                                        to={`/editredproduct/${redProduct.id}`}

                                    >Edit</Link>
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

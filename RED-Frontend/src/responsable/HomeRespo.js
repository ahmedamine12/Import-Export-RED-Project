import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams,useNavigate } from 'react-router-dom';
export default function HomeRespo() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [navigate]);
    const [verif, setVerif] = useState();
    const [message, setMessage] = useState();
    const [respos, setRespos] = useState([]);
    const { id } = useParams();
    useEffect(() => {

        loadRespo();

    }, []);
    const loadRespo = async () => {
        const result = await axios.get("http://localhost:8080/resposProjects")
        setRespos(result.data);
    };


    const deleteRespo = async (id) => {
        const result = await axios.delete(`http://localhost:8080/deleteRespo/${id}`)
        console.log(result)
        setMessage(result.data);
        setTimeout(() => {
            setMessage("");
        }, 4000)
        console.log(message)
        loadRespo();
    }
    return (

        <div className='container'>
            <br></br>
            <h2> Gestion du Responsable </h2>
            <div className="d-flex">
                <Link type="button" className='btn btn-primary' to="/addRespo"> Ajouter Responsable</Link>
            </div>
            {message && <p className='text-center text-danger'>{message}</p>}
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th hidden scope="col">id</th>
                            <th scope="col">Nom complet</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {respos.map((respo, index) => (
                            <tr>

                                <td hidden>{respo.id}</td>
                                <td>{respo.full_name}</td>
                                <td>{respo.email}</td>
                                <td>

                                    <Link className='btn btn-primary mx-2'

                                        to={`/editrespo/${respo.id}`}

                                    >Edit</Link>

                                    <button className='btn btn-danger mw-2'

                                        onClick={() => {
                                            if (window.confirm('Confirmer votre'))

                                                deleteRespo(respo.id)

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



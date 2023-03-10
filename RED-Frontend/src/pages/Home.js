import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Legend, Tooltip, Doughnut } from 'recharts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid,  ResponsiveContainer } from 'recharts';
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Home.css';

export default function Home() {
    const [redProducts, setredProduct] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        loadRedProduct();
    }, []);

    const loadRedProduct = async () => {
        const result = await axios.get("http://localhost:8080/redProducts")
        setredProduct(result.data);
    };



    const barChartData = redProducts.map((product) => ({
        red: `${product.nameProject} (${product.pays})`,
        valeurDeclarer: product.valeur_declarer,
        valeurNonDecharger: product.valeur_non_decharger,
    }));


    const lineChartData = redProducts.map((product) => ({
        name: product.nameProject,
        valeurDeclarer: product.valeur_declarer,
        valeurNonDecharger: product.valeur_non_decharger,
    }));


    const areaChartData = redProducts.map((product) => ({
        name: product.nameProject,
        valeurDeclarer: product.valeur_declarer,
        valeurNonDecharger: product.valeur_non_decharger,
    }));

    const kpiChartData = [
        {
            name: 'Total valeur déclarée',
            value: redProducts.reduce((total, product) => total + product.valeur_declarer, 0),
        },
    ];


    return (
        <div className="container-fluid">
            <br/>
            <h2> Home pages </h2>
            <br/>
            <div className="chart-container">

                <div className="chart">

                    <BarChart width={300} height={300} data={barChartData}>
                        <Legend verticalAlign="bottom" height={36} />
                        <Bar dataKey="valeurDeclarer" fill="#ff0000" />
                        <Bar dataKey="valeurNonDecharger" fill="#0000ff" />
                        <Tooltip />
                    </BarChart>
                </div>
                <div className="chart">

                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={areaChartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip />
                            <Area type="monotone" dataKey="valeurDeclarer" stroke="#ff0000" fill="#ff0000" />
                            <Area type="monotone" dataKey="valeurNonDecharger" stroke="#0000ff" fill="#0000ff" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart">
                    <LineChart width={300} height={300} data={lineChartData}>
                        <Legend verticalAlign="bottom" height={36} />
                        <Line type="monotone" dataKey="valeurDeclarer" stroke="#ff0000" />
                        <Line type="monotone" dataKey="valeurNonDecharger" stroke="#0000ff" />
                        <Tooltip />
                    </LineChart>
                </div>

                <div className="chart">

                    <PieChart width={300} height={400}>
                        <Pie
                            data={kpiChartData}
                            dataKey="value"
                            label="zd"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            labelLine={false}
                        >
                            <Cell fill={"#0000ff"} />
                            <Cell fill={"#0000ff"} />
                        </Pie>
                        <Tooltip />
                    </PieChart>
                    <div className="chart-label">

                        <div className="arrows">
                            <FontAwesomeIcon icon={faArrowUp} className="up-arrow" />
                            <FontAwesomeIcon icon={faArrowDown} className="down-arrow" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
            );
            }

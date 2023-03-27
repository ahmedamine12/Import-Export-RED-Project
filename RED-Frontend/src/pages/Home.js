import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
    const [redProducts, setRedProducts] = useState([]);

    const loadRedProducts = async () => {
        const result = await axios.get("http://localhost:8080/redProducts")
        setRedProducts(result.data);
    };

    useEffect(() => {
        loadRedProducts();
    }, []);

    const getTotalDeclarer = () => {
        let total = 0;
        redProducts.forEach(rp => total += rp.valeur_declarer);
        return total;
    }

    const getTotalNonDecharger = () => {
        let total = 0;
        redProducts.forEach(rp => total += rp.valeur_non_decharger);
        return total;
    }

    const getTopProducts = () => {
        return redProducts.sort((a, b) => b.valeur_declarer - a.valeur_declarer).slice(0, 5);
    }

    const getTopCountries = () => {
        const countries = {};
        redProducts.forEach(rp => {
            if (rp.pays in countries) {
                countries[rp.pays] += rp.valeur_declarer;
            } else {
                countries[rp.pays] = rp.valeur_declarer;
            }
        });
        const topCountries = [];
        for (const country in countries) {
            topCountries.push({ country: country, total: countries[country] });
        }
        return topCountries.sort((a, b) => b.total - a.total).slice(0, 5);
    }

    const barChartData = [
        { name: 'Total Declarer', value: getTotalDeclarer() },
        { name: 'Total Non Decharger', value: getTotalNonDecharger() },
    ];

    const topProductsData = getTopProducts().map(rp => {
        return { name: rp.designation, value: rp.valeur_declarer };
    });

    const topCountriesData = getTopCountries().map(tc => {
        return { name: tc.country, value: tc.total };
    });

    return (
        <div className="container-fluid">
            <br />
            <h2>Welcome to Our Company's Dashboard</h2>
            <br />
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Total Declarer</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{getTotalDeclarer()}</h6>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Total Non Decharger</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{getTotalNonDecharger()}</h6>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Top 5 Products</h5>
                            <ul className="list-group">
                                {getTopProducts().map(rp => (
                                    <li className="list-group-item" key={rp.id}>
                                        <span>{rp.designation}: </span>  {rp.valeur_declarer}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Top 5 Countries</h5>
                            <ul className="list-group">
                                {getTopCountries().map(tc => (
                                    <li className="list-group-item" key={tc.country}>{tc.country}: {tc.total}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Total Declarer vs Total Non Decharger</h5>
                            <BarChart width={500} height={300} data={barChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Top 5 Products Chart</h5>
                            <BarChart width={1000} height={400} data={topProductsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Top 5 Countries Chart</h5>
                            <BarChart width={1000} height={400} data={topCountriesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import PointsTable from "./PointsTable";
import graph from "../images/graph.svg";
import { AuthContext } from "../AuthContext";

const MainPage = () => {
    const [x, setX] = useState("");
    const [y, setY] = useState("");
    const [r, setR] = useState(1);
    const { user } = useContext(AuthContext);
    const [usr, setUsr] = useState(null);   
    const navigate = useNavigate();
    const [points, setPoints] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem("id"); 
        if (id) {
            setUsr(JSON.parse(id));  
        } else {
            navigate("/login");  
        }
    }, [navigate]);

    const onButtonClick = async(e) => {
        e.preventDefault(); 
        
        const requestData = {
            userId: localStorage.getItem("id"),
            x: x, 
            y: y, 
            r: r, 
        };
        console.log(requestData);
        console.log(JSON.stringify(requestData))
        try {
            const response = await fetch('http://localhost:8080/web4/check', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(requestData),
            }); 
            const result = await response.json();
            if (response.ok) {
                console.log(result.points);
                setPoints(result.points);
            }

        } catch (error) {
            console.log(error);
        }

    }
    const handleLogout = () => {
        localStorage.removeItem("id"); 
        navigate("/login"); 
    };

    return (
        <div>
            <Header />
            <div>
                <h2>Enter Params</h2>
                    <div>
                        <label htmlFor="x">X:</label>
                        <select id="x"
                            value={x}
                            onChange={(ev) => setX(ev.target.value)}
                            required
                            >
                            {[-5, -4, -3, -2, -1, 0, 1, 2, 3].map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="y">Y:</label>
                        <input
                        type="number"
                        id="y"
                        value={y}
                        onChange={(e) => setY(e.target.value)}
                        required
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="r">R:</label>
                        <select id="r"
                            value={r}
                            onChange={(ev) => setR(ev.target.value)} 
                            required
                        >
                            {[1, 2, 3, 4, 5].map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))} 
                        </select>
                    </div>
                        <input type="button" onClick={onButtonClick} value={'Check'}/>
                </div>
            <div>
                <h2>Graph</h2>
                <img src={graph} alt="Graph" />
            </div>
            <div>
                <h2>Table</h2>
                <PointsTable points={points}/>
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
    };

export default MainPage;

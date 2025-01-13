import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import PointsTable from "./PointsTable";
import graph from "../images/graph.svg";
import { AuthContext } from "../AuthContext";
import { useDispatch, useSelector } from 'react-redux';

const MainPage = () => {
    const [x, setX] = useState(-5);
    const [y, setY] = useState("");
    const [r, setR] = useState(1);
    const [error, setError] = useState(""); // Состояние для ошибки
    // const { user } = useContext(AuthContext);
    // const [usr, setUsr] = useState(null);   
    const navigate = useNavigate();
    // const [points, setPoints] = useState([]);
    const dispatch = useDispatch();
    const points = useSelector(state => state.points);
    // useEffect(() => {
    //     const id = localStorage.getItem("id"); 
    //     if (id) {
    //         setUsr(JSON.parse(id));  
    //     } else {
    //         navigate("/login");  
    //     }
    // }, [navigate]);

    const onButtonClick = async(e) => {
        e.preventDefault(); 
        if (y < -5 || y > 5) {
            setError("Value of Y is out of range! (valid range: -5 to 5)");
            return;
        } else {
            setError("");
        }
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
                // setPoints(result.points);
                dispatch({ type: 'SET_POINTS', points: result.points });
            }

        } catch (error) {
            console.log(error);
        }

    }
    const handleLogout = () => {
        localStorage.removeItem("id"); 
        navigate("/login"); 
    };
    const handleClear = async(e) => {
        e.preventDefault();
        const requestData = {
            userId: localStorage.getItem("id"),
        }; 
        try {
            const response = await fetch('http://localhost:8080/web4/clear', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify(requestData),
            }); 
            const result = await response.json();
            if (response.ok) {
                dispatch({ type: 'SET_POINTS', points: [] });
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="main-page-container">
            <Header />
            <button onClick={handleLogout} className="logout-btn">Logout</button>
            <div className="form-graph-container">
                <div className="input-form-container">
                    <h2>Enter Params</h2>
                    <div>
                        <label htmlFor="x">X:</label>
                        <select 
                            id="x"
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
                            placeholder="[-5;5]"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="r">R:</label>
                        <select 
                            id="r"
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
                    <input 
                        type="button" 
                        onClick={onButtonClick} 
                        value="Check"
                        className="submit-button"
                    />
                    <input 
                        type="button" 
                        onClick={handleClear} 
                        value="Clear"
                        className="clear-button"
                    />
                    {error && <div className="error-message">{error}</div>}
                </div>

                <div className="graph-container">
                    <h2>Graph</h2>
                    <img src={graph} alt="Graph" className="graph-img" />
                </div>
            </div>

            <div className="points-table-container">
                <h2>Table</h2>
                <PointsTable points={points} />
            </div>
        </div>
    );
};
export default MainPage;

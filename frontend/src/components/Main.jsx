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
    const [error, setError] = useState(""); 
    const { user } = useContext(AuthContext);
    const [usr, setUsr] = useState(null);   
    const navigate = useNavigate();
    // const [points, setPoints] = useState([]);
    const dispatch = useDispatch();
    const points = useSelector(state => state.points);
    useEffect(() => {
        const id = localStorage.getItem("id"); 
        if (id) {
            setUsr(JSON.parse(id));  
        } else {
            navigate("/login");  
        }
    }, [navigate]);

    useEffect(() => {
        if (points.length > 0) {
            points.forEach(({ x, y, r, isHit }) => {
                drawPoint(x, y, r, isHit);
            });
        }
    }, [points]);

    const onButtonClick = async(e) => {
        e.preventDefault(); 
        if (y < -5 || y > 5) {
            setError("Value of Y is out of range! (valid range: -5 to 5)");
            return;
        } else {
            setError("");
        }
        clearPoints();
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
    const clearPoints = () => {
        const svg = document.querySelector('svg');
        const circles = svg.querySelectorAll('circle'); 
        circles.forEach(circle => circle.remove());
    }
    const drawPoint = (x, y, r, isHit) => {
        const svg = document.querySelector("svg"); 
        const scaleFactor = 150 / r;
        const scaledX = x * scaleFactor; 
        const scaledY = -y * scaleFactor;
    
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute("cx", scaledX); 
        circle.setAttribute("cy", scaledY);
        circle.setAttribute("r", 5); 
        circle.setAttribute("fill", isHit ? "green" : "red");
    
        svg.appendChild(circle);
    }

    const onGraphClick = async (event) => {
        const svg = document.querySelector("svg");
        const rect = svg.getBoundingClientRect();
    
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
    
        const scaleFactor = 150 / r;
        const clickedX = (clickX - 200) / scaleFactor;
        const clickedY = -(clickY - 200) / scaleFactor;
    
        const requestData = {
            userId: localStorage.getItem("id"),
            x: clickedX,
            y: clickedY,
            r: r,
        };
        clearPoints();
        try {
            const response = await fetch('http://localhost:8080/web4/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
    
            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }
    
            const result = await response.json();
            dispatch({ type: 'SET_POINTS', points: result.points });
        } catch (error) {
            console.error("Error while sending request:", error);
        }
    };
    

    const handleLogout = () => {
        localStorage.removeItem("id"); 
        navigate("/login"); 
    };
    const handleClear = async(e) => {
        e.preventDefault();
        clearPoints();
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
                        id="check-button"
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
                    <svg width="400" height="400" viewBox="-200 -200 400 400" xmlns="http://www.w3.org/2000/svg" className="graph-svg" onClick={onGraphClick}>
                        <line x1="-200" y1="0" x2="200" y2="0" stroke="black"></line>
                        <line x1="0" y1="200" x2="0" y2="-200" stroke="black"></line>

                        <line x1="-150" y1="-5" x2="-150" y2="5" stroke="black"></line>
                        <text x="-160" y="20" font-size="20">-R</text>

                        <line x1="-75" y1="-5" x2="-75" y2="5" stroke="black"></line>
                        <text x="-85" y="20" font-size="20">-R/2</text>

                        <line x1="150" y1="-5" x2="150" y2="5" stroke="black"></line>
                        <text x="140" y="20" font-size="20">R</text>

                        <line x1="75" y1="-5" x2="75" y2="5" stroke="black"></line>
                        <text x="65" y="20" font-size="20">R/2</text>

                        <line x1="-5" y1="150" x2="5" y2="150" stroke="black"></line>
                        <text x="10" y="155" font-size="20">R</text>

                        <line x1="-5" y1="75" x2="5" y2="75" stroke="black"></line>
                        <text x="10" y="80" font-size="20">R/2</text>

                        <line x1="-5" y1="-150" x2="5" y2="-150" stroke="black"></line>
                        <text x="10" y="-140" font-size="20">-R</text>

                        <line x1="-5" y1="-75" x2="5" y2="-75" stroke="black"></line>
                        <text x="10" y="-65" font-size="20">-R/2</text>
                        <polygon points="0,0 0, -75 -75,0" fill-opacity="0.4" stroke="navy" fill="red"></polygon>
                        <path d="M 0 0 H 150 A 150 150 0 0 0 0 -150 v 0" stroke="navy" fill="red" fill-opacity="0.4"></path>
                        <rect x="-75" y="0" width="75" height="150" fill-opacity="0.4" stroke="navy" fill="red"></rect> 
                        <polygon points="200,0 190,5 190,-5" fill="black"></polygon>
                        <polygon points="0,-200 -5,-190 5,-190" fill="black"></polygon> 
                        <text x="180" y="20" font-size="20">R</text>
                        <text x="-40" y="-180" font-size="20">R</text>
                    </svg>
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

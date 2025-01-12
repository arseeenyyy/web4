import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import PointsTable from "./PointsTable";
import graph from "../images/graph.svg";
import { AuthContext } from "../AuthContext";

const MainPage = () => {
    const [x, setX] = useState("");
    const [y, setY] = useState("");
    const [r, setR] = useState("");
    const { user } = useContext(AuthContext);  
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {  
            navigate("/login");
        }
    }, [user, navigate]);

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted values:", { x, y, r });
    };

    return (
        <div>
            <Header />
            <div>
                <h2>Введите параметры:</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="x">X:</label>
                        <input
                        type="number"
                        id="x"
                        value={x}
                        onChange={(e) => setX(e.target.value)}
                        required
                        />
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
                    <div>
                        <label htmlFor="r">R:</label>
                        <input
                        type="number"
                        id="r"
                        value={r}
                        onChange={(e) => setR(e.target.value)}
                        required
                        />
                    </div>
                        <button type="submit">Отправить</button>
                </form>
                </div>
            <div>
                <h2>График</h2>
                <img src={graph} alt="Graph" />
                </div>
                <div>
                <h2>Таблица точек</h2>
                <PointsTable />
            </div>
        </div>
    );
    };

export default MainPage;

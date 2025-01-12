import React, { useState } from "react";

const PointsTable = () => {
    const [points, setPoints] = useState('');

    const handleNewData = (newData) => {
        setPoints(newData);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Execution Time</th>
                        <th>Hit Result</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {points.map((point, index) => (
                        <tr key={index}>
                            <td>{point.x}</td>
                            <td>{point.y}</td>
                            <td>{point.r}</td>
                            <td>{point.executionTime}</td>
                            <td>{point.hitResult ? "Hit" : "Miss"}</td>
                        </tr>
                    ))} */}
                    <tr>
                        <td>1</td>                        
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>

                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PointsTable;
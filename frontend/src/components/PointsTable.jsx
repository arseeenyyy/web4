const PointsTable = ({ points }) => {
    if (!points) return <div>No points available</div>; // Защита от undefined

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
                    {points.length === 0 ? (
                        <tr>
                            <td colSpan="5">No data to display</td>
                        </tr>
                    ) : (
                        points.map((point, index) => (
                            <tr key={index}>
                                <td>{point.x}</td>
                                <td>{point.y}</td>
                                <td>{point.r}</td>
                                <td>{point.executionTime}</td>
                                <td>{point.isHit ? "Hit" : "Miss"}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
export default PointsTable;
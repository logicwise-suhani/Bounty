import { useEffect, useState } from "react";

function Players() {
    const [rounds, setRounds] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const roundsData = JSON.parse(localStorage.getItem("chances")) || [];
        const resultsData = JSON.parse(localStorage.getItem("finalResults")) || [];

        setRounds(roundsData);
        setResults(resultsData);
    }, []);

    const getRoundResults = (roundIndex) => {
        return results.filter(r => r.chance === roundIndex + 1);
    };

    const getWins = (roundIndex) => {
        return getRoundResults(roundIndex).filter(r => r.status === "WON").length;
    };

    const getLoss = (roundIndex) => {
        return getRoundResults(roundIndex).filter(r => r.status === "LOSS").length;
    };

    const getActive = (roundIndex) => {
        const predictions = JSON.parse(localStorage.getItem("predictions")) || [];
        return predictions.filter(p => p.chance === roundIndex + 1).length;
    };

    return (
        <div className="players">
            <h2>Players Real Status</h2>

            {rounds.length === 0 ? (
                <p>No rounds found</p>
            ) : (
                rounds.map((round, i) => (
                    <div key={round.id} className="round-card">
                        <h3>Round {i + 1}</h3>

                        <table border="1" cellPadding="10">
                            <thead>
                                <tr>
                                    <th>Max Players</th>
                                    <th>Active Chances</th>
                                    <th>Wins</th>
                                    <th>Loss</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>{round.players}</td>
                                    <td>{getActive(i)}</td>
                                    <td style={{ color: "green" }}>{getWins(i)}</td>
                                    <td style={{ color: "red" }}>{getLoss(i)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))
            )}
        </div>
    );
}

export default Players;


// import { useEffect, useState } from "react";

// function Players() {
//     const [rounds, setRounds] = useState([]);
//     const [results, setResults] = useState([]);

//     useEffect(() => {
//         const roundsData = JSON.parse(localStorage.getItem("chances")) || [];
//         const resultsData = JSON.parse(localStorage.getItem("finalResults")) || [];

//         setRounds(roundsData);
//         setResults(resultsData);
//     }, []);

//     const getRoundResults = (roundIndex) => {
//         return results.filter(r => r.chance === roundIndex + 1);
//     };

//     const getWins = (roundIndex) =>
//         getRoundResults(roundIndex).filter(r => r.status === "WON").length;

//     const getLoss = (roundIndex) =>
//         getRoundResults(roundIndex).filter(r => r.status === "LOSS").length;

//     const getActive = (roundIndex) => {
//         const predictions = JSON.parse(localStorage.getItem("predictions")) || [];
//         return predictions.filter(p => p.chance === roundIndex + 1).length;
//     };

//     return (
//         <div className="players">
//             <h2>Players Status</h2>

//             {rounds.length === 0 ? (
//                 <p>No rounds found</p>
//             ) : (
//                 rounds.map((round, i) => (
//                     <div key={round.id || i} className="round-card">
//                         <h3>Round {i + 1}</h3>

//                         <table border="1" cellPadding="10">
//                             <thead>
//                                 <tr>
//                                     <th>Max Players</th>
//                                     <th>Active Players</th>
//                                     <th>Wins</th>
//                                     <th>Loss</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 <tr>
//                                     <td>{round.players}</td>
//                                     <td>{getActive(i)}</td>
//                                     <td style={{ color: "green" }}>{getWins(i)}</td>
//                                     <td style={{ color: "red" }}>{getLoss(i)}</td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// }

// export default Players;
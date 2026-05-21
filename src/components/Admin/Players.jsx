import { useEffect, useState } from "react";

function Players({ onClose }) {
    const [rounds, setRounds] = useState([]);

    useEffect(() => {
        const roundsData = localStorage.getItem("rounds");

        if (roundsData) {
            const parsedRoundData = JSON.parse(roundsData);
            setRounds(parsedRoundData);
        }
    }, []);


    return (
        <>
            <div>
                <h2>Players Round Wise</h2>

                {rounds.length === 0 ? (
                    <p>No rounds found</p>
                ) : (
                    rounds.map((round) => (
                        <div
                            key={round.id}
                            style={{
                                marginBottom: "30px", border: "1px solid #ccc", padding: "10px",
                            }}
                        >
                            <h3>Round {round.roundNumber}</h3>

                            <table border="1" cellPadding="10">
                                <thead>
                                    <tr>
                                        <th>Players</th>
                                        <th>Balance</th>
                                        <th>Active Chances</th>
                                        <th>Win</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {Array.from({
                                        length: Number(round.players),
                                    }).map((_, i) => (
                                        <tr key={i}>
                                            <td>Player {i + 1}</td>
                                            <td>₹1000</td>
                                            <td>{round.chances}</td>
                                            <td>0</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )))}

                <button onClick={onClose}>Close</button>
            </div>
        </>
    );
}

export default Players;
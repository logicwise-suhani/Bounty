import { useState } from "react";
import { useEffect } from "react";

function Players({ onClose }) {
    const [playersCount, setPlayersCount] = useState(0);

    useEffect(() => {
        const roundsData = localStorage.getItem("rounds");
        const parsedRoundData = JSON.parse(roundsData);
        if (parsedRoundData) {
            setPlayersCount(parsedRoundData.length ? parsedRoundData[0].players : 0)
        }
    }, []);

    return (
        <>
            <div>
                <p>Players data here...</p>

                <table border="1">
                    <thead>
                        <tr>
                            <td>Players</td>
                            <td>Balance</td>
                            <td>Active Chances</td>
                            <td>Win</td>
                        </tr>
                    </thead>

                    {Array.from({ length: playersCount }).map((_, i) => (
                        <tbody key={i}>
                            <tr>
                                <td>Player {i + 1}</td>
                                <td>₹1000</td>
                            </tr>
                        </tbody>
                    ))}

                </table>
                <div>
                    <button onClick={onClose}>Close</button>
                </div>
            </div >
        </>
    )
};

export default Players;
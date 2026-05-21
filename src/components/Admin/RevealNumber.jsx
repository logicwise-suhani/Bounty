import { useEffect } from "react";
import { useState } from "react";

function RevealNumber({ onClose }) {

    const [rounds, setRounds] = useState([]);

    useEffect(() => {
        const roundsData = localStorage.getItem("rounds");
        if (roundsData) {
            let parsedRoundData = JSON.parse(roundsData);

            const hasNumbers = parsedRoundData.every(
                (round) => Array.isArray(round.numbers) && round.numbers.length > 0
            );

            if (!hasNumbers) {
                parsedRoundData = parsedRoundData.map((round) => ({
                    ...round,
                    numbers: Array.from(
                        { length: Number(round.chances) },
                        () => Math.floor(Math.random() * 99) + 1
                    ),
                }));

                localStorage.setItem("rounds", JSON.stringify(parsedRoundData));
            }
            setRounds(parsedRoundData);
        }
    }, []);
  
    return (
        <>
            <div>

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

                            {round.numbers.map((num, i) => (
                                <p key={i}>
                                    Chance {i + 1}: {num}
                                </p>
                            ))}

                        </div>
                    ))
                )}

                <div>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </>
    )
};

export default RevealNumber;
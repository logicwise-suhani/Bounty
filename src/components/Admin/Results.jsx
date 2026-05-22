import { useState } from "react";
import { useEffect } from "react";

function Results({ onClose }) {
    const [randoms, setRandoms] = useState([]);

    useEffect(() => {
        const roundsData = localStorage.getItem("chances");
        const parsedRoundData = JSON.parse(roundsData);

        if (!parsedRoundData) return;

        const saved = localStorage.getItem("randomNum");
        if (saved) {
            setRandoms(JSON.parse(saved));
        } else {
            const num = Array.from({ length: 6 }, () =>
                Math.floor(Math.random() * 99) + 1
            );

            setRandoms(num);
            localStorage.setItem("randomNum", JSON.stringify(num));
        }
    }, []);

    return (
        <>
            <div>
                <div>
                    <h3> Winning Number
                        {randoms.map((num, i) => (
                            <div key={i}>
                                Chance {i + 1}: {num}
                            </div>
                        ))}
                    </h3>
                    <h3>Total Winners : </h3>
                    <h3>Total Paid: </h3>
                    <h3>Platform Profit: </h3>
                </div>

                <div>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </>
    )

};

export default Results;
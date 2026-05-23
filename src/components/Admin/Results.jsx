import { useState, useEffect } from "react";

function Results() {
    const [results, setResults] = useState([]);
    const [randoms, setRandoms] = useState([]);

    useEffect(() => {
        const predictions = JSON.parse(localStorage.getItem("predictions")) || [];

        if (predictions.length === 0) return;

        let storedRandoms = JSON.parse(localStorage.getItem("randomNum"));

        if (!storedRandoms) {
            storedRandoms = Array.from({ length: predictions.length }, () =>
                Math.floor(Math.random() * 99) + 1
            );

            localStorage.setItem("randomNum", JSON.stringify(storedRandoms));
        }

        setRandoms(storedRandoms);

        const finalResults = predictions.map((item, index) => {
            const winNumber = storedRandoms[index];

            const isWin = item.numbers.includes(winNumber);

            return {
                chance: item.chance,
                numbers: item.numbers,
                randomValue: winNumber,
                status: isWin ? "WON" : "LOSS"
            };
        });

        localStorage.setItem("finalResults", JSON.stringify(finalResults));
        setResults(finalResults);

    }, []);

    const totalWinners = results.filter(r => r.status === "WON").length;
    const totalPlayers = results.length;
    const totalPaid = totalWinners * 10;
    const platformProfit = (totalPlayers * 10) - totalPaid;

    return (
        <div>
            <div className="admin-results">
                <h2>Results</h2>

                {results.map((r, i) => (
                    <div key={i} style={{ marginBottom: "10px" }}>
                        <h4>Chance {r.chance}</h4>
                        <p>User Numbers: {r.numbers.join(", ")}</p>
                        <p>Winning Number: {r.randomValue}</p>
                        <p>
                            Status:{" "}
                            <b style={{ color: r.status === "WON" ? "green" : "red" }}>
                                {r.status}
                            </b>
                        </p>
                        <hr />
                    </div>
                ))}

                <h3>Total Winners: {totalWinners}</h3>
                <h3>Total Paid: ₹{totalPaid}</h3>
                <h3>Platform Profit: ₹{platformProfit}</h3>
            </div>
        </div>
    );
}

export default Results;
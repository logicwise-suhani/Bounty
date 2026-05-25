import { useState, useEffect } from "react";

function Results() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const predictions = JSON.parse(localStorage.getItem("predictions")) || [];

        if (predictions.length === 0) {
            setResults([]);
            return;
        }
 
        let storedRandoms = JSON.parse(localStorage.getItem("randomNum"));
        if (!storedRandoms || storedRandoms.length !== predictions.length) {
            storedRandoms = predictions.map(() => Math.floor(Math.random() * 99) + 1);
            localStorage.setItem("randomNum", JSON.stringify(storedRandoms));
        }

        const finalResults = predictions.map((item, index) => {
            const winNumber = storedRandoms[index];
            const isWin = Array.isArray(item.numbers) && item.numbers.includes(winNumber);

            return {
                chance: item.chance,
                numbers: item.numbers,
                randomValue: winNumber,
                status: isWin ? "WON" : "LOSS",
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
        <div className="admin-results">
            <h2>Results</h2>

            {results.length === 0 ? (
                <p>No results available yet</p>
            ) : (
                results.map((r, i) => (
                    <div key={i} style={{ marginBottom: "12px" }}>
                        <h4>Chance {r.chance}</h4>
                        <p>Numbers: {r.numbers.join(", ")}</p>
                        <p>Winning Number: {r.randomValue}</p>
                        <p>
                            Status:{" "}
                            <b style={{ color: r.status === "WON" ? "green" : "red" }}>
                                {r.status}
                            </b>
                        </p>
                        <hr />
                    </div>
                ))
            )}

            <h3>Total Winners: {totalWinners}</h3>
            <h3>Total Paid: ₹{totalPaid}</h3>
            <h3>Platform Profit: ₹{platformProfit}</h3>
        </div>
    );
}

export default Results;
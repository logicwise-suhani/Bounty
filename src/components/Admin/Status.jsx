import { useEffect, useState } from "react";

function Status() {
    const [chancesCount, setChancesCount] = useState(0);
    const [currentChance, setCurrentChance] = useState(1);
    const [results, setResults] = useState([]);

    const loadStatus = () => {
        const roundsData = JSON.parse(localStorage.getItem("chances")) || [];

        if (roundsData.length > 0) {
            setChancesCount(Number(roundsData[0].chances || 0));
        }

        const savedChance = Number(localStorage.getItem("chance")) || 1;
        setCurrentChance(savedChance);
        const res = JSON.parse(localStorage.getItem("finalResults")) || [];
        setResults(res);
    };

    useEffect(() => {
        loadStatus();

        window.addEventListener("resultsUpdated", loadStatus);
        window.addEventListener("chanceUpdated", loadStatus);

        return () => {
            window.removeEventListener("resultsUpdated", loadStatus);
            window.removeEventListener("chanceUpdated", loadStatus);
        };
    }, []);

    const getStatus = (index) => {
        const predictions = JSON.parse(localStorage.getItem("predictions")) || [];
        const isCompleted = predictions.some((p) => p.chance === index + 1);
        const isActive = index + 1 === currentChance;

        if (isCompleted) return "COMPLETED";
        if (isActive) return "ACTIVE";
        return "WAITING";
    };

    return (
        <div className="status-div">
            {chancesCount > 0 ? (
                Array.from({ length: chancesCount }).map((_, i) => {
                    const status = getStatus(i);

                    return (
                        <div
                            key={i}
                            className="status"
                            style={{
                                background:
                                    status === "COMPLETED"
                                        ? "#11dd41"
                                        : status === "ACTIVE"
                                            ? "#facc15"
                                            : "#e5e7eb",

                                padding: "10px",
                                marginBottom: "8px",
                                borderRadius: "8px",
                            }}
                        >
                            Chance {i + 1}: {status}
                        </div>
                    );
                })
            ) : (
                <p>No status available. Please create a round first.</p>
            )}
        </div>
    );
}

export default Status;
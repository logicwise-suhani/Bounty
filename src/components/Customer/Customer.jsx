import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Customer() {

    const [time, setTime] = useState(new Date().getTime());
    const [rounds, setRounds] = useState([]);
    const [inputValue, setInputValue] = useState({});
    const [chance, setChance] = useState(0);
    const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
    const [playersPlayed, setPlayersPlayed] = useState(0)

    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().getTime());
        }, 1000)

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const data = localStorage.getItem("rounds");
        if (data) {
            const parsed = JSON.parse(data);
            const sorted = parsed.sort((a, b) => a.roundNumber - b.roundNumber);
            setRounds(sorted);
        }
    }, []);

    const handleChange = (roundIndex, chanceIndex, boxIndex, e) => {
        const { value } = e.target;

        setInputValue((prev) => ({
            ...prev,
            [`${roundIndex}-${chanceIndex}-${boxIndex}`]: value,
        }));
        setChance(chanceIndex + 1);
    };

    const handlePlayerAction = () => {
        const currentRound = rounds[currentRoundIndex];
        if (!currentRound) return;

        setPlayersPlayed((prev) => {
            const updated = prev + 1;
            setInputValue({});

            if (updated >= Number(currentRound.players)) {
                setCurrentRoundIndex((r) => r + 1);
                return 0;
            }
            return updated;
        });
        setChance(0);
    }

    const currentRound = rounds[currentRoundIndex];

    return (
        <>
            <div>
                <div className="customer-details">
                    <h3>Balance: ₹1000</h3>
                    <h3>Chance: {chance} / 6</h3>
                    <h3>Reveal in: {new Date(time).toLocaleTimeString()} </h3>
                </div>

                <div>
                    {currentRound ? (
                        <div
                            style={{
                                marginBottom: "30px",
                                border: "1px solid #ccc",
                                padding: "10px",
                            }}
                        >
                            <h3>Current Round: {currentRound.roundNumber}</h3>
                            <p>Player: {playersPlayed + 1} / {currentRound.players}</p>

                            <div className="grid">
                                {Array.from({ length: Number(currentRound.chances) }).map(
                                    (_, chanceIndex) => (
                                        <div key={chanceIndex}>
                                            <p>Chance: {chanceIndex + 1}</p>

                                            <div className="chances-box">
                                                {Array.from({ length: 9 }).map((_, boxIndex) => (
                                                    <input
                                                        key={boxIndex}
                                                        type="number"
                                                        min={1}
                                                        max={99}
                                                        value={inputValue[`${currentRoundIndex}-${chanceIndex}-${boxIndex}`] || ""}
                                                        onChange={(e) => handleChange(currentRoundIndex, chanceIndex, boxIndex, e)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            <button onClick={handlePlayerAction}>
                                End
                            </button>
                        </div>
                    ) : (
                        <p>All rounds completed. Come Back Later!</p>
                    )}
                </div>

                <div>
                    <button onClick={() => navigate("/")}>BACK</button>
                </div>
            </div>
        </>
    )
};

export default Customer;

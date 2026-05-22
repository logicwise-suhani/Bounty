import { useEffect, useState } from "react";
import setMinDateTime from "../../Time/minTime";
import setMaxDateTime from "../../Time/maxTime";

function Round({ onClose, goToPlayers }) {
    const [rounds, setRounds] = useState([
        {
            players: "",
            chances: "6",
            betMultiplier: "10",
            time: "",
        },
    ]);
    const [roundsDisplay, setRoundsDisplay] = useState([]);
    const [errors, setErrors] = useState({});

    const minDateTime = setMinDateTime();
    const maxDateTime = setMaxDateTime();

    useEffect(() => {
        const roundsData = localStorage.getItem("chances");
        const parsedRoundData = JSON.parse(roundsData);
        if (parsedRoundData) {
            setRoundsDisplay(parsedRoundData.length ? parsedRoundData : []);
        }
    }, []);

    const handleChange = (index, e) => {
        const { name, value } = e.target;

        const updatedRounds = [...rounds];
        updatedRounds[index][name] = value;
        setRounds(updatedRounds);
        setErrors((prev) => ({
            ...prev,
            [index]: {
                ...prev[index],
                [name]: "",
            },
        }));
    };

    const validateRounds = () => {
        const newErrors = {};
        let isValid = true;

        rounds.forEach((r, i) => {
            newErrors[i] = {};

            if (!r.players || Number(r.players) <= 0 || Number(r.players) > 9) {
                newErrors[i].players = "Players must be between 0 and 9";
                isValid = false;
            }

            if (!r.chances || Number(r.chances) <= 0) {
                newErrors[i].chances = "Chances must be greater than 0";
                isValid = false;
            }

            if (!r.betMultiplier || r.betMultiplier.trim() === "") {
                newErrors[i].betMultiplier = "Bet Multiplier is required";
                isValid = false;
            } else if (
                isNaN(Number(r.betMultiplier)) ||
                Number(r.betMultiplier) <= 0
            ) {
                newErrors[i].betMultiplier =
                    "Bet Multiplier must be a valid number greater than 0";
                isValid = false;
            }

            if (!r.time) {
                newErrors[i].time = "Time is required";
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSave = () => {
        if (!validateRounds()) return;
        const existing = JSON.parse(localStorage.getItem("chances")) || [];

        const updated = [...existing, ...rounds.map(r => ({
            ...r,
            id: Date.now() + Math.random()
        }))];

        localStorage.setItem("chances", JSON.stringify([...updated].sort((a, b) => new Date(a.time) - new Date(b.time))));
        setRoundsDisplay(updated);
        setRounds([{
            players: "",
            chances: "6",
            betMultiplier: "10",
            time: ""
        }]);
    };

    const handleDelete = (id) => {
        const existing = JSON.parse(localStorage.getItem("chances")) || [];
        const updated = existing.filter((r) => r.id !== id);
        const reindexed = [...updated].sort((a, b) => new Date(a.time) - new Date(b.time)).map((r, i) => ({
            ...r,
            roundNumber: i + 1
        }));
        localStorage.setItem("chances", JSON.stringify(reindexed));
        setRoundsDisplay(reindexed);
    };

    return (
        <>
            <div className="create-round">
                <div className="rounds">
                    {rounds.map((round, index) => (
                        <div key={index} style={{ marginBottom: "20px" }}>
                            <div>
                                Max Players: {" "}
                                <input
                                    type="number"
                                    min="1"
                                    max="9"
                                    name="players"
                                    value={round.players}
                                    onChange={(e) => handleChange(index, e)}
                                />
                                {errors[index]?.players && (
                                    <p style={{ color: "red" }}>
                                        {errors[index].players}
                                    </p>
                                )}
                            </div>

                            <div>
                                Chances: {" "}
                                <input
                                    type="number"
                                    name="chances"
                                    value={round.chances}
                                    onChange={(e) => handleChange(index, e)}
                                />
                                {errors[index]?.chances && (
                                    <p style={{ color: "red" }}>
                                        {errors[index].chances}
                                    </p>
                                )}
                            </div>

                            <div>
                                Bet Multiplier: {" "}
                                <input
                                    type="text"
                                    name="betMultiplier"
                                    value={round.betMultiplier}
                                    onChange={(e) => handleChange(index, e)}
                                />
                                {errors[index]?.betMultiplier && (
                                    <p style={{ color: "red" }}>
                                        {errors[index].betMultiplier}
                                    </p>
                                )}
                            </div>

                            <div>
                                Time: {" "}
                                <input
                                    type="datetime-local"
                                    name="time"
                                    value={round.time}
                                    min={minDateTime}
                                    max={maxDateTime}
                                    onChange={(e) => handleChange(index, e)}
                                />
                                {errors[index]?.time && (
                                    <p style={{ color: "red" }}>
                                        {errors[index].time}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="save-btn">
                    <button onClick={handleSave}>Save Chance</button>{" "}
                </div>

                <br />
                <hr style={{ width: "100%", color: "black" }} />

                <div className="rounds-created">
                    {roundsDisplay.length === 0 ? (
                        <p style={{ color: "red" }}>No data found</p>
                    ) : (
                        [...roundsDisplay].sort((a, b) => new Date(a.time) - new Date(b.time)).map((round) => (
                            <div key={round.id} className="round-data">
                                <p>Players: {round.players}</p>
                                <p>Chances: {round.chances} </p>
                                <p>Bet Multiplier: {round.betMultiplier} </p>
                                <p>Time: {round.time} </p>
                                <button onClick={() => handleDelete(round.id)}>Delete</button>
                            </div>
                        ))
                    )}

                    <br />
                    <div className="on-close">
                        {roundsDisplay.length > 0 && <button style={{ backgroundColor: "lavender" }} onClick={goToPlayers}>View Players</button>}
                        <button onClick={onClose}>Close</button>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Round;
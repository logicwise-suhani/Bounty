import { useEffect, useState } from "react";

function Round({ onClose }) {
    const [rounds, setRounds] = useState([
        {
            roundNumber: "",
            players: "",
            chances: "",
            betMultiplier: "",
            time: "",
        },
    ]);
    const [roundsDisplay, setRoundsDisplay] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const roundsData = localStorage.getItem("rounds");
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

            if (!r.roundNumber || Number(r.roundNumber) <= 0) {
                newErrors[i].roundNumber = "Round Number must be greater than 0";
                isValid = false;
            }

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
        const existing = JSON.parse(localStorage.getItem("rounds")) || [];

        const updated = [...existing, ...rounds.map(r => ({
            ...r,
            id: Date.now(Math.random())
        }))];

        localStorage.setItem("rounds", JSON.stringify(updated));
        setRoundsDisplay(updated);
        setRounds([{
            roundNumber: "",
            players: "",
            chances: "",
            betMultiplier: "",
            time: ""
        }]);
    };

    const handleDelete = (id) => {
        const existing = JSON.parse(localStorage.getItem("rounds")) || [];
        const updated = existing.filter((r) => r.id !== id);
        const reindexed = updated.map((r, i) => ({
            ...r,
            roundNumber: i + 1
        }));
        localStorage.setItem("rounds", JSON.stringify(reindexed));
        setRoundsDisplay(reindexed);
    };

    return (
        <>
            <div>
                {rounds.map((round, index) => (
                    <div key={index} style={{ marginBottom: "20px" }}>
                        <div>
                            Round Number:
                            <input
                                type="number"
                                min="1"
                                name="roundNumber"
                                value={round.roundNumber}
                                onChange={(e) => handleChange(index, e)}
                            />
                            {errors[index]?.roundNumber && (
                                <p style={{ color: "red" }}>
                                    {errors[index].roundNumber}
                                </p>
                            )}
                        </div>

                        <div>
                            Max Players:
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
                            Chances:
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
                            Bet Multiplier:
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
                            Time:
                            <input
                                type="time"
                                name="time"
                                value={round.time}
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

            <div>
                <button onClick={handleSave}>Save Rounds</button>{" "}
                <button onClick={onClose}>Close</button>
            </div>

            <br />
            <hr style={{ width: "100%" }} />
            <div>
                <h3>Rounds Created</h3>
                {roundsDisplay.length === 0 ? (
                    <p>No rounds found</p>
                ) : (
                    roundsDisplay.map((round) => (
                        <div
                            key={round.id}
                            style={{
                                border: "1px solid #ccc",
                                margin: "20px",
                                padding: "10px",
                            }}
                        >
                            <p><b>Round Number:</b> {round.roundNumber}</p>
                            <p><b>Players:</b> {round.players} </p>
                            <p><b>Chances:</b> {round.chances} </p>
                            <p><b>Bet Multiplier:</b> {round.betMultiplier} </p>
                            <p><b>Time:</b> {round.time} </p>
                            <button onClick={() => handleDelete(round.id)}>Delete</button>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default Round;
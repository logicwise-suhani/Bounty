import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Customer() {

    const [time, setTime] = useState(new Date().getTime());
    const [inputValue, setInputValue] = useState({});
    const [chance, setChance] = useState(1);
    const BOXES = 9;
    const [rounds, setRounds] = useState([]);
    const [displayTime, setDisplayTime] = useState(null);
    const [gameResults, setGameResults] = useState([]);
    const [balance, setBalance] = useState(
        Number(localStorage.getItem("balance")) || 1000
    );
    const [savedChances, setSavedChances] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().getTime());
        }, 1000)

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("chances")) || [];
        setRounds(data);
    }, [location]);

    useEffect(() => {
        if (rounds.length > 0) {
            setDisplayTime(rounds[0].time);
        }
    }, [rounds]);

    useEffect(() => {
        const loadResults = () => {
            const savedResults = JSON.parse(localStorage.getItem("finalResults")) || [];
            updateGameResults(savedResults);
        };

        loadResults();
        window.addEventListener("resultsUpdated", loadResults);

        return () => {
            window.removeEventListener("resultsUpdated", loadResults);
        };
    }, []);

    const updateGameResults = (newResults) => {
        setGameResults(newResults);

        localStorage.setItem("finalResults", JSON.stringify(newResults));

        const baseBalance = 1000;

        const totalWins = newResults.filter(
            (result) => result.status === "WON").length;

        const currentBalance = totalWins > 0
            ? baseBalance * Math.pow(10, totalWins)
            : baseBalance;

        setBalance(currentBalance);
        localStorage.setItem("balance", currentBalance);
    };

    const handleChange = (chanceIndex, boxIndex, e) => {
        const { value } = e.target;

        if (value === "") {
            setInputValue((prev) => ({
                ...prev,
                [`${chanceIndex}-${boxIndex}`]: "",
            }));
            return;
        }

        const num = Number(value);
        if (!isValidRange(num)) {
            alert("Value must be between 1 and 99");
            return;
        }

        setInputValue((prev) => ({
            ...prev,
            [`${chanceIndex}-${boxIndex}`]: value,
        }));
    };

    const handleBlur = (chanceIndex, boxIndex, e) => {
        const value = e.target.value;

        if (!value) return;

        const values = Array.from({ length: BOXES }).map((_, i) =>
            i === boxIndex
                ? value
                : inputValue[`${chanceIndex}-${i}`]
        );

        const filtered = values.filter((v) => v !== undefined && v !== "");

        const hasDuplicate = new Set(filtered).size !== filtered.length;
        if (hasDuplicate) {
            alert("Duplicate numbers are not allowed");
            setInputValue((prev) => ({
                ...prev,
                [`${chanceIndex}-${boxIndex}`]: "",
            }));
        }
    };

    const isChanceCompleted = (chanceIndex) => {
        const values = Array.from({ length: BOXES }).map(
            (_, boxIndex) => inputValue[`${chanceIndex}-${boxIndex}`]
        );
        return values.every(
            (value) => value !== undefined && value !== ""
        );
    };

    const isChanceUnique = (chanceIndex) => {
        const values = Array.from({ length: BOXES }).map(
            (_, boxIndex) => inputValue[`${chanceIndex}-${boxIndex}`]
        );

        const filtered = values.filter((v) => v !== "" && v !== undefined);
        return new Set(filtered).size === filtered.length;
    };

    const isValidRange = (value) => {
        const num = Number(value);
        return num >= 1 && num <= 99;
    };

    const handleSave = (chanceIndex) => {

        if (!isChanceCompleted(chanceIndex)) {
            alert(`Chance ${chanceIndex + 1} is incomplete`);
            return;
        }
        if (!isChanceUnique(chanceIndex)) {
            alert(`Chance ${chanceIndex + 1} contains duplicate numbers`);
            return;
        }

        const chanceData = Array.from({ length: BOXES }).map(
            (_, boxIndex) =>
                Number(inputValue[`${chanceIndex}-${boxIndex}`])
        );

        const oldData = JSON.parse(localStorage.getItem("predictions")) || [];
        const alreadyExists = oldData.some((item) => {
            return JSON.stringify(item.numbers) === JSON.stringify(chanceData);
        });
        if (alreadyExists) {
            alert("This chance is already saved");
            return;
        }

        oldData.push({
            chance: chanceIndex + 1,
            numbers: chanceData,
        });

        localStorage.setItem("predictions", JSON.stringify(oldData));
        setSavedChances((prev) => [...prev, chanceIndex]);
        setChance(chanceIndex + 2);
    };

    const now = new Date().getTime();

    const sortedRounds = [...rounds].sort((a, b) => new Date(a.time) - new Date(b.time));

    const activeRound = sortedRounds.filter((r) => now >= new Date(r.time).getTime()).pop();
    const nextRound = sortedRounds.find((r) => now < new Date(r.time).getTime());
    const currentRound = activeRound || nextRound;

    const hasStarted = currentRound?.startTime ? now >= new Date(currentRound.startTime).getTime() : true;
    const TOTAL_CHANCES = currentRound?.chances ? Number(currentRound.chances) : 0;

    const handleLogOut = () => {
        const confirmLogout = confirm("Are you sure want to logout?");
        if (confirmLogout) {
            localStorage.removeItem("customer") || [];
            localStorage.removeItem("finalResults") || [];
            localStorage.removeItem("predictions") || [];
            if (currentRound) {
                const roundTime = new Date(currentRound.time).getTime();
                localStorage.setItem(`result_done_${roundTime}`, "false");
            }
            navigate("/");
        }
    }


    return (
        <>
            <div>
                <div>
                    <>
                        <div className="customer-details">
                            <h3>Balance: ₹{balance}</h3>
                            <h3>Chance: {chance} / 6</h3>
                            <h3>
                                Start At: {nextRound &&
                                    currentRound?.startTime
                                    ? new Date(currentRound.startTime).toLocaleString()
                                    : "No start time"
                                }
                            </h3>
                            <h3>Reveal at: {nextRound ? new Date(currentRound.time).toLocaleString() : "No available rounds"} </h3>
                        </div>
                        <div
                            style={{
                                marginBottom: "30px",
                                padding: "7px",
                            }}
                        >

                            {currentRound ? <div className="grid">
                                {Array.from({ length: TOTAL_CHANCES }).map(
                                    (_, chanceIndex) => (
                                        <div key={chanceIndex}
                                            style={{
                                                backgroundColor:
                                                    gameResults[chanceIndex]?.status === "WON"
                                                        ? "#11dd41"
                                                        : gameResults[chanceIndex]?.status === "LOSS"
                                                            ? "#eb3140"
                                                            : "",

                                                border:
                                                    gameResults[chanceIndex]?.status === "WON"
                                                        ? ""
                                                        : gameResults[chanceIndex]?.status === "LOSS"
                                                            ? "2px solid red"
                                                            : "",

                                                borderRadius: "10px", padding: "0px", marginBottom: "15px",
                                            }}>
                                            <p>Chance: {chanceIndex + 1}</p>
                                            {gameResults[chanceIndex] && (
                                                <p>Your Numbers:{" "}
                                                    {gameResults[chanceIndex].numbers.join(", ")}
                                                </p>
                                            )}

                                            {gameResults[chanceIndex] ? (
                                                <div style={{ padding: "20px", textAlign: "center" }}>
                                                    <h2
                                                        style={{
                                                            color:
                                                                gameResults[chanceIndex].status === "WON"
                                                                    ? "black"
                                                                    : "white",
                                                        }}
                                                    >
                                                        {gameResults[chanceIndex].status}
                                                    </h2>

                                                    <h3 className="won">
                                                        {gameResults[chanceIndex].randomValue}
                                                    </h3>
                                                </div>
                                            ) : (
                                                <div className="chances-box">
                                                    {Array.from({ length: 9 }).map((_, boxIndex) => (
                                                        <input
                                                            key={boxIndex}
                                                            type="number"
                                                            min={1}
                                                            max={99}
                                                            value={inputValue[`${chanceIndex}-${boxIndex}`] || ""}
                                                            onChange={(e) => handleChange(chanceIndex, boxIndex, e)}
                                                            onBlur={(e) => handleBlur(chanceIndex, boxIndex, e)}
                                                            disabled={!hasStarted || chanceIndex !== chance - 1}
                                                        />
                                                    ))}

                                                    <button
                                                        onClick={() => handleSave(chanceIndex)}
                                                        disabled={!hasStarted || chanceIndex !== chance - 1 || savedChances.includes(chanceIndex)}
                                                        style={{
                                                            backgroundColor: savedChances.includes(chanceIndex)
                                                                ? "green"
                                                                : "",
                                                            color: savedChances.includes(chanceIndex)
                                                                ? "white"
                                                                : ""
                                                        }}
                                                    >
                                                        SAVE
                                                    </button>
                                                </div>
                                            )}

                                        </div>
                                    ))}
                            </div> : (
                                <p>No active round available at this time</p>
                            )}
                        </div>
                    </>
                </div>

                <div className="available-round">
                    {currentRound && <button onClick={() => navigate("/available-rounds")}>Show available Rounds</button>} {" "}
                    <button onClick={handleLogOut}>LogOut</button>
                </div>
            </div>
        </>
    )
};

export default Customer;
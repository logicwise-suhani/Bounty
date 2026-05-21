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

    // useEffect(() => {
    //     const data = localStorage.getItem("rounds");
    //     if (data) {
    //         const parsedData = JSON.parse(data);
    //         setRounds(parsedData);
    //     }
    // }, []);

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

    const visibleRounds = (currentId) => {
        const filteredRounds = rounds.filter((round) => (
            round.id !== currentId
        ));
        console.log(filteredRounds);
    }

    return (
        <>
            <button onClick={visibleRounds}>Click</button>
            <div>
                <div className="customer-details">
                    <h3>Balance: ₹1000</h3>
                    <h3>Chance: {chance} / 6</h3>
                    <h3>Reveal in: {new Date(time).toLocaleTimeString()} </h3>
                </div>

                <div>
                    {rounds.length === 0 ? (<p>Come back later</p>) : rounds.map((round, index) => (
                        <>
                            <div key={round.id}
                                style={{
                                    marginBottom: "30px", border: "1px solid #ccc", padding: "10px",
                                }}
                            >
                                <h3>Round {round.roundNumber}</h3>

                                <div className="grid">
                                    {Array.from({
                                        length: Number(round.chances),
                                    }).map((_, chanceIndex) => (
                                        <div key={chanceIndex}>
                                            <p>Chance: {chanceIndex + 1}</p>
                                            <div className="chances-box">
                                                {Array.from({ length: 9 }).map((_, boxIndex) => (
                                                    <div key={boxIndex}>
                                                        <input
                                                            type="number"
                                                            min={1}
                                                            max={99}
                                                            value={inputValue[`${index}-${chanceIndex}-${boxIndex}`] || ""}
                                                            onChange={(e) => handleChange(index, chanceIndex, boxIndex, e)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ))}
                </div>

                <div>
                    <button onClick={() => navigate("/")}>BACK</button>
                </div>
            </div>
        </>
    )
};

export default Customer;
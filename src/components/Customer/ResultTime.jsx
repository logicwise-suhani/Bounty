import { useEffect, useState } from "react";

function ResultTime() {
    const [randomNumAns, setRandomNumAns] = useState([]);
    const [prediction, setPrediction] = useState([]);
    const [results, setResults] = useState([]);
    const [rounds, setRounds] = useState([]);
    const [resultShown, setResultShown] = useState(false);

    useEffect(() => {
        try {
            const randomNum = localStorage.getItem("randomNum");
            setRandomNumAns(randomNum ? JSON.parse(randomNum) : []);

            const predictions = localStorage.getItem("predictions");
            setPrediction(predictions ? JSON.parse(predictions) : []);
        } catch (error) {
            console.error("Error parsing localStorage data:", error);
        }
    }, []);

    useEffect(() => {
        try {
            const chances = localStorage.getItem("chances");
            setRounds(chances ? JSON.parse(chances) : []);
        } catch (error) {
            console.error("Error parsing chances:", error);
        }
    }, []);

    const showResult = () => {
        const finalResults = prediction.map((pred, index) => {
            const randomValue = randomNumAns[index];

            const isWon =
                Array.isArray(pred.numbers) &&
                pred.numbers.includes(randomValue);

            return {
                ...pred,
                randomValue,
                status: isWon ? "WON" : "LOSS",
            };
        });

        setResults(finalResults);
        localStorage.setItem(
            "finalResults",
            JSON.stringify(finalResults)
        );
    };

    const now = Date.now();

    const sortedRounds = [...rounds].sort(
        (a, b) => new Date(a.time) - new Date(b.time)
    );

    const activeRound = sortedRounds
        .filter((r) => now >= new Date(r.time).getTime())
        .pop();

    const nextRound = sortedRounds.find(
        (r) => now < new Date(r.time).getTime()
    );

    const currentRound = activeRound || nextRound;

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = Date.now();

            if (currentRound && !resultShown) {
                const roundTime = new Date(currentRound.time).getTime();

                if (currentTime >= roundTime) {
                    showResult();
                    setResultShown(true);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [currentRound, resultShown]);

    // return (
    //     <div>
    //         <h3>Final Result</h3>

    //         {results.map((item, index) => (
    //             <div key={index}>
    //                 <p>Chance: {item.chance}</p>

    //                 <p>
    //                     Numbers:{" "}
    //                     {Array.isArray(item.numbers)
    //                         ? item.numbers.join(", ")
    //                         : ""}
    //                 </p>

    //                 <h4
    //                     style={{
    //                         color:
    //                             item.status === "WON"
    //                                 ? "green"
    //                                 : "red",
    //                     }}
    //                 >
    //                     {item.status}
    //                 </h4>
    //             </div>
    //         ))}
    //     </div>
    // );
}

export default ResultTime;
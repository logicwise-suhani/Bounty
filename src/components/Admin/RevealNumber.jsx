import { useEffect, useState } from "react";

function RevealNumber() {
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
        <div className="reveal">
            {randoms.length > 0 ? randoms.map((num, i) => (
                <div key={i}>
                    Chance {i + 1}: {num}
                </div>
            )) : (
                <p>No reveal available. Create round first.</p>
            )}
        </div>
    );
}

export default RevealNumber; 

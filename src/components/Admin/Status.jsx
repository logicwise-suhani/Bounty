import { useEffect, useState } from "react";

function Status({ onClose }) {
    const [chancesCount, setChancesCount] = useState(0); 

    useEffect(() => {
        const roundsData = localStorage.getItem("rounds");
        const parsedRoundData = JSON.parse(roundsData);
        if (parsedRoundData) {
            setChancesCount(parsedRoundData.length ? parsedRoundData[0].chances : 0)
        }
    }, []);
 
    return ( 
        <>
            <div>
                {Array.from({ length: chancesCount }).map((_, i) => (
                    <div key={i}>Chance {i + 1}: status pending...</div>
                ))}

                <div>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </>
    )

};

export default Status;


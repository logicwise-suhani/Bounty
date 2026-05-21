import { useState } from "react";
import { useEffect } from "react";

function Results({ onClose }) {
    const [winningNum, setWinningNum] = useState(null);

    useEffect(() => {
        const winning = localStorage.getItem("randomNumber");
        setWinningNum(winning);
    }, []);

    return (
        <> 
            <div>
                <div>
                    <h3>Winning number : {winningNum}</h3>
                    <h3>Total Winners : </h3>
                    <h3>Total Paid: </h3>
                    <h3>Platform Profit: </h3>
                </div>

                <div>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </>
    )

};

export default Results;
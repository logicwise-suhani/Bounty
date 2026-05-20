import { useEffect } from "react";
import { useState } from "react";

function RevealNumber({ onClose }) {
    const [number] = useState(() => {
        return Math.floor((Math.random() * 99) + 1)
    })

    useEffect(() => {
        localStorage.setItem("randomNumber", number);
    }, [number]); 

    return (
        <>
            <div>
                <p>Winning number is: {number}</p>

                <div>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </>
    )
};

export default RevealNumber;
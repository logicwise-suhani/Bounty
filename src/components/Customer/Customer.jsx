import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Customer() {

    const [time, setTime] = useState(new Date().getTime());

    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().getTime());
        }, 1000)

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div>
                <div>
                    <h3>Balance: ₹1000</h3>
                    <h3>Chance: ...ongoing chance</h3>
                    <h3>Reveal in: {new Date(time).toLocaleTimeString()} </h3>
                </div>

                <div>
                    <button onClick={() => navigate("/")}>BACK</button>
                </div>
            </div>
        </>
    )
};

export default Customer;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ShowAvailableRounds() {
    const [rounds, setRounds] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("chances")) || [];
        setRounds(data);
    }, []);

    const navigate = useNavigate();

    return (
        <>
            <div>
                Available Rounds
                <div>
                    {rounds.length > 0 ? rounds.map((time, index) => (
                        <h3 key={index}>{new Date(time.time).toLocaleString()}</h3>
                    )) : "No data found. Sorry!"}
                </div>

                <div>
                    <button onClick={() => navigate(-1)}>BACK</button>
                </div>
            </div>
        </>
    )

};

export default ShowAvailableRounds;
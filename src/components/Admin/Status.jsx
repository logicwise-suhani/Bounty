import { useEffect, useState } from "react";

function Status() {
    const [chancesCount, setChancesCount] = useState(0);
    const [currentChance, setCurrentChance] = useState(1);

    useEffect(() => {
        const roundsData = JSON.parse(localStorage.getItem("chances"));

        if (roundsData && roundsData.length > 0) {
            setChancesCount(roundsData[0].chances || 0);
        }

        const savedChance = Number(localStorage.getItem("chance")) || 1;
        setCurrentChance(savedChance);
    }, []);

    const predictions = JSON.parse(localStorage.getItem("predictions")) || [];
    const results = JSON.parse(localStorage.getItem("finalResults")) || [];

    const getStatus = (index) => {
        const isSaved = predictions.some(p => p.chance === index + 1);
        const hasResult = results[index];

        if (hasResult) return "COMPLETED";
        if (index + 1 === currentChance) return "ACTIVE";
        if (isSaved) return "WAITING";

        return "WAITING";
    };

    return (
        <div className="status-div">
            {chancesCount > 0 ? Array.from({ length: chancesCount }).map((_, i) => (
                <div className="status"
                    key={i}
                    style={{
                        background:
                            getStatus(i) === "COMPLETED"
                                ? "#11dd41"
                                : getStatus(i) === "ACTIVE"
                                    ? "#facc15"
                                    : "#e5e7eb",
                    }}
                >
                    Chance {i + 1}: {getStatus(i)}
                </div>
            )) : "No status available. Please create a round first."}
        </div>
    );
}

export default Status;


// import { useEffect, useState } from "react";

// function Status() {
//     const [chancesCount, setChancesCount] = useState(0);
//     const [currentChance, setCurrentChance] = useState(1);
//     const [results, setResults] = useState([]);

//     useEffect(() => {
//         const roundsData = JSON.parse(localStorage.getItem("chances")) || [];

//         if (roundsData.length > 0) {
//             setChancesCount(Number(roundsData[0].chances || 0));
//         }

//         const savedChance = Number(localStorage.getItem("chance")) || 1;
//         setCurrentChance(savedChance);

//         const res = JSON.parse(localStorage.getItem("finalResults")) || [];
//         setResults(res);
//     }, []);

//     const getStatus = (index) => {
//         const isCompleted = results.some(r => r.chance === index + 1);
//         const isActive = index + 1 === currentChance;

//         if (isCompleted) return "COMPLETED";
//         if (isActive) return "ACTIVE";
//         return "WAITING";
//     };

//     return (
//         <div className="status-div">
//             {chancesCount > 0 ? (
//                 Array.from({ length: chancesCount }).map((_, i) => {
//                     const status = getStatus(i);

//                     return (
//                         <div
//                             key={i}
//                             className="status"
//                             style={{
//                                 background:
//                                     status === "COMPLETED"
//                                         ? "#11dd41"
//                                         : status === "ACTIVE"
//                                             ? "#facc15"
//                                             : "#e5e7eb",
//                                 padding: "10px",
//                                 marginBottom: "8px",
//                                 borderRadius: "8px",
//                             }}
//                         >
//                             Chance {i + 1}: {status}
//                         </div>
//                     );
//                 })
//             ) : (
//                 <p>No status available. Please create a round first.</p>
//             )}
//         </div>
//     );
// }

// export default Status;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Round from "./Round";
import Status from "./Status";
import RevealNumber from "./RevealNumber";
import { useEffect } from "react";
import Players from "./Players";
import Results from "./Results";

function AdminDashboard() {
    const [show, setShow] = useState("");
    const [rounds, setRounds] = useState([]);

    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = confirm("Are you sure want to logout?");
        if (confirmLogout) {
            localStorage.removeItem("admin") || [];
            navigate("/create-bounty");
        }
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("chances")) || [];
        setRounds(data);
    }, [show]);

    useEffect(() => {
        const isAdmin = localStorage.getItem("admin") || {};
        if (!isAdmin) {
            navigate("/create-bounty")
        }
    }, [navigate]);

    return (
    <div style={{ padding: "20px" }}>

        <h2>Admin Dashboard</h2>

        <table border="1" cellPadding="10" style={{ width: "100%", marginBottom: "20px" }}>
            <tbody>
                <tr>
                    <td><button onClick={() => setShow("round")}>Rounds</button></td>
                    <td><button onClick={() => setShow("status")}>Status</button></td>
                    <td><button onClick={() => setShow("reveal")}>Reveal</button></td>
                    <td><button onClick={() => setShow("results")}>Results</button></td>
                    <td><button onClick={() => setShow("players")}>Players</button></td>
                </tr>
            </tbody>
        </table>

        <div>
            {show === "round" && <Round />}
            {show === "status" && <Status />}
            {show === "reveal" && <RevealNumber />}
            {show === "results" && <Results />}
            {show === "players" && <Players />}
        </div>

        <h3>Rounds Overview</h3>

        <table border="1" cellPadding="10" style={{ width: "100%" }}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Players</th>
                    <th>Chances</th>
                    <th>Multiplier</th>
                    <th>Time</th>
                </tr>
            </thead>

            <tbody>
                {(() => {
                    const rounds =
                        JSON.parse(localStorage.getItem("chances")) || [];

                    if (rounds.length === 0) {
                        return (
                            <tr>
                                <td colSpan="5">No Rounds Found</td>
                            </tr>
                        );
                    }

                    return rounds
                        .sort((a, b) => new Date(a.time) - new Date(b.time))
                        .map((r, i) => (
                            <tr key={r.id || i}>
                                <td>{i + 1}</td>
                                <td>{r.players}</td>
                                <td>{r.chances}</td>
                                <td>{r.betMultiplier}</td>
                                <td>{r.time}</td>
                            </tr>
                        ));
                })()}
            </tbody>
        </table>

        <br />

        <button onClick={handleLogout}>
            Logout
        </button>

    </div>
);
};

export default AdminDashboard;
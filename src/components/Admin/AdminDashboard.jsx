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
    const [refresh, setRefresh] = useState(0);
    const [history, setHistory] = useState([]);

    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = confirm("Are you sure want to logout?");
        if (confirmLogout) {
            localStorage.removeItem("admin") || [];
            navigate("/");
        }
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("gameHistory")) || [];
        setHistory(data);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("chances")) || [];
        setRounds(data);
    }, [show, refresh]);

    useEffect(() => {
        const isAdmin = localStorage.getItem("admin") || {};
        if (!isAdmin) {
            navigate("/create-bounty")
        }
    }, [navigate]);

    const handleDelete = (id) => {
        const confirmDelete = confirm("Are you sure want to delete this round?");
        if (confirmDelete) {
            const existing = JSON.parse(localStorage.getItem("chances")) || [];
            const updated = existing.filter((r) => r.id !== id);
            localStorage.setItem("chances", JSON.stringify(updated));
            setRounds(updated);
            setRefresh((prev) => prev + 1);
        }
    };

    return (
        <div style={{ padding: "20px" }} className="admin-dashboard">

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

            <div style={{ marginTop: "50px" }}>
                <h3>Game History</h3>

                <table border="1" cellPadding="10" width="100%">
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Player</th>
                            <th>Details</th>
                            <th>Total Balance</th>
                        </tr>
                    </thead>

                    <tbody>
                        {history.length === 0 ? (
                            <tr>
                                <td colSpan="4">No history found</td>
                            </tr>
                        ) : (
                            history.map((h) => (
                                <tr key={h.id}>
                                    <td>{new Date(h.time).toLocaleString()}</td>
                                    <td>{h.player}</td>
                                    <td>
                                        {h.results.map((r, i) => (
                                            <div key={i}>
                                                <strong> Chance {i + 1}</strong>  Numbers: {r.numbers.join(", ")} | Win Number: {r.randomValue} | {r.status}
                                            </div>
                                        ))}
                                    </td>
                                    <td>₹{h.totalBalance}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="rounds-overview" style={{ marginTop: "80px" }}>
                <h3>Rounds Overview</h3>

                <table border="1" cellPadding="10" style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Players</th>
                            <th>Chances</th>
                            <th>Multiplier</th>
                            <th>Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {(() => {
                            const roundsData = rounds;

                            if (rounds.length === 0) {
                                return (
                                    <tr>
                                        <td colSpan="6">No Rounds Found</td>
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
                                        <td>
                                            <button onClick={() => handleDelete(r.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ));
                        })()}
                    </tbody>
                </table>
            </div>

            <button onClick={handleLogout}>
                Logout
            </button>

        </div>
    );
};

export default AdminDashboard;
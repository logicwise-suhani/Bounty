import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Round from "./Round";
import Status from "./Status";
import RevealNumber from "./RevealNumber";
import Players from "./Players";
import Results from "./Results";

function AdminDashboard() {
    const [show, setShow] = useState("history");

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
    };

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
            navigate("/create-bounty");
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

    const menuStyle = (panel) => ({
        width: "100%",
        padding: "12px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        textAlign: "left",
        fontWeight: "600",
        background: show === panel ? "#111827" : "#f3f4f6",
        color: show === panel ? "#fff" : "#111827",
        marginBottom: "10px",
    });

    return (
        <div
            className="admin-dashboard"
            style={{
                display: "flex",
                minHeight: "100vh",
                background: "#f9fafb",
            }}
        >
            <div
                style={{
                    width: "250px",
                    background: "#fff",
                    borderRight: "1px solid #e5e7eb",
                    padding: "20px",
                }}
            >
                <h2 style={{ marginBottom: "30px" }}>Admin Dashboard</h2>

                <button
                    style={menuStyle("history")}
                    onClick={() => setShow("history")}
                >
                    Game History
                </button>

                <button
                    style={menuStyle("round")}
                    onClick={() => setShow("round")}
                >
                    Rounds
                </button>

                <button
                    style={menuStyle("status")}
                    onClick={() => setShow("status")}
                >
                    Status
                </button>

                <button
                    style={menuStyle("reveal")}
                    onClick={() => setShow("reveal")}
                >
                    Reveal
                </button>

                <button
                    style={menuStyle("results")}
                    onClick={() => setShow("results")}
                >
                    Results
                </button>

                <button
                    style={menuStyle("players")}
                    onClick={() => setShow("players")}
                >
                    Players
                </button>

                <button
                    onClick={handleLogout}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "30px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#dc2626",
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: "600",
                    }}
                >
                    Logout
                </button>
            </div>

            <div
                style={{
                    flex: 1,
                    padding: "25px",
                    overflowX: "auto",
                }}
            >
                {show === "round" && <Round />}
                {show === "status" && <Status />}
                {show === "reveal" && <RevealNumber />}
                {show === "results" && <Results />}
                {show === "players" && <Players />}
                {show === "history" && (
                    <div>
                        <h3>Game History</h3>

                        <table
                            border="1"
                            cellPadding="10"
                            width="100%"
                            style={{
                                background: "#fff",
                                borderCollapse: "collapse",
                            }}
                        >
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
                                        <td colSpan="4">
                                            No history found
                                        </td>
                                    </tr>
                                ) : (
                                    history.map((h) => (
                                        <tr key={h.id}>
                                            <td>
                                                {new Date(
                                                    h.time
                                                ).toLocaleString()}
                                            </td>

                                            <td>{h.player}</td>

                                            <td>
                                                {h.results.map((r, i) => (
                                                    <div key={i}>
                                                        <strong>
                                                            Chance {i + 1}
                                                        </strong>{" "}
                                                        Numbers:{" "}
                                                        {r.numbers.join(", ")} |
                                                        Win Number:{" "}
                                                        {r.randomValue} |{" "}
                                                        {r.status}
                                                    </div>
                                                ))}
                                            </td>

                                            <td>
                                                ₹{h.totalBalance}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        <div
                            className="rounds-overview"
                            style={{ marginTop: "50px" }}
                        >
                            <h3>Rounds Overview</h3>

                            <table
                                border="1"
                                cellPadding="10"
                                style={{
                                    width: "100%",
                                    background: "#fff",
                                    borderCollapse: "collapse",
                                }}
                            >
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
                                    {rounds.length === 0 ? (
                                        <tr>
                                            <td colSpan="6">
                                                No Rounds Found
                                            </td>
                                        </tr>
                                    ) : (
                                        rounds
                                            .sort(
                                                (a, b) =>
                                                    new Date(a.time) -
                                                    new Date(b.time)
                                            )
                                            .map((r, i) => (
                                                <tr key={r.id || i}>
                                                    <td>{i + 1}</td>
                                                    <td>{r.players}</td>
                                                    <td>{r.chances}</td>
                                                    <td>
                                                        {r.betMultiplier}
                                                    </td>
                                                    <td>{r.time}</td>
                                                    <td>
                                                        <button onClick={() => handleDelete(r.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
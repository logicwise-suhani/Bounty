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

    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = confirm("Are you sure want to logout?");
        if (confirmLogout) {
            localStorage.removeItem("admin") || [];
            navigate("/create-bounty");
        }
    }

    useEffect(() => {
        const isAdmin = localStorage.getItem("admin") || {};
        if (!isAdmin) {
            navigate("/create-bounty")
        }
    }, [navigate]);

    return (
        <>
            {!show ? <div>
                <h3>Admin Dashboard</h3>
                <div>
                    <button onClick={() => setShow("round")}>Create Round</button> {" "}
                    <button onClick={() => setShow("status")}>Status</button> {" "}
                    <button onClick={() => setShow("reveal")}>Reveal</button> {" "}
                    <button onClick={() => setShow("players")}>Players</button> {" "}
                    <button onClick={() => setShow("results")}>Results</button>
                </div>

                <br />
                <button onClick={handleLogout}>LogOut</button>
            </div> :
                (
                    <>
                        {show === "round" && <Round onClose={() => setShow("")} />}
                        {show === "status" && <Status onClose={() => setShow("")} />}
                        {show === "reveal" && <RevealNumber onClose={() => setShow("")} />}
                        {show === "players" && <Players onClose={() => setShow("")} />}
                        {show === "results" && <Results onClose={() => setShow("")} />}
                    </>
                )
            }
        </>
    )
};

export default AdminDashboard;
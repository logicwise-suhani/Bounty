import { useNavigate } from "react-router-dom";

function AdminDashboard() {

    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = confirm("Are you sure want to logout?");
        if (confirmLogout) {
            localStorage.removeItem("admin") || [];
            navigate("/create-bounty");
        }
    }

    return (
        <>
            <div>
                <p>Admin Dashboard</p>
                <input
                    type="number"
                />
            </div>

            <button onClick={handleLogout}>LogOut</button>

        </>
    )
};

export default AdminDashboard;
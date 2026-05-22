import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (
        <>
            <div className="home">
                <button onClick={() => navigate("/create-bounty")}>ADMIN</button> {" "}
                <button onClick={() => navigate("/customer")}>CUSTOMER</button>
            </div>
        </>
    )

}

export default Home;
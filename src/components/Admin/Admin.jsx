import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {

    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [loginError, setLoginError] = useState("");

    const navigate = useNavigate();
    const adminEmail = "admin@a.com"; 
    const adminPassword = "123456";

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("admin"));
        if (loggedUser) {
            navigate("/admin-dashboard");
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value
        });
    };

    const handleBlur = (e) => {
        const { name } = e.target;

        setTouched({
            ...touched,
            [name]: true
        });
    };

    const validate = () => {
        let newErrors = {};

        if (!values.email) {
            newErrors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            newErrors.email = "Invalid email address";
        }

        if (!values.password) {
            newErrors.password = "Password is required";
        } else if (values.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {

            if (
                values.email === "admin@a.com" &&
                values.password === "123456"
            ) {
                setLoginError("");
            } else {
                setLoginError("Invalid email or password");
            }
        }
    };

    const handleLogin = () => {
        if (values.email === adminEmail && values.password === adminPassword) {
            const adminData = {
                email: adminEmail
            };

            localStorage.setItem("admin", JSON.stringify(adminData));
            navigate("/admin-dashboard")
        } else {
            setLoginError("Invalid admin credentials")
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="admin-login">
                    <h2>Login</h2>

                    <input
                        placeholder="Enter email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <br />

                    <span style={{ color: "red" }}>
                        {touched.email && errors.email}
                    </span>

                    <br />
                    <input
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <br />
                    <span style={{ color: "red" }}>
                        {touched.password && errors.password}
                    </span>

                    <br />

                    {loginError && (
                        <p style={{ color: "red" }}>{loginError}</p>
                    )}

                    <button onClick={() => navigate("/")}>BACK</button> {" "}
                    <button onClick={handleLogin}>Login</button>
                </div>
            </form>
        </>
    );
}

export default Admin;
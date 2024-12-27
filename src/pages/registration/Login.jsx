import myContext from "../../context/myContext";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Loader } from "lucide-react";

const Login = () => {
    const { loading, setLoading } = useContext(myContext); // Changed to setLoading
    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    });

    const userLoginFunction = async () => {
        if (userLogin.email === "" || userLogin.password === "") {
            return toast.error("All fields are required");
        }

        setLoading(true); // Changed to setLoading

        try {
            const userCredential = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            const q = query(collection(fireDB, "user"), where("uid", "==", userCredential.user.uid));

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let user;
                querySnapshot.forEach((doc) => (user = doc.data()));
                localStorage.setItem("users", JSON.stringify(user));
                setUserLogin({ email: "", password: "" });
                toast.success("Logged in successfully");

                if (user.role === "user") {
                    navigate("/user-dashboard");
                } else {
                    navigate("/admin-dashboard");
                }

                setLoading(false); // Changed to setLoading
            });

            return () => unsubscribe();
        } catch (error) {
            console.error(error);
            toast.error("Login failed. Please try again.");
            setLoading(false); // Changed to setLoading
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            {loading && <Loader />}
            <div className="login_Form bg-pink-50 px-4 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">
                <div className="mb-5">
                    <h2 className="text-center text-2xl font-bold text-pink-500">Login</h2>
                </div>

                <div className="mb-3">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={userLogin.email}
                        onChange={(e) =>
                            setUserLogin({
                                ...userLogin,
                                email: e.target.value,
                            })
                        }
                        className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
                        aria-label="Email Address"
                    />
                </div>

                <div className="mb-5">
                    <input
                        type="password"
                        placeholder="Password"
                        value={userLogin.password}
                        onChange={(e) =>
                            setUserLogin({
                                ...userLogin,
                                password: e.target.value,
                            })
                        }
                        className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
                        aria-label="Password"
                    />
                </div>

                <div className="mb-5">
                    <button
                        type="button"
                        onClick={userLoginFunction}
                        className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>

                <div>
                    <h2 className="text-black">
                        Don't have an account?{" "}
                        <Link className="text-pink-500 font-bold" to="/signup">
                            Signup
                        </Link>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Login;

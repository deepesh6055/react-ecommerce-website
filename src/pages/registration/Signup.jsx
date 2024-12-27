/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Loader } from "lucide-react";

const Signup = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context; 

    // navigate
    const navigate = useNavigate();

    //user signup
    const [userSignUp, setUserSignUp] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    // user signup function 

    const userSignUpFunction = async () => {
        if (userSignUp.name === "" || userSignUp.email === "" || userSignUp.password === "") {
            return toast.error("All Fields Are Required");
        }

        setLoading(true); // Correct function name

        try {
            const users = await createUserWithEmailAndPassword(auth, userSignUp.email, userSignUp.password);

            // create user object
            const user = {
                name: userSignUp.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignUp.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }),
            };

            // create refrence
            const userReference = collection(fireDB, "user");
            await addDoc(userReference, user);

            // add user details
            setUserSignUp({
                name: "",
                email: "",
                password: "",
            });

            toast.success("Signup Successfully");
            setLoading(false); // Correct function name
            navigate("/login");

        } catch (error) {
            console.error("Signup Error:", error);
            toast.error("Signup Failed. Try Again.");
            setLoading(false); // Correct function name
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">

            {/* // loader */}
            
            {loading && <Loader />}

            <div className="sign-up_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">
                <div className="mb-5">
                    <h2 className="text-center text-2xl font-bold text-pink-500">Sign Up</h2>
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={userSignUp.name}
                        onChange={(e) => setUserSignUp({ ...userSignUp, name: e.target.value })}
                        className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="email"
                        value={userSignUp.email}
                        onChange={(e) => setUserSignUp({ ...userSignUp, email: e.target.value })}
                        placeholder="Email Address"
                        className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
                    />
                </div>

                <div className="mb-5">
                    <input
                        type="password"
                        value={userSignUp.password}
                        onChange={(e) => setUserSignUp({ ...userSignUp, password: e.target.value })}
                        placeholder="Password"
                        className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
                    />
                </div>

                <div className="mb-5">
                    <button
                        type="button"
                        onClick={userSignUpFunction}
                        className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
                    >
                        Sign Up
                    </button>
                </div>

                <div>
                    <h2 className="text-black">
                        Have an account? <Link className="text-pink-500 font-bold" to="/login">Log In</Link>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Signup;

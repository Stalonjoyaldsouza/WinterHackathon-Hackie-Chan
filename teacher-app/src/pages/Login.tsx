import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Teacher Login</h1>
      <button onClick={login}>Login with Google</button>
    </div>
  );
}

export default Login;

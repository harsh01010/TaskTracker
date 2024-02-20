import { useState } from "react";
import "../styles/signin.css";

//firebase
import { auth, provider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const SignUp = ({ setShowLogin, setShowAuth }) => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [waiting, setWaiting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setWaiting(true);
    if (details.email === "" || details.password === "") {
      alert("enter both the fields");
      setErrorMessage("");
      setWaiting(false);
      return;
    }
    // await handleAuth();

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        details.email,
        details.password
      );
      console.log(response.user);
    } catch (err) {
      const message = err.code.split("/")[1];
      setErrorMessage(message);
      console.log(err.message);
    }

    setDetails({ email: "", password: "" });
    setWaiting(false);
  }

  const handleGoogleAuth = async () => {
    setWaiting(true);
    try {
      const response = await signInWithPopup(auth, provider);
      console.log(response.user);
    } catch (err) {
      const message = err.code.split("/")[1];
      setErrorMessage(message);
      console.log(err.code);
    }
    setWaiting(false);
  };
  if (errorMessage !== "") {
    return (
      <div className="form-cotainer">
        <ErrorDisplay message={errorMessage} setMessage={setErrorMessage} />
      </div>
    );
  } else {
    return (
      <div className="form-container">
        {!waiting ? (
          <form onSubmit={handleSubmit}>
            <span>
              <label>Email:</label>
              <input
                type="exail"
                value={details.email}
                onChange={(e) =>
                  setDetails((curr) => ({ ...curr, email: e.target.value }))
                }
                placeholder="Enter email here..."
              />
            </span>
            <span>
              <label>Password:</label>
              <input
                type="exail"
                value={details.password}
                onChange={(e) =>
                  setDetails((curr) => ({ ...curr, password: e.target.value }))
                }
                placeholder="Enter password here..."
              />
            </span>
            <button className="fix-btn">Sign Up</button>
          </form>
        ) : (
          <Hold />
        )}

        {!waiting && (
          <span className="text-center">
            Or{" "}
            <button className="btn" onClick={handleGoogleAuth}>
              Cotinue Using Google&rarr;
            </button>
          </span>
        )}
        <p>
          Already Signed Up?{" "}
          <span onClick={() => setShowLogin((curr) => !curr)} className="cptr">
            Sign In&rarr;
          </span>
        </p>
      </div>
    );
  }
};
const ErrorDisplay = ({ message, setMessage }) => {
  const handleClick = () => {
    setMessage("");
  };
  return (
    <div className="error">
      <span className="cptr" onClick={handleClick}>
        ❌
      </span>
      <p>{message}</p>
    </div>
  );
};

const Hold = () => {
  return (
    <div className="hold">
      <span>Hold On...</span>
    </div>
  );
};
export default SignUp;

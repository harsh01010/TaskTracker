import { useState } from "react";
import "../styles/signin.css";

import { auth, provider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const SignIn = ({ setShowLogin }) => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [waiting, setWaiting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWaiting(true);
    if (details.email === "" || details.password === "") {
      alert("enter both the fields");
      setErrorMessage("");
      setWaiting(false);
      return;
    }

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        details.email,
        details.password
      );
      console.log(response.user);
    } catch (err) {
      const message = err.code.split("/")[1];
      setErrorMessage(message);
      console.log(err.code);
    }
    setDetails({ email: "", password: "" });
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
                type="email"
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
            <button className="fix-btn">Sign In</button>
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
          Using First Time?{" "}
          <span onClick={() => setShowLogin((curr) => !curr)} className="cptr">
            Sign Up&rarr;
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
export default SignIn;

import React, { useState } from "react";
import "./Register.css"; // The same CSS for both forms

const Register = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage(""); // Clear message on toggle
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const url = isLogin
      ? "http://localhost:5000/api/login"
      : "http://localhost:5000/api/register";

    const payload = isLogin
      ? { email, password }
      : { first_name: firstName, last_name: lastName, email, password };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMessage(data.error);
        } else {
          setMessage(
            isLogin ? "Login successful!" : "Registration successful!"
          );
          if (!isLogin) {
            setFirstName("");
            setLastName("");
          }
          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage(
          isLogin
            ? "Login failed. Please try again."
            : "Registration failed. Please try again."
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="registration-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className="floating-label">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder=" "
                disabled={isSubmitting}
              />
              <label>First Name</label>
            </div>
            <div className="floating-label">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder=" "
                disabled={isSubmitting}
              />
              <label>Last Name</label>
            </div>
          </>
        )}
        <div className="floating-label">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=" "
            disabled={isSubmitting}
          />
          <label>Email</label>
        </div>
        <div className="floating-label">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=" "
            disabled={isSubmitting}
          />
          <label>Password</label>
        </div>
        <button type="submit" disabled={isSubmitting} className="ripple-button">
          {isSubmitting
            ? isLogin
              ? "Logging in..."
              : "Registering..."
            : isLogin
            ? "Login"
            : "Register"}
        </button>
      </form>
      {message && <p>{message}</p>}
      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span onClick={toggleForm} className="toggle-link">
          {isLogin ? "Register" : "Login"}
        </span>
      </p>
    </div>
  );
};

export default Register;

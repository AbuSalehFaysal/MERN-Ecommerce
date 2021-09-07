import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    // =======================================================================================
    // Prevent browser from auto reload
    // =======================================================================================
    e.preventDefault();
    const config = {
      url: "http://localhost:3000/register/complete",
      // =====================================================================================
      // User starts registration in one device but cannot finish it in another device
      // =====================================================================================
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is send to ${email}. Click the link to complete your registration.`
    );
    // =====================================================================================
    // Save user email in local storage
    // =====================================================================================
    window.localStorage.setItem("emailForRegistration", email);
    // =====================================================================================
    // Clear state
    // =====================================================================================
    setEmail("");
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <button type="submit" className="btn btn-dark mt-2">
        Register
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          <ToastContainer />
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;

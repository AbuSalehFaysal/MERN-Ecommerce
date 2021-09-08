import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    // console.log(window.location.href);
    // console.log(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    // =======================================================================================
    // Prevent browser from auto reload
    // =======================================================================================
    e.preventDefault();

    // =======================================================================================
    // Validation
    // =======================================================================================
    if (!email || !password) {
      toast.error("Email and Password is required!");
      return;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      // console.log(result.user.emailVerified);
      // console.log(result);
      if (result.user.emailVerified) {
        // =======================================================================================
        // Remove user email from local storage
        // =======================================================================================
        window.localStorage.removeItem("emailForRegistration");
        // =======================================================================================
        // Get user id token
        // =======================================================================================
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // =======================================================================================
        // Redux Store
        // =======================================================================================
        console.log("USER", user, "IdTokenResult", idTokenResult);
        // =======================================================================================
        // Redirect
        // =======================================================================================
        history.push("/");
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        autoFocus
      />
      <button type="submit" className="btn btn-dark mt-2">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;

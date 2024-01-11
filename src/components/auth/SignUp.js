import React, { useEffect, useRef, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const SIGNUP_URL = "/signup";

// Regular expressions for validation
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

/**
 * Represents the SignUp component.
 * @returns {JSX.Element} The rendered SignUp component.
 */
const SignUp = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setvalidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  console.log("signup ", success);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
  }, [pwd]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setvalidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, email]);

  useEffect(() => {
    // Remove border styles on initial render
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const email = document.getElementById("email");
    username.style.border = 0;
    password.style.border = 0;
    email.style.border = 0;
  }, []);

  useEffect(() => {
    // Apply border style for invalid username when focused
    if (!validName && userFocus) {
      const username = document.getElementById("username");
      username.style.border = "3px solid #ef4444";
    }
  }, [userFocus, validName]);

  useEffect(() => {
    // Apply border style for invalid password when focused
    if (!validPwd && pwdFocus) {
      const password = document.getElementById("password");
      password.style.border = "3px solid #ef4444";
    }
  }, [pwdFocus, validPwd]);

  useEffect(() => {
    // Apply border style for invalid email when focused
    if (!validEmail && emailFocus) {
      const email = document.getElementById("email");
      email.style.border = "3px solid #ef4444";
    }
  }, [emailFocus, validEmail]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(SIGNUP_URL, {
        user: user,
        pwd: pwd,
      });
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken.");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  function mousedownHandler(event) {
    event.target.id = "animationMouseDown";
  }

  function mouseupHandler(event) {
    event.target.id = "";
  }

  function loginLinkHandler() {
    navigate("/auth/login", { replace: true });
  }

  return (
    <>
      {/* Error message */}
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form onSubmit={submitHandler} className="contents">
        <fieldset className="flex flex-col bg-[rgba(0,0,0,.2)] shadow-2xl border-2 border-b-0 border-solid border-gray-300  w-[24vw] h-[50vh]">
          <legend className="select text-xl ml-4">SignUp</legend>
          {/* UserName */}
          <div className="flex flex-col mt-10 mb-4 mx-auto">
            <label className="select " htmlFor="username">
              Username:
            </label>
            <input
              className="input-default select rounded text-[.9rem] mt-[1.2px] h-[1.8rem] w-[12rem] text-black px-1"
              type="text"
              id="username"
              name="username"
              title="please enter your name"
              placeholder="Your Name"
              autoComplete="off"
              required
              value={user}
              ref={userRef}
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onChange={(e) => setUser(e.target.value)}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              style={{
                border: validName
                  ? "3px solid rgb(0, 172, 0)"
                  : "3px solid #ef4444",
              }}
            />
          </div>
          {/* Password */}
          <div className="flex flex-col mb-4 mx-auto">
            <label className="select " htmlFor="password">
              Password:
            </label>
            <input
              className="input-default select rounded text-[.9rem] mt-[1.2px] h-[1.8rem] w-[12rem] text-black px-1"
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              title="please enter your password"
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              style={{
                border: validPwd
                  ? "3px solid rgb(0, 172, 0)"
                  : "3px solid #ef4444",
              }}
            />
          </div>
          {/* E-Mail */}
          <div className="flex flex-col mb-7 mx-auto">
            <label className="select " htmlFor="email">
              Email:
            </label>
            <input
              className=" input-default select rounded text-[.9rem] mt-[1.2px] h-[1.8rem] w-[12rem] text-black px-1"
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              title="please enter your email"
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="pwdnote"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              style={{
                border: validEmail
                  ? "3px solid rgb(0, 172, 0)"
                  : "3px solid #ef4444",
              }}
            />
          </div>
          <button
            style={{ "--w": "6rem", "--h": "1.6rem" }}
            title="all inputs must be filled"
            className="select disabled grab before:left-[35.5%] before:rounded-sm mx-auto bg-[rgba(237,235,235,0.91)] pb-1 text-black w-[6rem] h-[1.6rem] rounded-sm"
            disabled={!validName || !validPwd || !validEmail}
          >
            Sign Up
          </button>
        </fieldset>
        {/* Login Link */}
        <p className="select bg-[rgba(0,0,0,.2)] border-2 border-t-0 pl-4 text-sm h-16 border-white">
          Already have an account?
          <br />
          <span className="select bg-[rgba(237,235,235,0.91)] text-center text-black rounded-sm font-[600] mt-1 w-[5rem] inline-block h-[1.3rem]">
            <button
              style={{ "--w": "5rem", "--h": "1.3rem" }}
              className="select grab before:left-[1.1rem]"
              onClick={loginLinkHandler}
              onMouseDown={mousedownHandler}
              onMouseUp={mouseupHandler}
            >
              Login
            </button>
          </span>
        </p>
      </form>
    </>
  );
};

export default SignUp;

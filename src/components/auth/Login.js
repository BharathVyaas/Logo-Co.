import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import UserAccountDetailsContext from "../../context/UserAccountDetailsContext";

const LOGIN_URL = "/login";

/**
 * Represents the Login component.
 * @returns {JSX.Element} The rendered Login component.
 */
const Login = () => {
  const userRef = useRef();
  const pwdRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const { setUserAccountDetails } = useContext(UserAccountDetailsContext);

  const [user, setUser] = useState("");
  const [userFocus, setUserFocus] = useState(false);

  useEffect(() => {
    userRef?.current.focus();
  }, []);

  const [pwd, setPwd] = useState("");
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  // Removing errror message on keydown
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    // Apply border style for invalid username when focused
    if (!user) {
      const username = document.getElementById("username");
      username.style.border = "3px solid #ef4444";
    } else {
      const username = document.getElementById("username");
      username.style.border = 0;
    }
  }, [userFocus, user]);

  useEffect(() => {
    // Apply border style for invalid password when focused
    if (!pwd) {
      const password = document.getElementById("password");
      password.style.border = "3px solid #ef4444";
    } else {
      const password = document.getElementById("password");
      password.style.border = 0;
    }
  }, [pwdFocus, pwd]);

  useEffect(() => {
    // Remove border styles on initial render
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    username.style.border = 0;
    password.style.border = 0;
  }, []);

  async function submitHandler(event) {
    event.preventDefault();
    try {
      await axios
        .post(LOGIN_URL, { user: user, password: pwd })
        .then((userDetails) => {
          if (userDetails.status === 200) {
            setUser("");
            setPwd("");
            setUserAccountDetails({
              user: userDetails.data.user,
              password: userDetails.data.password,
              email: userDetails.data.email,
            });
          }
        })
        .then(() => {
          navigate(-1);
        });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current?.focus();
    }
  }

  function mousedownHandler(event) {
    event.target.id = "animationMouseDown";
  }

  function mouseupHandler(event) {
    event.target.id = "";
  }

  function signUpLinkHandler() {
    navigate("/auth/signup", { replace: true });
  }

  return (
    <>
      {errMsg && (
        <p
          id="errMsgLogin"
          className={`absolute top-4 z-[-10] text-center text-[1.2rem] w-full h-12 py-2 bg-[rgba(255,0,0,.28)] text-red-500`}
          ref={errRef}
          aria-live="assertive"
        >
          {errMsg}
        </p>
      )}
      <form onSubmit={submitHandler} className="contents">
        <fieldset className="flex flex-col bg-[rgba(0,0,0,.2)] shadow-2xl border-2 border-b-0 border-solid border-gray-300  w-[24vw] h-[50vh]">
          <legend className="select text-xl ml-4">Login</legend>
          {/* Username */}
          <div className="flex flex-col mt-14 mb-3 mx-auto">
            <label className="select " htmlFor="username">
              Username:
            </label>
            <input
              className={`input-default select rounded text-[.9rem] mt-[1.2px] h-[1.8rem] w-[12rem] text-black px-1 ${
                user.trim() === "" ? "border-red-500" : "border-green-500"
              }`}
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              required
              ref={userRef}
              value={user}
              onChange={(e) => setUser(e.target.value)}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") pwdRef.current.focus();
              }}
            />
          </div>
          {/* Password */}
          <div className="flex flex-col my-3 mx-auto">
            <label className="select " htmlFor="password">
              Password:
            </label>
            <input
              className={`input-default select rounded text-[.9rem] mt-[1.2px] h-[1.8rem] w-[12rem] text-black px-1 ${
                pwd.trim() === "" ? "border-red-500" : "border-green-500"
              }`}
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              required
              ref={pwdRef}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
          </div>
          <button
            style={{ "--w": "6rem", "--h": "1.6rem" }}
            className={`select disabled grab select before:left-[35.5%]  before:rounded-sm mx-auto mt-7 bg-[rgba(237,235,235,0.91)] pb-1 text-black w-[6rem] h-[1.6rem] rounded-sm`}
            type="submit"
            disabled={user.trim() === "" || pwd.trim() === ""}
            onMouseDown={mousedownHandler}
            onMouseUp={mouseupHandler}
          >
            Login
          </button>
        </fieldset>
        {/* Sign Up Link */}
        <p className="select bg-[rgba(0,0,0,.2)] border-2 border-t-0 pl-4 text-sm h-16 border-white">
          Don't have an account?
          <br />
          <span className="select bg-[rgba(237,235,235,0.91)] text-center text-black rounded-sm font-[600] mt-1 w-[5rem] inline-block h-[1.3rem]">
            <button
              style={{ "--w": "5rem", "--h": "1.3rem" }}
              className="select grab before:left-[1.1rem]"
              onClick={signUpLinkHandler}
              onMouseDown={mousedownHandler}
              onMouseUp={mouseupHandler}
            >
              SignUp
            </button>
          </span>
        </p>
      </form>
    </>
  );
};

export default Login;

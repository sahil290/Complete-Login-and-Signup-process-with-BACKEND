import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolvers: yupResolver(loginSchema),
  });
  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/user/loginTwo", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data rec ", data);
        if (data.err) {
          console.log(data.err);
        } else {
          console.log("Successfully Logged In");
          console.log(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <form className="login-form">
        <div>
          <label htmlFor="email" className="email">
            Email
          </label>
          <br />
          <input
            {...register("email")}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            name="email"
            className="email"
            placeholder="Enter your email address"
          />
        </div>
        <p>{errors.email?.message}</p>
        <br />
        <div>
          <label htmlFor="password" className="password">
            Password
          </label>
          <br />
          <input
            {...register("password")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            name="password"
            className="password"
            placeholder="Enter your password"
          />
        </div>
        <p>{errors.password?.message}</p>
        <br />
        <button
          onClick={(e) => handleLogin(e)}
          className="submit"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Login;

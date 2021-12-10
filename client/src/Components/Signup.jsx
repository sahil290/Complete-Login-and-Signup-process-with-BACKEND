import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
const signupSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  age: yup.number().positive().integer().required(),
  phoneNumber: yup.number().positive().integer().required(),
  password: yup.string().min(8).max(32).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    phoneNumber: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };
  const signupHandler = (event) => {
    event.preventDefault();
    const addNewUser = {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      age: input.age,
      phoneNumber: input.phoneNumber,
      password: input.password,
    };
    axios.post("http://localhost:5000/user", addNewUser);
    console.log(addNewUser);
  };
  return (
    <>
      <form className="signup-form">
        <div>
          <label htmlFor="firstName" className="firstName">
            First name
          </label>
          <br />
          <input
            {...register("firstName")}
            value={input.firstName}
            onChange={handleChange}
            type="text"
            autoComplete="off"
            name="firstName"
            className="firstName"
            placeholder="Enter your first name"
          />
        </div>
        <p>{errors.firstName?.message}</p>
        <br />
        <div>
          <label htmlFor="last name" className="last-name">
            Last name
          </label>
          <br />
          <input
            {...register("lastName")}
            value={input.lastName}
            onChange={handleChange}
            type="text"
            autoComplete="off"
            name="lastName"
            className="lastName"
            placeholder="Enter your last name"
          />
        </div>
        <p>{errors.lastName?.message}</p>
        <br />
        <div>
          <label htmlFor="email" className="email">
            Email
          </label>
          <br />
          <input
            {...register("email")}
            value={input.email}
            onChange={handleChange}
            type="text"
            autoComplete="off"
            name="email"
            className="email"
            placeholder="Enter your email address"
          />
        </div>
        <p>{errors.email?.message}</p>
        <br />
        <div>
          <label htmlFor="age" className="age">
            Age
          </label>
          <br />
          <input
            {...register("age")}
            value={input.age}
            onChange={handleChange}
            type="text"
            autoComplete="off"
            name="age"
            className="age"
            placeholder="Enter your age"
          />
        </div>
        <p>{errors.age?.message}</p>
        <br />
        <div>
          <label htmlFor="phone number" className="phoneNumber">
            Ph.no
          </label>
          <br />
          <input
            {...register("phoneNumber")}
            value={input.phoneNumber}
            onChange={handleChange}
            type="text"
            autoComplete="off"
            name="phoneNumber"
            className="phoneNumber"
            placeholder="Enter your Ph.no"
          />
        </div>
        <p>{errors.phoneNumber?.message}</p>
        <br />
        <div>
          <label htmlFor="password" className="password">
            Password
          </label>
          <br />
          <input
            {...register("password")}
            value={input.password}
            onChange={handleChange}
            type="text"
            autoComplete="off"
            name="password"
            className="password"
            placeholder="Enter your password"
          />
        </div>
        <p>{errors.password?.message}</p>
        <br />
        <div>
          <label htmlFor="confirm-password" className="confirmPassword">
            Confirm Password
          </label>
          <br />
          <input
            {...register("confirmPassword")}
            type="text"
            autoComplete="off"
            name="confirmPassword"
            className="confirm-password"
            placeholder="Confirm your password"
          />
        </div>
        <p>{errors.confirmPassword?.message}</p>
        <br />
        <button className="submit" type="submit" onClick={signupHandler}>
          Signup
        </button>
      </form>
    </>
  );
};

export default Signup;

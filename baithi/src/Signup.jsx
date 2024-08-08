import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (user) => {
    try {
      await axios.post(`http://localhost:3000/signup`, user);
      alert("Đăng ký thành công");
      navigate("/signin");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="container">
      <div className="py-3 d-flex align-items-center justify-content-between">
        <h1>Đăng ký</h1>
        <Link to="/signin" className="btn btn-primary">
          Đăng nhập
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            {...register("email", { required: true })}
          />
          {errors.email && errors.email.type === "required" && (
            <div className="form-text text-danger">Không được để trống</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register("password", { required: true })}
          />
          {errors.password && errors.password.type === "required" && (
            <div className="form-text text-danger">Không được để trống</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;

import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductsEdit = ({ onUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      reset(data);
    })();
  }, []);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    onUpdate(data);
    navigate("/");
  };

  return (
    <div>
      <div className="py-3 d-flex align-items-center justify-content-between">
        <h1>Cập nhật sản phẩm</h1>
        <Link to="/" className="btn btn-primary">
          Danh sách sản phẩm
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Tên sản phẩm
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            {...register("name", { required: true })}
          />
          {errors.name && errors.name.type === "required" && (
            <div className="form-text text-danger">Không được để trống</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Ảnh sản phẩm
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            {...register("image", { required: true })}
          />
          {errors.image && errors.image.type === "required" && (
            <div className="form-text text-danger">Không được để trống</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Giá sản phẩm
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            {...register("price", {
              required: true,
              validate: (value) => !isNaN(value),
            })}
          />
          {errors.price && errors.price.type === "required" && (
            <div className="form-text text-danger">Không được để trống</div>
          )}
          {errors.price && errors.price.type === "validate" && (
            <div className="form-text text-danger">Phải là số</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="quality" className="form-label">
            Số lượng sản phẩm
          </label>
          <input
            type="text"
            className="form-control"
            id="quality"
            {...register("quality")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Mô tả sản phẩm
          </label>
          <textarea
            id="description"
            className="form-control"
            {...register("description")}
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductsEdit;

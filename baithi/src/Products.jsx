import React from "react";
import { Link } from "react-router-dom";

const Products = ({ products, removeProducts }) => {
  return (
    <div>
      <div className="py-3 d-flex align-items-center justify-content-between">
        <h1>Quản lý sản phẩm</h1>
        <Link to="/products/add" className="btn btn-primary">
          Thêm sản phẩm
        </Link>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>image</th>
            <th>price</th>
            <th>quality</th>
            <th>description</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((pro, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{pro.name}</td>
              <td>
                <img src={pro.image} alt={pro.name} width={90} />
              </td>
              <td>{pro.price}</td>
              <td>{pro.quality}</td>
              <td>{pro.description}</td>
              <td width={200}>
                <Link
                  to={`/products/${pro.id}/edit`}
                  className="btn btn-primary"
                >
                  Cập nhật
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => removeProducts(pro.id)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;

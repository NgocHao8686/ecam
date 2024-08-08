import { Link, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Signup from "./Signup";
import Signin from "./Signin";
import Products from "./Products";
import ProductsAdd from "./ProductsAdd";
import ProductsEdit from "./ProductsEdit";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:3000/products`);
      setProducts(data);
    })();
  }, []);
  const onhandleRemove = async (id) => {
    try {
      const confirm = window.confirm("Bạn có chắc muốn xoá ?");
      if (confirm) {
        await axios.delete(`http://localhost:3000/products/${id}`);
        alert("Xoá thành công");
        setProducts(products.filter((pro) => pro.id !== id));
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const onhandleAdd = async (pro) => {
    try {
      const { data } = await axios.post(`http://localhost:3000/products`, pro);
      setProducts([...products, data]);
      alert("Thêm sản phẩm thành công");
    } catch (error) {
      console.log(error.response);
    }
  };
  const onhandleUpdate = async (pro) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/products/${pro.id}`,
        pro
      );
      alert("Cập nhật sản phẩm thành công");
      setProducts(
        products.map((items) => (items.id === data.id ? data : items))
      );
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Products products={products} removeProducts={onhandleRemove} />}/>
          <Route path="products/add" element={<ProductsAdd onAdd={onhandleAdd} />}/>
          <Route path="products/:id/edit" element={<ProductsEdit onUpdate={onhandleUpdate} />}/>
        </Route>
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
      </Routes>
    </>
  );
}

export default App;

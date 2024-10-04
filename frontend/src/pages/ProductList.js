import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Row, Col, Input } from "antd";
import { fetchProducts, searchProductsByName } from "../api/ProductService";
import ProductForm from "../pages/ProductForm";
import { Button } from "antd";  // Import Button from Ant Design
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const ProductList = () => {
  const navigate = useNavigate();  // Initialize navigation
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsData = await fetchProducts();
      console.log(productsData);
      if (productsData) {
        setProducts(productsData);
        setFilteredProducts(productsData);
        console.log("filtered", productsData);
      }
    };

    getProducts();
  }, []);

  const handleSearch = async (value) => {
    if (value) {
      const searchResults = await searchProductsByName(value);
      setFilteredProducts(searchResults);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleProductCreated = async () => {
    const updatedProducts = await fetchProducts();
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  return (
    <div className="productList">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "1%",
        }}
      >
        <h1 style={{ margin: 0 }}>VIEW PRODUCTS</h1>
        <Search
          placeholder="Search products by name"
          onSearch={handleSearch}
          style={{ width: 300 }}
          allowClear
          enterButton="Search"
          size="large"
        />
      </div>
      <Button
          type="primary"
          onClick={() => navigate("/create-product")} 
        >
          Create Product
        </Button>
      <div className="productGrid" style={{ marginLeft: "1%" }}>
        <Row gutter={[16, 16]}>
          {filteredProducts &&
            filteredProducts.map((product) => (
              <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                <ProductCard
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  picture={product.picture}
                  sellerID={product.sellerID}
                  quantity={product.quantity}
                />
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default ProductList;

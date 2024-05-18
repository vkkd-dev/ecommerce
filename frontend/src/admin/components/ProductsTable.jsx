import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditProductModal from "./EditProductModal";
import axios from "axios";

function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error(error.response);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (productId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/delete-product",
        { productId }
      );
      console.log(response.data);
      fetchProducts();
    } catch (error) {
      console.error(error.response);
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const saveProduct = () => {
    fetchProducts();
    // handleEdit(editedProduct);
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Product List</h2>
        <input
          type="text"
          placeholder="Search product"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Id</th>
              <th className="py-2 px-4 border-b text-left">Title</th>
              <th className="py-2 px-4 border-b text-left">Description</th>
              <th className="py-2 px-4 border-b text-left">Price</th>
              <th className="py-2 px-4 border-b text-left">Category</th>
              <th className="py-2 px-4 border-b text-left">Sub-Category</th>
              <th className="py-2 px-4 border-b text-left">Total Stock</th>
              <th className="py-2 px-4 border-b text-left">Available Stock</th>
              <th className="py-2 px-4 border-b text-left">SKU</th>
              <th className="py-2 px-4 border-b text-left">Brand</th>
              <th className="py-2 px-4 border-b text-left">Images</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{product._id}</td>
                <td className="py-2 px-4 border-b">{product.title}</td>
                <td className="py-2 px-4 border-b">{product.description}</td>
                <td className="py-2 px-4 border-b">₹{product.price}</td>
                <td className="py-2 px-4 border-b">{product.category}</td>
                <td className="py-2 px-4 border-b">{product.subCategory}</td>
                <td className="py-2 px-4 border-b">{product.totalStock}</td>
                <td className="py-2 px-4 border-b">{product.availableStock}</td>
                <td className="py-2 px-4 border-b">{product.sku}</td>
                <td className="py-2 px-4 border-b">{product.brand}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex flex-wrap">
                    <FaImage
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        // window.open(material.url, "_blank");
                        window.open(
                          `http://localhost:5000/uploads/${product.image}`,
                          "_blank",
                          "noreferrer"
                        );
                      }}
                    />
                  </div>
                </td>
                <td className="py-2 px-4 border-b flex">
                  <MdDelete
                    width={25}
                    hanging={25}
                    style={{ cursor: "pointer", marginRight: "5px" }}
                    onClick={() => handleDelete(product._id)}
                  />
                  <MdEdit
                    width={25}
                    hanging={25}
                    style={{ cursor: "pointer", marginLeft: "5px" }}
                    onClick={() => openModal(product)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedProduct && (
          <EditProductModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={closeModal}
            onSave={saveProduct}
            fetchProducts={fetchProducts}
          />
        )}
      </div>
    </div>
  );
}

export default ProductsTable;

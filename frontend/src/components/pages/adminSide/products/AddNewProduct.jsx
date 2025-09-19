import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewProduct } from "../../../../store/adminside/adminSlice";
import toast from "react-hot-toast";
import Loading from "../../../../utils/loading/Loading";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";



export default function AddNewProduct() {
  const { loading, error } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    description: "",
    image: null || "",
    color: "",
    material: "",
    weight: "",
    brand: "",
    category: "",
  });
  const [imagePreview, setImagePreview] = useState(null || "");
  const dispatch = useDispatch();

  // handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      const file = files[0];
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { productName, price, description, image, color, material, weight, brand, category } = formData;

    if (!productName || !price || !description || !image || !color || !material || !weight || !brand || !category) {
      toast.error("Please fill in all fields");
      return;
    }

    const newProduct = new FormData();
    newProduct.append("productName", formData.productName);
    newProduct.append("price", formData.price);
    newProduct.append("description", formData.description);
    newProduct.append("image", formData.image);
    newProduct.append("color", formData.color);
    newProduct.append("material", formData.material);
    newProduct.append("weight", formData.weight);
    newProduct.append("brand", formData.brand);
    newProduct.append("category", formData.category);

    dispatch(addNewProduct(newProduct))
      .unwrap()
      .then(() => {
        toast.success("Product added successfully");
        Navigate("/admin/products");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <h2 className="text-xl md:text-2xl font-semibold ml-82 text-orange-400">
        Add New Product
      </h2>
      <div className="max-w-6xl ml-82 bg-white p-8 rounded shadow mt-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-900 text-sm">Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="inputs"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-900 text-sm">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="inputs"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-900 text-sm">Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="inputs"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-900 text-sm">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="inputs"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-900 text-sm">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="inputs"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-900 text-sm">Material</label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="inputs"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-900 text-sm">Weight</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="inputs"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-900 text-sm">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="inputs"
                rows={4}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-gray-900 text-sm">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="inputs"
            />
          </div>

          <img
            src={imagePreview || formData.image}
            alt={formData.productName}
            className="mt-4 w-full h-72 object-cover"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-500 transition disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

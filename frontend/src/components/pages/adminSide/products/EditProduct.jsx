import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editProduct } from "../../../../store/adminside/adminSlice";
import Loading from "../../../../utils/loading/Loading";
import toast from "react-hot-toast";

export default function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((state) => state.admin);
  const product = products.find((p) => p.id === parseInt(id));
  const [form, setForm] = useState({
    productName: "",
    price: "",
    category: "",
    description: "",
    image: null || "",
  });
  const [imagePreview, setImagePreview] = useState("");

  //
  useEffect(() => {
    if (product) {
      setForm({
        productName: product.productName || "",
        price: product.price || "",
        category: product.category || "",
        description: product.description || "",
        image: product.image || null || "",
      });
    }
  }, [product, dispatch]);

  // handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      const file = files[0];
      setForm({ ...form, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editProduct({ id, formData: form }));
    toast.success("Product updated successfully");
    navigate("/admin/products");
  };

  if (!product) {
    return (
      <div className="p-8 text-center text-gray-500">Product not found.</div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-orange-400">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Product Name</label>
          <input
            type="text"
            name="productName"
            value={form.productName}
            onChange={handleChange}
            className="inputs"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="inputs"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="inputs"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="inputs"
            rows={4}
          />
        </div>
        <div>
          <label className="block mb-1">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="inputs"
          />
        </div>

        <img
          src={imagePreview || form.image}
          alt={form.productName}
          className="mt-4 w-full h-72 object-cover"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-500 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

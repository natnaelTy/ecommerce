import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout, fetchCart } from "../../../store/product/productSlice";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatCurrency";
import { CreditCard } from "lucide-react";
import { PuffLoader } from "react-spinners";
import { z } from "zod";
import { MdErrorOutline } from "react-icons/md";
import toast from "react-hot-toast"; 
import axios from "axios";



export default function Checkout() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { cart, loading, error } = useSelector((state) => state.product);

  const [quantities, setQuantities] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    country: "Ethiopia",
    phone: "",
    paymentMethod: "chapa",
  });
  const [errors, setErrors] = useState({});

  const shippingSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone must be at least 10 digits"),
    address: z.string().min(2, "Address is required"),
    city: z.string().min(2, "City is required"),
    country: z.string().min(2, "Country is required"),
    paymentMethod: z.enum(["chapa"], {
      errorMap: () => ({ message: "Select a payment method" }),
    }),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user?.id) {
        toast.error("You must be logged in to place an order");
        return;
      }

      // Validate form data
      const validatedData = shippingSchema.parse(formData);
      console.log(validatedData)
      setErrors({});

      // Build items array for backend
      const items = cart.map((wi) => ({
        productId: wi.product.id,
        quantity: quantities[wi.product.id] || wi.quantity || 1,
      }));

      const payload = {
        userId: user.id,
        items,
        method: validatedData.paymentMethod,
      };

      const res = await axios.post(
        "http://localhost:5000/api/payment/initialize",
        {
          amount: cart.reduce((acc, wi) => {
            const product = wi.product || {};
            const qty = quantities[product.id] || wi.quantity || 1;
            return acc + (product.price || 0) * qty;
          }, 0),
          email: validatedData.email,
          fullName: validatedData.fullName,
          phone_number: validatedData.phone,
        }
      );

      console.log("Chapa response:", res.data);

      window.location.href = res.data.data.checkout_url; // redirect to Chapa
      // dispatch checkout
      await dispatch(createCheckout(payload)).unwrap();
      toast.success("Order placed successfully!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      const initialQuantities = {};
      cart.forEach((item) => {
        initialQuantities[item.product.id] = item.quantity;
      });
      setQuantities(initialQuantities);
    }
  }, [cart]);

  useEffect(() => {
    if (user?.id && isAuthenticated) {
      dispatch(fetchCart(user.id));
    }
  }, [dispatch, user?.id, isAuthenticated]);

  const cartList = cart.map((item) => item.product);

  const totalItems = Object.values(quantities).reduce((sum, v) => sum + v, 0);
  const totalPrice = cart.reduce((acc, wi) => {
    const product = wi.product || {};
    const qty = quantities[product.id] || wi.quantity || 1;
    return acc + (product.price || 0) * qty;
  }, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PuffLoader color="#ffab00" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-[1000px] w-full mx-auto p-2 bg-white rounded-md shadow-md border-1 border-gray-50">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 mt-4">
          Checkout
        </h1>
        <div className="py-6 px-4 ">
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <hr className="mb-6 border-0.5 border-gray-200" />
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row items-start gap-8 justify-between w-full"
            >
              <div className="space-y-6 w-full">
                <div>
                  <label className="block mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="inputs"
                  />
                  {errors.fullName && (
                    <span className="inputError">
                      <MdErrorOutline />
                      {errors.fullName}
                    </span>
                  )}
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-full">
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="inputs"
                    />
                    {errors.email && (
                      <span className="inputError">
                        <MdErrorOutline />
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div className="w-full">
                    <label className="block mb-1 font-medium">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="inputs"
                    />
                    {errors.phone && (
                      <span className="inputError">
                        <MdErrorOutline />
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium">City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      className="inputs"
                    />
                    {errors.city && (
                      <span className="inputError">
                        <MdErrorOutline />
                        {errors.city}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      readOnly
                      className="inputs bg-gray-100"
                    />
                    {errors.country && (
                      <span className="inputError">
                        <MdErrorOutline />
                        {errors.country}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="inputs"
                  />
                  {errors.address && (
                    <span className="inputError">
                      <MdErrorOutline />
                      {errors.address}
                    </span>
                  )}
                </div>
              </div>

              <div className="max-w-[350px] w-full mx-auto p-2">
                <h1 className="text-xl font-semibold mb-4">Cart Total</h1>
                <hr className="mb-6 border-0.5 border-gray-200" />
                <div className="bg-white flex flex-col items-end gap-2 font-semibold">
                  {cartList && cartList.length > 0 ? (
                    <div className="w-full flex flex-col items-end gap-2">
                      <p className="mb-2 w-full flex justify-between">
                        Cart Subtotal:{" "}
                        <span>
                          {formatCurrency(totalPrice, "ETB", "en-ET")}
                        </span>
                      </p>
                      <p className="mb-2 w-full flex justify-between">
                        Total Item: <span>{totalItems}</span>
                      </p>
                      <p className="mb-2 w-full flex justify-between">
                        Shipping and Handling: <span>Free shipping</span>
                      </p>
                      <p className="text-gray-500 font-semibold">
                        Calculate Shipping
                      </p>
                      <p className="mb-2 mt-5 w-full flex justify-between">
                        Order Total:{" "}
                        <span className="text-gray-600 text-green-700">
                          {formatCurrency(totalPrice, "ETB", "en-ET")}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500">Your cart is empty</p>
                  )}
                </div>
                <hr className="border-0.5 border-gray-200 mt-5 mb-5" />
                <div>
                  <h1 className="font-semibold">Payment Method</h1>
                  <hr className="border-0.5 border-gray-200 mt-5 mb-8" />
                  <div className="flex flex-col gap-4">
                    <label className="block font-medium flex items-start">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="chapa"
                        checked={formData.paymentMethod === "chapa"}
                        onChange={handleChange}
                      />
                      <div className="flex flex-col items-start">
                        Chapa - Pay
                      </div>
                    </label>
                    {errors.paymentMethod && (
                      <span className="inputError">
                        <MdErrorOutline />
                        {errors.paymentMethod}
                      </span>
                    )}
                  </div>
                  <hr className="border-0.5 border-gray-200 mt-5 mb-8" />
                  <div className="flex flex-col gap-5">
                    <label className="flex gap-1 text-xs font-medium text-gray-600">
                      <input type="checkbox" />I have read and accept the{" "}
                      <Link
                        className="text-black font-semibold hover:text-orange-500"
                        to={"/"}
                      >
                        Terms & Conditions
                      </Link>
                    </label>
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-0.5 flex items-center justify-center gap-1 font-medium rounded-md hover:bg-orange-500 transition duration-200"
                    >
                      Pay with{" "}
                      <img
                        src="./images/chapapay.png"
                        alt="chapa pay"
                        className="w-30 h-10  object-cover inline"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

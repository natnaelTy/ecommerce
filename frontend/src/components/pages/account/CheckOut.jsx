import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createCheckout } from "../../../store/product/productSlice";
import { fetchCart } from "../../../store/product/productSlice";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatCurrency";
import { CreditCard } from "lucide-react";
import { PuffLoader } from "react-spinners";

export default function Checkout() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { cart, loading, error } = useSelector((state) => state.product);

  // Map quantities: { [productId]: quantity }
  const [quantities, setQuantities] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    country: "Ethiopia",
    phone: "",
    paymentMethod: "bank_transfer", // default
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert("You must be logged in to place an order");
      return;
    }

    // Build items array for backend
    const items = cart.map((wi) => ({
      productId: wi.product.id,
      quantity: quantities[wi.product.id] || wi.quantity || 1,
    }));

    const payload = {
      userId: user.id,
      items,
      method: formData.paymentMethod,
    };

    dispatch(createCheckout(payload));
  };

  // Initialize quantities when cart loads
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
  console.log(cartList);

  // Totals
  const totalItems = Object.values(quantities).reduce((sum, v) => sum + v, 0);
  const totalPrice = cart.reduce((acc, wi) => {
    const product = wi.product || {};
    const qty = quantities[product.id] || wi.quantity || 1;
    return acc + (product.price || 0) * qty;
  }, 0);

  // loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PuffLoader color="#ffab00" />
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] w-full mx-auto p-2">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 mt-4">
        Checkout
      </h1>
      <div className=" py-6 px-4 border-1 border-gray-100 shadow-md">
        {/* Shipping & Payment Info */}
        <div className="w-full ">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <hr className="mb-6 border-0.5 border-gray-200" />
          <form
            onSubmit={handleSubmit}
            className="flex  items-start gap-8 justify-between w-full"
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
                  required
                  className="inputs"
                />
              </div>
              <div className="flex items-center gap-5">
                <label className="block mb-1 font-medium">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="inputs"
                  />
                </label>
                <label className="block mb-1 font-medium">
                  Phone
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="inputs"
                  />
                </label>
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
                    required
                    className="inputs"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Country</label>
                  <input
                    type="text"
                    name="country"
                    onChange={handleChange}
                    value={formData.country}
                    readOnly
                    required
                    className="inputs"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">Street address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="inputs"
                />
              </div>
            </div>

            <div className="max-w-[350px] w-full mx-auto p-2]">
              <h1 className="text-xl font-semibold mb-4">Cart Total</h1>
              <hr className="mb-6 border-0.5 border-gray-200" />
              <div className="bg-white flex flex-col items-end gap-2 font-semibold">
                {cartList && cartList.length > 0 ? (
                  cartList.map((item) => (
                    <div
                      key={item.id}
                      className="w-full flex flex-col items-end gap-2"
                    >
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
                  ))
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
                      value="bank_transfer"
                      checked={formData.paymentMethod === "bank_transfer"}
                      onChange={handleChange}
                    />

                    <div className="flex flex-col items-start">
                      Direct bank transfer
                      <span className="text-xs text-gray-500 mt-1">
                        Make your payment directly into our bank account. please
                        use your Order ID as the payment reference. Your order
                        won't shipped until the funds have cleared in our
                        account.
                      </span>
                    </div>
                  </label>
                </div>
                <hr className="border-0.5 border-gray-200 mt-5 mb-8" />

                <div className="flex flex-col gap-5">
                  <label
                    htmlFor=""
                    className="flex gap-1 text-sm text-gray-600"
                  >
                    <input type="checkbox" />I have read and accept the{" "}
                    <Link className="text-black font-medium" to={"/"}>
                      Terms & Conditions
                    </Link>
                  </label>

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-md hover:bg-orange-500 transition duration-200"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

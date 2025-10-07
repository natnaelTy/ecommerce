import { useEffect, useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.post(
      "https://ecommerce-ib95q.sevalla.app/api/admin/send-message",
      form
    );
    const data = await response.data;
    setSubmitted(true);
    setLoading(false);
    setForm({
      fullName: "",
      email: "",
      message: "",
    });
    return data;
  };

  {
    submitted &&
      toast.success(
        "Thank you for contacting us! We will get back to you soon."
      );
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full p-6 md:p-10">
        <h1 className="text-3xl font-bold text-amber-500 mb-2 flex items-center gap-2">
          Contact Mesay Furniture
        </h1>
        <p className="text-gray-600 mb-6">
          Have a question, suggestion, or need support? Fill out the form below
          or reach us directly!
        </p>
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <MapPin className="text-amber-500 mr-2" />
            <span>Hawassa, Ethiopia</span>
          </div>
          <div className="flex items-center mb-2">
            <Phone className="text-amber-500 mr-2" />
            <span>+251 912 345 678</span>
          </div>
          <div className="flex items-center">
            <Mail className="text-amber-500 mr-2" />
            <span>info@mesayfurniture.com</span>
          </div>
        </div>
        {/* Random Map Embed */}
        <div className="mb-6 rounded overflow-hidden">
          <iframe
            title="Mesay Furniture Location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=38.7468%2C9.0054%2C38.7568%2C9.0154&amp;layer=mapnik"
            className="w-full h-58 border-0"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <h2 className="font-semibold text-2xl mt-10 mb-6">
          Send us a message!
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="fullName">
              Full Name
            </label>
            <input
              className="inputs"
              type="text"
              id="name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              placeholder="Your Full Name"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="inputs"
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              className="inputs"
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              placeholder="How can we help you?"
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

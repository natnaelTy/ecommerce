
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendedProducts } from "../../../store/product/productSlice";
import { formatCurrency } from "../../utils/formatCurrency";




export default function RecommendedForYou({ userId }) {
  const dispatch = useDispatch();
  const { recommended, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (userId) {
      dispatch(fetchRecommendedProducts(userId));
    }
  }, [userId, dispatch]);

  if (loading) return <p>Loading recommendations...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Recommended for you</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommended.map((product) => (
          <div
            key={product.id}
            className="border p-3 rounded shadow hover:shadow-md transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded"
            />
            <h3 className="mt-2 font-medium">{product.name}</h3>
            <p className="text-sm text-gray-600">{formatCurrency(product.price, "ETB", "eng-ET")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

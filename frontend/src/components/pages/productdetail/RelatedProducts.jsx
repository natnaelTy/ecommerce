import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedProducts } from "../../../store/product/productSlice";
import { formatCurrency } from "../../../utils/formatCurrency";



export default function RelatedProducts({ productId }) {
  const dispatch = useDispatch();
  const { related, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (productId) {
      dispatch(fetchRelatedProducts({ productId, limit: 8 }));
    }
  }, [ dispatch, productId]);


  if (loading) return <p>Loading related products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {related.map((RelatedProduct) => (
        <div key={RelatedProduct.id} className="border p-3 rounded shadow">
          <img
            src={RelatedProduct.image}
            alt={RelatedProduct.productName}
            className="w-full h-32 object-cover rounded"
          />
          <h3 className="mt-2 font-medium">{RelatedProduct.productName}</h3>
          <p className="text-sm text-gray-600">{formatCurrency(RelatedProduct.price, "ETB", "eng-ET")}</p>
        </div>
      ))}
    </div>
  );
}

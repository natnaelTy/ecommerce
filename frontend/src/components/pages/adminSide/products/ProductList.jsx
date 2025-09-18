import { useSelector } from "react-redux";
import { formatCurrency } from "../../../../utils/formatCurrency";
import Loading from "../../../../utils/loading/Loading";
import { SquarePen, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchProducts } from "../../../../store/adminside/adminSlice";
import { useDispatch } from "react-redux";


export default function ProductList() {
  const { products = [], loading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }


  return (
    <div className="mt-8 max-w-[1250px] ml-auto px-4 bg-gray-50">
      <h1>Products</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products && products.map((product) => (
          <li
            className="overflow-hidden shadow-md rounded-md relative"
            key={product.id}
          >
            <div className="absolute top-2 right-2 flex space-x-2">
              <Link to={`/admin/products/edit/${product.id}`} title="Edit Product">
                <SquarePen className="bg-white text-blue-500 rounded-md p-1 size-7 cursor-pointer hover:bg-blue-100" />
              </Link>
              <span title="Delete Product">
                <Trash className="bg-white text-red-500 rounded-md p-1 size-7 cursor-pointer hover:bg-red-100" />
              </span>
            </div>
            <img
              src={product.image}
              alt={product.productName}
              className="w-74 h-52 object-cover"
            />
            <div className="w-full space-y-2 p-2">
              <p className="font-medium text-gray-900 text-lg">
                {product.productName}
              </p>
              <p className="line-clamp-3 text-sm text-gray-600">
                {product.description}
              </p>
              <p className="text-green-600 font-semibold">
                {formatCurrency(product.price, "ETB", "en-ET")}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-blue-600 bg-blue-100 px-3 py-1 capitalize rounded-lg text-sm">
                  {product.category}
                </p>
                <span className="text-gray-500 text-sm">
                  {new Date(product.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

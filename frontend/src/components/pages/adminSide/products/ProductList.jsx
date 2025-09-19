import { useSelector } from "react-redux";
import { formatCurrency } from "../../../../utils/formatCurrency";
import Loading from "../../../../utils/loading/Loading";
import { SquarePen, Trash, Plus  } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchProducts } from "../../../../store/adminside/adminSlice";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../../store/adminside/adminSlice";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductList() {
  const { products = [], loading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className=" bg-gray-50">
        <div className="max-w-[1250px] ml-auto px-4">
          <div className="flex justify-between items-center py-6">
            <div className="space-y-1">
              <h1 className="text-xl md:text-3xl font-semibold">Products</h1>
              <p className="text-gray-600">Manage your products effectively</p>
            </div>
            <Link
              to="/admin/products/addProduct"
              className="inline-block mb-4 bg-pink-500 text-white px-4 py-2 rounded-md"
            >
              <Plus className="inline-block mr-2" /> Add New Product
            </Link>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {products &&
              products.map((product) => (
                <li
                  className="overflow-hidden shadow-md rounded-md relative"
                  key={product.id}
                >
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      title="Edit Product"
                    >
                      <SquarePen className="bg-white text-blue-500 rounded-md p-1 size-7 cursor-pointer hover:bg-blue-100" />
                    </Link>
                    <span
                      onClick={() => setIsModalOpen(!isModalOpen)}
                      title="Delete Product"
                    >
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
                        {new Date(product.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                  {/* modal for delete product confirmation */}
                  <div
                    className={`fixed inset-0 bg-[#00000024]  bg-opacity-50 flex items-center justify-center z-50 h-screen ${
                      isModalOpen ? "block" : "hidden"
                    }`}
                  >
                    <div className="bg-white p-6 flex items-center flex-col gap-3 text-center rounded-md">
                      <Trash className="bg-red-100 text-red-500 rounded-md p-2 size-12" />
                      <h2 className="text-xl font-semibold">
                        Confirm Deletion
                      </h2>
                      <p className="text-lg font-medium">
                        Are you sure you want to delete this product?
                      </p>
                      <p className="text-gray-600 max-w-md">
                        It might delete all the data related to this product,
                        like users orders, recommendation wishlist and cart.
                      </p>
                      <p className="text-gray-600 max-w-md">
                        We recommend you not to delete a product unless it's{" "}
                        <span className="text-red-600 font-medium">
                          recent upload.
                        </span>
                      </p>
                      <div className="mt-4 flex gap-3 justify-end">
                        <button
                          onClick={() =>
                            dispatch(deleteProduct(product.id)).then(() => {
                              toast.success("Product deleted successfully");
                              setIsModalOpen(false);
                            })
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="bg-gray-300 hover:bg-black hover:text-white text-gray-700 px-4 py-2 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";




export default function Category() {
  const navigate = useNavigate();

  return (
    <div className="py-16 pb-16 max-w-[1000px] w-full mx-auto text-left p-3">
      <h2 className="text-2xl font-medium text-slate-800 uppercase mb-6">
        shop by category
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="categoryContainer" onClick={() => {
           navigate(`/shop?search=bed`);
        }}>
          <img
            src="./images/category-1.jpg"
            alt="category 1"
            className="w-full"
          />
          <Link to={"/"} className="categoryContainerLink" >
            Bedroom{" "}
          </Link>

        </div>
        <div className="categoryContainer" onClick={() => {
           navigate(`/shop?search=bed`);
        }}>
          <img
            src="./images/category-2.jpg"
            alt="category 1"
            className="w-full"
          />
          <Link to={"/"} className="categoryContainerLink" >
            Mattrass{" "}
          </Link>
        </div>
        <div className="categoryContainer" onClick={() => {
           navigate(`/shop?search=table`);
        }}>
          <img
            src="./images/category-3.jpg"
            alt="category 1"
            className="w-full"
          />
          <Link to={"/"} className="categoryContainerLink">
            Outdoor
          </Link>
        </div>
        <div className="categoryContainer" onClick={() => {
           navigate(`/shop?search=sofa`);
        }}>
          <img
            src="./images/category-4.jpg"
            alt="category 1"
            className="w-full"
          />
          <Link to={"/"} className="categoryContainerLink">
            Sofa{" "}
          </Link>
        </div>
        <div className="categoryContainer" onClick={() => {
           navigate(`/shop?search=sofa`);
        }}>
          <img
            src="./images/category-5.jpg"
            alt="category 1"
            className="w-full"
          />
          <Link to={"/"} className="categoryContainerLink">
            Living Room
          </Link>
        </div>
        <div className="categoryContainer" onClick={() => {
           navigate(`/shop?search=table`);
        }}>
          <img
            src="./images/category-6.jpg"
            alt="category 1"
            className="w-full"
          />
          <Link to={"/"} className="categoryContainerLink">
            Dining table
          </Link>
        </div>
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import Pagination from "react-js-pagination";
// import Slider from "rc-slider";
// import Tooltip from "rc-tooltip";
// import "rc-slider/assets/index.css";
// import "rc-tooltip/assets/bootstrap.css";
// import Metadata from "../layouts/Metadata"; // Ensure this path is correct
// import Loader from "../layouts/Loader"; // Ensure this path is correct
// import getproducts from "../../action/Productsaction"; // Ensure this path is correct

// function ProductSearch() {
//   const dispatch = useDispatch();
//   const { products, loading, error, count, resPerPage } = useSelector(
//     (state) => state.products
//   );

//   const [currentPage, setCurrentPage] = useState(1);
//   const { keyword } = useParams();
//   const [price, setPrice] = useState([1, 80000]);
//   const [priceChanged, setPriceChanged] = useState(price);
//   const [category, setCategory] = useState(null);
//   const [rating, setRating] = useState(0);

//   const categories = [
//     "Electronics",
//     "Mobile Phones",
//     "Laptops",
//     "Accessories",
//     "Headphones",
//     "Food",
//     "Books",
//     "Clothes/Shoes",
//     "Beauty/Health",
//     "Sports",
//     "Outdoor",
//     "Home",
//   ];

//   const setCurrentPageNo = (pageNo) => {
//     setCurrentPage(pageNo);
//   };

//   useEffect(() => {
//     if (error) {
//       toast.error(error, {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     }
//     dispatch(getproducts(keyword, priceChanged, category, rating, currentPage));
//   }, [error, dispatch, currentPage, keyword, priceChanged, category, rating]);

//   const handleSliderChange = (value) => {
//     setPrice(value);
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <Metadata title={"Buy the product"} />
//           <h1 id="products_heading">Search Products</h1>
//           <section id="products" className="container mt-5">
//             <div className="row">
//               <div className="col-6 col-md-3 mb-5 mt-5">
//                 <div className="px-5" onMouseUp={() => setPriceChanged(price)}>
//                   <Slider
//                     range
//                     marks={{
//                       1: "$1",
//                       80000: "$80000",
//                     }}
//                     min={1}
//                     max={80000}
//                     value={price}
//                     onChange={handleSliderChange}
//                     handleRender={(renderProps) => (
//                       <Tooltip overlay={`$${renderProps.props["aria-valuenow"]}`}>
//                         <div {...renderProps.props}></div>
//                       </Tooltip>
//                     )}
//                   />
//                 </div>
//                 <hr className="my-5" />
//                 <div className="mt-5">
//                   <h3 className="mb-3">Categories</h3>
//                   <ul className="pl-0">
//                     {categories.map((category) => (
//                       <li
//                         style={{ cursor: "pointer", listStyleType: "none" }}
//                         key={category}
//                         onClick={() => setCategory(category)}
//                       >
//                         {category}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="mt-5">
//                   <h4 className="mb-3">Ratings</h4>
//                   <ul className="pl-0">
//                     {[5, 4, 3, 2, 1].map((star) => (
//                       <li
//                         style={{ cursor: "pointer", listStyleType: "none" }}
//                         key={star}
//                         onClick={() => setRating(star)}
//                       >
//                         <div className="rating-outer">
//                           <div
//                             className="rating-inner"
//                             style={{ width: `${star * 20}%` }}
//                           ></div>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//               <div className="col-6 col-md-9">
//                 {Array.isArray(products?.products) &&
//                   products.products.map((product) => (
//                     <div className="col-sm-12 col-md-6 col-lg-4 my-3" key={product._id}>
//                       <div className="card p-3 rounded">
//                         <img
//                           className="card-img-top mx-auto"
//                           src={product.images[0].image}
//                           alt={product.name}
//                         />
//                         <div className="card-body d-flex flex-column">
//                           <h5 className="card-title">
//                             <Link to={`/productdetails/${product._id}`}>
//                               {product.name}
//                             </Link>
//                           </h5>
//                           <div className="ratings mt-auto">
//                             <div className="rating-outer">
//                               <div
//                                 className="rating-inner"
//                                 style={{ width: `${(product.ratings / 5) * 100}%` }}
//                               ></div>
//                             </div>
//                             <span id="no_of_reviews">{product.numOfReviews}</span>
//                           </div>
//                           <p className="card-text">${product.price}</p>
//                           <Link
//                             to={`/productdetails/${product._id}`}
//                             id="view_btn"
//                             className="btn btn-block"
//                           >
//                             View Details
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           </section>
//           {count > resPerPage && (
//             <div className="d-flex justify-content-center mt-5">
//               <Pagination
//                 activePage={currentPage}
//                 onChange={setCurrentPageNo}
//                 totalItemsCount={count}
//                 itemsCountPerPage={resPerPage}
//                 nextPageText={"Next"}
//                 firstPageText={"First"}
//                 lastPageText={"Last"}
//                 itemClass="page-item"
//                 linkClass="page-link"
//               />
//             </div>
//           )}
//         </>
//       )}
//     </>
//   );
// }

// export default ProductSearch;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import Pagination from "react-js-pagination";
// import Metadata from "../layouts/Metadata"; // Ensure this path is correct
// import Loader from "../layouts/Loader"; // Ensure this path is correct
// import getproducts from "../../action/Productsaction"; // Ensure this path is correct

// function ProductSearch() {
//   const dispatch = useDispatch();
//   const { products, loading, error, count, resPerPage } = useSelector(
//     (state) => state.products
//   );

//   const [currentPage, setCurrentPage] = useState(1);
//   const { keyword } = useParams();
//   const [rating, setRating] = useState(0);

//   const setCurrentPageNo = (pageNo) => {
//     setCurrentPage(pageNo);
//   };

//   useEffect(() => {
//     if (error) {
//       toast.error(error, {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     }
//     dispatch(getproducts(keyword, null, null, rating, currentPage)); // Adjusted dispatch call
//   }, [error, dispatch, currentPage, keyword, rating]);

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <Metadata title={"Buy the product"} />
//           <h1 id="products_heading">Search Products</h1>
//           <section id="products" className="container mt-5">
//             <div className="row">
//               <div className="col-12">
//                 <div className="mt-5">
//                   <h4 className="mb-3">Ratings</h4>
//                   <ul className="pl-0">
//                     {[5, 4, 3, 2, 1].map((star) => (
//                       <li
//                         style={{ cursor: "pointer", listStyleType: "none" }}
//                         key={star}
//                         onClick={() => setRating(star)}
//                       >
//                         <div className="rating-outer">
//                           <div
//                             className="rating-inner"
//                             style={{ width: `${star * 20}%` }}
//                           ></div>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//               <div className="col-12 mt-4">
//                 {Array.isArray(products?.products) &&
//                   products.products.map((product) => (
//                     <div className="col-sm-12 col-md-6 col-lg-4 my-3" key={product._id}>
//                       <div className="card p-3 rounded">
//                         <img
//                           className="card-img-top mx-auto"
//                           src={product.images[0].image}
//                           alt={product.name}
//                         />
//                         <div className="card-body d-flex flex-column">
//                           <h5 className="card-title">
//                             <Link to={`/productdetails/${product._id}`}>
//                               {product.name}
//                             </Link>
//                           </h5>
//                           <div className="ratings mt-auto">
//                             <div className="rating-outer">
//                               <div
//                                 className="rating-inner"
//                                 style={{ width: `${(product.ratings / 5) * 100}%` }}
//                               ></div>
//                             </div>
//                             <span id="no_of_reviews">{product.numOfReviews}</span>
//                           </div>
//                           <p className="card-text">${product.price}</p>
//                           <Link
//                             to={`/productdetails/${product._id}`}
//                             id="view_btn"
//                             className="btn btn-block"
//                           >
//                             View Details
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           </section>
//           {count > resPerPage && (
//             <div className="d-flex justify-content-center mt-5">
//               <Pagination
//                 activePage={currentPage}
//                 onChange={setCurrentPageNo}
//                 totalItemsCount={count}
//                 itemsCountPerPage={resPerPage}
//                 nextPageText={"Next"}
//                 firstPageText={"First"}
//                 lastPageText={"Last"}
//                 itemClass="page-item"
//                 linkClass="page-link"
//               />
//             </div>
//           )}
//         </>
//       )}
//     </>
//   );
// }

// export default ProductSearch;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import Metadata from "../layouts/Metadata"; // Ensure this path is correct
import Loader from "../layouts/Loader"; // Ensure this path is correct
import getproducts from "../../action/Productsaction"; // Ensure this path is correct

function ProductSearch() {
  const dispatch = useDispatch();
  const { products, loading, error, count, resPerPage } = useSelector(
    (state) => state.products
  );

  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    dispatch(getproducts(keyword, null, null, null, currentPage)); // Adjusted dispatch call
  }, [error, dispatch, currentPage, keyword]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title={"Buy the product"} />
          <h1 id="products_heading">Search Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              <div className="col-12 mt-4">
                {Array.isArray(products?.products) &&
                  products.products.map((product) => (
                    <div className="col-sm-12 col-md-6 col-lg-4 my-3" key={product._id}>
                      <div className="card p-3 rounded">
                        <img
                          className="card-img-top mx-auto"
                          src={product.images[0].image}
                          alt={product.name}
                        />
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">
                            <Link to={`/productdetails/${product._id}`}>
                              {product.name}
                            </Link>
                          </h5>
                          <div className="ratings mt-auto">
                            <div className="rating-outer">
                              <div
                                className="rating-inner"
                                style={{ width: `${(product.ratings / 5) * 100}%` }}
                              ></div>
                            </div>
                            <span id="no_of_reviews">{product.numOfReviews}</span>
                          </div>
                          <p className="card-text">${product.price}</p>
                          <Link
                            to={`/productdetails/${product._id}`}
                            id="view_btn"
                            className="btn btn-block"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
          {count > resPerPage && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={count}
                itemsCountPerPage={resPerPage}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ProductSearch;

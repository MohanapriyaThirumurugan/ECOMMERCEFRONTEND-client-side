import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import Metadata from "../layouts/Metadata";
import Loader from "../layouts/Loader";
import { searchProducts } from "../../action/Productsaction";

function ProductSearch() {
  const dispatch = useDispatch();

  const { productsearch, loading, error } = useSelector(
    (state) => state.searchproduct
  );

  const { keyword } = useParams();

  useEffect(() => {
    if (keyword) {
      dispatch(searchProducts(keyword));
    }
  }, [keyword, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [error]);

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
                {Array.isArray(productsearch) &&
                  productsearch.map((product) => (
                    <div
                      className="col-sm-12 col-md-6 col-lg-4 my-3"
                      key={product._id}
                    >
                      <div className="card p-3 rounded">
                        {/* Check if images array exists and has at least one image */}
                        <img
                          className="card-img-top mx-auto"
                          src={
                            product.images && product.images.length > 0
                              ? product.images[0].image
                              : "/images/default-product.png" // Default image or a placeholder image
                          }
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
                                style={{
                                  width: `${(product.ratings / 5) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span id="no_of_reviews">
                              {product.numOfReviews}
                            </span>
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
          {/* {count > resPerPage && (
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
          )} */}
        </>
      )}
    </>
  );
}

export default ProductSearch;

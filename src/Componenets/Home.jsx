import React from "react";
import Metadata from "./layouts/Metadata.jsx";
import { useDispatch, useSelector } from "react-redux";
import getproducts from "../action/Productsaction.jsx";
import { useEffect } from "react";
import Loader from "./layouts/Loader.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useState } from "react";
// import Pagination from 'pagination';
import Pagination from "react-js-pagination";
// import Pagination from 'react-bootstrap/Pagination';


function Home() {
  const dispatch = useDispatch();
  const { products=[], loading, error,count,resPerPage} = useSelector((state) => state.products);
  // const data=useSelector((state)=>state.productsState)
  console.log(products?.products);
  console.log(products?.count);
  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);

  const setCurrentPageNo = (pageNo) =>{

    setCurrentPage(pageNo)
   
}
  useEffect(() => {
    if (error) {
      return (
        toast.error(err),
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
    // grtproduction is production action 
    dispatch(getproducts(null,null,null,null,currentPage)) 

  }, [error,dispatch,currentPage]);

  return (
    <>
      {loading ? (
        <Loader/>
      ) : (
        <>
          <Metadata title={"buy the product"} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
          <div className="row">
  {Array.isArray(products?.products) && products?.products.map((e, i) => (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3" key={i}>
      <div className="card p-3 rounded">
        {/* Add a conditional check for e.images */}
        {e.images && e.images[0] && e.images[0].image && (
          <img className="card-img-top mx-auto" src={e.images[0].image} />
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/productdetails/${e._id}`}>{e.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(e.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">{e.numOfReviews}</span>
          </div>
          <p className="card-text">{e.price}</p>
          <Link to={`/productdetails/${e._id}`} id="view_btn" className="btn btn-block">
            View Details
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>

            
          </section>
          <div classNameName="d-flex justify-content-center mt-5">
            
            {products?.count> 0 && products?.count > products?.resPerPage?
            <Pagination
                    activePage={currentPage}
                    onChange={setCurrentPageNo}
                    totalItemsCount={products?.count}
                    itemsCountPerPage={products?.resPerPage}
                    nextPageText={'Next'}
                    firstPageText={'First'}
                    lastPageText={'Last'}
                    itemClass="page-item"
                    linkClass="page-link"
                    />:null}
            </div>

        
          {/* for pagination purpose i using conditional redering how many to see the user
          {productsCount > 0 && productsCount > resPerPage?
                    <div classNameName="d-flex justify-content-center mt-5">
                           <Pagination 
                                activePage={currentPage}
                                onChange={setCurrentPageNo}
                                totalItemsCount={productsCount}
                                itemsCountPerPage={resPerPage}
                                nextPageText={'Next'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemclassName={'page-item'}
                                linkclassName={'page-link'}
                           />     
                    </div> : null } */}
        </>
      )}
    </>
  );
}

export default Home;

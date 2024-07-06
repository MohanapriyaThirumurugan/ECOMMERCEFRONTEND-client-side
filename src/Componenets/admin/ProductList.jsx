import React from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getAdminProducts } from '../../action/Productsaction'
import { clearError} from '../../Slice/ProductsSlice'
import { useEffect } from 'react'
import { MDBDataTable} from 'mdbreact';
import {toast } from 'react-toastify'
import Loader from '../layouts/Loader'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { deleteProduct } from '../../action/Singleproductaction'
import { clearProductDeleted } from '../../Slice/Singleproduct'

function ProductList() {
    const { products = [], loading = true, error }  = useSelector((state) => state.products)
    const { isProductDeleted, error:productError }  = useSelector((state) => state.productsingle)
    const dispatch = useDispatch();
    const setProducts = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows : []
        }

        products.forEach( product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price : `$${product.price}`,
                stock: product.stock,
                actions: (
                    <>
                        <Link to={`/admin/updateproduct/${product._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, product._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </>
                )
            })
        })

        return data;
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteProduct(id))
    }

    useEffect(() => {
        if (error) {
            toast.error( {
              position: toast.POSITION.BOTTOM_CENTER,
              onOpen: () => {
                dispatch(clearError());
              },
            });
          }
        if(isProductDeleted) {
            toast('Product Deleted Succesfully!',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductDeleted())
            })
            return;
        }

        dispatch(getAdminProducts())
    },[dispatch, error])


  return (
    <>
    
    <div className="row">
        <div className="col-12 col-md-2">
                <Sidebar/>
        </div>
        <div className="col-12 col-md-10">
            <h1 className="my-4">Product List</h1>
            <>
                {loading ? <Loader/> : 
                    <MDBDataTable
                        data={setProducts()}
                        bordered
                        striped
                        hover
                        className="px-3"
                    />
                }
            </>
        </div>
    </div>

    </>
  )
}

export default ProductList
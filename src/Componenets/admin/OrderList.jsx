import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { MDBDataTable } from 'mdbreact';
import { deleteOrder, adminOrders as adminOrdersAction } from "../../action/OrderAction";
import Loader from '../layouts/Loader';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
import { clearError, clearOrderDeleted } from '../../Slice/OrderSlice';

function OrderList() {
    // const { id } = useParams();
    const { adminOrders = [], loading = true, error, isOrderDeleted } = useSelector(state => state.orderstate);
    const dispatch = useDispatch();

    const setOrders = () => {
        const data = {
            columns: [
                { label: 'ID', field: 'id', sort: 'asc' },
                { label: 'Number of Items', field: 'noOfItems', sort: 'asc' },
                { label: 'Amount', field: 'amount', sort: 'asc' },
                { label: 'Status', field: 'status', sort: 'asc' },
                { label: 'Actions', field: 'actions', sort: 'asc' }
            ],
            rows: []
        };

        adminOrders.forEach(order => {
            data.rows.push({
                id: order._id,
                noOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: <p style={{ color: order.orderStatus.includes('Processing') ? 'red' : 'green' }}>{order.orderStatus}</p>,
                actions: (
                    <>
                        <Link to={`/admin/updateorder/${order._id}`} className="btn btn-primary">
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <Button onClick={e => deleteHandler(e, order._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </>
                )
            });
        });

        return data;
    };

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteOrder(id))
            .then(() => {
                toast.success('Order Deleted Successfully!', {
                    position:'POSITION.BOTTOM_CENTER',
                    onOpen: () => dispatch(clearOrderDeleted())
                });
                // Optionally, you can fetch updated orders list after deletion
                dispatch(adminOrdersAction());
            })
            .catch((error) => {
                toast.error(error.message || 'Failed to delete order', {
                    position:'POSITION.BOTTOM_CENTER',
                    onOpen: () => dispatch(clearError())
                });
            });
    };

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position:'POSITION.BOTTOM_CENTER',
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
        }

        if (isOrderDeleted) {
            toast.success('Order Deleted Successfully!', {
                position:'POSITION.BOTTOM_CENTER',
                onOpen: () => dispatch(clearOrderDeleted())
            });
        }

        dispatch(adminOrdersAction);
    }, [dispatch, error, isOrderDeleted]);

    return (
        <>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h1 className="my-4">Order List</h1>
                    {loading ? <Loader /> :
                        <MDBDataTable
                            data={setOrders()}
                            bordered
                            striped
                            hover
                            className="px-3"
                        />
                    }
                </div>
            </div>
        </>
    );
}

export default OrderList;

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { deleteUser, getUsers } from '../../action/UserAction';
import { clearError, clearUserDeleted } from '../../Slice/UserSlice';
import { MDBDataTable} from 'mdbreact';
import {toast } from 'react-toastify'
import Sidebar from './Sidebar';
import Loader from '../layouts/Loader';


function UserList() {
    const { users = [], loading = true, error, isUserDeleted }  = useSelector(state => state.userstate)

    const dispatch = useDispatch();

    const setUsers = () => {
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
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
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

        users.forEach( user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email : user.email,
                role: user.role ,
                actions: (
                    <>
                        <Link to={`/admin/usersList/${user._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, user._id)} className="btn btn-danger py-1 px-2 ml-2">
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
        dispatch(deleteUser(id))
    }

    useEffect(() => {
        if(error) {
            toast(error, {
                position:'POSITION.BOTTOM_CENTER',
                type: 'error',
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }
        if(isUserDeleted) {
            toast('User Deleted Succesfully!',{
                type: 'success',
                position:'POSITION.BOTTOM_CENTER',
                onOpen: () => dispatch(clearUserDeleted())
            })
            return;
        }

        dispatch(getUsers)
    },[dispatch, error, isUserDeleted])

  return (
    <>
    <div className="row">
        <div className="col-12 col-md-2">
                <Sidebar/>
        </div>
        <div className="col-12 col-md-10">
            <h1 className="my-4">User List</h1>
            <>
                {loading ? <Loader/> : 
                    <MDBDataTable
                        data={setUsers()}
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

export default UserList
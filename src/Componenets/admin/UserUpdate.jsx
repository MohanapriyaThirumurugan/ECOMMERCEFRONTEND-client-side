import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../action/UserAction';
import { clearUserUpdated, clearError } from '../../Slice/UserSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

function UserUpdate() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [editMode, setEditMode] = useState("all"); // "all" or "role"
    const navigate = useNavigate();
    const { id: userId } = useParams();

    const { loading, isUserUpdated, error, user } = useSelector(state => state.userstate);
    const { user: authUser } = useSelector(state => state.authstate);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = {
            role
        };

        if (editMode === "all") {
            formData.name = name;
            formData.email = email;
        }

        dispatch(updateUser(userId, formData));
    };

    useEffect(() => {
        if (isUserUpdated) {
            toast('User Updated Successfully!', {
                type: 'success',
                position: 'bottom-center',
                onOpen: () => dispatch(clearUserUpdated())
            });
            navigate('/admin/users');
        }

        if (error) {
            toast(error, {
                position: 'bottom-center',
                type: 'error',
                onOpen: () => { dispatch(clearError()); }
            });
        } else {
            dispatch(getUser(userId));
        }
    }, [isUserUpdated, error, dispatch, navigate, userId]);

    useEffect(() => {
        if (user && user._id) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);

            if (authUser.role === "admin" && user.role === "admin") {
                setEditMode("role");
            }
        }
    }, [user, authUser]);

    return (
        <>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <div className="wrapper my-5">
                        <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mb-4">Update User</h1>

                            {editMode === "all" && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="name_field">Name</label>
                                        <input
                                            type="text"
                                            id="name_field"
                                            className="form-control"
                                            onChange={e => setName(e.target.value)}
                                            value={name}
                                            placeholder={name}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email_field">Email</label>
                                        <input
                                            type="text"
                                            id="email_field"
                                            className="form-control"
                                            onChange={e => setEmail(e.target.value)}
                                            value={email}
                                            placeholder={email}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="form-group">
                                <label htmlFor="role_field">Role</label>
                                <select
                                    disabled={user && user._id === authUser._id}
                                    value={role}
                                    onChange={e => setRole(e.target.value)}
                                    className="form-control"
                                    id="role_field">
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>

                            <button
                                id="update_button"
                                type="submit"
                                disabled={loading}
                                className="btn btn-block py-3"
                            >
                                UPDATE
                            </button>
                        </form>

                        {authUser.role === "admin" && user.role !== "admin" && (
                            <div className="mt-3">
                                <button 
                                    className="btn btn-secondary mr-2"
                                    onClick={() => setEditMode("all")}
                                >
                                    Edit All Fields
                                </button>
                                <button 
                                    className="btn btn-secondary"
                                    onClick={() => setEditMode("role")}
                                >
                                    Edit Role Only
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserUpdate;

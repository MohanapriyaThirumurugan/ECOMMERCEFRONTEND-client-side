import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';
import { clearerrorauth, passwordchange } from '../../action/UserAction';

function Updatepassword() {
    const{id}=useParams()
    // console.log(id);
    const [password, setpassword] = useState("");
    const [oldPassword, setoldpassword] = useState("");
    const dispatch = useDispatch();
    const { isUpdated, error } = useSelector(state => state.authstate);

    const sumbithandle = (e) => {
        e.preventDefault(e);
        const formData = {
            oldPassword,
            password
        };
        // formData.append('oldpassword', oldPassword);
        // formData.append('password', password);
        dispatch(passwordchange(formData,id));
    }

    useEffect(() => {
        if (isUpdated) {
            toast('Profile updated successfully', {
                type: 'success',
                position: 'top-center',
            });
            setoldpassword("");
            setpassword("");
        }
        if (error) {
            toast.error(error, {
                position: 'POSITION.BOTTOM_CENTER',
                type: 'error',
                onOpen: () => { dispatch(clearerrorauth()) }
            });
        }
    }, [isUpdated, error, dispatch]);

    return (
        <>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form  className="shadow-lg">
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={e => setoldpassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={e => setpassword(e.target.value)}
                            />
                        </div>

                        <button onClick={sumbithandle} type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                    </form>
                </div>
            </div>
        </>
        
    );
}

export default Updatepassword;

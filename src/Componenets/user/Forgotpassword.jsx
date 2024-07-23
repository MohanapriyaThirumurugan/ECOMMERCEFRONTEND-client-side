import React from 'react'
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { forgotPassword,clearerrorauth} from "../../action/UserAction";
import { toast } from "react-toastify";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Forgotpassword() {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const { error, message } = useSelector(state => state.authstate);
    const navigate=useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        dispatch(forgotPassword(formData))
    }

    useEffect(()=>{
        if(message) {
            toast(message, {
                type: 'success',
                position:'POSITION.BOTTOM_CENTER'
            })
            setEmail("");
            navigate('/resetpassword/:token')
            return;
        }

        if(error)  {
            toast(error, {
                position:'POSITION.BOTTOM_CENTER',
                type: 'error',
                onOpen: () => { dispatch(clearerrorauth()) }

            })
            return
        }
    }, [message, error, dispatch,navigate])


  return (
    <>
      <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg">
                    <h1 className="mb-3">Forgot Password</h1>
                    <div className="form-group">
                        <label htmlFor="email_field">Enter Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        id="forgot_password_button"
                        type="submit"
                        className="btn btn-block py-3">
                        Send Email
                </button>

                </form>
            </div>
        </div>
    </>
  )
}

export default Forgotpassword
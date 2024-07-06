import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Profile() {
    const{user}=useSelector(state=>state.authstate)
    console.log(user);
  return (
    <>
     <div class="row justify-content-around mt-5 user-info">
            <div class="col-12 col-md-3">
                <figure class='avatar avatar-profile'>
                    <img class="rounded-circle img-fluid" src='./images/profile.jpg' alt='' />
                </figure>
                <Link to= {`/myprofile/update/${user._id}`} id="edit_profile" class="btn btn-primary btn-block my-5">
                    Edit Profile
                </Link>
            </div>
     
            <div class="col-12 col-md-5">
                 <h4>Full Name</h4>
                 <p>{user.name}</p>
     
                 <h4>Email Address</h4>
                 <p>{user.email}</p>

                 <h4>Joined</h4>
                <p>{String(user.createdAt).substring(0, 10)}</p>


                 <Link to={'/order/userorders'} class="btn btn-danger btn-block mt-5">
                    My Orders
                </Link>

                <Link to={`/myprofile/update/password/${user._id}`} class="btn btn-primary btn-block mt-3">
                    Change Password
                </Link>
            </div>
        </div>
    </>
  )
}

export default Profile
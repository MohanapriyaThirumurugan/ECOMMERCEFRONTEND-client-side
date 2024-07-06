import React from 'react'
import { Link } from 'react-router-dom'

function Profile() {
  return (
    <>
     <div class="row justify-content-around mt-5 user-info">
            <div class="col-12 col-md-3">
                <figure class='avatar avatar-profile'>
                    <img class="rounded-circle img-fluid" src='./images/profile.jpg' alt='' />
                </figure>
                <a href="#" id="edit_profile" class="btn btn-primary btn-block my-5">
                    Edit Profile
                </a>
            </div>
     
            <div class="col-12 col-md-5">
                 <h4>Full Name</h4>  
                 <p>Mohanapriya</p>
     
                 <h4>Email Address</h4>
                 <p>mohanapriyathirumurugan91@gmail.com</p>

                 <Link to='/order/userorders'class="btn btn-danger btn-block mt-5">
                    My Orders
                </Link>

                <a href="#" class="btn btn-primary btn-block mt-3">
                    Change Password
                </a>
            </div>
        </div>
    </>
  )
}

export default Profile
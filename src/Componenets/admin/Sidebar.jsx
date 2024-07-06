import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap';


function Sidebar() {
    const navigate = useNavigate();

  return (
    <div className="sidebar-wrapper">
    <nav id="sidebar">
        <ul className="list-unstyled components">
        <li>
            <Link to="/admin/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
        </li>

        <li>
            <NavDropdown title={
                <i className='fa fa-product-hunt'> Product</i>
            }>
                <NavDropdown.Item  onClick={() => navigate('/admin/productList')} > <i className='fa fa-shopping-basket'> All</i></NavDropdown.Item>
                <NavDropdown.Item  onClick={() => navigate('/admin/newproduct')} > <i className='fa fa-plus'> Create </i></NavDropdown.Item>
            </NavDropdown>
        </li>

        <li>
            <Link to="/admin/adminorder"><i className="fa fa-shopping-basket"></i> Orders</Link>
        </li>

        <li>
            <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
        </li>

        <li>
            <Link to='/admin/reviewList'><i className="fa fa-users"></i> Reviews</Link>
        </li>

    </ul>
    </nav>
</div>
  )
}

export default Sidebar
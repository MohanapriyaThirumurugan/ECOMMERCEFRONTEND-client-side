import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {saveShippingInfo} from '../../Slice/CartSlice'
import {countries} from 'countries-list'
import CheckoutSteps from './CheckoutSteps';
import { toast } from 'react-toastify';


export const validateShipping = (shippingInfo, navigate) => {
   
    if(
        !shippingInfo.address||
        !shippingInfo.city||
        !shippingInfo.state|| 
        !shippingInfo.country||
        !shippingInfo.phoneNo||
        !shippingInfo.postalCode
        ) {

            toast.error('Please fill the shipping information!', {
                    type: 'success',
                    position:'POSITION.BOTTOM_CENTER'
                })
               
             
            // toast.error('Please fill the shipping information',
            // {position: 'POSITION.BOTTOM_CENTER'})
            // navigate('/shipping')
    }
} 


function ShippingInfo() {

    const {shippingInfo={} } = useSelector(state => state.cartstate)

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
    const [country, setCountry] = useState(shippingInfo.country);
    const [state, setState] = useState(shippingInfo.state);
    const [Name, setName] = useState(shippingInfo.Name);

    // this country list npm countrylist package
    const countryList =  Object.values(countries);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({address, city, phoneNo, postalCode, country, state,Name}))
        navigate('/order/confirm')
    }


  return (
    <>

        <CheckoutSteps shipping />
            <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form  className="shadow-lg"  onSubmit={submitHandler}>
                            <h1 className="mb-4">Shipping Info</h1>
                            <div className="form-group">
                                
                                <label htmlFor="address_field">Name</label>
                                <input
                                    type="text"
                                    id="address_field"
                                    className="form-control"
                                    value={Name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>


                            <div className="form-group">
                                
                                <label htmlFor="address_field">Address</label>
                                <input
                                    type="text"
                                    id="address_field"
                                    className="form-control"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="city_field">City</label>
                                <input
                                    type="text"
                                    id="city_field"
                                    className="form-control"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone_field">Phone No</label>
                                <input
                                    type="phone"
                                    id="phone_field"
                                    className="form-control"
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="postal_code_field">Postal Code</label>
                                <input
                                    type="number"
                                    id="postal_code_field"
                                    className="form-control"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="country_field">Country</label>
                                <select
                                    id="country_field"
                                    className="form-control"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required

                                >{ countryList.map((country, i) => (

                                    <option key={i} value={country.name}>
                                        {country.name}
                                    </option>
                                ))
                                }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="state_field">State</label>
                                <input
                                    type="text"
                                    id="state_field"
                                    className="form-control"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                id="shipping_btn"
                                type="submit"
                                className="btn btn-block py-3"
                                // onSubmit={submitHandler}
                            >
                                CONTINUE
                                </button>
                        </form>
                    </div>
            </div>
    </>
  )
}

export default ShippingInfo
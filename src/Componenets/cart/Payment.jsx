
// // import React from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
// // import axios from 'axios';
// // import { toast } from 'react-toastify';
// // import { orderCompleted } from '../../Slice/CartSlice';
// // import { getToken } from '../../Axios';
// // import { createOrder } from '../../action/OrderAction';

// // function Payment() {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const stripe = useStripe();
// //   const elements = useElements();

// //   const { user } = useSelector(state => state.authstate);
// //   const { items, shippingInfo } = useSelector(state => state.cartstate);
// //   const{error}=useSelector(state=>state.orderstate)
// //   const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

// //   const paymentData = {
// //     amount: Math.round(orderInfo.totalPrice * 100),
// //     shipping: {
// //       name: user.name,
// //       address: {
// //         city: shippingInfo.city,
// //         postal_code: shippingInfo.postalCode,
// //         country: 'GB',
// //         state: shippingInfo.state,
// //         line1: shippingInfo.address
// //       },
// //       phone: shippingInfo.phoneNo
// //     }
// //   };

// //   const order = {
// //     orderItems: items,
// //     shippingInfo,
// //     itemsPrice: orderInfo.itemsPrice,
// //     shippingPrice: orderInfo.shippingPrice,
// //     taxPrice: orderInfo.taxPrice,
// //     totalPrice: orderInfo.totalPrice,
// //   };

// //   const submitHandler = async (e) => {
// //     e.preventDefault();

// //     if (!stripe || !elements) {
// //       // Stripe.js has not yet loaded.
// //       return;
// //     }

// //     try {
// //       const token = getToken();
// //       const config = {
// //         headers: {
// //           'Content-Type': 'application/json',
// //           Authorization: `Bearer ${token}`
// //         }
// //       };

// //       // Create PaymentIntent on the server
// //       const { data } = await axios.post('http://localhost:8000/paymentprocess', paymentData, config);
// //       const clientSecret = data.client_secret;

// //       // Confirm the card payment on the client
// //       const result = await stripe.confirmCardPayment(clientSecret, {
// //         payment_method: {
// //           card: elements.getElement(CardNumberElement),
// //           billing_details: {
// //             name: user.name,
// //             email: user.email,
// //             address: {
// //               city: shippingInfo.city,
// //               postal_code: shippingInfo.postalCode,
// //               country: 'GB',
// //               state: shippingInfo.state,
// //               line1: shippingInfo.address
// //             },
// //             phone: shippingInfo.phoneNo
// //           }
// //         }
// //       });

// //       if (result.error) {
// //         // Show error to the customer (e.g., insufficient funds)
// //         toast.error(result.error.message);
// //       } else {
// //         // Payment has been processed
// //         if (result.paymentIntent.status === 'succeeded') {
// //           order.paymentInfo = {
// //             id: result.paymentIntent.id,
// //             status: result.paymentIntent.status
// //           };
// //           dispatch(orderCompleted());
// //           dispatch(createOrder(order))
// //           navigate('/order/success');
// //         } else {
// //           toast.error('There was an issue processing the payment');
// //         }
// //       }
// //     } catch (error) {
// //       if (error.response) {
// //         // Server error
// //         toast.error(`Server error: ${error.response.data.message}`);
// //       } else {
// //         // Network error or other issue
// //         toast.error('Payment processing failed');
// //       }
// //     }
// //   };

// //   return (
// //     <div className='container'>
// //       <form className="shadow-lg" onSubmit={submitHandler}>
// //         <h1 className="mb-4">Card Info</h1>
// //         <div className='form-group'>
// //           <label htmlFor='card_num_field'>Card Number</label>
// //           <CardNumberElement id='card_num_field' className='form-control' />
// //         </div>
// //         <div className='form-group'>
// //           <label htmlFor='card_exp_field'>Card Expiry</label>
// //           <CardExpiryElement id='card_exp_field' className='form-control' />
// //         </div>
// //         <div className='form-group'>
// //           <label htmlFor='card_cvc_field'>Card CVC</label>
// //           <CardCvcElement id='card_cvc_field' className='form-control' />
// //         </div>
// //         <button
// //           id="pay_btn"
// //           type="submit"
// //           className="btn btn-block py-3"
// //         >                           Pay - { ` $${orderInfo && orderInfo.totalPrice}` }

// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Payment;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { orderCompleted } from '../../Slice/CartSlice';
import { createOrder } from '../../action/OrderAction';
import { clearError as clearOrderError } from '../../Slice/OrderSlice';
import { getToken } from '../../Axios';

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  console.log(orderInfo +"orderinfo");
  const { user } = useSelector((state) => state.authstate);
  console.log(user);
  const { items: cartItems, shippingInfo } = useSelector((state) => state.cartstate);
  console.log( cartItems, shippingInfo);
  const { error: orderError,orderDetail } = useSelector((state) => state.orderstate);
  

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
    shipping: {
      name: user.name,
      address: {
        city: shippingInfo.city,
        postal_code: shippingInfo.postalCode,
        country: 'GB',
        state: shippingInfo.state,
        line1: shippingInfo.address,
      },
      phone: shippingInfo.phoneNo,
    },
  };
console.log(paymentData);

  const order = {
    orderItems: cartItems,
    shippingInfo,
    itemsPrice: orderInfo.itemsPrice,
    shippingPrice: orderInfo.shippingPrice,
    taxPrice: orderInfo.taxPrice,
    totalPrice: orderInfo.totalPrice,
  };

  useEffect(() => {
    if (orderError) {
      toast.error(orderError, {
        position: toast.POSITION.BOTTOM_CENTER,
        onOpen: () => {
          dispatch(clearOrderError());
        },
      });
    }
  }, [orderError, dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector('#pay_btn').disabled = true;

    if (!stripe || !elements) {
      return;
    }

    try {
      const token = getToken();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post('http://localhost:8000/paymentprocess', paymentData, config);
      const clientSecret = data.client_secret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              city: shippingInfo.city,
              postal_code: shippingInfo.postalCode,
              country: 'GB',
              state: shippingInfo.state,
              line1: shippingInfo.address,
            },
            phone: shippingInfo.phoneNo,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        document.querySelector('#pay_btn').disabled = false;
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(orderCompleted());
          dispatch(createOrder(order));
          navigate('/order/success');
        } else {
          toast.error('There was an issue processing the payment');
          document.querySelector('#pay_btn').disabled = false;
        }
      }
    } catch (error) {
      toast.error('Payment processing failed');
      document.querySelector('#pay_btn').disabled = false;
    }
  };

  return (
    <div className='container'>
      <form className="shadow-lg" onSubmit={submitHandler}>
        <h1 className="mb-4">Card Info</h1>
        <div className='form-group'>
          <label htmlFor='card_num_field'>Card Number</label>
          <CardNumberElement id='card_num_field' className='form-control' />
        </div>
        <div className='form-group'>
          <label htmlFor='card_exp_field'>Card Expiry</label>
          <CardExpiryElement id='card_exp_field' className='form-control' />
        </div>
        <div className='form-group'>
          <label htmlFor='card_cvc_field'>Card CVC</label>
          <CardCvcElement id='card_cvc_field' className='form-control' />
        </div>
        <button id="pay_btn" type="submit" className="btn btn-block py-3">
          Pay - {` $${orderInfo && orderInfo.totalPrice}`}
        </button>
      </form>
    </div>
  );
}


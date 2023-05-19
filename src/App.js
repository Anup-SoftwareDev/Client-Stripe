import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout';
import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)

function App() {
  const [product, setProduct] = useState({
    name: ' Headphone',
    price: 5,
  })

  const priceForStripe = product.price*100;

  const handleSuccess = (status)=>{
    if (status==="success"){
    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      time: 4000,
    });}else{
      MySwal.fire({
        icon: 'error',
        title: 'Sorry Payment was Unsuccessful',
        time: 4000,
    })}

  }

  const payNow = async token =>{
    try{
      console.log(token)
      const response = await axios({
        url: process.env.REACT_APP_STRIPE_BASE_URL,
        method: 'post',
        data:{
          amount: product.price*100,
          token,
        },
        
      });
      if(response.status===200){

        handleSuccess(response.data.status)
        console.log('Your payment was successful');
       
      }

    }catch (error){
      console.log(error)
      handleSuccess("failure")
    }
  }

  return (
    <div className="container">
      <h2>Complete React & Stripe payment integration</h2>
      <p>
        <span>Product:</span>
        {product.name}
      </p>
      <p>
        <span>Price:</span>{product.price}
      </p>
      <StripeCheckout
        stripeKey = {process.env.REACT_APP_PUBLISHABLE_KEY}
        label = "Pay Now"
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
        amount={priceForStripe}
        description={`Your total is $${product.price}`}
        token={payNow}
        
      />

    </div>

  )
    
}

export default App;

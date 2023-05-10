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

  const handleSuccess = ()=>{

    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      time: 4000,
    });

  }

  const payNow = async token =>{
    try{

      const response = await axios({
        url: 'http://localhost:5001/payment',
        method: 'post',
        data:{
          amount: product.price*100,
          token,
        },
        
      });
      if(response.status===200){

        handleSuccess()
        console.log('Your payment was successful');
      }

    }catch (error){
      console.log(error)
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
        stripeKey = "pk_test_51KcnG7KElkCH1o6CFdGPZh8OoQVf0twm7ZJGwYALXkvDftZl1rykzHg4tsmje0Do2myICK2eEtl8KX14mw57PPAt003z9udGjD"
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

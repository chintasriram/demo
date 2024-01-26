import { Grid } from '@mui/material';
import React, { useEffect, useState } from "react";
import MDBTypography from 'components/MDBTypography';
import ActiveLayer from 'assets/images/ImagesSvg/paymentsLayer.svg'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
  useStripe,
  useElements
} from "@stripe/react-stripe";

import "./paymentStyle.css";

import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import {loadStripe} from '@stripe/stripe-js';

import "react-toastify/dist/ReactToastify.css";
// import "./styles.css";


toast.configure();

let userInfo = JSON.parse(window.localStorage.getItem("user"));


const handleToken = async (token, adresses) => {
  const res = await axios.post("https://ed6l3.sse.codesandbox.io/checkout", {
    token
  });
  const { status } = res.data;
  if (status === "success") {
    toast("Success ! Check emails for details", {
      type: "success"
    });
  } else {
    toast("Something went wrong", {
      type: "failure"
    });
  }
};



const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "#aab7c4"
        },
        padding
      },
      invalid: {
        color: "#9e2146"
      }
    }
  };
};

const SplitForm = ({ fontSize }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isValidToken, setIsValidToken] = useState();
  const [cardNumberError, setCardNumberError] = useState('');
  const [cardExpiryError, setCardExpiryError] = useState('');
  const handleBlur = () => {
  };
  const handleChange = (change) => {
    if(change.elementType === "cardNumber"){
      if(change.error){
        setCardNumberError(change?.error?.message);
      } else {
        setCardNumberError('');
      }
    }
    if(change.elementType === "cardExpiry"){
      if(change.error){
        setCardExpiryError(change?.error?.message);
      } else {
        setCardExpiryError('');
      }
    }
    
  };
  
  const handleFocus = () => {
  };
  const handleReady = () => {
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement)
    });
    console.log("payload", payload);
  };

  const handleReCaptchaVerify = async (token) => {
    if (!token) {
      return;
    }
    token && setIsValidToken(true);
  };


  return (
    <form onSubmit={handleSubmit} className="DemoWrapper">
        <div>
          <label className="paymentLabel">
            Card number
            <CardNumberElement
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={handleFocus}
              onReady={handleReady}
              options={createOptions(fontSize)}
            />
          </label>
          {cardNumberError && <span className="cardError">{cardNumberError}</span>}
          <label className="paymentLabel">
            Expiration date
            <CardExpiryElement
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={handleFocus}
              onReady={handleReady}
              options={createOptions(fontSize)}
            />
          </label>
          {cardExpiryError && <span className="cardError">{cardExpiryError}</span>}
          <label className="paymentLabel">
            CVC
            <CardCvcElement
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={handleFocus}
              onReady={handleReady}
              options={createOptions(fontSize)}
            />
          </label>
          <button className="paymentBtn" type="submit">Pay</button>
        </div>
      {/* )} */}
    </form>
  );
};

const stripe = loadStripe("pk_live_51LB04HLsHsjDw6D4gT2sD23bLSq9LnOj2xY8S0Hn0gwsHgx8j2wiAyT97GDso4MMcKFcY66GzHEkd0zHdM4pKLAJ00k8j8AsTE")


function Invoices() {
  const getElementFontSize = () => (window.innerWidth < 450 ? "14px" : "18px");
  const [elementFontSize, setElementFontSize] = useState(getElementFontSize);

  useEffect(() => {
    const onResize = () => {
      setElementFontSize(getElementFontSize());
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return (

    <Grid container
      sx={{
        // height: "400px",
        borderRadius: "12px", 
      }}
    >
      <Grid container justifyContent="center" alignContent="center"
        sx={{
          background: `rgba(17, 19, 21, 0.8)`, width: "inherit", backdropFilter: "blur(3px)", borderRadius: "12px", 
        }}
      >
{/* border: "1px solid #3B3D40" */}
        {/* <Elements stripe={stripe}>
          <SplitForm fontSize={elementFontSize} />
        </Elements> */}

    {/* <div className="App"> */}
      <StripeCheckout
        stripeKey="pk_test_51JGNLWBVnEa8wQ1y8ZGMn9tw57qHCROwaNVr5eplb1UvQsN410gJpXPyNW8yFgNQZeM7twAoAjZ7LosccszLnDMz00pIIh0lL0"
        token={handleToken}
        //billingAddress
        // shippingAddress
        amount={0 * 100}
        name={userInfo?.name}
      />
    {/* </div> */}

      </Grid>
    </Grid>

  )
}

export default Invoices;
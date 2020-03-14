import React, { Component } from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';

import {STRIPE_PUBLIC_KEY} from "../../../../../Constants"

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

class StripeView extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Elements stripe={stripePromise}>
        <CheckoutForm on_message={this.props.on_message} payment_data={this.props.payment_data} />
      </Elements>
    );
  }
}

module.exports = StripeView

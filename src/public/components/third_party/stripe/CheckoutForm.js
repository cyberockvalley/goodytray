import React from 'react';
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js';

import CardSection from './CardSection';
import { API_ROOT } from '../../../../../Constants';
import { modalAlert } from '../../../utils/Funcs';
import ImageView from '../../widgets/ImageView';

const Loading = require("../../widgets/Loading")

const AxiosBrowser = require("../../../utils/Browser")
const TextView = require("../../widgets/TextView")
class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      payment_data: props.payment_data
    }
  }

  sendMessage = (message, paymentSuccessfull) => {
    if(this.props.on_message) {
      this.props.on_message({message: message, payment_successfull: paymentSuccessfull})
    }
  }
  componentDidMount() {
    this.setState({loading: true})
    AxiosBrowser.axios.get(API_ROOT 
      + `stripe/client_secret?amount=${this.props.payment_data.amount}&currency=${this.props.payment_data.currency}&id=${this.props.payment_data.id}&description=${this.props.payment_data.description}`
    )
    .then(response => {console.log("StripeEmail", this.props.payment_data.email)
      if(!response.data.client_secret) {
        console.log("StripeClientSecret", "An error occurred", response)
        this.sendMessage("An error occurred"+response, false)
      } else {
        this.setState({client_secret: response.data.client_secret})
        console.log("StripeClientSecret", response.data.client_secret)
        this.setState({loading: false})
      }
      
    })
    .catch(e => {
      console.log("StripeClientSecret", "Error", e)
      this.sendMessage(e, false)
    })
  }
  handleSubmit = async (event) => {
    this.setState({loading: true})
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    const {stripe, elements} = this.props

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    stripe.confirmCardPayment(this.state.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: this.props.payment_data.name,
          email: this.props.payment_data.email,
        }
      }
    })
    .then(result => {
      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log("paymentError", );
        this.sendMessage(result.error.message, false)
        
      } else {
        console.log("paymentObject", result.paymentIntent);
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
          this.sendMessage("Payment successfull", true)
  
        } else {
          this.sendMessage("Payment failed", false)
        }
      }
      this.setState({loading: false})
    })
    .catch(e => {
      console.log("Error", e)
      this.sendMessage("A network error occurred", false)
      this.setState({loading: false})
    })
    
  }

  render() {
    const {stripe} = this.props;
    return (
      <div>
          <div style={{display: this.state.loading || !stripe? "block" : "none"}}>
            <Loading 
            visibility={this.state.loading || !stripe? "visible" : "gone"} 
            text={"Please wait..."} />
            <TextView 
                    text="Please wait..."
                    margin="10px"
                    font_style="italic"
                    center_horizontal={true} />
          </div>
         <form style={{display: this.state.loading || !stripe? "none" : "block"}} onSubmit={this.handleSubmit}>
          <div style={{display: "flex", margin: "10px", justifyContent: "space-around"}}>
            <ImageView 
              src="/public/res/images/static/logo.png"
              width="100px"
              height="50px" />
          </div>
          <TextView 
                    text={this.props.payment_data.description}
                    margin_bottom="10px"
                    center_horizontal={true}
                    text_size="16px"
                    font_weight="600" />
          <CardSection />
          <button id="stripe-submit" type="submit" disabled={!stripe}>
            Pay {this.props.payment_data.currency_symbol + this.props.payment_data.amount}
          </button>
        </form>
      </div>
      
    )
  }
}

export default function InjectedCheckoutForm(props) {
  return (
    <ElementsConsumer>
      {({stripe, elements}) => (
        <CheckoutForm on_message={props.on_message} payment_data={props.payment_data}  stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}
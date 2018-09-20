import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {complete: false};
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {
        let formData = new FormData(); // Used for sending form data to Django /charge/
        let {token} = await this.props.stripe.createToken({name: "Name"});

        console.log(this.props);

        formData.append('stripeToken', token.id);
        formData.append('amount', this);

        let response = await fetch("/charge/", {
            method: "POST",
            headers: {"Content-Type": "text/plain"},
            body: formData
        });

        if (response.ok) {
            console.log("Purchase Complete!");
        }
        if (response.ok) this.setState({complete: true});

    }

    render() {
        if (this.state.complete) return <h1>Purchase Complete</h1>;

        return (
            <div className="checkout">
                <input type="text" name="amount"/>
                <CardElement/>
                <button onClick={this.submit}>Send</button>
            </div>
        );
    }


}

export default injectStripe(CheckoutForm);
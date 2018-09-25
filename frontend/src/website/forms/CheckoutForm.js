import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import {
    Row,
    FormGroup,
    FormControl,
    ControlLabel,
    InputGroup,
    Button,
    Form
} from 'react-bootstrap';
import {
  CardElement,
  injectStripe
} from 'react-stripe-elements';

class CheckoutForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            amount: 0,
            recurring: 0,
            name: '',
            email: '',
            phone: '',
            success: false,
            submitDisabled: false,
            paymentComplete: false,
            paymentError: null,
            stripeLoadingError: false,
            stripeLoading: true,
            error: null
        };

        this.submit = this.submit.bind(this);
    }

    handleInputChange = (e) => {
        const eventId = e.target.id;

        switch(eventId) {
          case "amount":
              this.setState({ amount: parseInt(e.target.value, 10) });
              break;
          case "name":
              this.setState({ name: e.target.value });
              break;
          case "email":
              this.setState({ email: e.target.value });
              break;
          case "phone":
              this.setState({ phone: e.target.value });
              break;
        }
    };

    submit(ev) {
        ev.preventDefault();

        let formData = new FormData(); // Used for sending form data to Django /charge/

        this.props.stripe.createToken({name: this.state.name}).then(async ({token}) => {
            formData.append('amount', this.state.amount);
            formData.append('stripeToken', token.id);
            formData.append('email', this.state.email);
            formData.append('phone', this.state.phone);

            let response = await fetch("/charge/", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                console.log("Purchase Complete!");
            }
            if (response.ok) this.setState({success: true});
        });
    }

    render() {
       if (this.state.success) {
            return (
                <div className="center">
                    <FontAwesome name="check-circle-o" style={{fontSize: '7em', color: '#62c656'}}/>
                    <h3>Your donation went through successfully. Thank you for your support!</h3>
                    <p style={{marginBottom: 20, fontFamily: 'Helvetica, sans-serif'}}>A receipt was emailed
                        to you.</p>
                    <Button onClick={this.props.closeModal}>Finish</Button>
                </div>
            )
       } else {
            return (
                <Form onSubmit={this.submit} style={{marginBottom: 40}}>
                    {this.state.error &&
                        <p style={{fontFamily: 'lato, sans-serif', color: '#da2e2e'}}>{this.state.error}</p>
                    }

                    {this.state.paymentError &&
                        <p style={{fontFamily: 'lato, sans-serif', color: '#da2e2e'}}>
                          {this.state.paymentError}
                        </p>
                    }

                    <FormGroup>
                        <ControlLabel>Dollar Amount (in USD)</ControlLabel>
                        <InputGroup style={{width: 149}}>
                            <InputGroup.Addon>
                                <FontAwesome name="usd" style={{color: '#848484'}}/>
                            </InputGroup.Addon>
                            <FormControl
                                type="number"
                                placeholder="10"
                                id="amount"
                                style={{paddingRight: 5}}
                                onChange={this.handleInputChange}
                                value={this.state.amount}
                            />
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>

                    {this.state.amount > 0 &&
                        <span>

                            <FormGroup controlId="name">
                              <ControlLabel>Your Full Name</ControlLabel>
                              <FormControl
                                  type="text"
                                  placeholder="First and Last Name..."
                                  onChange={this.handleInputChange}
                                  value={this.state.name}
                                  id="name"
                                  style={{width: 300}}
                              />
                              <FormControl.Feedback/>
                            </FormGroup>

                            <FormGroup controlId="email">
                              <ControlLabel>Email Address</ControlLabel>
                              <FormControl
                                  type="text"
                                  placeholder="me@example.com"
                                  onChange={this.handleInputChange}
                                  value={this.state.email}
                                  name="email"
                                  style={{width: 300}}
                              />
                              <FormControl.Feedback/>
                            </FormGroup>

                            <FormGroup controlId="phone">
                              <ControlLabel>Phone Number</ControlLabel>
                              <FormControl
                                  type="text"
                                  placeholder="(555) 555-5555"
                                  onChange={this.handleInputChange}
                                  name="phone"
                                  value={this.state.phone}
                                  style={{width: 170}}
                              />
                              <FormControl.Feedback/>
                            </FormGroup>

                            <div className="panel panel-default credit-card-box top-40 bottom-30" style={{width: 420}}>

                              <div className="panel-heading display-table">
                                <Row>
                                  <span className="panel-title display-td" style={{marginLeft: 15, fontSize: '1.1em'}}>Payment Details</span>
                                  <img
                                      src="/discovernci_media/cards-accepted.jpg"
                                      style={{
                                          width: 125,
                                          marginRight: 15,
                                          position: 'relative',
                                          top: 4
                                      }}
                                      className="img-responsive pull-right"
                                      alt="All major credit cards accepted"
                                  />
                                </Row>
                              </div>

                              <div style={{padding: 20}}>
                                  <CardElement/>
                              </div>

                            </div>

                        </span>
                    }

                    <Button
                        bsStyle="success"
                        onClick={this.submit}
                        disabled={this.state.submitDisabled}
                    >
                        Place Donation (${this.state.amount})
                    </Button>

                    <hr/>

                    <h3>Volunteering</h3>
                    <p>Perhaps the best way to participate in your child’s experience
                        here is to volunteer. In this way, you’ll get to know other
                        families and students and increase your familiarity with the
                        teachers and classroom, together enhancing the experience for
                        the entire student body and our overall community.</p>

                    <hr/>

                    <h3>In-kind Donations</h3>
                    <p>Our children have family members with wonderful hobbies,
                        talents and occupational skills. We encourage parents and
                        extended family members to donate time and items that can help
                        enhance classrooms. These include services or goods gifted to
                        the school. Over the past few years, donations have ranged from
                        kitchen and craft supplies, to carpentry and computer services.
                        The fair market value of such items is tax-deductible. The real
                        market value is priceless.</p>

                </Form>
            )
       }
    }


}

export default injectStripe(CheckoutForm);
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Elements, StripeProvider} from 'react-stripe-elements';
import {
  Grid,
  Row,
  Col,
  Panel
} from 'react-bootstrap';
import CheckoutForm from "./forms/CheckoutForm";

export default class DonatePage extends Component {

    render() {
        return (
            <Grid className="grid-container">

                <Helmet title="Donate to Nature&apos;s Classroom Institute and Montessori School"/>

                <Row>
                </Row>
                <Row className="top-30">
                    <Col xs={8} md={6} mdOffset={1}>

                        <h1 style={{marginTop: 10, marginBottom: 5, fontSize: '2.4em', fontFamily: 'bitter'}}>Make a
                            Donation</h1>
                        <p style={{fontSize: '1.4em', marginBottom: 20}}>Your support directly impacts our mission in
                            teaching independence, mastery of self and the environment.</p>

                        <StripeProvider apiKey="pk_test_2iONQfKDphIIa8M9W1hkisQq">
                            <Elements>
                                <CheckoutForm />
                            </Elements>
                        </StripeProvider>

                    </Col>
                    <Col md={4}>

                        <img
                            src="/discovernci_media/skyviewRibbonCutting.jpg"
                            alt="presentation"
                            className="img-responsive img-rounded"
                            style={{marginTop: 20, marginBottom: 25}}
                        />

                        <Panel header="Annual Report 2016-2017" style={{textAlign: 'center'}}>
                            <a href="/discovernci_media/Natures%20Classroom%202017-2018%20Annual%20Report.pdf"
                               className="btn btn-primary" target="_blank" rel="noopener noreferrer">View our 2017-2018
                                Annual Report (PDF)</a><br/><br/>
                            <a href="/discovernci_media/2016-2017%20Annual%20Report%20-%20Final_Spreads.pdf"
                               className="btn btn-primary" target="_blank" rel="noopener noreferrer">View our 2016-2017
                                Annual Report (PDF)</a>
                        </Panel>


                    </Col>

                </Row>

            </Grid>
        );
    }
}
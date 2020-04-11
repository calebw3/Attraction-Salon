import React, { Component } from "react";
import "./styles.css";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';


const styles = {
  name: {
    fontSize: '16px',
    lineHeight: '24px',
    padding: '16px',
    placeholderColor: '#a0a0a0',
    backgroundColor: 'transparent',
  },
  leftCenter: {
    color: "#000000"
  },
  blockRight: {
    display: "block",
    float: "right",
    color: "#56cef0"
  },
  center: {
    textAlign: "center"
  }
};

export default class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardBrand: "",
      nonce: undefined,
      googlePay: false,
      applePay: false,
      masterpass: false
    };
    this.requestCardNonce = this.requestCardNonce.bind(this);
  }

  requestCardNonce() {
    this.paymentForm.requestCardNonce();
  }

  componentDidMount() {
    const config = {
      // applicationId: "sq0idp-rARHLPiahkGtp6mMz2OeCA",
      applicationId: "sandbox-sq0idb-DCGr-WwXIDnp-bFL5LHROw", //For testing
      locationId: "GMT96A77XABR1",
      inputClass: "sq-input",
      autoBuild: false,
      inputStyles: [
        {
          fontSize: '16px',
          lineHeight: '24px',
          padding: '16px',
          placeholderColor: '#a0a0a0',
          backgroundColor: 'transparent',
        }
      ],
      applePay: {
        elementId: "sq-apple-pay"
      },
      masterpass: {
        elementId: "sq-masterpass"
      },
      googlePay: {
        elementId: "sq-google-pay"
      },
      cardNumber: {
        elementId: "sq-card-number",
        // placeholder: "• • • •  • • • •  • • • •  • • • •"
        placeholder: "Card Number"
      },
      cvv: {
        elementId: "sq-cvv",
        placeholder: "CVV"
      },
      expirationDate: {
        elementId: "sq-expiration-date",
        placeholder: "MM/YY"
      },
      postalCode: {
        elementId: "sq-postal-code",
        placeholder: "Zip"
      },
      callbacks: {
        methodsSupported: methods => {
          if (methods.googlePay) {
            this.setState({
              googlePay: methods.googlePay
            });
          }
          if (methods.applePay) {
            this.setState({
              applePay: methods.applePay
            });
          }
          if (methods.masterpass) {
            this.setState({
              masterpass: methods.masterpass
            });
          }
          return;
        },
        createPaymentRequest: () => {
          return {
            requestShippingAddress: false,
            requestBillingInfo: true,
            currencyCode: "USD",
            countryCode: "US",
            total: {
              label: "MERCHANT NAME",
              amount: "100",
              pending: false
            },
            lineItems: [
              {
                label: "Subtotal",
                amount: "100",
                pending: false
              }
            ]
          };
        },
        cardNonceResponseReceived: (errors, nonce, cardData) => {
          if (errors) {
            // Log errors from nonce generation to the Javascript console
            console.log("Encountered errors:");
            errors.forEach(function (error) {
              console.log("  " + error.message);
            });

            return;
          }
          this.setState({
            nonce: nonce
          })
        },
        unsupportedBrowserDetected: () => { },
        inputEventReceived: inputEvent => {
          switch (inputEvent.eventType) {
            case "focusClassAdded":
              break;
            case "focusClassRemoved":
              break;
            case "errorClassAdded":
              document.getElementById("error").innerHTML = "<span style='color: red;'>Please fix card information errors before continuing</span>";
              break;
            case "errorClassRemoved":
              document.getElementById("error").style.display = "none";
              break;
            case "cardBrandChanged":
              if (inputEvent.cardBrand !== "unknown") {
                this.setState({
                  cardBrand: inputEvent.cardBrand
                });
              } else {
                this.setState({
                  cardBrand: ""
                });
              }
              break;
            case "postalCodeChanged":
              break;
            default:
              break;
          }
        },
        paymentFormLoaded: function () {
          document.getElementById("name").style.display = "inline-flex";
        }
      }
    };
    this.paymentForm = new this.props.paymentForm(config);
    this.paymentForm.build();
  }

  render() {
    return (
      <div className="container">
        <div id="form-container">
          <div id="sq-walletbox">
            <button
              style={{ display: this.state.applePay ? "inherit" : "none" }}
              className="wallet-button"
              id="sq-apple-pay"
            />
            <button
              style={{ display: this.state.masterpass ? "block" : "none" }}
              className="wallet-button"
              id="sq-masterpass"
            />
            <button
              style={{ display: this.state.googlePay ? "inherit" : "none" }}
              className="wallet-button"
              id="sq-google-pay"
            />
            <hr />
          </div>

          <div id="sq-ccbox">
            <div className="textThirdStep">
              <p>
                <span style={styles.leftCenter}>Enter Card Info Below </span>
                <span style={styles.blockRight}>
                  {this.state.cardBrand.toUpperCase()}
                </span>
              </p>
            </div>

            <div className="nameDiv">  
              <TextField
                id="name"
                variant="outlined"
                type="text"
                placeholder="Name"
              />
            </div>
            <div id="sq-card-number"></div>
            <input type="hidden" id="card-nonce" name="nonce" />
            <div className="third" id="sq-expiration-date" />
            <div className="third" id="sq-cvv" />
            <div className="third" id="sq-postal-code" />
          </div>
          <button
            className="button-credit-card"
            onClick={this.requestCardNonce}
          >
            Pay
          </button>
        </div>
        <p style={styles.center} id="error" />
      </div>
    )
  }
}
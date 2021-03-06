import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { FormErrors } from "redux-form";
import { Field, reduxForm } from "redux-form";
import {
    Button,
    Typography,
    Dialog,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import "./Testimonials.css";
import ReCAPTCHA from "react-google-recaptcha";

export interface addTestimonialParams {
    name: string;
    rating: number;
    feedback: string;
    captcharesponse: string;
}

const validate = (
    values: addTestimonialParams
): FormErrors<addTestimonialParams> => {
    const errors: FormErrors<addTestimonialParams> = {};
    if (!values.name) {
        errors.name = "Name required";
    }
    if (!values.rating) {
        errors.rating = "Rating required";
    }
    if (!values.feedback) {
        errors.feedback = "Feedback required";
    }
    if (!values.captcharesponse) {
        errors.captcharesponse = "Please validate the captcha.";
    }
    return errors;
};

const renderTextField: React.FC = (field: any) => {
    return (
        <div>
            <TextField
                variant={field.variant}
                autoFocus={field.autoFocus}
                margin={field.margin}
                label={field.label}
                disabled={field.disabled}
                fullWidth={field.fullWidth}
                multiline={field.multiline}
                rows={field.rows}
                rowsMax={field.rowsMax}
                {...field.input}
            />
            {field.meta.touched && (
                <p style={{ color: "red", margin: "0px" }}>
                    {field.meta.error}
                </p>
            )}
        </div>
    );
};

const Captcha = (field: any) => (
    <div>
        <ReCAPTCHA
            sitekey="6Le9zuMUAAAAAE6pAtVkhrOoRrMaycB9b-hdA53b"
            onChange={(response) => field.input.onChange(response)}
        />
        {field.meta.touched && (
            <p style={{ color: "red", margin: "0px" }}>{field.meta.error}</p>
        )}
    </div>
);

const renderRating: React.FC = (field: any) => {
    return (
        <div>
            <Rating
                name={field.input.name}
                size={field.size}
                className={field.className}
                {...field.input}
                value={parseInt(field.input.value)}
                style={field.style}
            />
            {field.meta.touched && (
                <p style={{ color: "red", margin: "0px" }}>
                    {field.meta.error}
                </p>
            )}
        </div>
    );
};

export const Form: React.FC = (props: any) => {
    const { handleSubmit, pristine, submitting, open, setOpen } = props;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                className="button"
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
            >
                Add Your Testimonial
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit} noValidate={true}>
                    <DialogContent className="modal">
                        <div
                            style={{
                                backgroundColor: "#E7A1AF",
                                height: "50px",
                            }}
                        >
                            <DialogContentText className="modal-title">
                                Please describe your experience
                            </DialogContentText>
                        </div>
                        <div style={{ margin: "0px 20px" }}>
                            <Field
                                name="name"
                                // autoFocus
                                label="Name"
                                variant="outlined"
                                margin="normal"
                                component={renderTextField}
                            />
                            <Typography>
                                How would you rate your experience?
                            </Typography>
                            <Field
                                name="rating"
                                className="ratings"
                                size="large"
                                style={{ padding: "0px" }}
                                component={renderRating}
                            />
                            <Typography>
                                Have some feedback? You can write it here:
                            </Typography>
                            <Field
                                name="feedback"
                                fullWidth
                                variant="outlined"
                                component={renderTextField}
                                label="Write Your feedback Here"
                                multiline
                                margin="normal"
                                rowsMax={6}
                                rows={5}
                            />
                            <Field name="captcharesponse" component={Captcha} />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            style={{ color: "white" }}
                            type="submit"
                            disabled={pristine || submitting}
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

const form = reduxForm({
    form: "addtestimonial",
    validate,
})(Form);

export default connect(null)(form);

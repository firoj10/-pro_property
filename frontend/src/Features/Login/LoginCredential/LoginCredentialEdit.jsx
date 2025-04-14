

import React, { useEffect, useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage
} from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchMemberById,
  memberUpdate
} from "../../../redux/slices/api/memberApi";
import {
  setMessage,
  setError,
  clearMessage
} from "../../../redux/slices/memberSlice";
import { Div } from "../../../Components/Ui/Div";
import TextInputComponent from "../../../Components/FormComponent/TextInputComponent";
import SubmitButton from "../../../Components/FormComponent/ButtonComponent/SubmitButton";
import ArrowHeading from "../../../Components/HeadingComponent/ArrowHeading";
import MessageBox from "../../../Components/MessageBox/MessageBox";
import LoadingAnimation from "../../../Components/Loaders/LoadingAnimation";
import ErrorMessage from "../../../Components/MessageBox/ErrorMessage";

// Email and phone regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(018|019|013|017|015|016|014)\d{8}$/;

const validationSchema = Yup.object().shape({
  method: Yup.string().required("Please select a delivery method"), // Ensure method is selected

  delivery_method: Yup.string()
    .nullable()
    .test("required-field", function (value) {
      const { method } = this.parent;
      if (method === "email" && !value) {
        return this.createError({ message: "Email required" });
      }
      if (method === "contact" && !value) {
        return this.createError({ message: "Contact required" });
      }
      return true;
    })
    .test("valid-email", function (value) {
      const { method } = this.parent;
      if (method === "email") {
        if (!value) return true; // If empty, required-field test will handle it
        if (!emailRegex.test(value)) {
          return this.createError({ message: "Email Invalid format" });
        }
      }
      return true;
    })
    .test("valid-contact", function (value) {
      const { method } = this.parent;
      if (method === "contact") {
        if (!value) return true; // If empty, required-field test will handle it
        if (!phoneRegex.test(value)) {
          return this.createError({ message: "Contact Invalid format" });
        }
      }
      return true;
    })
});

const LoginCredentialEdit = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedMember, message, error } = useSelector(
    (state) => state.member
  );

  useEffect(() => {
    dispatch(fetchMemberById(id));
  }, [dispatch, id]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const resultAction = await dispatch(
        memberUpdate({ id, formData: values })
      );

      if (memberUpdate.fulfilled.match(resultAction)) {
        dispatch(
          setMessage("Login credentials successfully sent to your email")
        );
        setShowMessage(true);
      } else {
        const errorMessage =
          resultAction.payload?.Error ||
          resultAction.error?.message ||
          "Failed to update member.";
        dispatch(setError(errorMessage)); // Set error message in Redux state
        setShowMessage(true); // Show the error message in the MessageBox
      }
    } catch (error) {
      dispatch(setError(error.message || "Something went wrong."));
      setShowMessage(true); // Show the error message in the MessageBox
    } finally {
      setLoading(false);
    }
  };

  return (
    <Div className="h-full m-6">
      <Div className="container">
        {showMessage && <MessageBox message={message} error={error} />}
        <Link to={`/member-profile/${id}`}>
          <ArrowHeading
            title="Member Profile"
            size="xl"
            color="black"
            fontWeight="semibold"
          />
        </Link>
        <Formik
          initialValues={{
            // Set initial values based on `selectedMember`. If no member data, leave it blank.
            delivery_method:
              selectedMember?.login_email ||
              selectedMember?.login_contact ||
              "",
            method: selectedMember?.login_email
              ? "email"
              : selectedMember?.login_contact
              ? "contact"
              : "" // Default to empty if no email/contact
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            errors,
            touched,
            handleChange,
            values,
            setFieldValue,
            validateField,
            isValid,
            dirty,
            setTouched,
            handleBlur
          }) => (
            <Form className="p-6 rounded-lg max-w-md relative">
              {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                  <LoadingAnimation />
                </div>
              )}

              {/* Message Box */}
              {showMessage && (
                <MessageBox
                  message={message}
                  error={error}
                  clearMessage={() => {
                    dispatch(clearMessage());
                    setShowMessage(false);
                  }}
                  onOk={() => {
                    if (message) {
                      navigate(`/member-profile/${id}`);
                    }
                  }}
                />
              )}

              {/* Radio buttons for Email or Contact Selection */}
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <Field
                    type="radio"
                    name="method"
                    value="email"
                    checked={values.method === "email"}
                    onChange={() => {
                      setFieldValue("method", "email");
                      setFieldValue(
                        "delivery_method",
                        selectedMember?.login_email || ""
                      );
                      validateField("delivery_method");
                      setTouched({}); // Clear touched on method change
                    }}
                    className="cursor-pointer w-[15px] h-[15px] accent-[#3C9D9B]"
                    disabled={loading || error || !selectedMember} // Disable if no selected member
                  />
                  <span>Email</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Field
                    type="radio"
                    name="method"
                    value="contact"
                    checked={values.method === "contact"}
                    onChange={() => {
                      setFieldValue("method", "contact");
                      setFieldValue(
                        "delivery_method",
                        selectedMember?.login_contact || ""
                      );
                      validateField("delivery_method");
                      setTouched({}); // Clear touched on method change
                    }}
                    className="cursor-pointer w-[15px] h-[15px] accent-[#3C9D9B]"
                    disabled={loading || error || !selectedMember} // Disable if no selected member
                  />
                  <span>Contact Number</span>
                </label>
              </div>

              {/* Delivery Method Input Field */}
              <div className="login-field">
                <input
                  id="delivery_method"
                  name="delivery_method"
                  type="text"
                  value={values.delivery_method}
                  className="login-field-input"
                  placeholder="Enter Email or Contact Number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={
                    loading || error || !selectedMember || !values.method
                  } // Disable input based on conditions
                />
                <label className="login-field-label" htmlFor="Email">
                  Email/Contact
                </label>
              </div>

              {/* Error Message for Email or Contact */}
              {errors.delivery_method && touched.delivery_method && (
                <ErrorMessage message={errors.delivery_method} />
              )}

              <SubmitButton
                text="Update"
                width="full"
                disabled={loading || !dirty || error}
              />
            </Form>
          )}
        </Formik>
      </Div>
    </Div>
  );
};

export default LoginCredentialEdit;

import { BiArrowBack } from "react-icons/bi";
import TextInputComponent from "Components/FormComponent/TextInputComponent";
import RadioComponent from "Components/FormComponent/RadioComponent";
import ArrowHeading from "Components/HeadingComponent/ArrowHeading";
import { Div } from "Components/Ui/Div";
import ErrorMessage from "../../../Components/MessageBox/ErrorMessage";

const LoginCredential = ({
  formData,
  memberFields,
  handleChange,
  onNext,
  setFormData,
  errors
}) => {
  // Handle Radio Button Change (Contact or Email)

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      login: value, // Save the selected login method (either 'contact' or 'email')
      delivery_method:
        value === "contact" ? formData.general_contact : formData.general_email // Set delivery_method when login changes
    }));
  };

  // Handle input field change for contact or email
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue =
      value || (name === "contact" ? "" : formData.general_email);
    // const updatedValue = value || (name === 'contact' ? formData.general_contact : formData.general_email);

    setFormData((prev) => ({
      ...prev,
      [name]: value, // Allow editing but do not change the original general_contact or general_email
      delivery_method: updatedValue // Update delivery_method only if changed
    }));
  };

  // Set the label and value dynamically based on selected login method
  const label =
    formData.login === "contact"
      ? "Enter Contact Number"
      : formData.login === "email"
      ? "Enter Email"
      : "";
  const value =
    formData.login === "contact"
      ? formData.contact || formData.general_contact
      : formData.login === "email"
      ? formData.email || formData.general_email
      : "";
  const delivery_method_name =
    formData.login === "contact" ? errors.contact : errors.email;
  return (
    <Div className="w-full">
      <ArrowHeading title="Login Credential" onNext={onNext} size="md" />

      {/* Radio Button for Login Method */}
      <Div className="mb-3">
        <RadioComponent
          options={[
            { value: "contact", label: "Contact" },
            { value: "email", label: "Email" }
          ]}
          selectedValue={formData.login}
          onChange={handleRadioChange}
          name="login"
          label="Select Login Method"
        />
      </Div>

      <div className="login-field">
  <input
    type="text"
    name={formData.login === "contact" ? "contact" : "email"}
    value={value}
    className="login-field-input"
    onChange={handleInputChange}
    style={{ width: "100%" }}
    disabled={!formData.login} // Disable if no login method is selected
  />
  <label className="login-field-label" htmlFor={label}>
    {label}
  </label>
</div>

      <ErrorMessage message={delivery_method_name} />
    </Div>
  );
};

export default LoginCredential;

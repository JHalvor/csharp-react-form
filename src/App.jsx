import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  //TODO: Add your state fields here

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    complaint: "",
    contact: "",
    consent: false,
  });

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: event.target.checked });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    console.log(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);

    fetch("https://localhost:7213/complaints", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.status === 200) {
          const root = document.getElementById("root");
          root.innerHTML =
            "<h1>Submitted</h1><br /><a href='http://localhost:5174'>try another</a>";
        }
        console.log(res.json());
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Complaining form!</h2>
        <div className="form__section-left">
          <label>
            Full name
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </label>
          <label>
            Address
            <input
              type="text"
              name="address"
              onChange={handleChange}
              value={formData.address}
            />
          </label>
          <label htmlFor="PhoneNumber">
            Phone Number
            <input
              id="PhoneNumber"
              type="tel"
              name="phone"
              onChange={handleChange}
              value={formData.phone}
            />
          </label>

          <label htmlFor="Email">
            Email
            <input
              id="Email"
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
          </label>
        </div>

        <div className="form__section-right">
          <label htmlFor="complaint">
            Write your complaint
            <textarea
              id="complaint"
              name="complaint"
              rows="10"
              placeholder="You can complain here"
              value={formData.complaint}
              onChange={handleChange}
            ></textarea>
          </label>

          <div className="form__radio-group">
            <p>How do you want to be contacted? </p>
            <label>
              <input
                type="radio"
                name="contact"
                value="phone"
                onChange={handleChange}
                checked={formData.contact === "phone"}
              />
              Phone
            </label>

            <label>
              <input
                type="radio"
                name="contact"
                value="email"
                onChange={handleChange}
                checked={formData.contact === "email"}
              />
              Email
            </label>

            <label>
              <input
                type="radio"
                name="contact"
                value="post"
                onChange={handleChange}
                checked={formData.contact === "post"}
              />
              Slow Mail
            </label>

            <label>
              <input
                type="radio"
                name="contact"
                value="none"
                onChange={handleChange}
                checked={formData.contact === "none"}
              />
              No contact!
            </label>
          </div>

          <label>
            I agree you take my data, and do whatever
            <input
              type="checkbox"
              name="consent"
              id="consent"
              onChange={handleChange}
              checked={formData.consent}
            />
          </label>
        </div>
        <input type="submit" value="Submit!" />
      </form>
    </>
  );
}

export default App;

import React, { useState } from "react";
import PageHeaderContent from "../../components/pageHeaderContent";
import { BsInfoCircleFill } from "react-icons/bs";
import { Animate } from "react-simple-animate";
import axios from "axios";
import "./styles.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Contact = () => {
  const [contactData, setContactData] = useState({
    name: "",
    message: "",
    email: "",
    phoneNumber:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const Submitmessage = async () => {
    try {
      const response = await axios.post("http://localhost:3001/mail", contactData);
      console.log(response);
      if (!contactData.name || !contactData.message || !contactData.email || !contactData.phoneNumber) {
        toast.error("All fields are required", { autoClose: 1000 });
      } else {
        toast.success(response.data.message, { autoClose: 1000 });
        setTimeout(() => {
          setContactData({
            name: "",
            message: "",
            email: "",
            phoneNumber: ""
          });
        }, 2000);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("An error occurred", { autoClose: 1000 });
    }
  };
  
  return (
    <>
    <ToastContainer/>
    <section id="contact" className="contact">
      <PageHeaderContent
        headerText="My Contact"
        icon={<BsInfoCircleFill size={40} />}
      />
      <div className="contact__content">
        <Animate
          play
          duration={1}
          delay={0}
          start={{
            transform: "translateX(-200px)"
          }}
          end={{
            transform: "translateX(0px)"
          }}
        >
          <h3 className="contact__content__header-text">Let's Talk</h3>
        </Animate>
        <Animate
          play
          duration={1}
          delay={0}
          start={{
            transform: "translateX(200px)"
          }}
          end={{
            transform: "translateX(0px)"
          }}
        >
          <div className="contact__content__form">
            <div className="contact__content__form__controlswrapper">
              <div>
                <input
                  required
                  name="name"
                  value={contactData.name}
                  className="inputName"
                  type="text"
                  onChange={handleChange}
                  placeholder="Name"
                />
              </div>
              <br></br>
              <div>
                <input
                  required
                  name="email"
                  value={contactData.email}
                  className="inputEmail"
                  type="text"
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <br/>
              <div>
                <input
                  required
                  name="phoneNumber"
                  value={contactData.phoneNumber}
                  className="inputName"
                  type="number"
                  onChange={handleChange}
                  placeholder="Enter your Phone number"
                  color="yellow"
                />
              </div>
              <br/>
              <div>
                <textarea
                  required
                  name="message"
                  value={contactData.message}
                  className="inputDescription"
                  type="text"
                  rows="5"
                  onChange={handleChange}
                  placeholder="Message"
                />
              </div>
            </div>
            <button onClick={Submitmessage}>Submit</button>
          </div>
        </Animate>
      </div>
    </section>
  </>  
  );
};

export default Contact;

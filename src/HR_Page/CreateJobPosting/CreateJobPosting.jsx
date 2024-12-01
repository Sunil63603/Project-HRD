// importing react to use the components based architecture and needed to interpret JSX and in React 17 not needed.
import React, { useState } from "react";
import "./CreateJobPosting.css"; // Import the CSS file

// import Required for 3rd party Toast Notifications
import PopUpToast from "../../Components/Alert_Message/Alert";

const CreateJobPosting = () => {
  //State management
  // [variable , method to set the variable]
  // this state will store the companyname which is updated in the form and the method to set the companyname.
  const [companyName, setCompanyName] = useState("");
  // this is the state which will store the jobDescription which is updated in the form and the method to set the companyname.
  const [jobDescription, setJobDescription] = useState("");
  // the is the state which will store the eligibility criteria which is updated in the form and the method to set the companyname.
  const [eligibility, setEligibility] = useState("");
  // this state will store the apply link which is updated in the form and the method to set the companyname.
  const [applyLink, setApplyLink] = useState("");

  const [additionalDetails, setadditionalDetails] = useState("");

  // Alert states

  const [showPopup, setshowPopup] = useState(false);
  const [messagetoSend, setmessagetoSend] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  let alertTimeout;

  //  when the form is submited this method will be called.
  const handleSubmit = async (e) => {
    // it will prevent the form from submition and reloading.
    e.preventDefault();

    // try catch block.
    try {
      // Submit data to the JSON server at /jobs endpoint
      // if the input is filled by the student the text is uploded to the respentive states and then we will store the one object (formData) and then stored in the DB/json Server file.
      const formData = {
        companyName,
        jobDescription,
        eligibility,
        applyLink,
        additionalDetails,
      };
      // this is the fetch method to make changes in the DB / .json file
      // the fetch function makes the http request such as the POST, GET, PUT, DELETE
      // the fetch function sends the request to the end point http://localhost:3000/jobs
      // await is to pause the function untill the fetch request is completed (asyncronously).
      await fetch("http://localhost:3000/jobs", {
        // POST method is to store in the DB/in the jsonServer
        // POST request is to send the new data to the server in this case jobs
        method: "POST",
        // additional detail send with the data helping server understand what kind of data is being sent to the server. and tell that the data is sent in the json format.
        headers: {
          "Content-Type": "application/json",
        },
        // the formData into the json String form.
        body: JSON.stringify(formData),
      });

      //  this is to make the form empty after submisstion, so that for the good user experience.
      setCompanyName("");
      setJobDescription("");
      setEligibility("");
      setApplyLink("");
      setadditionalDetails("");

      // Toast PopUp or alert message
      PopUpToast.success("Job posted successfully!");
    } catch (error) {
      // Handle any errors
      // console.error("Error posting data:", error);

      // Toast PopUp or alert message
      PopUpToast.warning(
        "There was an error submitting the form! Please check your server."
      );
    }
  };

  return (
    <form className="job-posting-form" onSubmit={handleSubmit}>
      <h2>Create Job Posting</h2>
      <div className="form-group">
        <label htmlFor="companyName">Company Name</label>
        <input
          type="text"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="jobDescription">Job Description</label>
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="eligibility">Eligibility</label>
        <textarea
          id="eligibility"
          value={eligibility}
          onChange={(e) => setEligibility(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="applyLink">Apply Link</label>
        <input
          type="url"
          id="applyLink"
          value={applyLink}
          onChange={(e) => setApplyLink(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="additionalDetails">Additional Details</label>
        <textarea
          id="additionalDetails"
          value={additionalDetails}
          onChange={(e) => setadditionalDetails(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default CreateJobPosting;

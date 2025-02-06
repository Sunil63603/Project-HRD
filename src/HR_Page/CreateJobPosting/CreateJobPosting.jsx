// importing react to use the components based architecture and needed to interpret JSX and in React 17 not needed.
import React, { useState } from "react";
import "./CreateJobPosting.css"; // Import the CSS file

//PopUpToastContext is used to notify student when HR creates a JOB posting
import { usePopUpToastContext } from "../../context/PopUpToastContext";

// import Required for 3rd party Toast Notifications
import PopUpToast from "../../Global Components/PopUpToast/PopUpToast";

const CreateJobPosting = () => {
  const { handleJobAlert } = usePopUpToastContext();

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

  //  when the form is submited this method will be called.
  // const handleSubmit = async () => {
  //   // try catch block.
  //   try {
  //     if (companyName === "" || jobDescription === "" || applyLink === "") {
  //       PopUpToast.warning("Fill the required fields");
  //       return;
  //     }

  //     // Submit data to the JSON server at /jobs endpoint
  //     // if the input is filled by the HR, the text is uploded to the respentive states and then we will store the one object (formData) and then stored in the DB/json Server file.
  //     const formData = {
  //       companyName,
  //       jobDescription,
  //       eligibility,
  //       applyLink,
  //       additionalDetails,
  //       timestamp: new Date().toISOString(), // Adds a timestamp in ISO format
  //     };
  //     // this is the fetch method to make changes in the DB / .json file
  //     // the fetch function makes the http request such as the POST, GET, PUT, DELETE
  //     // the fetch function sends the request to the end point http://localhost:3000/jobs
  //     // await is to pause the function untill the fetch request is completed (asyncronously).
  //     await fetch("http://localhost:3000/jobs", {
  //       // POST method is to store in the DB/in the jsonServer
  //       // POST request is to send the new data to the server in this case jobs
  //       method: "POST",
  //       // additional detail send with the data helping server understand what kind of data is being sent to the server. and tell that the data is sent in the json format.
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       // the formData into the json String form.
  //       body: JSON.stringify(formData),
  //     });

  //     //  this is to make the form empty after submisstion, so that for the good user experience.
  //     setCompanyName("");
  //     setJobDescription("");
  //     setEligibility("");
  //     setApplyLink("");
  //     setadditionalDetails("");

  //     // Toast PopUp or alert message
  //     PopUpToast.success("Job posted successfully!");

  //     //❌❌This logic is not working❌❌
  //     handleJobAlert(); //this is used to notify student.
  //     //this function call will set 'newJobAlert' to true in PopUpToastContext
  //   } catch (error) {
  //     // Handle any errors
  //     // console.error("Error posting data:", error);

  //     // Toast PopUp or alert message
  //     PopUpToast.warning(
  //       "There was an error submitting the form! Please check your server."
  //     );
  //   }
  // };

  // When the form is submitted this method will be called.
  const handleSubmit = async () => {
    try {
      if (companyName === "" || jobDescription === "" || applyLink === "") {
        PopUpToast.warning("Fill the required fields");
        return;
      }

      // Prepare the new job data
      const formData = {
        companyName,
        jobDescription,
        eligibility,
        applyLink,
        additionalDetails,
        timestamp: new Date().toISOString(), // Adds a timestamp in ISO format
      };

      const response = await fetch(
        "https://hrd-database-default-rtdb.asia-southeast1.firebasedatabase.app/jobs.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to add new job");
      }

      // Clear the form fields after successful submission
      setCompanyName("");
      setJobDescription("");
      setEligibility("");
      setApplyLink("");
      setadditionalDetails("");

      // Show a success toast message
      PopUpToast.success("Job posted successfully!");

      // Notify students
      handleJobAlert();
    } catch (error) {
      // Handle errors
      console.error("Error posting data:", error);
      PopUpToast.warning(
        "There was an error submitting the form! Please check your server."
      );
    }
  };

  return (
    <form
      className="job-posting-form"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSubmit();
        }
      }}
    >
      <h2>Create Job Posting</h2>
      <div className="form-group">
        <div className="combination-of-comname-astres">
          <label htmlFor="companyName">Company Name</label>
          <span className="astirc-symbol"> *</span>
        </div>

        <input
          type="text"
          id="companyName"
          value={companyName}
          onChange={(e) => {
            setCompanyName(e.target.value);
          }}
          required
        />
      </div>
      <div className="form-group">
        <div className="combination-of-comname-astres">
          <label htmlFor="jobDescription">Job Description</label>
          <span className="astirc-symbol"> *</span>
        </div>
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <div className="combination-of-comname-astres">
          <label htmlFor="eligibility">Eligibility</label>
          <span className="astirc-symbol"> *</span>
        </div>
        <textarea
          id="eligibility"
          value={eligibility}
          onChange={(e) => setEligibility(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <div className="combination-of-comname-astres">
          <label htmlFor="applyLink">Apply Link</label>
          <span className="astirc-symbol"> *</span>
        </div>
        <input
          type="url"
          id="applyLink"
          value={applyLink}
          onChange={(e) => setApplyLink(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="additionalDetails">Additional Details (Optional)</label>
        <textarea
          id="additionalDetails"
          value={additionalDetails}
          onChange={(e) => setadditionalDetails(e.target.value)}
        />
      </div>
      <button
        className="submit-button"
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default CreateJobPosting;

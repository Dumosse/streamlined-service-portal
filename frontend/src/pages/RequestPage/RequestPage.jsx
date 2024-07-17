import React, { useRef, useState } from "react";
import classes from "./RequestPage.module.css";
import { Form, json, redirect, useRouteLoaderData } from "react-router-dom";
import uploadIcon from "../../assets/upload-icon.svg";
import axios from "axios";

const RequestPage = () => {
  const user = useRouteLoaderData("home");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  return (
    <section className={classes.request}>
      <div className={classes.main}>
        <h1>Request</h1>
        <Form method="post" encType="multipart/form-data">
          <div className={classes.inputs}>
            <div className={classes.firstHalf}>
              <div>
                <span>
                  <label id="technicianLabel">Technician</label>
                  <select name="technician" required>
                    <option value="Janitor">Janitor</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Carpentry">Carpentry</option>
                    <option value="Masonry">Masonry</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </span>
                <span>
                  <label id="locationLabel">Location</label>
                  <input
                    type="text"
                    name="request_location"
                    placeholder="e.g. CCS Faculty Room"
                    required
                  />
                </span>
              </div>
              <div>
                <label id="departmentLabel">Department</label>
                <input
                  type="text"
                  defaultValue={user.department}
                  disabled
                  required
                />
                <label id="datetimeLabel">Date and Time</label>
                <input type="datetime-local" name="datetime" required />
              </div>
            </div>
            <div className={classes.secondHalf}>
              <span>
                <label id="purposeLabel">Purpose</label>
                <textarea
                  type="text"
                  name="purpose"
                  placeholder="e.g. Clean the room."
                  required
                ></textarea>
              </span>
              <span>
                <label id="attachFileLabel">Attach File *Optional</label>
                <div className={classes.fileUpload}>
                  <div className={classes.fileArea}>
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        style={{ maxWidth: "100%" }}
                        onClick={handleImageClick}
                      />
                    ) : (
                      file && <p onClick={handleImageClick}>{file.name}</p>
                    )}
                  </div>
                  <div className={classes.imageUpload}>
                    <label htmlFor={classes.fileInput}>
                      <div>
                        <div onClick={handleImageClick}>
                          <img src={uploadIcon} alt="upload icon" />
                        </div>
                      </div>
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      name="attachment"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                  </div>
                </div>
              </span>
            </div>
          </div>
          <button type="submit" id="submitButton">
            Submit Record
          </button>
        </Form>
      </div>
    </section>
  );
};

export default RequestPage;

export const action = async ({ request, params }) => {
  const user_id = params.user_id;
  const data = await request.formData();

  const rawDatetime = data.get("datetime");
  const formattedDatetime = new Date(rawDatetime).toISOString();

  const requestData = new FormData();
  requestData.append("request_location", data.get("request_location"));
  requestData.append("datetime", formattedDatetime);
  requestData.append("purpose", data.get("purpose"));
  requestData.append("user_id", user_id);
  requestData.append("technician", data.get("technician"));
  requestData.append("attachment", data.get("attachment"));

  for (let [key, value] of requestData.entries()) {
    console.log(`${key}: ${value}`);
  }

  try {
    const response = await axios.post(
      "http://localhost:8080/request/add",
      requestData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status !== 200) {
      throw json({ message: "Could not create request." }, { status: 500 });
    }

    const resData = response.data;
    console.log(resData);

    return redirect(`/home/${user_id}`);
  } catch (error) {
    console.error(error.response);
  }
};

'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL =
  "https://l33yu4v0ic.execute-api.us-east-1.amazonaws.com/Prod/faces";
const CHECK_FACE_URL =
  "https://l33yu4v0ic.execute-api.us-east-1.amazonaws.com/Prod/faces/check";

const ListFaces = () => {
  const [faces, setFaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [personName, setPersonName] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [checkFile, setCheckFile] = useState(null);
  const [checkResult, setCheckResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [personId, setPersonId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [digitalAddress, setDigitalAddress] = useState("");
  const [hasCriminalRecord, setHasCriminalRecord] = useState(false);
  const [showCriminalRecordModal, setShowCriminalRecordModal] = useState(false);
  const [criminalRecordId, setCriminalRecordId] = useState("");
  const [offenceType, setOffenceType] = useState("");
  const [sentenceLengthMonths, setSentenceLengthMonths] = useState("");
  const [arrestDate, setArrestDate] = useState("");
  const [arrestingOfficer, setArrestingOfficer] = useState("");
  const [isCriminalRecordModalOpen, setIsCriminalRecordModalOpen] =
    useState(false);
  const [selectedCriminalRecord, setSelectedCriminalRecord] = useState(null);

  const RedXSVG = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 5L5 15"
        stroke="#FF0000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 5L15 15"
        stroke="#FF0000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  useEffect(() => {
    fetchFaces();
  }, []);

  const fetchFaces = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("Fetched faces:", response.data);
      setFaces(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch faces. Please try again later.");
      setLoading(false);
      console.error("Error fetching faces:", err);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile || !firstName.trim() || !lastName.trim()) {
      setUploadStatus(
        "Please select a file and enter at least the first and last name"
      );
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64data = reader.result.split(",")[1];

      // Construct personName for Rekognition
      const personName = [firstName, middleName, lastName]
        .filter(Boolean) // Remove empty strings
        .join("_");

      try {
        setUploadStatus("Uploading...");
        const response = await axios.post(API_URL, {
          image: base64data,
          personName,
          personId,
          firstName: firstName.trim(),
          middleName: middleName.trim(),
          lastName: lastName.trim(),
          dob,
          citizenship,
          placeOfBirth,
          address,
          digitalAddress,
          hasCriminalRecord,
          criminalRecord: hasCriminalRecord
            ? {
                criminalRecordId,
                offenceType,
                sentenceLengthMonths,
                arrestDate,
                arrestingOfficer,
              }
            : null,
        });

        setUploadStatus("Face added successfully");
        setIsAddModalOpen(false);
        resetForm();
        fetchFaces(); // Refresh the face list
        toast.success("Face record added successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        setUploadStatus(
          "Failed to add face: " +
            (error.response ? error.response.data.error : error.message)
        );
        console.error("Error adding face:", error);
        toast.error("Failed to add face record. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    };

    reader.readAsDataURL(selectedFile);
  };

  const fetchCriminalRecord = async (faceId) => {
    const url = `${API_URL}/criminal-record/${faceId}`;
    console.log("Fetching criminal record from:", url);
    try {
      const response = await axios.get(url);
      console.log("Criminal record response:", response.data);
      if (response.data && Object.keys(response.data).length > 0) {
        setSelectedCriminalRecord(response.data);
        setIsCriminalRecordModalOpen(true);
      } else {
        toast.error("No criminal record found for this face.");
      }
    } catch (error) {
      console.error("Error fetching criminal record:", error);
      toast.error("Failed to fetch criminal record. Please try again.");
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPersonId("");
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setDob("");
    setCitizenship("");
    setPlaceOfBirth("");
    setAddress("");
    setDigitalAddress("");
    setHasCriminalRecord(false);
    setCriminalRecordId("");
    setOffenceType("");
    setSentenceLengthMonths("");
    setArrestDate("");
    setArrestingOfficer("");
  };

  const openImageModal = async (faceId) => {
    setImageLoading(true);
    setSelectedImage(null);
    setImageError(null);
    setIsModalOpen(true);
    try {
      console.log("Fetching image for FaceId:", faceId);
      const response = await axios.get(`${API_URL}/${faceId}`);
      console.log("Image URL response:", response.data);
      if (response.data && response.data.imageUrl) {
        setSelectedImage(response.data.imageUrl);
      } else {
        throw new Error("No image URL received");
      }
    } catch (error) {
      console.error("Error fetching image URL:", error);
      setImageError("Failed to load image. Please try again later.");
    } finally {
      setImageLoading(false);
    }
  };

  const handleCheckFileChange = (event) => {
    setCheckFile(event.target.files[0]);
  };

  const handleCheckFace = async (event) => {
    event.preventDefault();
    if (!checkFile) {
      setCheckResult("Please select a file to check");
      return;
    }

    setIsChecking(true);
    setCheckResult(null);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64data = reader.result.split(",")[1];

      try {
        const response = await axios.post(CHECK_FACE_URL, {
          image: base64data,
        });

        setCheckResult(response.data);
      } catch (error) {
        setCheckResult(
          "Failed to check face: " +
            (error.response ? error.response.data.error : error.message)
        );
        console.error("Error checking face:", error);
      } finally {
        setIsChecking(false);
      }
    };

    reader.readAsDataURL(checkFile);
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto mt-8">
      <ToastContainer />
      {/* Add Face Modal */}{" "}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Faces in Collection</h2>
        <div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Add New
          </button>
          <button
            onClick={() => setIsCheckModalOpen(true)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Check Face
          </button>
        </div>
      </div>
      {faces.length === 0 ? (
        <p>No faces found in the collection.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Face ID</th>
                <th className="py-2 px-4 border-b">Person Name</th>
                <th className="py-2 px-4 border-b">ImageId</th>
              </tr>
            </thead>
            <tbody>
              {faces.map((face) => (
                <tr key={face.FaceId} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => openImageModal(face.FaceId)}
                      className="text-blue-500 hover:underline"
                    >
                      {face.FaceId}
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">{face.ExternalImageId}</td>
                  <td className="py-2 px-4 border-b">{face.ImageId}</td>
                  <td className="py-2 px-4 border-b">
                    {face.HasCriminalRecord ? (
                      <button
                        onClick={() => fetchCriminalRecord(face.FaceId)}
                        className="text-red-500 font-bold flex items-center hover:underline"
                      >
                        <RedXSVG />
                        <span className="ml-2">Yes</span>
                      </button>
                    ) : (
                      <span className="text-green-500">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            {imageLoading ? (
              <div className="text-center">Loading image...</div>
            ) : imageError ? (
              <div className="text-center text-red-500">{imageError}</div>
            ) : selectedImage ? (
              <img
                src={selectedImage}
                alt="Face"
                className="w-full h-auto"
                onError={(e) => {
                  console.error("Image failed to load:", e);
                  setImageError(
                    "Failed to load image. Please try again later."
                  );
                }}
              />
            ) : (
              <div className="text-center">No image available</div>
            )}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setSelectedImage(null);
                setImageError(null);
              }}
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Add New Face
              </h3>
              <form onSubmit={handleSubmit} className="mt-2">
                <div className="mt-2">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="mt-2"
                    accept="image/*"
                  />
                </div>

                <div className="mt-2">
                  <input
                    type="text"
                    value={personId}
                    onChange={(e) => setPersonId(e.target.value)}
                    placeholder="Person ID"
                    className="mt-2 p-2 border rounded w-full"
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="mt-2 p-2 border rounded w-full"
                    required
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    placeholder="Middle Name"
                    className="mt-2 p-2 border rounded w-full"
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="mt-2 p-2 border rounded w-full"
                    required
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="Date of Birth"
                    className="mt-2 p-2 border rounded w-full"
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    value={citizenship}
                    onChange={(e) => setCitizenship(e.target.value)}
                    placeholder="Citizenship"
                    className="mt-2 p-2 border rounded w-full"
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    value={placeOfBirth}
                    onChange={(e) => setPlaceOfBirth(e.target.value)}
                    placeholder="Place of Birth"
                    className="mt-2 p-2 border rounded w-full"
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    className="mt-2 p-2 border rounded w-full"
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    value={digitalAddress}
                    onChange={(e) => setDigitalAddress(e.target.value)}
                    placeholder="Digital Address"
                    className="mt-2 p-2 border rounded w-full"
                  />
                </div>
                <div className="mt-2 flex items-center">
                  <label htmlFor="criminalRecord" className="mr-2">
                    Criminal Record:
                  </label>
                  <input
                    type="checkbox"
                    id="criminalRecord"
                    checked={hasCriminalRecord}
                    onChange={(e) => setHasCriminalRecord(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </div>
                {hasCriminalRecord && (
                  <button
                    type="button"
                    onClick={() => setShowCriminalRecordModal(true)}
                    className="mt-2 px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Enter Criminal Record Details
                  </button>
                )}
                <div className="items-center px-4 py-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Upload
                  </button>
                </div>
              </form>
              {uploadStatus && (
                <p className="mt-2 text-sm text-gray-500">{uploadStatus}</p>
              )}
            </div>
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      {showCriminalRecordModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Criminal Record Details
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowCriminalRecordModal(false);
                }}
                className="mt-2"
              >
                <div className="mt-2">
                  <input
                    type="text"
                    value={criminalRecordId}
                    onChange={(e) => setCriminalRecordId(e.target.value)}
                    placeholder="Criminal Record ID"
                    className="mt-2 p-2 border rounded w-full"
                    required
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    value={offenceType}
                    onChange={(e) => setOffenceType(e.target.value)}
                    placeholder="Offence Type"
                    className="mt-2 p-2 border rounded w-full"
                    required
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="number"
                    value={sentenceLengthMonths}
                    onChange={(e) => setSentenceLengthMonths(e.target.value)}
                    placeholder="Sentence Length (months)"
                    className="mt-2 p-2 border rounded w-full"
                    required
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="date"
                    value={arrestDate}
                    onChange={(e) => setArrestDate(e.target.value)}
                    placeholder="Arrest Date"
                    className="mt-2 p-2 border rounded w-full"
                    required
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    value={arrestingOfficer}
                    onChange={(e) => setArrestingOfficer(e.target.value)}
                    placeholder="Arresting Officer"
                    className="mt-2 p-2 border rounded w-full"
                    required
                  />
                </div>
                <div className="items-center px-4 py-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Save Criminal Record
                  </button>
                </div>
              </form>
            </div>
            <button
              onClick={() => setShowCriminalRecordModal(false)}
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      {isCriminalRecordModalOpen && selectedCriminalRecord && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Criminal Record
              </h3>
              <div className="mt-2 text-left">
                <p>
                  <strong>Person ID:</strong> {selectedCriminalRecord.person_id}
                </p>
                <p>
                  <strong>Record ID:</strong>{" "}
                  {selectedCriminalRecord.criminalRecordId}
                </p>
                <p>
                  <strong>Offence Type:</strong>{" "}
                  {selectedCriminalRecord.offenceType}
                </p>
                <p>
                  <strong>Sentence Length:</strong>{" "}
                  {selectedCriminalRecord.sentenceLengthMonths} months
                </p>
                <p>
                  <strong>Arrest Date:</strong>{" "}
                  {selectedCriminalRecord.arrestDate}
                </p>
                <p>
                  <strong>Arresting Officer:</strong>{" "}
                  {selectedCriminalRecord.arrestingOfficer}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCriminalRecordModalOpen(false)}
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      {isCheckModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Check Face
              </h3>
              <form onSubmit={handleCheckFace} className="mt-2">
                <div className="mt-2">
                  <input
                    type="file"
                    onChange={handleCheckFileChange}
                    className="mt-2"
                    accept="image/*"
                  />
                </div>
                <div className="items-center px-4 py-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                    disabled={isChecking}
                  >
                    {isChecking ? "Checking..." : "Check Face"}
                  </button>
                </div>
              </form>
              {checkResult && (
                <div className="mt-2 text-sm">
                  {typeof checkResult === "string" ? (
                    <p className="text-red-500">{checkResult}</p>
                  ) : (
                    <div>
                      <p>
                        Match found:{" "}
                        <span className="font-bold">
                          {checkResult.matched ? "Yes" : "No"}
                        </span>
                      </p>
                      {checkResult.matched && (
                        <p>
                          Matched person:{" "}
                          <span className="font-bold">
                            {checkResult.matchedPerson}
                          </span>
                        </p>
                      )}
                      <p>
                        Similarity:{" "}
                        <span className="font-bold">
                          {checkResult.similarity.toFixed(2)}%
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setIsCheckModalOpen(false);
                setCheckFile(null);
                setCheckResult(null);
              }}
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListFaces;

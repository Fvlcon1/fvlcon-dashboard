'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL =
  "https://gxdr14b8gf.execute-api.us-east-1.amazonaws.com/Prod/faces";
const CHECK_FACE_URL =
  "https://gxdr14b8gf.execute-api.us-east-1.amazonaws.com/Prod/faces/check";

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
    if (!selectedFile || !personName.trim()) {
      setUploadStatus("Please select a file and enter a person's name");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64data = reader.result.split(",")[1];

      try {
        setUploadStatus("Uploading...");
        const response = await axios.post(API_URL, {
          image: base64data,
          personName: personName.trim(),
        });

        setUploadStatus("Face added successfully");
        setIsModalOpen(false);
        setPersonName("");
        setSelectedFile(null);
        fetchFaces(); // Refresh the face list
      } catch (error) {
        setUploadStatus(
          "Failed to add face: " +
            (error.response ? error.response.data.error : error.message)
        );
        console.error("Error adding face:", error);
      }
    };

    reader.readAsDataURL(selectedFile);
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
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    placeholder="Person's Name"
                    className="mt-2 p-2 border rounded w-full"
                    required
                  />
                </div>
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

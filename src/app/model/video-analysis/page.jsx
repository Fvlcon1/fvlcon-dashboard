'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";

const UPLOAD_VIDEO_URL =
  "https://gxdr14b8gf.execute-api.us-east-1.amazonaws.com/Prod/upload-video";
const CHECK_JOB_STATUS_URL =
  "https://gxdr14b8gf.execute-api.us-east-1.amazonaws.com/Prod/check-job-status";

const VideoAnalysis = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [analysisStatus, setAnalysisStatus] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [error, setError] = useState(null);

  const handleVideoChange = (event) => {
    setSelectedVideo(event.target.files[0]);
    setError(null);
  };

  const handleVideoSubmit = async (event) => {
    event.preventDefault();
    if (!selectedVideo) {
      setError("Please select a video file");
      return;
    }
    try {
      const filename = selectedVideo.name;

      // Step 1: Get presigned URL
      setAnalysisStatus("Requesting upload URL...");
      const urlResponse = await axios.get(
        `${UPLOAD_VIDEO_URL}?filename=${encodeURIComponent(filename)}`
      );
      const { uploadUrl, videoKey } = urlResponse.data;

      // Step 2: Upload video to S3
      setAnalysisStatus("Uploading video...");
      await axios.put(uploadUrl, selectedVideo, {
        headers: {
          "Content-Type": selectedVideo.type,
        },
      });

      // Step 3: Start video processing
      setAnalysisStatus("Starting video analysis...");
      const processResponse = await axios.post(UPLOAD_VIDEO_URL, { videoKey });

      setJobId(processResponse.data.jobId);
      setAnalysisStatus(
        `Video analysis started. Job ID: ${processResponse.data.jobId}`
      );
    } catch (error) {
      console.error("Error in video analysis process:", error);
      setError(
        `Failed to process video: ${
          error.response?.data?.error || error.message
        }`
      );
      setAnalysisStatus(null);
    }
  };

  useEffect(() => {
    let intervalId;
    if (jobId) {
      intervalId = setInterval(async () => {
        try {
          const response = await axios.get(
            `${CHECK_JOB_STATUS_URL}?jobId=${jobId}`
          );
          setAnalysisStatus("Video analysis status: " + response.data.status);

          if (response.data.status === "SUCCEEDED") {
            setAnalysisResults(response.data.results);
            clearInterval(intervalId);
          } else if (response.data.status === "FAILED") {
            setError(
              "Video analysis failed: " +
                (response.data.error || "Unknown error")
            );
            setAnalysisStatus(null);
            clearInterval(intervalId);
          }
        } catch (error) {
          console.error("Error checking job status:", error);
          setError(
            "Failed to check video analysis status: " +
              (error.response ? error.response.data.error : error.message)
          );
          setAnalysisStatus(null);
          clearInterval(intervalId);
        }
      }, 5000); // Check every 5 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [jobId]);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Video Analysis</h2>
      <form onSubmit={handleVideoSubmit} className="mb-4">
        <div className="mb-4">
          <input
            type="file"
            onChange={handleVideoChange}
            className="border p-2 rounded"
            accept="video/*"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-500 text-white font-medium rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
          disabled={!selectedVideo}
        >
          Start Analysis
        </button>
      </form>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      {analysisStatus && <p className="mb-4 text-gray-700">{analysisStatus}</p>}
      {analysisResults && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Analysis Results:</h3>
          <ul className="list-disc list-inside">
            {analysisResults.map((person, personIndex) => (
              <li key={personIndex} className="mb-1">
                Person detected at {person.Timestamp}ms
                <ul className="list-disc list-inside ml-4">
                  {person.FaceMatches &&
                    person.FaceMatches.map((match, matchIndex) => (
                      <li key={matchIndex}>
                        {match.Face && match.Face.ExternalImageId} (Similarity:{" "}
                        {match.Similarity && match.Similarity.toFixed(2)}%)
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VideoAnalysis;

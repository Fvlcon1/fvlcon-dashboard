import AWS from 'aws-sdk';

AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY_ID,
  });

  // Initialize KVS client
const kinesisVideo = new AWS.KinesisVideo({
    region: "us-east-1",
});

// Get HLS Streaming URL from Kinesis Video Streams
export const getHLSStreamURL = async (streamName : string) => {
    try {
        const params = {
            StreamName: streamName,
            PlaybackMode: "LIVE", // For live streaming
        };

        // Get the endpoint for HLS session
        const endpointResponse = await kinesisVideo.getDataEndpoint({
            StreamName: streamName,
            APIName: "GET_HLS_STREAMING_SESSION_URL",
        }).promise();

        const kinesisVideoArchivedMedia = new AWS.KinesisVideoArchivedMedia({
            endpoint: endpointResponse.DataEndpoint,
            region: "us-east-1",
        });

        // Get the HLS session URL
        const hlsResponse = await kinesisVideoArchivedMedia
            .getHLSStreamingSessionURL(params)
            .promise();
        console.log({url : hlsResponse.HLSStreamingSessionURL})
        return hlsResponse.HLSStreamingSessionURL;
    } catch (error) {
        console.error("Error getting HLS stream URL:", error);
    }
}
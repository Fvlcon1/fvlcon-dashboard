import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config(); // Correct way to load environment variables

const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_KEY_ID;

console.log({ jwt: process.env.JWT_SECRET });
console.log({ accessKeyId, secretAccessKey });

AWS.config.update({
    region: 'us-east-1',
    accessKeyId,
    secretAccessKey,
});

// Initialize KVS client
const kinesisVideo = new AWS.KinesisVideo({
    region: 'us-east-1',
});

// Get HLS Streaming URL from Kinesis Video Streams
export const getHLSStreamURL = async (streamName: string) => {
    try {
        const params = {
            StreamName: streamName,
            PlaybackMode: 'LIVE', // For live streaming
        };

        // Get the endpoint for HLS session
        const endpointResponse = await kinesisVideo
            .getDataEndpoint({
                StreamName: streamName,
                APIName: 'GET_HLS_STREAMING_SESSION_URL',
            })
            .promise();

        const kinesisVideoArchivedMedia = new AWS.KinesisVideoArchivedMedia({
            endpoint: endpointResponse.DataEndpoint,
            region: 'us-east-1',
        });

        // Get the HLS session URL
        const hlsResponse = await kinesisVideoArchivedMedia
            .getHLSStreamingSessionURL(params)
            .promise();
        
        console.log({ url: hlsResponse.HLSStreamingSessionURL });
        return hlsResponse.HLSStreamingSessionURL;
    } catch (error) {
        console.error('Error getting HLS stream URL:', error);
    }
};

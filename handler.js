'use strict';

const AWS = require('aws-sdk');
const request = require('request-promise');

module.exports.handler = async event => {
  // console.log(event);
  var transcribeservice = new AWS.TranscribeService();

  var params = {
    TranscriptionJobName: event.pathParameters.jobName
  };

  try {
    const data = await transcribeservice.getTranscriptionJob(params).promise()
    var s3Url = data.TranscriptionJob.Transcript.TranscriptFileUri

    var transcript = await request.get(s3Url).promise()

    var baseTranscript = JSON.parse(transcript).results.transcripts[0].transcript

    var finalResponse = {
      response: baseTranscript
    }

    return {
      statusCode: 200,
      headers: {
        "access-control-allow-origin": "*"
      },
      // body: baseTranscript.results.transcripts
      body: JSON.stringify(finalResponse)
    };

  }
  catch (error) {
    return {
      statusCode: 400,
      error: `Could not post: ${error.stack}`
    };
  }
};

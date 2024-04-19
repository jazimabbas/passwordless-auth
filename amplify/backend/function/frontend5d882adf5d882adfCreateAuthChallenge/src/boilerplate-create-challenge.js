/* tslint:disable */
/* eslint-disable */
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

exports.handler = async (event) => {
  //Create a random number for otp
  let secretLoginCode = Math.random().toString(10).substr(2, 6);
  const phoneNumber = event.request.userAttributes.phone_number;

  if (!event.request.session || !event.request.session.length) {
    await sendOTP(secretLoginCode, phoneNumber);
  } else {
    const previousChallenge = event.request.session.slice(-1)[0];
    secretLoginCode = previousChallenge.challengeMetadata.match(/CODE-(\d*)/)[1];
  }

  event.response.publicChallengeParameters = {
    phone_number: event.request.userAttributes.phone_number,
  };

  event.response.privateChallengeParameters = { secretLoginCode };
  event.response.challengeMetadata = `CODE-${secretLoginCode}`;

  return event;
};

async function sendOTP(secretLoginCode, phoneNumber) {
  const sns = new SNSClient({ region: "us-east-1" });
  const publishCommand = new PublishCommand({
    Message: `Your verification code is ${secretLoginCode}`,
    PhoneNumber: phoneNumber,
    MessageStructure: "string",
    MessageAttributes: {
      "AWS.SNS.SMS.SenderID": {
        DataType: "String",
        StringValue: "AppName",
      },
      "AWS.SNS.SMS.SMSType": {
        DataType: "String",
        StringValue: "Transactional",
      },
    },
  });

  return sns.send(publishCommand);
}

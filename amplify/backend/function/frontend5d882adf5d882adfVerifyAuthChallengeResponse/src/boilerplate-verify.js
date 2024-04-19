/* tslint:disable */
/* eslint-disable */

exports.handler = (event) => {
  if (event.request.privateChallengeParameters.secretLoginCode === event.request.challengeAnswer) {
    event.response.answerCorrect = true;
  } else {
    event.response.answerCorrect = false;
  }

  return event;
};

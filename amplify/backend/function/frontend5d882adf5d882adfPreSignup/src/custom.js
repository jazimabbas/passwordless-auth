/* tslint:disable */
/* eslint-disable */

exports.handler = (event) => {
  event.response.autoConfirmUser = true;
  event.response.autoVerifyPhone = true;

  return event;
};

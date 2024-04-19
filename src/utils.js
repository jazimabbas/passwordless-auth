import { signUp as signupApi, signIn as signinApi, confirmSignIn } from "aws-amplify/auth";

export const registration = async (phoneNumber) => {
  try {
    const result = await signinApi({
      username: phoneNumber,
      options: { authFlowType: "CUSTOM_WITHOUT_SRP" },
    });
    return result;
  } catch (err) {
    if (err.name === "UserNotFoundException") {
      await signup(phoneNumber);
      return;
    }

    throw err;
  }
};

export const verifyOTP = async (otpCode) => {
  const result = await confirmSignIn({ challengeResponse: otpCode });
  return result;
};

const signup = async (phoneNumber) => {
  const password = Math.random().toString(10) + "Abc#";
  await signupApi({
    username: phoneNumber,
    password,
    options: { userAttributes: { phone_number: phoneNumber } },
  });
  await registration(phoneNumber);
};

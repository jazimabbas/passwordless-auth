import { useState } from "react";
import { registration, verifyOTP } from "../utils";

export function Auth() {
  const [tab, setTab] = useState("phone"); // phone | verification

  return (
    <div className="form-wrapper">
      <h1>Signup or Signin</h1>
      <hr />

      {tab === "phone" ? (
        <RegistrationForm onSuccess={() => setTab("verification")} />
      ) : (
        <CodeVerificationForm />
      )}
    </div>
  );
}

function RegistrationForm({ onSuccess }) {
  const [phoneNo, setPhoneNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      await registration(phoneNo);
      setIsLoading(false);
      onSuccess();
    } catch (err) {
      setIsLoading(false);
      console.log("Error", err);
    }
  };

  return (
    <div className="center">
      <input
        placeholder="Phone Number"
        value={phoneNo}
        onChange={(e) => setPhoneNo(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={isLoading}>
        Submit
      </button>
    </div>
  );
}

function CodeVerificationForm() {
  const [code, setCode] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const { isSignedIn } = await verifyOTP(code);

      if (isSignedIn) setIsLoading(false);
      else alert("Invalid code");
    } catch (err) {
      setIsLoading(false);
      console.log("Code Verification Error", err);
    }
  };

  return (
    <div className="center">
      <input placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} />
      <button disabled={isLoading} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

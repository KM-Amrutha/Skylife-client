import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { CredentialResponse } from "@react-oauth/google";

interface GoogleAuthProps {
  // Allow async functions (Promise<void>)
  handleGoogleAuthSuccess?: (credentialResponse: CredentialResponse) => Promise<void> | void;
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ handleGoogleAuthSuccess }) => {
  return (
    <>
      <div className="flex items-center mb-4">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-gray-600">Or continue with</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>
      <div className="mt-4">
       {handleGoogleAuthSuccess && (  // ← safe render only if provided
          <GoogleLogin onSuccess={handleGoogleAuthSuccess} />
        )}
      </div>
    </>
  );
};

export default GoogleAuth;
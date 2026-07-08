import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { CredentialResponse } from "@react-oauth/google";

interface GoogleAuthProps {
  handleGoogleAuthSuccess?: (credentialResponse: CredentialResponse) => Promise<void> | void;
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ handleGoogleAuthSuccess }) => {
  return (
    <>
      <div className="flex items-center my-4">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-gray-600 text-sm">Or continue with</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>
      <div className="mt-4">
        {handleGoogleAuthSuccess && (
          <GoogleLogin onSuccess={handleGoogleAuthSuccess} />
        )}
      </div>
    </>
  );
};

export default GoogleAuth;
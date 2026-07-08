import { useFormik, FormikProps } from "formik";
import {
  userAuthValidationSchema,
  providerAuthValidationSchema
} from "../../utils/validationSchema";
import {
  UserAuthFormData,
  ProviderAuthFormData,
  SignState
} from "../../types/authTypes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signinUser,
  signupUser,
  signupProvider
} from "../../redux/auth/authThunk";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import { AppDispatch } from "../../redux/store";
import {
  setUser,
  setAdmin,
  setProvider
} from "../../redux/auth/authSlice";

interface UseAuthFormReturn {
  handleUserAuth: FormikProps<UserAuthFormData>;
  handleProviderAuth: FormikProps<ProviderAuthFormData>;
}

const useAuthForm = (formState: SignState = "sign in"): UseAuthFormReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleUserAuth = useFormik<UserAuthFormData>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      mobile: ""
    },
    validationSchema: userAuthValidationSchema(formState),
    onSubmit: async (values) => {

      try {
        if (formState === "sign up") {
          const response = await dispatch(signupUser({ userData: values })).unwrap();
          const otpSessionId = response.data.otpSessionId;
showSuccessToast(response.message);
handleUserAuth.resetForm();
navigate(`/verify-otp?session=${otpSessionId}`);
        } else {
          const response = await dispatch(
            signinUser({ email: values.email, password: values.password })
          ).unwrap();
        

          const userData = response.data.userData
          const providerData = response.data.providerData
          const role = userData?.role?? providerData?.role
          
          if (role === "user")  {
            dispatch(setUser(userData)) 
          showSuccessToast(`Welcome back ${userData.firstName}`);
        }
          else if (role === "admin") {
            dispatch(setAdmin(userData));
            showSuccessToast(`Welcome back ${userData.firstName}`)
          }
           else if (role === "provider"){
             dispatch(setProvider(providerData));
          showSuccessToast(`Welcome back ${providerData.companyName}`);
           }
          handleUserAuth.resetForm();
       
          navigate(
            role === "user"  ? "/user/userhome" 
            : role === "admin" ? "/admin/dashboard" 
            : "/provider/dashboard"
          );
        }
      } catch (error:any) {

        showErrorToast(error.message || "Authentication failed");
      }
    }
  });

  const handleProviderAuth = useFormik<ProviderAuthFormData>({
    initialValues: {
      companyName: "",
      email: "",
      mobile: "",
      password: "",
      airlineCode: "",
      
    },
    validationSchema: providerAuthValidationSchema(formState),
    onSubmit: async (values) => {
      try {
  
        const response = await dispatch(
          signupProvider({
            companyName: values.companyName,
            email: values.email,
            mobile: values.mobile,
            password: values.password,
            airlineCode: values.airlineCode 
          
          })
        ).unwrap();
        const otpSessionId = response.data.otpSessionId;
showSuccessToast(response.message);
handleProviderAuth.resetForm();
navigate(`/verify-otp?session=${otpSessionId}`);
      } catch (error: any) {
        showErrorToast(error.message || "Provider registration failed");
      }
    }
  });

  useEffect(() => {
    handleUserAuth.setErrors({});
    handleProviderAuth.setErrors({});
  }, [formState]);

  return { handleUserAuth, handleProviderAuth };
};

export default useAuthForm;

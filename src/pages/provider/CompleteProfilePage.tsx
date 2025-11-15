import useCompleteProviderProfile from "../../hooks/useCompleteProviderHook";
import CompleteProfileForm from "../../components/provider/CompleteProfileFom";

const CompleteProviderProfilePage = () => {
  const { formik, handleImageUpload, handlePdfUpload } = useCompleteProviderProfile();

  return (
    <CompleteProfileForm 
      formik={formik} 
      handleImageUpload={handleImageUpload}
      handlePdfUpload={handlePdfUpload}
    />
  );
};

export default CompleteProviderProfilePage;

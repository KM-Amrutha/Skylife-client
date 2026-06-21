import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../../redux/store";
import { createOffer } from "../../redux/offer/offerThunk";
import { getProviderAircrafts } from "../../redux/aircraft/aircraftThunk";
import { CreateOfferDTO } from "../../redux/offer/offerType";
import { Aircraft } from "../../redux/aircraft/aircraftTypes";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

const offerValidationSchema = Yup.object().shape({
  aircraftId: Yup.string().required("Please select an aircraft"),
  offerCode: Yup.string()
    .trim()
    .uppercase()
    .required("Offer code is required")
    .min(3, "Offer code must be at least 3 characters")
    .max(20, "Offer code must be at most 20 characters"),
  description: Yup.string()
    .trim()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  discountPercentage: Yup.number()
    .required("Discount percentage is required")
    .min(1, "Minimum discount is 1%")
    .max(100, "Maximum discount is 100%"),
  minimumAmount: Yup.number()
    .required("Minimum amount is required")
    .min(1, "Minimum amount must be greater than 0"),
  validFrom: Yup.string()
    .required("Valid from date is required")
    .test("is-future", "Valid from must be today or later", (value) => {
      if (!value) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(value) >= today;
    }),
  validTo: Yup.string()
    .required("Valid to date is required")
    .test("is-after-from", "Valid to must be after valid from", function (value) {
      const { validFrom } = this.parent;
      if (!value || !validFrom) return false;
      return new Date(value) > new Date(validFrom);
    }),
  usageLimit: Yup.number()
    .min(1, "Usage limit must be at least 1")
    .optional()
    .nullable(),
});

interface UseAddOfferReturn {
  formik: FormikProps<CreateOfferDTO>;
  aircrafts: Aircraft[];
  isLoadingAircrafts: boolean;
}

const useOffer = (): UseAddOfferReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { aircrafts, isLoading: isLoadingAircrafts } = useSelector(
    (state: RootState) => state.aircraft
  );

  useEffect(() => {
    dispatch(getProviderAircrafts({}));
  }, [dispatch]);

  const formik = useFormik<CreateOfferDTO>({
    initialValues: {
      aircraftId: "",
      offerCode: "",
      description: "",
      discountPercentage: 10,
      minimumAmount: 1000,
      validFrom: "",
      validTo: "",
      usageLimit: undefined,
    },
    validationSchema: offerValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload: CreateOfferDTO = {
          ...values,
          offerCode: values.offerCode.trim().toUpperCase(),
          usageLimit: values.usageLimit || undefined,
        };
        await dispatch(createOffer(payload)).unwrap();
        showSuccessToast("Offer created successfully");
        resetForm();
        navigate("/provider/offer-list");
      } catch (err: any) {
        showErrorToast(err || "Failed to create offer");
      }
    },
  });

  return {
    formik,
    aircrafts,
    isLoadingAircrafts,
  };
};

export default useOffer;
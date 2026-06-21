import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../../redux/store";
import { updateOffer } from "../../redux/offer/offerThunk";
import { UpdateOfferDTO, OfferResponseDTO } from "../../redux/offer/offerType";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

// Fields always editable
const baseSchema = {
  description: Yup.string()
    .trim()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  validFrom: Yup.string()
    .required("Valid from date is required"),
  validTo: Yup.string()
    .required("Valid to date is required")
    .test("is-after-from", "Valid to must be after valid from", function (value) {
      const { validFrom } = this.parent;
      if (!value || !validFrom) return false;
      return new Date(value) > new Date(validFrom);
    }),
};

// Fields editable only if usageCount === 0
const editableSchema = {
  offerCode: Yup.string()
    .trim()
    .required("Offer code is required")
    .min(3, "Offer code must be at least 3 characters")
    .max(20, "Offer code must be at most 20 characters"),
  discountPercentage: Yup.number()
    .required("Discount percentage is required")
    .min(1, "Minimum discount is 1%")
    .max(100, "Maximum discount is 100%"),
  minimumAmount: Yup.number()
    .required("Minimum amount is required")
    .min(1, "Minimum amount must be greater than 0"),
  usageLimit: Yup.number()
    .min(1, "Usage limit must be at least 1")
    .optional()
    .nullable(),
};

interface UseEditOfferReturn {
  formik: FormikProps<UpdateOfferDTO>;
  offer: OfferResponseDTO | null;
  isLoadingOffer: boolean;
}

const useEditOffer = (): UseEditOfferReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { offerId } = useParams<{ offerId: string }>();

  const { offers } = useSelector((state: RootState) => state.offer);
  
  const offer = offers.find((o) => o.id === offerId) ?? null;
  const isLoadingOffer = !offer;

  const validationSchema = Yup.object().shape(
    offer?.isEditable
      ? { ...baseSchema, ...editableSchema }
      : baseSchema
  );

  const formik = useFormik<UpdateOfferDTO>({
    initialValues: {
      description: offer?.description ?? "",
      validFrom: offer?.validFrom
        ? offer.validFrom.split("T")[0]
        : "",
      validTo: offer?.validTo
        ? offer.validTo.split("T")[0]
        : "",
      isActive: offer?.isActive ?? true,
      // editable only if usageCount === 0
      offerCode: offer?.offerCode ?? "",
      discountPercentage: offer?.discountPercentage ?? 10,
      minimumAmount: offer?.minimumAmount ?? 1000,
      usageLimit: offer?.usageLimit ?? undefined,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      if (!offerId) return;
      try {
        const payload: UpdateOfferDTO = {
          description: values.description,
          validFrom: values.validFrom,
          validTo: values.validTo,
          isActive: values.isActive,
          // only include editable fields if allowed
          ...(offer?.isEditable && {
            offerCode: values.offerCode?.trim().toUpperCase(),
            discountPercentage: values.discountPercentage,
            minimumAmount: values.minimumAmount,
            usageLimit: values.usageLimit || undefined,
          }),
        };
        await dispatch(updateOffer({ offerId, data: payload })).unwrap();
        showSuccessToast("Offer updated successfully");
        navigate("/provider/offer-list");
      } catch (err: any) {
        showErrorToast(err || "Failed to update offer");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return {
    formik,
    offer,
    isLoadingOffer,
  };
};

export default useEditOffer;
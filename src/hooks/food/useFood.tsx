import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../../redux/store";
import { createFood } from "../../redux/food/foodThunk";
import { getProviderAircrafts } from "../../redux/aircraft/aircraftThunk";
import { CreateFoodDTO } from "../../redux/food/foodType";
import { Aircraft } from "../../redux/aircraft/aircraftTypes";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

const FOOD_TYPES = ["Meal", "Snack", "Beverage", "Dessert", "Starter", "Other"];
const SERVE_METHODS = ["Hot", "Cold", "Room Temperature"];

const foodValidationSchema = Yup.object().shape({
  aircraftId: Yup.string().required("Please select an aircraft"),
  foodName: Yup.string().trim().required("Food name is required"),
  foodType: Yup.string().required("Food type is required"),
  vegNonveg: Yup.string()
    .oneOf(["veg", "non-veg"])
    .required("Please select veg or non-veg"),
  serveMethod: Yup.string().required("Serve method is required"),
  isComplimentary: Yup.boolean().required(),
  foodPrice: Yup.number().when("isComplimentary", {
    is: false,
    then: (schema) =>
      schema
        .required("Price is required")
        .min(1, "Price must be greater than 0"),
    otherwise: (schema) => schema.min(0).default(0),
  }),
});

interface UseAddFoodReturn {
  formik: FormikProps<CreateFoodDTO>;
  aircrafts: Aircraft[];
  isLoadingAircrafts: boolean;
  imagePreview: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearImage: () => void;
  foodTypes: string[];
  serveMethods: string[];
}

const useFood = (): UseAddFoodReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { aircrafts, isLoading: isLoadingAircrafts } = useSelector(
    (state: RootState) => state.aircraft
  );
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getProviderAircrafts({}));
  }, [dispatch]);

  const formik = useFormik<CreateFoodDTO>({
    initialValues: {
      aircraftId: "",
      foodName: "",
      foodType: "",
      vegNonveg: "veg",
      serveMethod: "",
      isComplimentary: false,
      foodPrice: 0,
      image: undefined,
    },
    validationSchema: foodValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload: CreateFoodDTO = {
          ...values,
          foodPrice: values.isComplimentary ? 0 : values.foodPrice,
        };
        await dispatch(createFood(payload)).unwrap();
        showSuccessToast("Food item created successfully");
        resetForm();
        setImagePreview(null);
        navigate("/provider/food-list");
      } catch (err: any) {
        showErrorToast(err || "Failed to create food");
      }
    },
  });

  // ─── Image — convert to base64 ────────────────────────────────────────────
  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        showErrorToast("Please select a valid image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        showErrorToast("Image must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        formik.setFieldValue("image", base64);
      };
      reader.readAsDataURL(file);
    },
    [formik]
  );

  const clearImage = useCallback(() => {
    setImagePreview(null);
    formik.setFieldValue("image", undefined);
  }, [formik]);

  return {
    formik,
    aircrafts,
    isLoadingAircrafts,
    imagePreview,
    handleImageChange,
    clearImage,
    foodTypes: FOOD_TYPES,
    serveMethods: SERVE_METHODS,
  };
};

export default useFood;
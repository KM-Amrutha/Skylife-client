import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../../redux/store";
import { updateFood } from "../../redux/food/foodThunk";
import { UpdateFoodDTO, FoodResponseDTO } from "../../redux/food/foodType";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

const FOOD_TYPES = ["Meal", "Snack", "Beverage", "Dessert", "Starter", "Other"];
const SERVE_METHODS = ["Hot", "Cold", "Room Temperature"];

const editFoodValidationSchema = Yup.object().shape({
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

interface UseEditFoodReturn {
  formik: FormikProps<UpdateFoodDTO>;
  food: FoodResponseDTO | null;
  isLoadingFood: boolean;
  imagePreview: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearImage: () => void;
  foodTypes: string[];
  serveMethods: string[];
}

const useEditFood = (): UseEditFoodReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { foodId } = useParams<{ foodId: string }>();

  const { foods } = useSelector((state: RootState) => state.food);

  // ─── Find food from Redux state ───────────────────────────────────────────
  const food = foods.find((f) => f.id === foodId) ?? null;
  const isLoadingFood = !food;

  const [imagePreview, setImagePreview] = useState<string | null>(
    food?.image ?? null
  );

  const formik = useFormik<UpdateFoodDTO>({
    initialValues: {
      foodName: food?.foodName ?? "",
      foodType: food?.foodType ?? "",
      vegNonveg: food?.vegNonveg ?? "veg",
      serveMethod: food?.serveMethod ?? "",
      isComplimentary: food?.isComplimentary ?? false,
      foodPrice: food?.foodPrice ?? 0,
      image: undefined,
    },
    validationSchema: editFoodValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      if (!foodId) return;
      try {
        const payload: UpdateFoodDTO = {
          ...values,
          foodPrice: values.isComplimentary ? 0 : values.foodPrice,
          // only send image if user picked a new one
          ...(values.image ? { image: values.image } : {}),
        };
        await dispatch(updateFood({ foodId, data: payload })).unwrap();
        showSuccessToast("Food item updated successfully");
        navigate("/provider/food-list");
      } catch (err: any) {
        showErrorToast(err || "Failed to update food");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // ─── Sync imagePreview when food loads ────────────────────────────────────
  useEffect(() => {
    if (food?.image) {
      setImagePreview(food.image);
    }
  }, [food]);

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
    setImagePreview(food?.image ?? null);
    formik.setFieldValue("image", undefined);
  }, [formik, food]);

  return {
    formik,
    food,
    isLoadingFood,
    imagePreview,
    handleImageChange,
    clearImage,
    foodTypes: FOOD_TYPES,
    serveMethods: SERVE_METHODS,
  };
};

export default useEditFood;
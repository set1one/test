import { formErrors } from "src/config/form";
import * as yup from "yup";

export const validation = yup.object({
  name: yup.string().required(formErrors.REQUIRED),
  severity: yup.string().required(formErrors.REQUIRED),
});

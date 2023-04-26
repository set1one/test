import { FieldError } from "react-hook-form";

export interface FieldProps {
  label: string;
  error?: FieldError;
  placeholder: string;
}

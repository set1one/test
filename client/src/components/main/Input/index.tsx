import cn from "classnames";
import { FieldError, UseFormRegister } from "react-hook-form";
import "./index.scss";

interface Props {
  label: string;
  type: string;
  name: string;
  register: UseFormRegister<any>;
  defaultValue: number | string | undefined | null;
  className?: string;
  error?: FieldError;
  isNumber?: boolean;
  placeholder?: string;
}

const InputField: React.FC<Props> = ({
  label,
  type,
  name,
  register,
  className,
  error,
  isNumber,
  defaultValue,
  placeholder,
}) => {
  const textField = register(name, { value: defaultValue });

  return (
    <div className={cn("input-field", className)}>
      <div className="input-field__label">{label}</div>
      <div className="input-field__container">
        <input
          type={type}
          {...textField}
          onChange={(e) => {
            textField.onChange(e);
          }}
          placeholder={placeholder}
          className="input-field__input"
          onKeyPress={(event) => {
            if (isNumber && !/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          maxLength={type === "customDate" ? 10 : undefined}
        />
        {error && (
          <div className="input-field__error">
            <p className="input-field__error-text">{error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;

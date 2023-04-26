import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import { EventInteface } from "src/models/events";
import { Controller, useController, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validation } from "src/validation/event";
import InputField from "src/components/main/Input";
import { useDispatch } from "react-redux";
import { createNewEvent, getAllEvents } from "src/api";
import { setEvents } from "src/modules/events/actions";
import Select from "react-select";

interface Props {
  onClose: () => void;
}

const AddNewEventModal: React.FC<Props> = ({ onClose }) => {
  const dispath = useDispatch();
  const form = useForm<EventInteface>({
    defaultValues: {
      name: "",
      severity: "",
    },
    resolver: yupResolver(validation),
  });
  form.watch();

  const options = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  const submit = async () => {
    const formValues = form.getValues();
    await createNewEvent(formValues.name, formValues.severity);
    const events = await getAllEvents();
    dispath(setEvents(events));
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="add-new-event-modal" onClick={() => onClose()}>
      <div
        className="add-new-event-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="add-new-event-modal__title">Add new book</h3>
        <form
          className="add-new-event-modal-form"
          method="post"
          onSubmit={form.handleSubmit(submit)}
        >
          <div className="add-new-event-modal-form__row">
            <InputField
              label="Name"
              type="text"
              name="name"
              defaultValue={form.formState.defaultValues?.name}
              register={form.register}
              error={form.formState.errors.name}
            />
          </div>
          <div className="add-new-event-modal-form__row">
            <select {...form.register("severity")} className="add-new-event-modal-form__select">
              {options.map((item, index) => (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="add-new-event-modal-form__submit">
            Save
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AddNewEventModal;

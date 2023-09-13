import type { FieldValues } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import { FormValidationError } from "../../../utils/GeneralUtils";

const useModalFormHandler = <Values extends FieldValues>(
  onSave: (values: Values) => void,
) => {
  const { handleSubmit, formState } = useFormContext<Values>();

  const trySave = handleSubmit(onSave);

  // We need to extract this value to trigger a re-render when the formState changes.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const unusedIsValid = formState.isValid;
  const handleSave = async () => {
    await trySave();

    if (!formState.isValid) {
      // We have to validate after attempting to submit because the form error state
      // updates after the submit handler is called.
      throw new FormValidationError("Please ensure all fields are valid");
    }
  };

  return handleSave;
};

export default useModalFormHandler;

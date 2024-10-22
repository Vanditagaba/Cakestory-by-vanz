import InformationForm from "../InformationForm/InformationForm";
import TextEditor from "../TextEditor/TextEditor";
import UseFormContext from "../../hooks/UseFormContext";
import UploadImage from "../UploadImage/UploadImage";

const FormInputs = () => {
  const { page } = UseFormContext();

  const display = {
    0: <InformationForm />,
    1: <TextEditor />,
    2: <UploadImage />,
  };
  const content = <div className="formInputs">{display[page]}</div>;

  return content;
};

export default FormInputs;

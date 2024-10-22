import TextEditor from "../TextEditor/TextEditor";
import UseFormContext from "../../hooks/UseFormContext";
import UploadImage from "../UploadImage/UploadImage";
import EditInformationForm from "../EditInformationForm/EditInformationForm";

const EditFormInputs = () => {
  const { page } = UseFormContext();

  const display = {
    0: <EditInformationForm />,
    1: <TextEditor />,
    2: <UploadImage />,
  };
  const content = <div className="formInputs">{display[page]}</div>;

  return content;
};

export default EditFormInputs;

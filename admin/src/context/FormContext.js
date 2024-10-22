import { createContext, useState } from "react";

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  const title = {
    0: "1. Basic Information",
    1: "2. Description",
    2: "3. Upload Images",
  };

  const [page, setPage] = useState(0);
  const [data, setData] = useState({
    img: [],
    BIproductname: "",
    BIcategory: "",
    BIcolor: "",
    BIsize: "",
    BIqty: "",
    BIprice: "",
    description: {
      span: "",
    },
  });

  const [output, setOutput] = useState("");

  const handleChange = (e) => {
    const type = e.target.type;
    const name = e.target.name;

    const value = type === "checkbox" ? e.target.checked : e.target.value;

    setData((prevData) => ({ ...prevData, [name]: value }));
    console.log(name);
    console.log(data);
    console.log(canSubmit);
  };

  const [canUpload, setCanUpload] = useState(false);

  const canSubmit =
    [...Object.values(data)].every(Boolean) &&
    data.description !== {} &&
    page === Object.keys(title).length - 1 &&
    canUpload;

  const canNextPage = Object.keys(data)
    .filter((key) => key.startsWith("BI"))
    .map((key) => data[key])
    .every(Boolean);

  const canNextPage2 = Object.keys(data.description).length !== 0;

  const disablePrev = page === 0;

  const disableNext =
    page === Object.keys(title).length - 1 ||
    (page === 0 && !canNextPage) ||
    (page === 1 && !canNextPage2);

  const prevHide = page === 0 && "removeButton";

  const nextHide = page === Object.keys(title).length - 1 && "removeButton";

  const submitHide = page !== Object.keys(title).length - 1 && "removeButton";

  const [imgList, setImgList] = useState([]);
  const [imgLink, setImgLink] = useState([]);

  return (
    <FormContext.Provider
      value={{
        title,
        page,
        setPage,
        data,
        setData,
        canSubmit,
        handleChange,
        disablePrev,
        disableNext,
        prevHide,
        nextHide,
        submitHide,
        output,
        setOutput,
        imgList,
        setImgList,
        imgLink,
        setImgLink,
        canUpload,
        setCanUpload,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;

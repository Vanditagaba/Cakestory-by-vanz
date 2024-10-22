import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectProductById } from "../../app/slice/productsApiSlice";
import InputField from "../InputField/InputField";
import "./informationform.scss";

const EditInformationForm = () => {
  const id = "63a854ed76b724d6a6fadeb9";
  const [data, setData] = useState(
    useSelector((state) => selectProductById(state, id))
  );
  const handleChange = (e) => {
    const type = e.target.type;
    const name = e.target.name;

    const value = type === "checkbox" ? e.target.checked : e.target.value;

    setData((prevData) => ({ ...prevData, [name]: value }));
    console.log(name);
    console.log(data);
  };

  const category = [
    { value: "select", option: "Select Category..." },
    { value: "cakes", option: "Cakes" },
    { value: "cookies", option: "Cookies" },
    { value: "cupcakes", option: "Cupcakes" },
    { value: "brownies", option: "Brownies" },
  ];
  return (
    <>
      <div className="infoFormContainer">
        <div className="form">
          <InputField
            label="Product Name"
            type="text"
            name="BIproductname"
            fieldType="input"
            value={data.BIproductname}
            onChange={handleChange}
          />

          <InputField
            label="Category"
            name="BIcategory"
            fieldType="select"
            value={data.BIcategory}
            onChange={handleChange}
            options={category}
          />
          <InputField
            label="Color"
            type="text"
            name="BIcolor"
            value={data.BIcolor}
            onChange={handleChange}
            fieldType="input"
          />
          <InputField
            label="Size"
            type="text"
            name="BIsize"
            value={data.BIsize}
            onChange={handleChange}
            fieldType="input"
          />
          <InputField
            label="Quantity"
            type="number"
            name="BIqty"
            value={data.BIqty}
            onChange={handleChange}
            fieldType="input"
          />
          <InputField
            label="Price (In INR)"
            type="number"
            name="BIprice"
            value={data.BIprice}
            onChange={handleChange}
            fieldType="input"
          />
        </div>
      </div>
    </>
  );
};

export default EditInformationForm;

import React from "react";
import UseFormContext from "../../hooks/UseFormContext";
import InputField from "../InputField/InputField";
import "./informationform.scss";

const InformationForm = () => {
  const { data, handleChange } = UseFormContext();

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

export default InformationForm;

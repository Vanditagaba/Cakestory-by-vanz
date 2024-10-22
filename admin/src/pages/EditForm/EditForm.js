import React from "react";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./productform.scss";
import UseFormContext from "../../hooks/UseFormContext";
import { useNavigate } from "react-router-dom";
import { useAddNewProductMutation } from "../../app/slice/productsApiSlice";
import EditFormInputs from "../../components/EditFormInputs/EditFormInputs";

const EditForm = () => {
  const [addNewProduct] = useAddNewProductMutation();
  const navigate = useNavigate();
  const {
    page,
    setPage,
    data,
    canSubmit,
    title,
    disablePrev,
    disableNext,
    prevHide,
    nextHide,
    submitHide,
  } = UseFormContext();

  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addNewProduct({
        img: data.img,
        BIproductname: data.BIproductname,
        BIgender: data.BIgender,
        BIcategory: data.BIcategory,
        BIcolor: data.BIcolor,
        BIsize: data.BIsize,
        BIqty: data.BIqty,
        BIprice: data.BIprice,
        description: data.description,
      }).unwrap();
    } catch (err) {
      console.log(err);
    }
    navigate("/products");
    console.log(JSON.stringify(data));
  };

  return (
    <>
      <div className="productFormContainer">
        <Sidebar />

        <AnimatedPage>
          <div className="productForm">
            <div className="editorContainer">
              <div className="title">{title[page]}</div>
              <form onSubmit={handleSubmit}>
                <EditFormInputs />
                <div className="ctaContainer mt-4">
                  <button
                    type="button"
                    className={`cta ${prevHide}`}
                    onClick={handlePrev}
                    disabled={disablePrev}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className={`cta ms-4 ${nextHide}`}
                    onClick={handleNext}
                    disabled={disableNext}
                  >
                    Continue
                  </button>
                  <input
                    type="submit"
                    value="Submit"
                    className={`cta ms-4 ${submitHide}`}
                    disabled={!canSubmit}
                  />
                </div>
              </form>
            </div>
          </div>
        </AnimatedPage>
      </div>
    </>
  );
};

export default EditForm;

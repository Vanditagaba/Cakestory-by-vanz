import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import "./uploadImage.scss";
import UseFormContext from "../../hooks/UseFormContext";
import { storage } from "./../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Modal } from "react-bootstrap";

const UploadImage = () => {
  const { imgList, imgLink, data, canSubmit, setCanUpload } = UseFormContext();
  const [showImg, setShowImg] = useState([]);
  console.log(imgList);

  const MakeImgList = (file, array) => {
    imgList[array] = file;
    console.log(imgList);
  };

  const updateImage = (e, index) => {
    const imgShow = [...showImg];
    imgShow[index] = URL.createObjectURL(e.target.files[0]);
    setShowImg(imgShow);
  };

  const uploadImage = (index) => {
    const imgRef = ref(storage, `Images/${v4() + "-" + imgList[index].name}`);
    uploadBytes(imgRef, imgList[index]).then(() => {
      setModalShow(true);
      getLink(imgRef.name, index);
    });
  };

  const getLink = (imageName, index) => {
    getDownloadURL(ref(storage, `Images/${imageName}`)).then((url) => {
      imgLink[index] = url;
      data.img = imgLink;
      setCanUpload(true);
      console.log(canSubmit);
    });
  };

  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className="uploadContainer">
        <div className="primaryContainer">
          <div
            className={`primaryUploadContainer ${
              imgList[0] !== undefined && "d-none"
            }`}
          >
            <input
              type="file"
              name="primaryImg"
              id="primaryImg"
              hidden
              onChange={(event) => {
                if (event.target.files && event.target.files[0]) {
                  MakeImgList(event.target.files[0], 0);
                  updateImage(event, 0);
                }
              }}
            />
            <label htmlFor="primaryImg" className="primaryUpload">
              <FiUpload className="uploadIcon" />
              <span className="uploadTitle">Select File*</span>
            </label>
          </div>
          <div
            className={`PrimaryUploadImgContainer ${
              imgList[0] === undefined && "d-none"
            }`}
          >
            <div className="left">
              <img
                src={imgList[0] && URL.createObjectURL(imgList[0])}
                alt=""
                className="primaryImg"
              />
            </div>
            <div className="right">
              <div className="uploadInfoContainer">
                <p className="infoUpload">Name:</p>{" "}
                {imgList[0] && imgList[0].name}
              </div>
              <div className="uploadInfoContainer">
                <p className="infoUpload">Size:</p>{" "}
                {imgList[0] && imgList[0].size / 1000}
                KB
              </div>
              <div className="uploadAltContainer">
                <input
                  type="file"
                  name="primaryImg"
                  id="primaryImg"
                  hidden
                  onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {
                      MakeImgList(event.target.files[0], 0);
                    }
                  }}
                />

                <button
                  className="cta me-5"
                  type="button"
                  onClick={() => uploadImage(0)}
                >
                  Upload To Storage
                </button>

                <label htmlFor="primaryImg" className="cta alt">
                  Select Another File
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="bottomContainer">
          <div className="secondaryImgContainer">
            <input
              type="file"
              name="secondaryImg"
              id="secondaryImg"
              hidden
              onChange={(event) => {
                if (event.target.files && event.target.files[0]) {
                  MakeImgList(event.target.files[0], 1);
                  updateImage(event, 1);
                }
              }}
            />
            <label
              htmlFor="secondaryImg"
              className={`secondaryInput ${
                imgList[1] !== undefined && "d-none"
              }`}
            >
              <FiUpload
                className={`secondaryIcon ${
                  imgList[1] !== undefined && "d-none"
                }`}
              />
              <p className={`${imgList[1] !== undefined && "d-none"}`}>
                Select File
              </p>
            </label>
            <div className="uploadedImg">
              <div className="uploadOverlay">
                <input
                  type="file"
                  name="secondaryImg"
                  id="secondaryImg"
                  hidden
                  onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {
                      MakeImgList(event.target.files[0], 1);
                    }
                  }}
                />

                <button
                  className="cta"
                  type="button"
                  onClick={() => uploadImage(1)}
                >
                  Upload To Storage
                </button>

                <label htmlFor="secondaryImg" className="cta alt">
                  Select Another File
                </label>
              </div>
              <img
                src={imgList[1] && URL.createObjectURL(imgList[1])}
                alt=""
                className={`secondaryImgFile ${
                  imgList[1] === undefined && "d-none"
                }`}
              />
            </div>
          </div>
          <div className="secondaryImgContainer">
            <input
              type="file"
              name="secondaryImg2"
              id="secondaryImg2"
              hidden
              onChange={(event) => {
                if (event.target.files && event.target.files[0]) {
                  MakeImgList(event.target.files[0], 2);
                  updateImage(event, 2);
                }
              }}
            />
            <label
              htmlFor="secondaryImg2"
              className={`secondaryInput ${
                imgList[2] !== undefined && "d-none"
              }`}
            >
              <FiUpload
                className={`secondaryIcon ${
                  imgList[2] !== undefined && "d-none"
                }`}
              />
              <p className={`${imgList[2] !== undefined && "d-none"}`}>
                Select File
              </p>
            </label>
            <div className="uploadedImg">
              <div className="uploadOverlay">
                <input
                  type="file"
                  name="secondaryImg2"
                  id="secondaryImg2"
                  hidden
                  onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {
                      MakeImgList(event.target.files[0], 2);
                    }
                  }}
                />

                <button
                  className="cta"
                  type="button"
                  onClick={() => uploadImage(2)}
                >
                  Upload To Storage
                </button>

                <label htmlFor="secondaryImg2" className="cta alt">
                  Select Another File
                </label>
              </div>
              <img
                src={imgList[2] && URL.createObjectURL(imgList[2])}
                alt=""
                className={`secondaryImgFile ${
                  imgList[2] === undefined && "d-none"
                }`}
              />
            </div>
          </div>
          <div className="secondaryImgContainer">
            <input
              type="file"
              name="secondaryImg3"
              id="secondaryImg3"
              hidden
              onChange={(event) => {
                if (event.target.files && event.target.files[0]) {
                  MakeImgList(event.target.files[0], 3);
                  updateImage(event, 3);
                }
              }}
            />
            <label
              htmlFor="secondaryImg3"
              className={`secondaryInput ${
                imgList[3] !== undefined && "d-none"
              }`}
            >
              <FiUpload
                className={`secondaryIcon ${
                  imgList[3] !== undefined && "d-none"
                }`}
              />
              <p className={`${imgList[3] !== undefined && "d-none"}`}>
                Select File
              </p>
            </label>
            <div className="uploadedImg">
              <div className="uploadOverlay">
                <input
                  type="file"
                  name="secondaryImg3"
                  id="secondaryImg3"
                  hidden
                  onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {
                      MakeImgList(event.target.files[0], 3);
                    }
                  }}
                />

                <button
                  className="cta"
                  type="button"
                  onClick={() => uploadImage(3)}
                >
                  Upload To Storage
                </button>

                <label htmlFor="secondaryImg3" className="cta alt">
                  Select Another File
                </label>
              </div>
              <img
                src={imgList[3] && URL.createObjectURL(imgList[3])}
                alt=""
                className={`secondaryImgFile ${
                  imgList[3] === undefined && "d-none"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmUploadModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

function ConfirmUploadModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="confirmModalContainer"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirmation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Image Uploaded Successfully</p>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="cta" onClick={props.onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default UploadImage;

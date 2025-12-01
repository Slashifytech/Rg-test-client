import React, { useEffect, useState } from "react";
import InputField, { FileUpload } from "./Input";
import { extendedAMC } from "../features/AMCapi";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../Util/fireBase";

import { v4 as uuidv4 } from "uuid";
export const ExtendedPolicyPopUp = ({ isPopUpOpen, closePopUp, item }) => {


  const [formData, setFormData] = useState({
    extendedPolicyPeriod: "",
    additionalPrice: "",
    paymentCopyProof: "",
  });

  // Handle input updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


const handleFileSelect = async (name, file) => {
    // console.log("Selected file:", file);
    if (!file) return;

    // const storageRef = ref(storage, `files/${file?.name}`);
    const uniqueFileName = `${uuidv4()}-${file.name}`;
    const storageRef = ref(storage, `files/rgamc/${uniqueFileName}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      console.log("Uploaded file:", snapshot);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("File available at:", downloadURL);

      setFormData((prevData) => ({
        ...prevData,
        [name]: downloadURL,
      }));

      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file. Please try again.");
    }
  };

  const deleteFile = async (fileUrl, uploadType) => {
    if (!fileUrl) return;

    const storageRef = ref(storage, fileUrl);

    try {
      // toast.success("File deleted successfully!");

    if (uploadType === "paymentCopyProof") {
        setFormData((prevData) => ({
          ...prevData,
          paymentCopyProof: "",
        }));
      } 
      await deleteObject(storageRef);
    } catch (error) {
      console.error("Error deleting file:", error);
      // toast.error("Error deleting file. Please try again.");
    }
  };

  useEffect(() => {
  if (isPopUpOpen && item?.extendedPolicy) {
    setFormData({
      extendedPolicyPeriod: item?.extendedPolicy?.extendedPolicyPeriod || "",
      additionalPrice: item?.extendedPolicy?.additionalPrice || "",
      paymentCopyProof: item?.extendedPolicy?.paymentCopyProof || "",
    });
  } else if (isPopUpOpen) {
    // Reset when popup opens with no existing data
    setFormData({
      extendedPolicyPeriod: "",
      additionalPrice: "",
      paymentCopyProof: "",
    });
  }
}, [isPopUpOpen, item]);


  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let res;
    try {
      res = await extendedAMC(formData, item?.vehicleDetails?.vinNumber);
      toast.success(res?.message || "Submitted successfully");
       setFormData({
      extendedPolicyPeriod: "",
      additionalPrice: "",
      paymentCopyProof: "",
    });

    closePopUp();
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
      console.log("Error:", error);
    }

  };

  return (
    <>
      {isPopUpOpen && (
        <div className="fixed inset-0 flex items-center justify-center popup-backdrop z-50 sm:px-52 px-6">
          <div className="bg-white pb-9 rounded-lg md:w-[60%] w-full relative p-9 app-open-animation">
            <span
              className="cursor-pointer text-[25px] absolute right-3 top-2"
              onClick={closePopUp}
            >
              <RxCross2 />
            </span>
            <p className="text-center font-DMsans text-black font-semibold text-[20px]">
              Extend Policy
            </p>

            <form onSubmit={handleSubmit}>
              <div className="flex justify-center items-center font-DMsans gap-5 mt-5">
                <span>
                  <label className="font-semibold">
                    Extended policy period
                  </label>{" "}
                  <span className="text-red-500">*</span>
                  <InputField
                    name="extendedPolicyPeriod"
                    value={formData.extendedPolicyPeriod}
                    onchange={handleChange}
                    className="w-full h-12 px-3 mt-3 mb-5 bg-[#f1f1f1] rounded-md"
                    placeholder="Extended policy period"
                  />
                  <label className="font-semibold">
                    Additional price for the extension
                  </label>{" "}
                  <span className="text-red-500">*</span>
                  <InputField
                    name="additionalPrice"
                    value={formData.additionalPrice}
                    onchange={handleChange}
                    className="w-full h-12 px-3 mt-3 mb-3 bg-[#f1f1f1] rounded-md"
                    placeholder="Additional price for the extension"
                  />
               <div className="">
              <FileUpload
                imp={true}
                label="Payment Copy Proof"
                onFileSelect={(file) => handleFileSelect("paymentCopyProof", file)}
                deleteFile={() =>
                  deleteFile(formData.paymentCopyProof, "paymentCopyProof")
                }
                name="paymentCopyProof"
                fileUrl={formData.paymentCopyProof}
              />
          
            </div>
                </span>
              </div>
              <div className="mt-9 flex justify-center">
                <button
                  type="submit"
                  className="px-8 py-2 cursor-pointer rounded-lg text-white bg-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

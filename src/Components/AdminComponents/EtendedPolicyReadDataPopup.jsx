
import { RxCross2 } from "react-icons/rx";

export const ExtendedPolicyReadDataPopup = ({ isPopUpOpen, closePopUp, item }) => {


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
              Extended Policy
            </p>

              <div className="flex justify-center items-center font-DMsans gap-5 mt-5">
                <span>
                  <label className="font-semibold">
                    Extended policy period
                  </label>{" "} <br />
                 {  item?.extendedPolicy?.extendedPolicyPeriod}
                  <label className="font-semibold"> <br />
                    Additional price for the extension
                  </label>{" "}
                  <br />
              {   item?.extendedPolicy?.additionalPrice} <br />
             {item?.extendedPolicy?.paymentCopyProof ? (
  <a
    href={item.extendedPolicy.paymentCopyProof}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 underline cursor-pointer"
  >
    View Payment Proof
  </a>
) : (
  <span className="text-gray-500">No file available</span>
)}

                </span>
              </div>
          
          </div>
        </div>
      )}
    </>
  );
};

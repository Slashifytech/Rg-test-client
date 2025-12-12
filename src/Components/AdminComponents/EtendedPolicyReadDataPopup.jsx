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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 font-DMsans">

              {/* Column 1 */}
              <div>
                <label className="font-semibold">Extended policy period</label>
                <div>{item?.extendedPolicy?.extendedPolicyPeriod || "No data"}</div>

                <label className="font-semibold mt-3 block">
                  Additional price for extension
                </label>
                <div>{item?.extendedPolicy?.additionalPrice || "No data"}</div>

                <label className="font-semibold mt-3 block">Valid Date</label>
                <div>{item?.extendedPolicy?.validDate || "No data"}</div>

                <label className="font-semibold mt-3 block">Valid Mileage</label>
                <div>{item?.extendedPolicy?.validMileage || "No data"}</div>
              </div>

              {/* Column 2 */}
              <div>
                <label className="font-semibold">Upcoming Services</label>
                <div >
                  {[
                    ...(item?.extendedPolicy?.upcomingPackage || []),
                    
                  ].length > 0
                    ? [
                        ...(item?.extendedPolicy?.upcomingPackage || []),
                      ].join(", ")
                    : "No data"}
                </div>

                <label className="font-semibold mt-3 block">Start Date</label>
                <div>
                  {item?.vehicleDetails?.agreementStartDate || ""}
               </div>

                <label className="font-semibold mt-3 block">Start Mileage</label>
                <div>
                  {item?.vehicleDetails?.agreementStartMilage || ""}
                
                </div>

             <label className="font-semibold mt-3 block">Payment Proof</label>

{item?.extendedPolicy?.at(-1)?.paymentCopyProof ? (
  <a
    href={item.extendedPolicy.at(-1).paymentCopyProof}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 underline cursor-pointer block mt-1"
  >
    View Payment Proof
  </a>
) : (
  <span className="text-gray-500 block mt-1">No file available</span>
)}

              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

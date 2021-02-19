import { RiAlertFill, RiArrowRightLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import Modal from "./modal";
import { useState } from "react";
import { getTime } from "../utils";
import { useDarkTheme } from "../context/themeContext";

const Alert = ({ alert, timezone }) => {
  const darkTheme = useDarkTheme();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className="flex items-center justify-between px-3 py-1 mb-2 border border-solid border-red-600 rounded-md bg-red-100 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="flex items-center">
          <RiAlertFill className="text-red-600" />
          <div className="pl-2 text-black">{alert.event}</div>
        </div>
        <RiArrowRightLine className="text-black" />
      </div>
      <Modal id="modal" isOpen={showModal} onClose={() => setShowModal(false)}>
        <button
          className="absolute m-3 top-0 right-0 outline-none focus:outline-none"
          onClick={() => setShowModal(false)}
        >
          <IoMdClose fontSize="1.5rem" />
        </button>
        <div className="mt-8 max-w-xl mx-auto">
          <div className="flex flex-col items-center text-center md:text-left">
            <div className="text-xl font-bold">{alert.event}</div>
            <div className="text-lg font-semibold pb-2">{`Source: ${alert.sender_name}`}</div>
            <div className="flex flex-col md:flex-row items-center md:justify-between w-full">
              <div className="flex">
                <span className="font-semibold">Starts: </span>
                <span className="pl-1">
                  {getTime(alert.start, timezone, "hh:mm a - dddd, MMM D")}
                </span>
              </div>
              <div className="flex">
                <span className="font-semibold">Ends: </span>
                <span className="pl-1">
                  {getTime(alert.end, timezone, "hh:mm a - dddd, MMM D")}
                </span>
              </div>
            </div>
            <div
              className={`border-t border-solid ${
                darkTheme ? "border-white" : "border-black"
              } pt-2 mt-4 w-full space-y-2`}
            >
              {alert.description.split("*").map((text, i) => (
                <div key={i}>{text}</div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Alert;

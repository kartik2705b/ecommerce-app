import React, { PropsWithChildren } from "react";

const Modal = ({
  title,
  open,
  close,
  children,
}: PropsWithChildren<{ title: string; open: boolean }>) => {
  return open ? (
    <div className="w-screen h-screen fixed top-0 left-0 overflow-auto bg-gray-600  flex items-center justify-center">
      <div className="my-5 bg-white rounded-lg shadow w-1/2 h-1/2 dark:bg-gray-700">
        <div className="px-6 py-6 lg:px-8 overflow-y-scroll">
          <h3 className="mb-4 text-xl font-medium flex items-center justify-between text-gray-900 dark:text-white">
            <p>{title}</p>
            <button
              onClick={() => close()}
              type="button"
              className=" text-gray-400 bg-gray-500 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </h3>
          {children}
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Modal;

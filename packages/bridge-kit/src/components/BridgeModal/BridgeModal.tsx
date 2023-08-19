import React from "react";

interface BridgeModalProps {
  show: boolean;
  onClose: () => void;
}

export const BridgeModal: React.FC<BridgeModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-3xl mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
            <h3 className="text-3xl font-semibold">Modal Title</h3>
            <button
              className="p-1 ml-auto text-3xl font-semibold leading-close-button text-black bg-transparent border-0 outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-50">
                ×
              </span>
            </button>
          </div>
          <div className="relative flex-auto p-6">
            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
              I always felt like I could do anything. That’s the main thing
              people are controlled by! Thoughts- their perception of
              themselves! They're slowed down by their perception of themselves.
              If you're taught you can’t do anything, you won’t do anything. I
              was taught I could do everything.
            </p>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
            <button
              className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-emerald-500 rounded shadow outline-none active:bg-emerald-600 hover:shadow-lg focus:outline-none"
              type="button"
              onClick={onClose}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

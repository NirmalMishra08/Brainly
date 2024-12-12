import CrossIcon from "../icons/CrossIcon";
import { Button } from "./ui/Button";

export function CreateContentModal({ open, onClose }:{
    open:Boolean,
    onClose: () => void;
}) {
    return (
      <div>
        {open && (
          <div className="w-screen h-screen bg-slate-500 bg-opacity-60 fixed top-0 left-0 flex justify-center items-center">
            <div className="flex flex-col justify-center">
              {/* Fully Opaque Modal */}
              <span className="bg-white bg-opacity-100 rounded p-4">
                {/* Close Icon */}
                <div className="flex justify-end">
                  <div onClick={onClose} className="cursor-pointer">
                    <CrossIcon />
                  </div>
                </div>
  
                {/* Input Fields */}
                <div className="flex flex-col gap-2 mt-2">
                  <Input placeholder={"Title"} />
                  <Input placeholder={"Link"} />
                </div>
  
                {/* Submit Button */}
                <div className="flex justify-center pt-3">
                  <Button variant="primary" text="Submit" />
                </div>
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  function Input({ onChange, placeholder }: { onChange?: () => void , placeholder?: string}) {
    return (
      <div>
        <input
          placeholder={placeholder}
          type="text"
          className="px-4 py-2 border"
          onChange={onChange}
        />
      </div>
    );
  }
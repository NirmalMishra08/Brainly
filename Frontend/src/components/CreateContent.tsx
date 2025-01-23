import { useRef, useState } from "react";
import CrossIcon from "../icons/CrossIcon";
import { Button } from "./ui/Button";
import axios from "axios";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

export function CreateContentModal({ open, onClose }: {


  open: Boolean,
  onClose: () => void;
}) {
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();
  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    try {
      const res = await axios.post("http://localhost:4000/api/v1/content",{
        link,title,type
      },{
        headers: {
          "Authorization": localStorage.getItem("token"),
        },
      })
      console.log(res.data.message)

      
    } catch (error) {
      console.log(error.message)
    }
  }
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
                <Input reference={titleRef} placeholder={"Title"} />
                <Input reference={linkRef} placeholder={"Link"} />
              </div>
              <div className="flex row justify-between pt-4">
                <Button onClick={() => { setType(ContentType.Youtube) }} text="Youtube" variant={type === ContentType.Youtube ?
                  "primary" : "secondary"}></Button>
                <Button onClick={() => { setType(ContentType.Twitter) }} text="Twitter" variant={type === ContentType.Twitter ?
                  "primary" : "secondary"}></Button>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-3">
                <Button onClick={addContent} variant="primary" text="Submit" />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ onChange, placeholder, reference }: { onChange?: () => void, placeholder?: string, reference?: any }) {
  return (
    <div>
      <input
        ref={reference}
        placeholder={placeholder}
        type="text"
        className="px-4 py-2 border"
        onChange={onChange}
      />
    </div>
  );
}
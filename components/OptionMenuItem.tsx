import { useEffect, useRef, useState } from "react";
import { useDoubleTap } from "use-double-tap";
import { toast } from "react-toastify";
import { Option } from "@/interfaces/Option";

type Props = {
  indexAttribute: number;
  indexOption: number;
  option: Option;
  onUpdate: any;
};

const OptionMenuItem = ({
  indexAttribute,
  indexOption,
  option,
  onUpdate,
}: Props) => {
  const ref = useRef(null);
  const refInput = useRef(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [label, setLabel] = useState<string>(option.label);

  const bind = useDoubleTap((event) => {
    setIsEditing(true);
  });

  const onFinish = () => {
    if (!label) {
      toast.error("Please enter valid label.");
      return;
    }
    if (label.length > 180) {
      toast.error("Label max length is 180.");
      return;
    }

    onUpdate(indexAttribute, indexOption, label);
    setIsEditing(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // @ts-ignore
      if (ref.current && !ref.current.contains(event.target)) {
        setIsEditing(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (isEditing) {
      // @ts-ignore
      refInput.current.focus();
    } else {
      if (label != option.label) {
        onFinish();
      }
    }
  }, [refInput, isEditing]);

  useEffect(() => {
    setLabel(option.label);
  }, [option.label]);

  return (
    <div
      className="mt-1 p-2 flex items-center rounded-md px-2 duration-300 cursor-pointer bg-gray-800 hover:bg-[#5AC0E5] text-white"
      {...bind}
    >
      {isEditing ? (
        <textarea
          ref={refInput}
          className="p-2 w-full h-full min-h-[160px] max-h-[160px] md:min-h-[240px] md:max-h-[240px] text-left text-sm md:text-base bg-slate-50 text-black flex justify-start items-center overflow-y-auto outline-none focus:outline-none tracking-tighter custom-scrollbar z-10"
          value={label}
          minLength={1}
          maxLength={180}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              e.preventDefault();
              onFinish();
            }
          }}
        />
      ) : (
        <div className="w-full h-full flex justify-start items-center">
          <span className="text-[15px] text-gray-200 font-bold">
            {option.label}
          </span>
        </div>
      )}
    </div>
  );
};

export default OptionMenuItem;

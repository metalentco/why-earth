import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDoubleTap } from "use-double-tap";
import { toast } from "react-toastify";
import { Attribute } from "@/interfaces/Attribute";

type Props = {
  indexAttribute: number;
  attribute: Attribute;
  onUpdate: any;
};

const AttributeMenuItem = ({ indexAttribute, attribute, onUpdate }: Props) => {
  const router = useRouter();
  const ref = useRef(null);
  const refInput = useRef(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [label, setLabel] = useState<string>(attribute.label);

  const onClick = () => {
    router.push(`/attribute/${indexAttribute}`);
  };

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

    onUpdate(indexAttribute, label);
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
      if (label != attribute.label) {
        onFinish();
      }
    }
  }, [refInput, isEditing]);

  useEffect(() => {
    setLabel(attribute.label);
  }, [attribute.label]);

  return (
    <div
      className="w-full p-2 flex items-center rounded-md px-2 duration-300 cursor-pointer bg-gray-700 hover:bg-[#5AC0E5] text-white"
      // onMouseDown={() => onClick()}
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
        <div className="w-full h-full flex justify-between items-center space-x-2">
          <span className="text-[15px] text-gray-200 font-bold">
            {attribute.label}
          </span>
          <div
            className="w-4 h-4 w-min-[16px] h-min-[16px] text-white"
            onClick={() => onClick()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttributeMenuItem;

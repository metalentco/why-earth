import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDoubleTap } from "use-double-tap";
import useDetectDevice from "@/hooks/useDetectDevice";
import useOpenAI from "@/hooks/useOpenAI";
import { Attribute } from "@/interfaces/Attribute";

type Props = {
  index: number;
  attribute: Attribute;
  selectedIds: Array<number>;
  onClick: any;
  onSave: any;
};

const AttributeSlot = ({
  index,
  attribute,
  selectedIds,
  onClick,
  onSave,
}: Props) => {
  const ref = useRef(null);
  const refInput = useRef(null);
  const { isMobile } = useDetectDevice();
  const { generateImage } = useOpenAI();
  const [image, setImage] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const [label, setLabel] = useState<string>(attribute.label);

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

    onSave(index, label, "");
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
    if (attribute.image) {
      setImage(attribute.image);
    } else {
      setImage("");
      generateImage(attribute.label).then((image) => {
        setImage(image);
      });
    }
  }, [attribute.label, attribute.image]);

  return (
    <div ref={ref} className="w-full flex justify-center items-center">
      <div
        className={`w-40 h-40 md:w-60 md:h-60 border-2 flex flex-row justify-center items-center overflow-hidden rounded-md select-none relative transition-all duration-300 ${
          selectedIds.includes(attribute.id)
            ? "border-[#5AC0E5]"
            : "border-gray-300"
        } cursor-pointer`}
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
        onMouseDown={() => onClick(attribute.id)}
        {...bind}
      >
        {image ? (
          <img
            className={`absolute left-0 top-0 w-full h-full object-cover overflow-hidden z-0`}
            src={image}
          />
        ) : (
          <div
            className={`absolute right-1 md:right-2 bottom-1 md:bottom-2 z-0`}
          >
            <div className="animate-spin rounded-full w-4 h-4 border-t-2 border-[#5AC0E5]"></div>
          </div>
        )}
        {!isEditing && !isMobile && isMouseOver && (
          <div
            className="absolute -right-10 -top-10 w-20 h-20 bg-[#00000088] backdrop-blur-sm rounded-full overflow-hidden text-white cursor-pointer hover:bg-[#5AC0E5cc] transition-all duration-300 z-20"
            onClick={() => setIsEditing(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-pencil-fill absolute bottom-4 left-4"
              viewBox="0 0 16 16"
            >
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
            </svg>
          </div>
        )}

        {selectedIds.includes(attribute.id) && (
          <div className="absolute left-1 md:left-2 top-1 md:top-2 text-[#5AC0E5]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-check-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          </div>
        )}

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
          <div
            className={`p-3 max-w-[120px] max-h-[120px] md:max-w-[200px] md:max-h-[200px] backdrop-blur-sm overflow-y-auto select-none rounded-md custom-scrollbar z-10 transition-all duration-300 ${
              selectedIds.includes(attribute.id)
                ? "bg-[#5AC0E5cc]"
                : "bg-[#00000088]"
            }`}
          >
            <p
              className={`text-left text-sm md:text-base tracking-tighter text-white rounded-md`}
            >
              {attribute.label}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttributeSlot;

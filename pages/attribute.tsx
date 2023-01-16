import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import AddSlot from "@/components/AddSlot";
import AttributeSlot from "@/components/AttributeSlot";
import { useAuthValues } from "@/context/contextAuth";
import { useProblemValue } from "@/context/contextProblem";
import { Attribute } from "@/interfaces/Attribute";
import Layout from "@/components/Layout";
import SideBar from "@/components/SideBar";

export default function Problem() {
  const router = useRouter();
  const { isLoading, isSignedIn } = useAuthValues();
  const { problem, attributes, updateAttributes } = useProblemValue();

  const [selectedAttributes, setSelectedAttributes] = useState<
    Array<Attribute>
  >([]);

  const goEnterDesire = (e: any = null) => {
    if (e) {
      e.preventDefault();
    }

    router.push("/desire");
  };

  const goSelectOption = (e: any = null) => {
    if (e) {
      e.preventDefault();
    }

    if (!selectedAttributes || selectedAttributes.length == 0) {
      toast.error("Please select at least one Attribute.");
      return;
    }

    updateAttributes(selectedAttributes);

    router.push(`/attribute/0`);
  };

  //############################################################################################
  //################################### Attribute ##############################################
  //############################################################################################
  const onSelectAttribute = (id: number) => {
    let newSelectedAttributes = selectedAttributes.slice();
    const index = newSelectedAttributes.findIndex((attribute) => {
      return attribute.id == id;
    });
    if (index == -1) {
      newSelectedAttributes.push(attributes[id]);
    } else {
      newSelectedAttributes.splice(index, 1);
    }

    setSelectedAttributes(newSelectedAttributes);
  };

  const onAddAttribute = (e: any = null) => {
    if (e) {
      e.preventDefault();
    }

    const attributesArr = attributes.slice();
    attributesArr.push({
      id: attributesArr.length,
      label: "New Attribute",
      value: null,
      description: "",
      options: [],
      image: "/dummy.png",
    });
    updateAttributes(attributesArr);
  };

  const onSaveAttribute = (
    index: number,
    label: string,
    description: string
  ) => {
    const attributesArr = attributes.slice();

    attributesArr[index].label = label;
    attributesArr[index].description = description;
    attributesArr[index].image = "";

    updateAttributes(attributesArr);

    const newSelectedAttributes = selectedAttributes.map(
      (selectedAttribute) => {
        return attributesArr[selectedAttribute.id];
      }
    );
    setSelectedAttributes(newSelectedAttributes);
  };

  useEffect(() => {
    if (isSignedIn) {
      setSelectedAttributes(
        attributes.map((attribute, index) => {
          return { ...attribute, id: index };
        })
      );
    } else {
      router.push("/signin");
    }
  }, [isSignedIn]);

  return (
    <Layout>
      <main className="relative w-screen h-screen flex flex-row justify-start items-center">
        <SideBar />
        <div className="relative flex-grow h-screen flex flex-col justify-start items-center md:items-start p-5 md:p-10">
          <div className="w-full h-full flex flex-col justify-start md:justify-center items-center space-y-3 overflow-hidden z-10">
            <div className="w-full px-8 flex flex-col justify-start md:justify-center items-center">
              <h1 className="w-full md:w-[768px] text-gray-500 text-xl md:text-2xl text-center">
                Select some Attributes Important to
              </h1>
              <h1 className="w-full md:w-[768px] text-black text-xl md:text-2xl font-bold text-center overflow-hidden text-ellipsis">
                {problem}
              </h1>
            </div>
            <div className="w-full md:w-[768px] min-h-[300px] pr-1 h-3/4 md:h-auto md:flex-grow overflow-y-auto space-y-1 custom-scrollbar">
              <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2">
                <AddSlot onClick={onAddAttribute} />
                {attributes?.map((attr, index) => {
                  return (
                    <AttributeSlot
                      key={index}
                      index={index}
                      attribute={attr}
                      selectedIds={selectedAttributes.map(
                        (attribute) => attribute.id
                      )}
                      onClick={onSelectAttribute}
                      onSave={onSaveAttribute}
                    />
                  );
                })}
              </div>
            </div>
            <div className="w-full md:w-[768px] flex flex-row justify-between items-center space-x-2">
              <button
                className="flex-grow h-12 bg-[#5AC0E5] hover:bg-[#47a5c7] rounded-lg outline-none focus:outline-none transition-all duration-300 cursor-pointer"
                onClick={goEnterDesire}
              >
                <span className="w-full text-white text-base md:text-lg font-bold whitespace-nowrap">
                  Back
                </span>
              </button>
              <button
                className="flex-grow h-12 bg-[#5AC0E5] hover:bg-[#47a5c7] rounded-lg outline-none focus:outline-none transition-all duration-300 cursor-pointer"
                onClick={goSelectOption}
              >
                <span className="w-full text-white text-base md:text-lg font-bold whitespace-nowrap">
                  Next
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
      {isLoading && <div className="loading"></div>}
    </Layout>
  );
}

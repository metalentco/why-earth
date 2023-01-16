import { useEffect, useState } from "react";
import Link from "next/link";
import { useProblemValue } from "@/context/contextProblem";
import useDetectDevice from "@/hooks/useDetectDevice";
import AttributeMenuItem from "./AttributeMenuItem";
import OptionMenuItem from "./OptionMenuItem";
import DesireMenuItem from "./DesireMenuItem";
import GroupMenuItem from "./GroupMenuItem";

const SideBar = () => {
  const { isMobile } = useDetectDevice();
  const {
    problem,
    attributes,
    updateAttributes,
    persona,
    updatePersona,
    groups,
    updateGroups,
  } = useProblemValue();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onUpdateDesire = (indexDesire: number, label: string) => {
    const desires = persona.slice();
    desires[indexDesire].label = label;
    updatePersona(desires);
  };

  const onUpdateGroup = (indexGroup: number, label: string) => {
    const groupsArr = groups.slice();
    groupsArr[indexGroup].label = label;
    updateGroups(groupsArr);
  };

  const onUpdateAttribute = (indexAttribute: number, label: string) => {
    const attributesArr = attributes.slice();
    attributesArr[indexAttribute].label = label;
    updateAttributes(attributesArr);
  };

  const onUpdateOption = (
    indexAttribute: number,
    indexOption: number,
    label: string
  ) => {
    const attributesArr = attributes.slice();
    attributesArr[indexAttribute].options[indexOption].label = label;
    updateAttributes(attributesArr);
  };

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="fixed left-0 top-0 lg:relative h-screen flex flex-col z-50">
      <span
        className="absolute text-white text-4xl top-5 left-4 cursor-pointer z-0"
        onClick={() => toggleSidebar()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-menu-app text-black hover:text-[#5AC0E5]"
          viewBox="0 0 16 16"
        >
          <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h2A1.5 1.5 0 0 1 5 1.5v2A1.5 1.5 0 0 1 3.5 5h-2A1.5 1.5 0 0 1 0 3.5v-2zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-2zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
        </svg>
      </span>
      {isSidebarOpen && (
        <div className="sidebar flex flex-col justify-start items-start top-0 bottom-0 lg:left-0 p-2 w-[360px] h-screen text-center bg-gray-900 z-10">
          <div className="w-full text-gray-100 text-xl">
            <div className="p-2 mt-1 flex justify-between items-center">
              <Link href="/">
                <h1 className="font-bold text-gray-200 text-lg ml-3">
                  subconscious.ai
                </h1>
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-x-circle-fill text-white cursor-pointer hover:text-[#5AC0E5] flex lg:hidden"
                viewBox="0 0 16 16"
                onClick={() => toggleSidebar()}
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
              </svg>
            </div>
            <div className="mt-2 bg-gray-600 h-[1px]"></div>
          </div>
          <div className="w-full flex-grow overflow-y-auto">
            {problem && (
              <div className="w-full my-2 p-2 flex items-center rounded-md px-2 duration-300 cursor-pointer bg-gray-700 text-white">
                {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
            /> */}
                <div className="w-full flex-grow overflow-y-auto space-y-1">
                  <p className="w-full font-semibold text-gray-200 text-base text-center">
                    {problem}
                  </p>
                  <div className="flex flex-col justify-start items-end">
                    <div className="w-full">
                      {persona.map((desire, indexDesire) => {
                        return (
                          <DesireMenuItem
                            key={indexDesire}
                            indexDesire={indexDesire}
                            desire={desire}
                            onUpdate={onUpdateDesire}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="w-full space-y-1">
              {attributes.map((attribute, indexAttribute) => {
                return (
                  <div
                    key={indexAttribute}
                    className="flex flex-col justify-start items-end"
                  >
                    <AttributeMenuItem
                      indexAttribute={indexAttribute}
                      attribute={attribute}
                      onUpdate={onUpdateAttribute}
                    />
                    <div className="w-11/12">
                      {attribute.options.map((option, indexOption) => {
                        return (
                          <OptionMenuItem
                            key={indexOption}
                            indexAttribute={indexAttribute}
                            indexOption={indexOption}
                            option={option}
                            onUpdate={onUpdateOption}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            {problem && attributes && attributes.length > 0 && (
              <div className="w-full mt-2 p-2 flex items-center rounded-md px-2 duration-300 cursor-pointer bg-gray-700 text-white">
                <div className="w-full flex flex-col justify-start items-start">
                  <div className="w-full">
                    {groups.map((group, indexGroup) => {
                      return (
                        <GroupMenuItem
                          key={indexGroup}
                          indexGroup={indexGroup}
                          group={group}
                          onUpdate={onUpdateGroup}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;

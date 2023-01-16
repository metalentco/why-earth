import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import AddSlot from "@/components/AddSlot";
import { useAuthValues } from "@/context/contextAuth";
import { useProblemValue } from "@/context/contextProblem";
import { Desire } from "@/interfaces/Desire";
import DesireSlot from "@/components/DesireSlot";
import useApi from "@/hooks/useApi";
import Layout from "@/components/Layout";
import SideBar from "@/components/SideBar";

export default function DesirePage() {
  const router = useRouter();
  const { isLoading, isSignedIn } = useAuthValues();
  const { problem, attributes, updateAttributes, persona, updatePersona } =
    useProblemValue();
  const { isWorking, createAttributes, createLevels } = useApi();
  const [selectedDesires, setSelectedDesires] = useState<Array<Desire>>([]);

  const goEnterProblem = (e: any = null) => {
    if (e) {
      e.preventDefault();
    }

    router.push("/problem");
  };

  const goSelectAttribute = async (e: any = null) => {
    if (e) {
      e.preventDefault();
    }

    if (
      !selectedDesires ||
      selectedDesires.length == 0 ||
      selectedDesires.length != 1
    ) {
      toast.error("Please select one desire.");
      return;
    }

    if (attributes.length == 0) {
      let attrs = await createAttributes(problem);
      attrs = await createLevels(problem, attrs);
      updateAttributes(attrs);
    }

    router.push(`/attribute`);
  };

  //############################################################################################
  //###################################### Desire ##############################################
  //############################################################################################
  const onSelectDesire = (id: number) => {
    let newSelectedDesires = selectedDesires.slice();
    const index = newSelectedDesires.findIndex((desire) => {
      return desire.id == id;
    });
    if (index == -1) {
      newSelectedDesires = [];
      newSelectedDesires.push(persona[id]);
    } else {
      newSelectedDesires.splice(index, 1);
    }

    setSelectedDesires(newSelectedDesires);
  };

  const onAddDesire = (e: any = null) => {
    if (e) {
      e.preventDefault();
    }

    const desiresArr = persona.slice();
    desiresArr.push({
      id: desiresArr.length,
      label: "New Desire",
      value: null,
      description: "",
      image: "/dummy.png",
    });
    updatePersona(desiresArr);
  };

  const onSaveDesire = (index: number, label: string, description: string) => {
    const desiresArr = persona.slice();

    desiresArr[index].label = label;
    desiresArr[index].description = description;
    desiresArr[index].image = "";

    updatePersona(desiresArr);

    const newSelectedDesires = selectedDesires.map((selectedDesire) => {
      return desiresArr[selectedDesire.id];
    });
    setSelectedDesires(newSelectedDesires);
  };

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/signin");
    }
  }, [isSignedIn]);

  return (
    <Layout>
      <main className="relative w-screen h-screen flex flex-row justify-start items-center">
        <SideBar />
        <div className="relative flex-grow h-screen flex flex-col justify-start items-center md:items-start p-5 md:p-10">
          <div className="w-full h-full flex flex-col justify-start md:justify-center items-center space-y-3 overflow-hidden z-10">
            <div className="w-full flex flex-col justify-start md:justify-center items-center">
              <h1 className="w-full md:w-[768px] text-gray-500 text-xl md:text-2xl text-center">
                What is the desired outcome when
              </h1>
              <h1 className="w-full md:w-[768px] text-black text-xl md:text-2xl font-bold text-center overflow-hidden text-ellipsis">
                {problem}
              </h1>
            </div>
            <div className="w-full md:w-[768px] min-h-[300px] pr-1 h-3/4 md:h-auto md:flex-grow overflow-y-auto space-y-1 custom-scrollbar">
              <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2">
                <AddSlot onClick={onAddDesire} />
                {persona.map((desire, index) => {
                  return (
                    <DesireSlot
                      key={index}
                      index={index}
                      desire={desire}
                      selectedIds={selectedDesires.map((desire) => desire.id)}
                      onClick={onSelectDesire}
                      onSave={onSaveDesire}
                    />
                  );
                })}
              </div>
            </div>
            <div className="w-full md:w-[768px] flex flex-row justify-between items-center space-x-2">
              <button
                className="flex-grow h-12 bg-[#5AC0E5] hover:bg-[#47a5c7] rounded-lg outline-none focus:outline-none transition-all duration-300 cursor-pointer"
                onClick={goEnterProblem}
              >
                <span className="w-full text-white text-base md:text-lg font-bold whitespace-nowrap">
                  Back
                </span>
              </button>
              <button
                className="flex-grow h-12 bg-[#5AC0E5] hover:bg-[#47a5c7] rounded-lg outline-none focus:outline-none transition-all duration-300 cursor-pointer"
                onClick={goSelectAttribute}
              >
                <span className="w-full text-white text-base md:text-lg font-bold whitespace-nowrap">
                  Next
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
      {(isLoading || isWorking) && <div className="loading"></div>}
    </Layout>
  );
}

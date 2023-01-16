import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AddSlot from "@/components/AddSlot";
import { useAuthValues } from "@/context/contextAuth";
import { useProblemValue } from "@/context/contextProblem";
import { Group } from "@/interfaces/Group";
import useApi from "@/hooks/useApi";
import GroupSlot from "@/components/GroupSlot";
import Layout from "@/components/Layout";
import SideBar from "@/components/SideBar";

export default function GroupPage() {
  const router = useRouter();
  const { isLoading, isSignedIn } = useAuthValues();
  const { attributes, groups, updateGroups } = useProblemValue();
  const { isWorking } = useApi();

  const [selectedGroups, setSelectedGroups] = useState<Array<Group>>([]);

  const goEnterAttribute = (e: any = null) => {
    if (e) {
      e.preventDefault();
    }

    if (attributes.length == 0) {
      router.push(`/problem`);
      return;
    }

    router.push(`/attribute/${attributes.length - 1}`);
  };

  const goEnterFinal = (e: any = null) => {
    if (e) {
      e.preventDefault();
    }

    router.push("/final");
  };

  //############################################################################################
  //###################################### Group ##############################################
  //############################################################################################
  const onSelectGroup = (id: number) => {
    let newSelectedGroups = selectedGroups.slice();
    const index = newSelectedGroups.findIndex((group) => {
      return group.id == id;
    });
    if (index == -1) {
      newSelectedGroups.push(groups[id]);
    } else {
      newSelectedGroups.splice(index, 1);
    }

    setSelectedGroups(newSelectedGroups);
  };

  const onAddGroup = (e: any = null) => {
    if (e) {
      e.preventDefault();
    }

    const groupsArr = groups.slice();
    groupsArr.push({
      id: groupsArr.length,
      label: "New Group",
      value: null,
      description: "",
      image: "/dummy.png",
    });
    updateGroups(groupsArr);
  };

  const onSaveGroup = (index: number, label: string, description: string) => {
    const groupsArr = groups.slice();

    groupsArr[index].label = label;
    groupsArr[index].description = description;
    groupsArr[index].image = "";

    updateGroups(groupsArr);

    const newSelectedGroups = selectedGroups.map((selectedGroup) => {
      return groupsArr[selectedGroup.id];
    });
    setSelectedGroups(newSelectedGroups);
  };

  useEffect(() => {
    if (isSignedIn) {
      setSelectedGroups(
        groups.map((group, index) => {
          return { ...group, id: index };
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
            <div className="w-full flex flex-col justify-start md:justify-center items-center">
              <h1 className="w-full md:w-[768px] text-gray-500 text-xl md:text-2xl text-center">
                Groups (Age, Income, Sex, Race, etc.)
              </h1>
            </div>
            <div className="w-full md:w-[768px] min-h-[300px] pr-1 h-3/4 md:h-auto md:flex-grow overflow-y-auto space-y-1 custom-scrollbar">
              <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2">
                <AddSlot onClick={onAddGroup} />
                {groups?.map((group, index) => {
                  return (
                    <GroupSlot
                      key={index}
                      index={index}
                      group={group}
                      selectedIds={selectedGroups.map((group) => group.id)}
                      onClick={onSelectGroup}
                      onSave={onSaveGroup}
                    />
                  );
                })}
              </div>
            </div>
            <div className="w-full md:w-[768px] flex flex-row justify-between items-center space-x-2">
              <button
                className="flex-grow h-12 bg-[#5AC0E5] hover:bg-[#47a5c7] rounded-lg outline-none focus:outline-none transition-all duration-300 cursor-pointer"
                onClick={goEnterAttribute}
              >
                <span className="w-full text-white text-base md:text-lg font-bold whitespace-nowrap">
                  Back
                </span>
              </button>
              <button
                className="flex-grow h-12 bg-[#5AC0E5] hover:bg-[#47a5c7] rounded-lg outline-none focus:outline-none transition-all duration-300 cursor-pointer"
                onClick={goEnterFinal}
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

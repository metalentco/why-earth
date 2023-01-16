import Layout from "@/components/Layout";
import SideBar from "@/components/SideBar";
import { useAuthValues } from "@/context/contextAuth";
import { useProblemValue } from "@/context/contextProblem";
import useApi from "@/hooks/useApi";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Problem() {
  const router = useRouter();
  const { isLoading, isSignedIn } = useAuthValues();
  const { problem, updateProblem, updateAttributes } = useProblemValue();
  const { isWorking } = useApi();

  const goSelectDesire = async (e: any = null) => {
    if (e) {
      e.preventDefault();
    }

    if (!problem) {
      toast.error("Please enter valid problem.");
      return;
    }

    router.push("/desire");
  };

  useEffect(() => {
    if (isSignedIn) {
      updateAttributes([]);
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
            <h1 className="w-full md:w-[768px] text-black text-base md:text-2xl text-center mb-10">
              What is your biggest problem in life today?
            </h1>
            <p className="w-full md:w-[768px] text-black text-base text-left">
              Problem
            </p>
            <textarea
              className="w-full md:w-[768px] h-[200px] md:min-h-[200px] md:max-h-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-base md:text-lg rounded-lg outline-none focus:outline-none p-2"
              value={problem}
              minLength={1}
              maxLength={140}
              onChange={(e) => updateProblem(e.target.value)}
            ></textarea>
            <div className="w-full md:w-[768px] flex flex-row justify-between items-center space-x-2">
              <button
                className="flex-grow h-12 bg-[#5AC0E5] hover:bg-[#47a5c7] rounded-lg transition-all outline-none focus:outline-none duration-300 cursor-pointer"
                onClick={goSelectDesire}
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

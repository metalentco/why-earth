import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Globe from "@/components/Globe";
import Layout from "@/components/Layout";
import SideBar from "@/components/SideBar";
import { useAuthValues } from "@/context/contextAuth";
import { useProblemValue } from "@/context/contextProblem";
import useApi from "@/hooks/useApi";

export default function Final() {
  const router = useRouter();
  const { isLoading, isSignedIn, signOut } = useAuthValues();
  const { problem, attributes } = useProblemValue();
  const { isWorking, createExperiment } = useApi();
  const [experiment, setExperiment] = useState<any>();

  const finish = (e: any = null) => {
    if (e) {
      e.preventDefault();
    }

    router.push("/");
  };

  useEffect(() => {
    if (isSignedIn) {
      createExperiment(problem, "I am open to new experiences.", attributes)
        .then((value) => {
          if (value) {
            setExperiment(value);
          } else {
            setExperiment("No experiment!");
          }
        })
        .catch((_) => {
          setExperiment("No experiment!");
        });
    } else {
      router.push("/signin");
    }
  }, [isSignedIn]);

  return (
    <Layout>
      <main className="relative w-screen h-screen flex flex-row justify-start items-center">
        <SideBar />
        <div className="relative flex-grow h-screen flex flex-col justify-start items-center md:items-start p-5 md:p-10">
          <div className="w-full h-full flex flex-col justify-center items-center space-y-5 z-10">
            <h1 className="text-center text-black text-2xl">Experiment</h1>
            <p className="text-base text-black p-2 my-2 w-full md:w-96 h-40 border border-gray-500 rounded-md overflow-y-auto">
              {JSON.stringify(experiment)}
            </p>
            <button
              className="w-80 h-16 bg-[#5AC0E5] hover:bg-[#47a5c7] rounded-lg outline-none focus:outline-none transition-all duration-300 cursor-pointer"
              onClick={finish}
            >
              <span className="w-full text-white text-base md:text-lg font-bold whitespace-nowrap">
                FINISH
              </span>
            </button>
          </div>
        </div>
      </main>

      {(isLoading || isWorking) && (
        <div className="loading">
          <img
            className="w-11/12 md:w-1/4 rounded-full opacity-60"
            src="/green-world.gif"
          />
          <p className="text-xl text-green-500 mt-10">
            processing: ETA: 15 minutes
          </p>
        </div>
      )}
    </Layout>
  );
}

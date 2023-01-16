import Layout from "@/components/Layout";
import { useAuthValues } from "@/context/contextAuth";
import { TAG_EMAIL } from "@/libs/constants";
import { validateEmail } from "@/libs/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Signup() {
  const router = useRouter();
  const { isLoading, isSignedIn, signUp } = useAuthValues();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSignup = (e: any = null) => {
    if (e) {
      e.preventDefault();
    }

    if (isLoading) return;

    if (!email || !password) {
      toast.error("Please enter values correctly!");
      return;
    }

    signUp(email, password);
  };

  useEffect(() => {
    if (isSignedIn) {
      router.push("/problem");
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (window) {
      const email = window.localStorage.getItem(TAG_EMAIL);
      if (email && validateEmail(email)) {
        setEmail(email);
      }
    }
  }, []);

  return (
    <Layout>
      <main className="relative left-0 top-0 w-screen h-screen flex flex-col justify-center items-center md:items-start p-5 md:p-10">
        <div className="w-full h-full flex flex-col justify-center items-center z-10">
          <h1 className="text-black text-3xl md:text-6xl text-center font-semibold mb-10">
            Sign Up
          </h1>
          <div className="w-full flex flex-col justify-start items-center space-y-3">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  onSignup();
                }
              }}
              className="flex w-full md:w-80 flex-grow h-16 bg-gray-50 border border-gray-300 text-gray-900 text-base md:text-lg rounded-lg outline-none focus:outline-none p-5"
              placeholder="Enter your email"
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  onSignup();
                }
              }}
              className="flex w-full md:w-80 flex-grow h-16 bg-gray-50 border border-gray-300 text-gray-900 text-base md:text-lg rounded-lg outline-none focus:outline-none p-5"
              placeholder="Enter your password"
            />
            <button
              className="w-full md:w-80 h-16 bg-[#5AC0E5] hover:bg-[#47a5c7] rounded-lg outline-none focus:outline-none transition-all duration-300 cursor-pointer"
              onClick={onSignup}
            >
              <span className="w-full text-white text-base md:text-lg font-bold whitespace-nowrap">
                SIGN UP
              </span>
            </button>
            <p className="text-black text-base flex flex-row">
              Already have account?&nbsp;&nbsp;
              <Link href="/signin">
                <span className="text-[#5AC0E5] hover:text-[#47a5c7] cursor-pointer">
                  Sign In
                </span>
              </Link>
            </p>
          </div>
        </div>
      </main>

      {isLoading && <div className="loading"></div>}
    </Layout>
  );
}

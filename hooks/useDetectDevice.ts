import { useEffect, useState } from "react";

const useDetectDevice = () => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  function handleWindowSizeChange() {
    if (!window) return;

    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    setIsMobile(window.innerWidth <= 768);
  }

  useEffect(() => {
    if (!window) return;
    setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return { isMobile, width, height };
};

export default useDetectDevice;

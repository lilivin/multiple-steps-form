import { useEffect, useState } from "react";

export function useDelayUnmount(isMounted: boolean, delayTime: number) {
  const [showInfo, setShowInfo] = useState(false);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isMounted && !showInfo) {
      setShowInfo(true);
    } else if (!isMounted && showInfo) {
      timeoutId = setTimeout(() => setShowInfo(false), delayTime); //delay our unmount
    }
    return () => clearTimeout(timeoutId); // cleanup mechanism for effects , the use of setTimeout generate a sideEffect
  }, [isMounted, delayTime, showInfo]);
  return showInfo;
}

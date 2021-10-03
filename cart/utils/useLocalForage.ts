import localforage from "localforage";
import { useEffect, useState } from "react";

export const useLocalForage = () => {
  const [instance, setInstance] = useState<LocalForage>();

  useEffect(() => {
    setInstance(localforage);
  }, []);

  return { instance };
};

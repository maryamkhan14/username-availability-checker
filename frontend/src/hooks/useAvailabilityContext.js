import { AvailabilityContext } from "../context/AvailabilityContext";
import { useContext } from "react";

const useAvailabilityContext = () => {
  const context = useContext(AvailabilityContext);
  if (!context) {
    throw Error("useProfilesContext isn't being used inside its provider.");
  }
  return context;
};
export default useAvailabilityContext;

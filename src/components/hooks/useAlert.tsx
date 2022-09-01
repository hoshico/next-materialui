import { useState } from "react";

export const useAlert = () => {
  const [alertState, setAlertState] = useState(false);
  const openAlert = () => {
    setAlertState(true);
  };
  const closeAlert = () => {
    setAlertState(false);
  }
  const type = () => {
    return 
  };
  const message = () => {
    return 
  }

  return { alertState, openAlert, closeAlert, type, message }
};
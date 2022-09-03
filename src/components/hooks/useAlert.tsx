import { useState } from "react";

export const useAlert = () => {
  const [alertState, setAlertState] = useState(false)
  const openAlert = () => {
    setAlertState(true)
  }
  const closeAlert = () => {
    setAlertState(false)
  }

  return { alertState, openAlert, closeAlert }
};
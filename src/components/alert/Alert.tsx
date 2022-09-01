import { Alert, Snackbar } from '@mui/material'

type AlertProps = {
  alertState: boolean;
  closeAlert: () => void;
  type: "error" | "warning" | "info" | "success";
  message: string;
}
export const AlertCopmonent = (props: AlertProps ) => {
  const {alertState, closeAlert, type, message } = props;
  if (!alertState) return null
  return (
    <Snackbar open={alertState} autoHideDuration={6000} onClose={closeAlert}>
      <Alert onClose={closeAlert} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
export default AlertCopmonent

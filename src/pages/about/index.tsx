import { Alert, Button, Snackbar, SnackbarOrigin } from '@mui/material'
import { useState } from 'react'
export interface State extends SnackbarOrigin {
  open: boolean
}

const About = () => {
  const [alertState, setAlertState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center'
  })
  const { vertical, horizontal, open } = alertState
  const openAlert = (newState: SnackbarOrigin) => {
    setAlertState({ open: true, ...newState })
  }
  const closeAlert = () => {
    setAlertState({ ...alertState, open: false })
  }
  return (
    <>
      <Button onClick={() => openAlert({ vertical: 'top', horizontal: 'center' })}>ボタン</Button>
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={alertState} autoHideDuration={6000} onClose={closeAlert}>
        <Alert
          
          onClose={closeAlert}
          severity="error"
          sx={{ width: '100%' }}
          key={vertical + horizontal}
        >
          入力してください
        </Alert>
      </Snackbar>
    </>
  )
}
//
//const Alert = ({ alertState, closeAlert }: { alertState: boolean; closeAlert: () => void }) => {
//  if (!alertState) return null
//  return <Snackbar onClose={() => closeAlert()} message="error" />
//}

export default About

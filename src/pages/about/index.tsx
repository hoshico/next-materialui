import { Button, SnackbarOrigin } from '@mui/material'
import AlertCopmonent from 'components/alert/Alert'
import { useAlert } from 'components/hooks/useAlert'
export interface State extends SnackbarOrigin {
  open: boolean
}

const About = () => {
  const { alertState, openAlert, closeAlert, type, message } = useAlert()
  return (
    <>
      <Button onClick={() => openAlert()}>ボタン</Button>
      <AlertCopmonent alertState={alertState} closeAlert={closeAlert} type="warning" message="入力していません" />
    </>
  )
}

export default About

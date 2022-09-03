import { Button, SnackbarOrigin } from '@mui/material'
import AlertCopmonent from 'components/alert/Alert'
import { useAlert } from 'components/hooks/useAlert'
import { ChangeEvent, useState } from 'react'
export interface State extends SnackbarOrigin {
  open: boolean
}

const About = () => {
  const [text, setText] = useState('')
  const { alertState, openAlert, closeAlert } = useAlert()
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }
  const onRegister = () => {
    if (!text) {
      openAlert()
      return
    }
  }

  return (
    <>
      <Button onClick={() => openAlert()}>ボタン</Button>
      <input type="text" onChange={(e) => onChangeInput(e)} />
      <button onClick={onRegister}>登録</button>
      <AlertCopmonent alertState={alertState} closeAlert={closeAlert} type="warning" message="入力していません" />
    </>
  )
}

export default About

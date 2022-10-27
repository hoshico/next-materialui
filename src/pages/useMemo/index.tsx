import { Paper } from '@mui/material'
import Box from '@mui/material/Box'
import { Container } from '@mui/system'
import { useMemo, useState } from 'react'

const useMemoPage = () => {
  const [num, setNum] = useState(0)
  const [second, setSecond] = useState(2)
  const vul = useMemo(() => {
    setNum((pre) => pre + 1)
  },[second])

  const onAddSecond = () => {
    setSecond((pre) => pre + 1);
  };
  return (
    <>
      <Container>
        <Paper>
          {num}
        </Paper>
        <button onClick={onAddSecond}>増加</button>
      </Container>
    </>
  )
}
export default useMemoPage

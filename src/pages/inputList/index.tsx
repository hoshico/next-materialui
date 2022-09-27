import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'

const InputListPage = () => {
  const [cve, setCve] = useState('')
  const [cveList, setCveList] = useState<string[]>([])

  const [cwe, setCwe] = useState('')
  const [cweList, setCweList] = useState<string[]>([])

  const onClickAdd = () => {
    const newCveList = [...cveList, cve]
    setCveList(newCveList)
    setCve('')
  }
  const onClickRemove = (index: number) => {
    cveList.splice(index, 1)
    const removeCveList = [...cveList]
    setCveList(removeCveList)
  }
  return (
    <>
      <Box m={2}>
        <Box mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField variant="outlined" label="cve番号" value={cve} onChange={(e) => setCve(e.target.value)} />
          <Box ml={2}>
            <Button variant="outlined" onClick={onClickAdd}>
              追加
            </Button>
          </Box>
        </Box>
        {cveList.length > 0 &&
          cveList.map((cve, index) => (
            <Box mt={2} key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>・{cve}</Typography>
              <Box ml={2}>
                <Button variant='outlined' onClick={() => onClickRemove(index)}>削除</Button>
              </Box>
            </Box>
          ))}
      </Box>
    </>
  )
}
export default InputListPage

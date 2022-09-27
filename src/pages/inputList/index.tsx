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

  const onClickCweAdd = () => {
    const newCweList = [...cweList, cwe]
    setCweList(newCweList)
    setCwe('')
  }
  const onClickCweRemove = (index: number) => {
    cweList.splice(index, 1)
    const removeCweList = [...cweList]
    setCveList(removeCweList)
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
            // 1つのcve
            <Box key={index}>
              <Box mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>・{cve}</Typography>
                <Box ml={2}>
                  <Button variant="outlined" onClick={() => onClickRemove(index)}>
                    削除
                  </Button>
                </Box>
              </Box>
              {/*cweゾーン*/}
              <Box m={2}>
                <Box mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField variant="outlined" label="cwe番号" value={cwe} onChange={(e) => setCwe(e.target.value)} />
                  <Box ml={2}>
                    <Button variant="outlined" onClick={onClickCweAdd}>
                      追加
                    </Button>
                  </Box>
                </Box>
                {cweList.length > 0 &&
                  cweList.map((cwe, index) => (
                    // 1つのcve
                    <Box key={index}>
                      <Box mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>・{cwe}</Typography>
                        <Box ml={2}>
                          <Button variant="outlined" onClick={() => onClickCweRemove(index)}>
                            削除
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  ))}
              </Box>
            </Box>
          ))}
      </Box>
    </>
  )
}
export default InputListPage

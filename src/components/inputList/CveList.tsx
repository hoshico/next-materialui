import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'

type CveType = {
  cve: string
  cwe: string[]
}
const CveListPage = () => {
  const [cwe, setCwe] = useState('')
  const [cweList, setCweList] = useState<string[]>([])

  const [cveItem, setCveItem] = useState<CveType>({
    cve: '',
    cwe: cweList,
  })
  const [cveList, setCveList] = useState<CveType[]>([])

  //cve(親)
  const onClickAdd = () => {
    const newCveList = [...cveList, cveItem];
    setCveList(newCveList)
    setCveItem({
      cve: "",
      cwe: []
    })
  }
  const onClickRemove = (index: number) => {
    cveList.splice(index, 1)
    const removeCveList = [...cveList]
    setCveList(removeCveList)
    setCweList([]);
  }
  //cwe(子)
  const onClickCweAdd = (index: number) => {
    //const targetCveItem = cveList[index];
    const newCweList = [...cweList, cwe];
    setCweList(newCweList);
    setCwe('');
  }
  const onClickCweRemove = (index: number) => {
    cweList.splice(index, 1)
    const removeCweList = [...cweList]
    setCweList(removeCweList)
  }
  return (
    <>
      <Box m={2}>
        <Box mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField variant="outlined" label="cve番号" value={cveItem.cve} onChange={(e) => setCveItem({...cveItem , cve: e.target.value})} />
          <Box ml={2}>
            <Button variant="outlined" onClick={onClickAdd}>
              追加
            </Button>
          </Box>
        </Box>
        {cveList.length > 0 &&
          cveList.map((cveItem, index) => (
            // 1つのcve
            <Box key={index}>
              <Box mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>・{cveItem.cve}</Typography>
                <Box ml={2}>
                  <Button variant="outlined" onClick={() => onClickRemove(index)}>
                    削除
                  </Button>
                </Box>
              </Box>

              {/*cweゾーン*/}
              <Box m={4} ml={6}>
                <Box mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField variant="outlined" label="cwe番号" value={cwe} onChange={(e) => setCwe(e.target.value)} />
                  <Box ml={2}>
                    <Button variant="outlined" onClick={() => onClickCweAdd(index)}>
                      追加
                    </Button>
                  </Box>
                </Box>
                {cweList.length > 0 &&
                  cweList.map((cwe, index) => (
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
export default CveListPage

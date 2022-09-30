import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'

type CveType = {
  cve: string
  cwe: string[]
}

// CvelistはCveItems[]
type AdvisoryCveList = {
  id: number
  cve: string
  cwe: string[]
}

const inputListPage02 = () => {
  const [advisoryCveList, setAdvisoryCveList] = useState<AdvisoryCveList[] | null>([
    {
      id: 0,
      cve: 'cve-3333-3333',
      cwe: ['cwe-33', 'cwe-44']
    },
    {
      id: 1,
      cve: 'cve-4444-4444',
      cwe: ['cwe-55', 'cwe-66']
    }
  ])
  const [cve, setCve] = useState("");
  const [cwe, setCwe] = useState('')
 
  //cve(親)
  const onClickAdd = () => {
    const newAdvisoryCve = {
      id: 2,
      cve: cve,
      cwe: [],
    }
    if(advisoryCveList) {
      const newAdvisoryCveList = [...advisoryCveList, newAdvisoryCve]
      setAdvisoryCveList(newAdvisoryCveList);
      setCve("");
    } else {
      setAdvisoryCveList([newAdvisoryCve]);
      setCve("");
    }
    
  }
  const onClickRemove = (index: number) => {
    console.log(index)
    advisoryCveList!.splice(index, 1)
    const removeAdvisoryCveList = [...advisoryCveList!]
    setAdvisoryCveList(removeAdvisoryCveList)
  }
  return (
    <>
      <Box m={2}>
        <Box mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            variant="outlined"
            label="cve番号"
            value={cve}
            onChange={(e) => setCve(e.target.value)}
          />
          <Box ml={2}>
            <Button variant="outlined" onClick={onClickAdd}>
              追加
            </Button>
          </Box>
        </Box>
        {advisoryCveList!.length >= 1 &&
          advisoryCveList?.map((listItem, index) => (
            <Box key={index}>
              <Box mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>・{listItem.cve}</Typography>
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
                {listItem.cwe.length > 0 &&
                  listItem.cwe.map((cwe, index) => (
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
export default inputListPage02

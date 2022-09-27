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
  //  const [cwe, setCwe] = useState('')
  //  const [cweList, setCweList] = useState<string[]>([])
  //
  //  const [cveItem, setCveItem] = useState<CveType>({
  //    cve: '',
  //    cwe: cweList
  //  })

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
    //const newCveList = [...cveList, cveItem]
    //setCveList(newCveList)
    //setCveItem({
    //  cve: '',
    //  cwe: []
    //})
  }
  const onClickRemove = (index: number) => {
    console.log(index)
    advisoryCveList!.splice(index, 1)
    const removeAdvisoryCveList = [...advisoryCveList!]
    setAdvisoryCveList(removeAdvisoryCveList)
    //setCweList([])
  }
  //cwe(子)
  //const onClickCweAdd = (index: number) => {
  //  //const targetCveItem = cveList[index];
  //  const newCweList = [...cweList, cwe]
  //  setCweList(newCweList)
  //  setCwe('')
  //}
  //const onClickCweRemove = (index: number) => {
  //  cweList.splice(index, 1)
  //  const removeCweList = [...cweList]
  //  setCweList(removeCweList)
  //}
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
            </Box>
          ))}
      </Box>
    </>
  )
}
export default inputListPage02

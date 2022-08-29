import { Search } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { reports } from 'components/data/reports'
import { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'

type ReportType = {
  id: number
  number: string
  url: string
  cvename: string
  cveList: string[]
  title: string
  presence: string
  severity: string
}

const SearchpPage: NextPage = () => {
  const [open, setOpen] = useState(false)
  const [showReports, setShowReports] = useState<ReportType[]>(reports)
  const [inputValue, setInputValue] = useState<string>('')
  const [repo, setRepo] = useState<ReportType | null>(null)
  // 入力値チェック
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    search(e.target.value)
  }
  // 絞り込み検索
  const search = (value: string) => {
    if (value === '') {
      setShowReports(reports)
      return
    }
    const searchedReports = reports.filter((report) => {
      // flatにした配列
      return Object.values(report).flat().includes(value)
    })
    console.log(searchedReports)
    setShowReports(searchedReports)
  }
  const onSelectList = () => {}

  const onOpenModal = () => {
    setOpen(true)
  }
  const onCloseModal = () => {
    setOpen(false)
  }

  return (
    <>
      <Container>
        <Typography variant="h5" m={3}>
          脆弱性のセキュリティ情報
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Typography sx={{ fontWeight: 'bold' }}>管理者</Typography>
          <Button onClick={onOpenModal}>管理書検索</Button>
        </Box>
      </Container>
      {/*モーダル*/}
      <Dialog open={open} onClose={onCloseModal}>
        <DialogTitle>管理書検索</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="タイトル"
            type="text"
            fullWidth
            value={inputValue}
            variant="standard"
            onChange={handleInputChange}
          />
          {showReports.map((deta) => (
            <p key={deta.id} onClick={onSelectList}>
              {deta.title}
            </p>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseModal}>キャンセル</Button>
          <Button onClick={onCloseModal}>登録</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default SearchpPage

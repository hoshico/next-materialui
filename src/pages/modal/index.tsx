import { SettingsOutlined, TransgenderTwoTone } from '@mui/icons-material'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { Box, Container } from '@mui/system'
import { NextPage } from 'next'
import Link from 'next/link'
import { FormEvent, useState } from 'react'

type UserProps = {
  id: string
  email: string
  displayName: string
  roles: string[]
}
type PhaseProps = {
  name: string
  input: UserProps[]
  approval: UserProps[]
}

const Modal: NextPage = () => {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('emergency')

  /*
    各userデータ&userArry(userデータの配列)
    publishingFlowは仮のもの
  */
  const user1 = {
    id: '',
    email: 'seiichro.tanaka@example.com',
    displayName: '田中 誠一郎',
    roles: ['']
  }
  const user2 = {
    id: '',
    email: 'toshi.katori@example.com',
    displayName: '香取 闘志',
    roles: ['']
  }

  const user3 = {
    id: '',
    email: 'shintaro.kaneko@exapmle.com',
    displayName: '金子 慎太郎',
    roles: ['']
  }
  const userArry = [user1, user2, user3]

  const [publishingFlow, setPublishingFlow] = useState([
    {
      title: '初版調査状況更新',
      phases: [
        {
          name: '設計区',
          input: [user2],
          approval: [user1]
        }
      ]
    },
    {
      title: '初版掲載内容更新',
      phases: [
        {
          name: 'サービス・サポート区',
          input: [user3],
          approval: [user1]
        },
        {
          name: 'マーケ区',
          input: [user3],
          approval: [user1]
        }
      ]
    },
    {
      title: '改訂',
      phases: [
        {
          name: '設計区',
          input: [user2],
          approval: [user1]
        }
      ]
    }
  ])

  const [modalIndex, setModalIndex] = useState(0)
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState('')
  const [inputList, setInputList] = useState<UserProps[]>([])
  const [approvalList, setApprovalList] = useState<UserProps[]>([])
  const [open, setOpen] = useState(false)
  const [personName, setPersonName] = useState<string[]>([])
  const [approvalName, setApprovalName] = useState<string[]>([])
  const [target, setTarget] = useState<{ phases: PhaseProps[]; index: number }>()

  // ダイアログopen
  const handleClickOpen = (index: number) => {
    setName('')
    setPersonName([])
    setApprovalName([])
    setEditMode(false)
    setModalIndex(index)
    setOpen(true)
  }
  // ダイアログclose
  const handleClose = () => {
    setOpen(false)
  }
  // 編集 > 削除ボタン
  const handleDeleteClose = () => {
    target!.phases.splice(target!.index, 1)
    setName('')
    setPersonName([])
    setApprovalName([])
    setOpen(false)
  }
  // フェーズ登録ボタン
  const handleAddPhase = () => {
    const newPhase = {
      name: name,
      input: inputList,
      approval: approvalList
    }
    // 編集モード
    if (editMode) {
      target!.phases[target!.index] = newPhase
      setName('')
      setPersonName([])
      setApprovalName([])
      setOpen(false)
      return
    }
    const newPublishingFlow = publishingFlow.map((flow, index) => {
      if (index === modalIndex) {
        return {
          title: flow.title,
          phases: [...flow.phases, newPhase]
        }
      } else {
        return flow
      }
    })
    setPublishingFlow(newPublishingFlow)
    setName('')
    setPersonName([])
    setApprovalName([])
    setOpen(false)
  }
  // 編集ボタン
  const onEditPhase = (phases: PhaseProps[], index: number) => {
    const targetPhase = phases[index]
    setTarget({ phases, index })
    // ダイアログを編集モードに
    setEditMode(true)

    setOpen(true)
    setName(targetPhase.name)
    const inputStr = targetPhase.input.map((user) => user.displayName)
    const approvalStr = targetPhase.approval.map((user) => user.displayName)
    setPersonName(inputStr)
    setApprovalName(approvalStr)

    setInputList(targetPhase.input)
    setApprovalList(targetPhase.approval)
  }
  // 入力者・承認者フォーム
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  }
  // 入力者セレクト
  const handleChange = (event: any) => {
    const {
      target: { value }
    } = event
    setPersonName(typeof value === 'string' ? value.split(',') : value)
    const pickedUser = userArry.filter((user) => value.includes(user.displayName))
    setInputList(pickedUser)
  }
  // 承認者セレクト
  const handleApprovalChange = (event: any) => {
    const {
      target: { value }
    } = event
    setApprovalName(typeof value === 'string' ? value.split(',') : value)
    const pickedUser = userArry.filter((user) => value.includes(user.displayName))
    setApprovalList(pickedUser)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    //await doRequest();
  }
  return (
    <Container maxWidth="md">
      <Typography variant="h5">発行フロー事前登録</Typography>
      <form onSubmit={handleSubmit}>
        <Paper>
          <Box p={3}>
            <Box mt={2}>
              <TextField
                variant="outlined"
                label="タイトル"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
            <Box mt={2}>
              <FormControl variant="outlined">
                <InputLabel id="improtance-select-label">重要性</InputLabel>
                <Select
                  labelId=""
                  id=""
                  label="緊急度"
                  style={{ minWidth: 150 }}
                  displayEmpty
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <MenuItem value="emergence">緊急案件用</MenuItem>
                  <MenuItem value="normal">通常案件用</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box mt={2} sx={{ display: 'flex', alignItmes: 'center' }}></Box>
            {/*フェーズカード出力*/}
            <Stack spacing={2}>
              {publishingFlow.map((flow, index) => (
                <Box key={index}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="h6" component="div">
                      {`${index + 1}. ${flow.title}`}
                    </Typography>
                    <Button size="small" onClick={() => handleClickOpen(index)}>
                      追加
                    </Button>
                    {/*フェーズ作成ダイアログ*/}
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-dexcribeby="alert-dialog-description"
                    >
                      <DialogTitle>{publishingFlow[modalIndex].title}</DialogTitle>
                      <DialogContent>
                        <Box mt={2}>
                          <FormControl variant="outlined">
                            <InputLabel id="importance-select-label">担当区</InputLabel>
                            <Select
                              labelId="importance-select-label"
                              id="importance-select"
                              label="担当区"
                              style={{ minWidth: 150 }}
                              displayEmpty
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            >
                              <MenuItem value="設計区">設計区</MenuItem>
                              <MenuItem value="サービス・サポート区">サービス・サポート区</MenuItem>
                              <MenuItem value="マーケ区">マーケ区</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                        {/*入力者登録*/}
                        <Box mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                          <FormControl sx={{ width: 300 }}>
                            <InputLabel id="demo-multiple-checkbox-label">入力者</InputLabel>
                            <Select
                              labelId="demo-multiple-checkbox-label"
                              id="demo-multiple-checkbox"
                              multiple
                              value={personName}
                              onChange={handleChange}
                              input={<OutlinedInput label="入力者" />}
                              renderValue={(selected) => selected.join(',')}
                              MenuProps={MenuProps}
                            >
                              {userArry.map((user) => (
                                <MenuItem key={user.displayName} value={user.displayName}>
                                  <Checkbox checked={personName.indexOf(user.displayName) > -1} />
                                  <ListItemText primary={user.displayName} />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                        {/*承認者登録*/}
                        <Box mt={2} sx={{ display: 'flex', alignItmes: 'center' }}>
                          <FormControl sx={{ width: 300 }}>
                            <InputLabel id="demo-multiple-checkbox-labal">承認者</InputLabel>
                            <Select
                              labelId="demo-multiple-checkbox-label"
                              id="demo-multiple-checkbox"
                              multiple
                              value={approvalName}
                              onChange={handleApprovalChange}
                              input={<OutlinedInput label="承認者" />}
                              renderValue={(selected) => selected.join(',')}
                              MenuProps={MenuProps}
                            >
                              {userArry.map((user) => (
                                <MenuItem key={user.displayName} value={user.displayName}>
                                  <Checkbox checked={approvalName.indexOf(user.displayName) > -1} />
                                  <ListItemText primary={user.displayName} />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </DialogContent>
                      <DialogActions>
                        {editMode ? (
                          <Button onClick={handleDeleteClose}>削除</Button>
                        ) : (
                          <Button onClick={handleClose}>キャンセル</Button>
                        )}
                        {editMode ? (
                          <Button variant="outlined" onClick={handleAddPhase}>
                            更新
                          </Button>
                        ) : (
                          <Button variant="outlined" onClick={handleAddPhase}>
                            登録
                          </Button>
                        )}
                      </DialogActions>
                    </Dialog>
                  </Stack>
                  <Box display="flex" sx={{ flexWrap: 'wrap' }}>
                    {flow.phases.map((phase, index) => (
                      <Card key={index} sx={{ minWidth: 250, marginRight: 2, marginTop: 2 }}>
                        <CardContent>
                          <Typography variant="h6" component="div">
                            {phase.name}
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ marginTop: 1 }}>
                            <Typography color="text.secondary">入力者</Typography>
                            {phase.input.map((user, index) => (
                              <Chip key={index} label={user.displayName} />
                            ))}
                          </Stack>
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ marginTop: 1 }}>
                            <Typography color="text.secondary">承認者</Typography>
                            {phase.approval.map((user, index) => (
                              <Chip key={index} label={user.displayName} />
                            ))}
                          </Stack>
                        </CardContent>
                        <CardActions>
                          <Button size="small" onClick={() => onEditPhase(flow.phases, index)}>
                            編集
                          </Button>
                        </CardActions>
                      </Card>
                    ))}
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        </Paper>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Link href="/publishingFlow" passHref>
            <Button>キャンセル</Button>
          </Link>
          <Button variant="contained" type="submit">
            作成
          </Button>
        </Box>
      </form>
    </Container>
  )
}

export default Modal

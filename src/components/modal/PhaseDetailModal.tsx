import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, ListItemText, MenuItem, Select } from "@mui/material"

export const PhaseModal = () => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-dexcribeby="alert-dialog-description"
    >
      {/* TODO: titleをpropsで渡す */}
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
  )
}

export default PhaseModal

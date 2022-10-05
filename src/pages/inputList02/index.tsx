import { Description } from '@mui/icons-material'
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

const contentInfo = {
  name: "yasu",
  description: "これは説明です"
}

const inputListPage02 = () => {
  const [name, setName] = useState(contentInfo.name || "")
  const [description, setDescription] = useState(contentInfo.description || "")
  const onSubmit = () => {

  };
  
  return (
    <>
      <Stack m={6} component="form" onSubmit={onSubmit}>
        <Grid>
          <TextField type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        </Grid>
        <Grid mt={2}>
          <TextField type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
        </Grid>
      </Stack>
    </>
  )
}
export default inputListPage02

import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import { useFindChanges } from 'components/hooks/useFindChages'
import { useState } from 'react'

const contentInfo = {
  name: 'yasu',
  description: 'これは説明です'
}

const inputListPage02 = () => {
  const [name, setName] = useState(contentInfo.name || '');
  const [description, setDescription] = useState(contentInfo.description || '');
  const { diff, diffArray } = useFindChanges(contentInfo, name, description);
  console.log(diff);
  console.log(diffArray);
  const onSubmit = (e: any) => {
    e.preventDefault()
    console.log('送信')
  };
  return (
    <>
      <Stack m={6} component="form" onSubmit={(e) => onSubmit(e)}>
        <Grid>
          <TextField type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </Grid>
        <Grid mt={2}>
          <TextField type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Grid>
        <Grid mt={2}>
          <Button disabled={!diff} variant="contained" type="submit">
            送信
          </Button>
        </Grid>
      </Stack>
    </>
  )
}
export default inputListPage02

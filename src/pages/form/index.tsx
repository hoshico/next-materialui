import { Box, Button, Divider, InputLabel, TextField } from '@mui/material'
import { useState } from 'react';

const FormPage = () => {
  const [name, setName] = useState("");
  const onSubmit = (e:any) => {
    e.preventDefault()
    console.log(`submit ${e.target.value}`)
  };
  const onDetermined = () => {
    console.log(`${name}を送信しました`)
  };
  return (
    <Box m={3}>
      <form onSubmit={(e) => onSubmit(e)}>
        <InputLabel htmlFor="name">名前</InputLabel>
        {/* type 'IntrinsicAttributes & TextFieldProps'. */}
        <TextField id="name" value={name} onChange={(e) => setName(e.target.value)}/>
        <Box mt={3} display="flex">
          <Button type="submit">保存</Button>
          <Button onClick={onDetermined}>確定・承認</Button>
        </Box>
      </form>
    </Box>
  )
}
export default FormPage

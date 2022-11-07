import DehazeIcon from '@mui/icons-material/Dehaze'
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Layout = ({ children }: any) => {
  const router = useRouter()
  const [openDrawer, setOpenDrawer] = useState(false)
  const onChangePage = (path: string) => {
    router.push(path)
    setOpenDrawer(false)
  }
  return (
    <>
      <AppBar component="nav" color='secondary'>
        <Toolbar>
          <IconButton edge="start" onClick={() => setOpenDrawer(true)}>
            <DehazeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={openDrawer} transitionDuration={100} onClose={() => setOpenDrawer(false)}>
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemText primary="React-Hook-Form" onClick={() => onChangePage('./react-form')} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText primary="React-Hook-Form バリデーションについて" onClick={() => onChangePage('./react-form2')} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
            <ListItemText primary="React-Hook-Form numberについて" onClick={() => onChangePage('./react-form-number')} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
            <ListItemText primary="React-Hook-Form & zod" onClick={() => onChangePage('./form-zod')} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box pt={10}>{children}</Box>
    </>
  )
}
export default Layout

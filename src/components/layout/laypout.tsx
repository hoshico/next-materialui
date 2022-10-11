import DehazeIcon from '@mui/icons-material/Dehaze'
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Layout = ({ children }: any) => {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false)
  const onChangePage = (path: string) => {
    router.push(path);
    setOpenDrawer(false);
  };
  return (
    <>
      <header>
        <Box onClick={() => setOpenDrawer(true)}>
          <DehazeIcon />
        </Box>
      </header>
      <Drawer anchor="left" open={openDrawer} transitionDuration={100} onClose={() => setOpenDrawer(false)}>
        <List>
          <ListItem>
            <ListItemButton >
              <ListItemText primary="React-Hook-Form" onClick={() => onChangePage("./reactForm")}/>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      {children}
    </>
  )
}
export default Layout

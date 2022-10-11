import DehazeIcon from '@mui/icons-material/Dehaze'
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { useState } from 'react'

const Layout = ({ children }: any) => {
  const [openDrawer, setOpenDrawer] = useState(false)
  return (
    <>
      <header>
        <Box onClick={() => setOpenDrawer(true)}>
          <DehazeIcon />
        </Box>
      </header>
      <Drawer
        anchor="left"
        open={openDrawer}
        transitionDuration={100}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemText primary="React Hook Form" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      {children}
    </>
  )
}
export default Layout

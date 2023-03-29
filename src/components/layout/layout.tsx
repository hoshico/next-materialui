import DehazeIcon from '@mui/icons-material/Dehaze';
import {
  Alert,
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Snackbar,
  Toolbar,
  Typography
} from '@mui/material';
import { useCustomSnackbar, useSnackbar } from 'components/snackbar/hooks';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Layout = ({ children }: any) => {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  const onChangePage = (path: string) => {
    router.push(path);
    setOpenDrawer(false);
  };
  const { snackbarState } = useCustomSnackbar();
  const { closeSnackbar } = useSnackbar();

  console.log(snackbarState.isOpen)

  return (
    <>
      <AppBar component="nav" color="secondary">
        <Toolbar>
          <IconButton edge="start" onClick={() => setOpenDrawer(true)}>
            <DehazeIcon />
          </IconButton>
          <Box ml={2}>
            <Typography variant="h6" fontWeight="bold">
              MUIコンポーネントテンプレート
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={openDrawer}
        transitionDuration={100}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemText
                primary="React-Hook-Form"
                onClick={() => onChangePage('./react-form')}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText
                primary="React-Hook-Form バリデーションについて"
                onClick={() => onChangePage('./react-form2')}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText
                primary="React-Hook-Form numberについて"
                onClick={() => onChangePage('./react-form-number')}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText
                primary="React-Hook-Form & useFieldArray"
                onClick={() => onChangePage('./react-form-array')}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText
                primary="React-Hook-Form & zod"
                onClick={() => onChangePage('./form-zod')}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText
                primary="React-Hook-Form & yup"
                onClick={() => onChangePage('./form-yup')}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText
                primary="アコーディオン"
                onClick={() => onChangePage('./accordion')}
              />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText
                primary="SWR"
                onClick={() => onChangePage('./swr')}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      {/*通知バー*/}
      <Box pt={10}>{children}</Box>
      <Snackbar
        open={snackbarState.isOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbarState.severity}
          sx={{ width: '100%' }}
        />
      </Snackbar>
    </>
  );
};
export default Layout;

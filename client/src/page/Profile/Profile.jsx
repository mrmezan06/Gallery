import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import BadgeIcon from '@mui/icons-material/Badge';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {
  BiSolidUserAccount,
  BiCategory,
  BiSolidDashboard,
} from 'react-icons/bi';

import { BsFillClipboardCheckFill } from 'react-icons/bs';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LoginIcon from '@mui/icons-material/Login';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';

import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Stack,
  Typography,
} from '@mui/material';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';

import { useGetUserProfileQuery } from '../../slice/api/userApiSlice';
import Dashboard from './Dashboard/Dashboard';
import './index.css';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '25px',
  boxShadow: 24,
  p: 4,
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const { data, error, isLoading, isError } = useGetUserProfileQuery();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteHandler = async (e) => {
    e.preventDefault();

    /* try {
      await deleteMyAccount().unwrap();
      dispatch(logout());
      toast.success('Your account has been deleted. Sad to see you go 😢');
    } catch (err) {
      const message = err.data.message;
      toast.error(message);
    } */
  };

  useEffect(() => {
    if (isError) {
      const message = error.data.message;
      toast.error(message);
    }
  }, [isError, error]);

  return (
    <>
      <Container
        component="main"
        maxWidth="md"
        sx={{
          border: '2px solid #e4e5e7',
          borderRadius: '25px',
          py: 2,
          mt: 10,
          backgroundColor: '#23242a',
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: 40, color: 'white', fontWeight: 900 }}
          >
            User Profile
          </Typography>
        </Box>
        {isLoading ? (
          <Spinner />
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box>
              {data.userProfile?.avatar ? (
                <Avatar
                  src={data.userProfile.avatar}
                  sx={{ width: 100, height: 100 }}
                />
              ) : (
                <AccountCircleIcon sx={{ fontSize: '6rem' }} color="primary" />
              )}
            </Box>

            <Grid container>
              <Grid item md={12} sm={6} lg={12}>
                <Stack direction="row" spacing={40}>
                  <Stack>
                    <List>
                      {/* provider */}
                      <ListItem>
                        <ListItemIcon>
                          <LoginIcon fontSize="large" sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ color: 'white' }}
                          primary={`Logged in With : ${capitalizeFirstLetter(
                            data?.userProfile?.provider
                          )}`}
                        />
                      </ListItem>
                      {/* email */}
                      <ListItem>
                        <ListItemIcon>
                          <AttachEmailIcon
                            fontSize="large"
                            sx={{ color: 'white' }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ color: 'white' }}
                          primary={data?.userProfile?.email}
                        />
                      </ListItem>
                      {/* name */}
                      <ListItem>
                        <ListItemIcon>
                          <LabelImportantIcon
                            sx={{ color: 'white' }}
                            fontSize="large"
                          />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ color: 'white' }}
                          primary={`Name: ${data?.userProfile?.name}`}
                        />
                      </ListItem>
                      {/* username */}
                      <ListItem>
                        <ListItemIcon>
                          <BadgeIcon sx={{ color: 'white' }} fontSize="large" />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ color: 'white' }}
                          primary={`Username: ${data?.userProfile?.username}`}
                        />
                      </ListItem>
                    </List>
                  </Stack>
                  <Stack>
                    <List>
                      {/* provider */}
                      <ListItem>
                        <ListItemIcon>
                          <BiCategory fontSize="32" color="white" />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ color: 'white' }}
                          primary={`Total Category: ${
                            data?.userProfile?.categoryCount || 0
                          }`}
                        />
                      </ListItem>
                      {/* email */}
                      <ListItem>
                        <ListItemIcon>
                          <BiSolidUserAccount fontSize="32px" color="white" />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ color: 'white' }}
                          primary={`Total Photos: ${
                            data?.userProfile?.photoCount || 0
                          }`}
                        />
                      </ListItem>
                      {/* name */}
                      <ListItem>
                        <ListItemIcon>
                          <PushPinIcon
                            fontSize="large"
                            sx={{ color: 'white' }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ color: 'white' }}
                          primary={`Lives in: ${
                            data?.userProfile?.city || 'BD'
                          }`}
                        />
                      </ListItem>
                      {/* username */}
                      <ListItem>
                        <ListItemIcon>
                          <BsFillClipboardCheckFill
                            fontSize="32px"
                            color="white"
                          />
                        </ListItemIcon>
                        <ListItemText
                          sx={{ color: 'white' }}
                          primary={`Last Login: ${
                            data?.userProfile?.lastLogin || 'Never'
                          }`}
                        />
                      </ListItem>
                    </List>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item md={4}>
                <Button
                  sx={{ mt: 3, mb: 2, borderRadius: '25px' }}
                  fullWidth
                  variant="contained"
                  color="primary"
                  endIcon={<EditIcon />}
                  onClick={() => navigate('/edit-profile')}
                >
                  <Typography variant="h5">Edit Profile</Typography>
                </Button>
              </Grid>
              <Grid item md={4}>
                <Button
                  sx={{ mt: 3, mb: 2, borderRadius: '25px' }}
                  fullWidth
                  variant="contained"
                  color="warning"
                  startIcon={<PersonRemoveAlt1Icon sx={{ color: 'white' }} />}
                  onClick={handleOpen}
                >
                  <Typography variant="h5" sx={{ color: 'white' }}>
                    Delete Account
                  </Typography>
                </Button>
              </Grid>
              <Grid item md={4}>
                <Button
                  sx={{ mt: 3, mb: 2, borderRadius: '25px' }}
                  fullWidth
                  variant="contained"
                  color="primary"
                  startIcon={<BiSolidDashboard />}
                  onClick={() => navigate('/dashboard')}
                >
                  <Typography variant="h5">Dashboard</Typography>
                </Button>
              </Grid>
            </Grid>

            {/* modal */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Are you sure you want to delete your account?
                </Typography>
                <Button
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  fullWidth
                  variant="contained"
                  color="warning"
                  size="large"
                  endIcon={<DeleteForeverIcon sx={{ color: 'white' }} />}
                  onClick={deleteHandler}
                >
                  <Typography variant="h5" sx={{ color: 'white' }}>
                    Delete Account
                  </Typography>
                </Button>
              </Box>
            </Modal>
          </Box>
        )}
      </Container>
      <Dashboard />
    </>
  );
};

export default ProfilePage;

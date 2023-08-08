import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import CheckIcon from '@mui/icons-material/Check';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  styled,
  TextField,
  Typography,
} from '@mui/material';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../../components/Spinner';

import { toast } from 'react-toastify';

import {
  useUpdateAvatarMutation,
  useGetUserProfileQuery,
} from '../../../slice/api/userApiSlice';
import { useNavigate } from 'react-router-dom';

const Input = styled('input')({
  display: 'none',
});

const UploadAvatar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [publicId, setPublicId] = useState('');

  const { data: user } = useGetUserProfileQuery();

  const [updateAvatar, { isSuccess, isError, error }] =
    useUpdateAvatarMutation();
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('logo', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      if (publicId) {
        // TODO: change the url
        const { data: deleteData } = await axios.patch(
          'http://localhost:5000/api/upload/delete',
          { publicId }
        );

        if (!deleteData?.success) {
          toast.error(deleteData?.message);
        } else {
        }
      }
      // TODO: change the url
      const { data } = await axios.patch(
        'http://localhost:5000/api/upload',
        formData,
        config
      );
      //   console.log(data);
      setImage(data?.url);
      setPublicId(data?.publicId);
      setUploading(false);
      console.log(data);
    } catch (error) {
      setUploading(false);
      toast.error(error.message);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      updateAvatar({ url: image, publicId });
    } catch (error) {
      toast.error(error.message);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(user);
    if (user?.userProfile?.avatar) {
      setImage(user?.userProfile?.avatar);
      setPublicId(user?.userProfile?.publicId);
      // console.log(user?.userProfile?.publicId);
    }

    if (isSuccess) {
      navigate('/profile');
      toast.success('Updated avatar successfully');
    }
    if (isError) {
      toast.error(error.message);
    }
    if (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  }, [
    isSuccess,
    isError,
    error,
    navigate,
    user?.userProfile?.avatar,
    user?.userProfile?.publicId,
  ]);

  return (
    <>
      {/* Model Name,  Date of Birth, Country, Image */}
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          border: '2px solid  #e4e5e7',
          backgroundColor: '#fff',
          borderRadius: '25px',
          py: 2,
          mt: 10,
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
          <BrowserUpdatedIcon sx={{ fontSize: 70 }} />
          <Typography variant="h4">Upload Photo</Typography>
        </Box>
        {/* <StyledDivider /> */}

        {isLoading ? (
          <Spinner />
        ) : (
          <Box
            sx={{
              mt: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={submitHandler}
          >
            {/* avatar logo */}
            <TextField
              fullWidth
              id="image"
              name="image"
              label="Image"
              placeholder="Either upload or enter image URL"
              margin="normal"
              value={image || ''}
              onChange={(e) => setImage(e.target.value)}
            />
            <label htmlFor="logo">
              <Input
                accept="image/*"
                id="logo"
                name="logo"
                type="file"
                onChange={uploadFileHandler}
              />
              {!uploading ? (
                <Button
                  sx={{ mt: '15px' }}
                  variant="contained"
                  component="span"
                  endIcon={<PhotoCamera />}
                >
                  Choose Your Image
                </Button>
              ) : (
                <CircularProgress size={60} />
              )}
            </label>

            <Button
              sx={{ mt: 5, mb: 3, borderRadius: '25px' }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="medium"
              endIcon={<CheckIcon />}
            >
              <Typography variant="h5">Upload</Typography>
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default UploadAvatar;

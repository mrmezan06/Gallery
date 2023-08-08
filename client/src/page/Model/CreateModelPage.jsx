import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import CheckIcon from '@mui/icons-material/Check';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  styled,
  TextField,
  Typography,
} from '@mui/material';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { useCreateCategoryMutation } from '../../slice/api/categoryApiSlice';
import { toast } from 'react-toastify';

const Input = styled('input')({
  display: 'none',
});

const CreateModelPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [image, setImage] = useState('');
  const [publicId, setPublicId] = useState('');
  const [uploading, setUploading] = useState(false);

  const [bod, setBod] = useState('');

  const [createCategory, { isSuccess, isError, error }] =
    useCreateCategoryMutation();

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
      // TODO: change the url
      const { data } = await axios.patch(
        'http://localhost:5000/api/upload',
        formData,
        config
      );
      // console.log(data);
      setImage(data?.url);
      setPublicId(data?.publicId);
      setUploading(false);
      console.log(data);
    } catch (error) {
      setUploading(false);
      console.log(error);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userData = {
      categoryName: name,
      posterPhotoURL: image,
      dateOfBirth: bod,
      country: country,
      publicId: publicId,
    };
    try {
      const created = await createCategory(userData);
      if (created) {
        toast.success('Category created successfully');
        setName('');
        setCountry('');
        setImage('');
        setBod('');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setIsLoading(false);
    }
    if (isError) {
      setIsLoading(false);
      toast.error(error.message);
    }
    if (error) {
      toast.error(error.message);
    }
  }, [isSuccess, isError, error]);

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
          <Typography variant="h4">Create Model</Typography>
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
            <Grid container spacing={2}>
              <Grid item md={6} lg={12}>
                {/* Name */}
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  placeholder='e.g. "John Doe"'
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item md={6} lg={6}>
                {/* Country */}
                <TextField
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  margin="normal"
                  placeholder='e.g. "USA"'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Grid>

              <Grid item md={6} lg={6}>
                {/* Country */}
                <TextField
                  fullWidth
                  id="dob"
                  label="Date of Birth"
                  name="dob"
                  margin="normal"
                  placeholder="dd-mm-yyyy"
                  value={bod}
                  onChange={(e) => setBod(e.target.value)}
                />
              </Grid>
            </Grid>

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
              size="large"
              endIcon={<CheckIcon />}
            >
              <Typography variant="h5">Create</Typography>
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default CreateModelPage;

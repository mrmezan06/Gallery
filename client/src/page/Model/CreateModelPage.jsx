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

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const Input = styled('input')({
  display: 'none',
});

const CreateModelPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const goBack = () => navigate(-1);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  //   const [startDate, setStartDate] = useState(new Date());
  const [age, setAge] = useState('');

  const uploadFileHandler = async (e) => {};
  const updateHandler = async (e) => {};

  //   const dueDate = format(new Date(), 'do MMMM yyyy');
  return (
    <>
      {/* Model Name,  Date of Birth, Country, Image */}
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          border: '2px solid  #e4e5e7',
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
          <Button
            variant="contained"
            color="warning"
            size="small"
            sx={{ fontSize: '1rem', ml: '10px' }}
            onClick={goBack}
          >
            Go Back
          </Button>
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
            onSubmit={updateHandler}
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
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Grid>

              <Grid item md={6} lg={6}>
                {/* Country */}
                <TextField
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  margin="normal"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Grid>
            </Grid>

            {/* avatar logo */}
            <TextField
              fullWidth
              id="image"
              name="image"
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
              sx={{ mt: 3, mb: 5 }}
              type="submit"
              fullWidth
              variant="contained"
              color="success"
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

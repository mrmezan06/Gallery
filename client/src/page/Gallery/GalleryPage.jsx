import './style.css';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';

import { useEffect, useState } from 'react';
import { Box, Pagination } from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GalleryPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [pageSize, setPageSize] = useState(1);
  const [pages, setPages] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const fetchPhotos = async (pages, id) => {
    setIsLoading(true);
    const { data } = await axios.get(
      `http://localhost:5000/api/photo/get/${id}?pageNumber=${pages}&pageSize=${itemsPerPage}`
    );
    try {
      // console.log(data);
      setPhotos(data?.photos);
      setPageSize(data?.numberOfPages);
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  const location = useLocation();
  let id = location.search.split('=')[1];

  const handlePageChange = (event, page) => {
    setPages(page);
  };

  useEffect(() => {
    fetchPhotos(pages, id);
  }, [id, pages]);

  return (
    <>
      <section className="g-body">
        <div className="container">
          {isLoading && <Spinner />}
          {photos.length !== 0 &&
            photos?.map((photo) => (
              <div className="card-g" key={photo._id}>
                <div className="content">
                  <div
                    className="imgbx"
                    onClick={() => {
                      navigate(`/photos/${photo._id}`);
                    }}
                  >
                    {/* show views on top right above the picture */}
                    <p className="views">
                      <i class="fa fa-eye" aria-hidden="true"></i> 24M
                    </p>
                    <p className="loves">
                      <i class="fa fa-heart" aria-hidden="true"></i> 6M
                    </p>
                    <img
                      src={photo.url}
                      alt={photo.name}
                      width="360px"
                      height="320px"
                    />
                  </div>
                  <div className="contentbx">
                    <h3 style={{ fontSize: '12px' }}>
                      {photo.name}
                      <br />
                      <span>Place: {photo.place}</span>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
      <Box
        justifyContent="center"
        display="flex"
        alignItems="center"
        sx={{ margin: '20px 0px' }}
      >
        {/* Paginate */}
        <Pagination
          count={pageSize}
          color={'primary'}
          sx={{ textAlign: 'center' }}
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
};

export default GalleryPage;

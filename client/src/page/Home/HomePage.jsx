import './style.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';

import { useGetAllCategoryQuery } from '../../slice/api/categoryApiSlice';
import { useEffect, useState } from 'react';
import { Box, Pagination } from '@mui/material';
import axios from 'axios';

const HomePage = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [pageSize, setPageSize] = useState(1);
  const [pages, setPages] = useState(1);
  const itemsPerPage = 10;

  const { data, isError, isLoading } = useGetAllCategoryQuery('allCategory', {
    pollingInterval: 60000 * 5,
  });

  const handlePageChange = (event, page) => {
    setPages(page);
  };

  const fetchCategories = async (pages) => {
    const { data } = await axios.get(
      `http://localhost:5000/api/category/all?pageNumber=${pages}&pageSize=${itemsPerPage}`
    );
    setCategories(data?.categories);
    setPageSize(data?.numberOfPages);
  };

  useEffect(() => {
    fetchCategories(pages);
    if (data) {
      setCategories(data?.categories);
      setPageSize(data?.numberOfPages);
    }
    if (isError) {
      toast.error('Something went wrong! Please try again.');
    }
  }, [isError, data, pages]);

  return (
    <>
      <section className="g-body">
        <div className="container">
          {isError && toast.error('Something went wrong! Please try again.')}
          {isLoading && <Spinner />}
          {data &&
            categories.map((category) => (
              <div
                className="card-g"
                onClick={() => navigate(`/gallery?id=${category._id}`)}
                key={`${category._id}`}
              >
                <div className="content">
                  <div className="imgbx">
                    <img
                      src={category.posterPhotoURL}
                      alt="Team 1"
                      width="320px"
                      height="320px"
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <div className="contentbx">
                    <h3>
                      {category.categoryName}
                      <br />
                      <span>{category.dateOfBirth}</span>
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

export default HomePage;

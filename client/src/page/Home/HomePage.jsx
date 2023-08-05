import './style.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';

import { useGetAllCategoryQuery } from '../../slice/api/categoryApiSlice';

const HomePage = () => {
  const navigate = useNavigate();

  const { data, isError, isLoading } = useGetAllCategoryQuery('allCategory', {
    pollingInterval: 60000 * 5,
  });

  // console.log(data);
  // console.log(isError);
  // console.log(isLoading);

  return (
    <>
      <section className="g-body">
        <div className="container">
          {isError && toast.error('Something went wrong! Please try again.')}
          {isLoading && <Spinner />}
          {data &&
            data?.categories?.map((category) => (
              <div
                className="card-g"
                onClick={() => navigate(`/gallery/${category._id}`)}
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
    </>
  );
};

export default HomePage;

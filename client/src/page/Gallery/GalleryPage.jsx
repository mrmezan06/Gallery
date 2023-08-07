import './style.css';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';
import { useGetAllPhotosByItsCategoryMutation } from '../../slice/api/photoApiSlice';
import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

const GalleryPage = () => {
  const [getAllPhotosByItsCategory, { data, isError, isLoading }] =
    useGetAllPhotosByItsCategoryMutation();

  const navigate = useNavigate();

  const location = useLocation();
  let id = location.search.split('=')[1];

  useEffect(() => {
    getAllPhotosByItsCategory(id);
    if (isError) {
      toast.error('Something went wrong! Please try again.');
    }
  }, [isError, id, getAllPhotosByItsCategory]);

  return (
    <>
      <section className="g-body">
        <div className="container">
          {isLoading && <Spinner />}
          {data &&
            data?.photos?.map((photo) => (
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
    </>
  );
};

export default GalleryPage;

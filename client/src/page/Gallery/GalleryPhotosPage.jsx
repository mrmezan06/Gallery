import './style.css';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';
import { useGetAllPhotosQuery } from '../../slice/api/photoApiSlice';
import { useEffect } from 'react';

const GalleryPhotosPage = () => {
  const { data, isError, isLoading } = useGetAllPhotosQuery('AllPhotos', {
    pollingInterval: 60000 * 5,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong! Please try again.');
    }
  }, [isError]);

  return (
    <>
      <section className="g-body">
        <div className="container">
          {isLoading && <Spinner />}
          {data &&
            data?.photos?.map((photo) => (
              <div className="card-g" key={photo._id}>
                <div className="content">
                  <div className="imgbx">
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

export default GalleryPhotosPage;

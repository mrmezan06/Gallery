import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const SinglePhotoPage = () => {
  const [images, setImages] = useState([]);

  const location = useLocation();
  console.log(location.pathname.split('/')[2]);
  const id = location.pathname.split('/')[2];

  const fetchImage = async (id) => {
    const { data } = await axios.get(
      `http://localhost:5000/api/photo/single/${id}`
    );

    setImages(data?.photo.relatedPhotos);
    console.log(data?.photo.relatedPhotos);
  };

  useEffect(() => {
    fetchImage(id);
  }, [id]);

  return (
    <>
      {images.length !== 0 && (
        <ImageGallery
          items={images}
          style={{
            marginTop: '10px',
            marginBottom: '10px',
          }}
        />
      )}
    </>
  );
};

export default SinglePhotoPage;

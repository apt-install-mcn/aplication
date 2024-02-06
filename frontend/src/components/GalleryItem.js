import React from 'react';

const GalleryItem = ({ imageUrl, galleryImage }) => (
  <a data-fancybox="gallery" href={process.env.PUBLIC_URL + imageUrl} className="mb-4 col-md-6 gallery-item">
    <img src={process.env.PUBLIC_URL + galleryImage} alt="" className="gallery-img" />
  </a>
);

export default GalleryItem;
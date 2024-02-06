import React from 'react';
import GalleryItem from './GalleryItem';

const Gallery = () => (
  <div className="row">
        <GalleryItem imageUrl="/img/album1.jpg" galleryImage="/img/galeria2.png" />
    <GalleryItem imageUrl="/img/album2.jpg" galleryImage="/img/footer2.png" />
    <GalleryItem imageUrl="/img/album3.jpg" galleryImage="/img/footer3.png" />
    <GalleryItem imageUrl="/img/album4.jpg" galleryImage="/img/footer4.png" />
    <GalleryItem imageUrl="/img/album5.jpg" galleryImage="/img/footer5.png" />
    <GalleryItem imageUrl="/img/album6.jpg" galleryImage="/img/footer6.png" />
    <GalleryItem imageUrl="/img/album7.jpg" galleryImage="" /> {/* Puedes dejar estos elementos en blanco si es necesario */}
    <GalleryItem imageUrl="/img/album8.jpg" galleryImage="" />
    <GalleryItem imageUrl="/img/album9.jpg" galleryImage="" />
  </div>
);

export default Gallery;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styles from "./Gallery.module.css";

import { useEffect, useState } from "react";

const Gallery = ({ images }) => {
  const [galleryImages, setGalleryImages] = useState([]);
  useEffect(() => {
    setGalleryImages(images);
  }, [images]);

  return (
    <>
      {galleryImages.map((img, index) => (
        <img className={styles.galleryImages} key={index} src={img} alt="image" loading="lazy" />
      ))}
    </>
  );
};

export default Gallery;

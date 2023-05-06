import React, { useState } from "react";

const DetailsImage = ({ image, image1, image2, image3, image4 }) => {
  const [viewImage, setViewImage] = useState(true);
  const [mainImage, setMainImage] = useState();

  const clickImage = (e) => {
    setViewImage(false);
    setMainImage(e);
  };

  return (
    <>
      <div className="main_div detail_image">
        <div className="image_box">
          <figure className="figure_box">
            <img
              src={image1}
              alt="detail image"
              className="boxes_image"
              onMouseOver={() => clickImage(image1)}
            />
          </figure>
          <figure className="figure_box">
            <img
              src={image2}
              alt="detail image"
              className="boxes_image"
              onMouseOver={() => clickImage(image2)}
            />
          </figure>
          <figure className="figure_box">
            <img
              src={image3}
              alt="detail image"
              className="boxes_image"
              onMouseOver={() => clickImage(image3)}
            />
          </figure>
          <figure className="figure_box">
            <img
              src={image4}
              alt="detail image"
              className="boxes_image"
              onMouseOver={() => clickImage(image4)}
            />
          </figure>
        </div>
        <div className="main_image">
          <img
            src={viewImage ? image : mainImage}
            alt="image"
            className="boxes_image"
          />
        </div>
      </div>
    </>
  );
};

export default DetailsImage;

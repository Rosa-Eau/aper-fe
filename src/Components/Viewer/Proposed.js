import React from 'react'
import './Proposed.css'

const Proposed = () => {
  // Define an array of image sources and classNames
  const images = [
    { src: "/images/im1.jpg", className: "pic-fieldprof-11-icon-i" },
    { src: "/images/im1.jpg", className: "pic-fieldprof-15-icon1-i" },
    { src: "/images/im1.jpg", className: "pic-fieldprof-14-icon-i" },
    { src: "/images/im1.jpg", className: "pic-fieldprof-02-icon-i" },
    { src: "/images/im1.jpg", className: "pic-fieldprof-02-icon-i" },
    { src: "/images/im1.jpg", className: "pic-fieldprof-16-icon-i" }
  ];

  return (
    <div className="field-list-img-group-i">
    
      {images.map((image, index) => (
        <div key={index} className={`field-list-i-img${index + 6}`}>
         
          <img
            className={image.className}
            loading="lazy"
            alt=""
            src={image.src}
          />
        </div>
      ))}
    </div>
  );
};

export default Proposed;
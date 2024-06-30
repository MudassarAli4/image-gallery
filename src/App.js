import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import "./App.css";

const ImageGalleryWithNavbar = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("home");

  useEffect(() => {
    fetchImages(selectedCategory);
  }, [selectedCategory]);

  const fetchImages = async (category) => {
    try {
      const accessKey = "A143xdC8z_rcaEjyn99bIdM9WugzRF4pmIgnwpcJjZg";
      const halfWidth = 2560;
      const halfHeight = 1440;
      let apiUrl = `https://api.unsplash.com/photos/random?count=28&client_id=${accessKey}&orientation=landscape&w=${halfWidth}&h=${halfHeight}`;

      if (category !== "home") {
        apiUrl += `&query=${category}`;
      }

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();
      const fetchedImages = data.map((image) => ({
        id: image.id,
        src: image.urls.regular,
        alt: image.alt_description,
        download: image.links.download,
      }));

      setImages(fetchedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const openPopup = (image) => {
    setSelectedImage(image);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const downloadImage = (imageUrl) => {
    fetch(imageUrl, {
      method: "GET",
      headers: {
        "Content-Type": "image/jpeg",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.jpg");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  const categories = [
    "home",
    "nature",
    "cars",
    "bikes",
    "people",
    "art",
    "sports",
    "travel",
    "fitness",
    "cityscapes",
    "technology",
    "music",
  ];

  return (
    <div className="image-gallery-container">
      <header>
        <h1 className="site-title">Image Gallery</h1>
      </header>

      <nav className="navbar">
        <ul className="navbar-list">
          {categories.map((category) => (
            <li
              key={category}
              className={`navbar-item ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </li>
          ))}
        </ul>
      </nav>

      <div className="gallery">
        {images.map((image) => (
          <LazyLoad key={image.id} height={200} offset={100}>
            <div className="gallery-item">
              <img
                className="gallery-image"
                src={image.src}
                alt={image.alt}
                onClick={() => openPopup(image)}
              />
              <button
                className="download-button"
                onClick={() => downloadImage(image.src)}
              >
                <FontAwesomeIcon icon={faDownload} />
              </button>
            </div>
          </LazyLoad>
        ))}
      </div>
      {selectedImage && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="popup-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGalleryWithNavbar;

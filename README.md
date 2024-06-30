# Image Gallery

An image gallery built with React that fetches images from the Unsplash API. The gallery is categorized and includes a responsive navbar. Users can view images in a popup and download them directly.

## Features

- Fetches random images from the Unsplash API.
- Categorized images: Home, Nature, Cars, Bikes, People, Art, Sports, Travel, Fitness, Cityscapes, Technology, Music.
- Responsive navbar with active state indication.
- Lazy loading for images to improve performance.
- Popup view for images with a close button.
- Download button on each image for saving the image.

## Demo
Check out the live demo https://mudassarali4.github.io/image-gallery/ 

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/MudassarAli4/image-gallery.git
    ```

2. Navigate to the project directory:
    ```sh
    cd image-gallery
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

4. Start the development server:
    ```sh
    npm start
    ```

## Usage

- The homepage displays a mix of random images.
- Click on any category in the navbar to filter images based on the selected category.
- Click on an image to view it in a popup.
- Click the download button on an image to download it.

## Dependencies

- React
- Font Awesome (for download icon)

## API Key

This project uses the Unsplash API. Replace `your_access_key` in `App.js` with your actual Unsplash access key.

```javascript
const accessKey = "your_access_key";


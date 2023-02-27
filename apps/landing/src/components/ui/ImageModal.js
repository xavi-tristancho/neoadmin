import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const ImageModal = ({
  open,
  setOpen,
  setSelectedImage,
  photoIndex,
  imagesList,
  imageTitle,
}) => {
  const prevImg = (photoIndex + imagesList.length - 1) % imagesList.length;
  const nextImg = (photoIndex + 1) % imagesList.length;

  return (
    open && (
      <Lightbox
        mainSrc={imagesList[photoIndex]}
        nextSrc={imagesList[nextImg]}
        prevSrc={imagesList[prevImg]}
        onCloseRequest={() => setOpen(false)}
        onMovePrevRequest={() => setSelectedImage(prevImg)}
        onMoveNextRequest={() => setSelectedImage(nextImg)}
        imageTitle={imageTitle}
      />
    )
  );
};

export default ImageModal;

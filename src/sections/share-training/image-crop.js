import 'react-image-crop/dist/ReactCrop.css';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useCallback, useRef, useState } from 'react';
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import setCanvasPreview from 'src/utils/setCanvasPreview';

const ASPECT_RATIO = 1 / 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({ closeModal, updateAvatar, fileRef }) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState();
  const [error, setError] = useState('');

  const handleAttach = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, []);

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || '';
      imageElement.src = imageUrl;

      imageElement.addEventListener('load', (e) => {
        if (error) setError('');
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError('Image must be at least 150 x 150 pixels.');
          return setImgSrc('');
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: '%',
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height,
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      <Stack justifyContent={'center'} p={3}>
        <Button variant="contained" onClick={handleAttach}>
          Selecionar outra imagem
        </Button>
      </Stack>

      <input type="file" ref={fileRef} style={{ display: 'none' }} onChange={onSelectFile} />
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {imgSrc && (
        <>
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: '70vh' }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <Stack justifyContent={'end'} p={1} direction={'row'} spacing={3} mt={3}>
            <Button variant="outlined">Voltar</Button>
            <Button
              variant="contained"
              onClick={() => {
                setCanvasPreview(
                  imgRef.current, // HTMLImageElement
                  previewCanvasRef.current, // HTMLCanvasElement
                  convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
                );
                const dataUrl = previewCanvasRef.current.toDataURL();
                updateAvatar(dataUrl);
                closeModal();
              }}
            >
              Continuar
            </Button>
          </Stack>
        </>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          style={{
            display: 'none',
            border: '1px solid black',
            objectFit: 'contain',
            width: 150,
            height: 150,
          }}
        />
      )}
    </>
  );
};
export default ImageCropper;
import 'react-image-crop/dist/ReactCrop.css';

import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Compressor from 'compressorjs';
import { useCallback, useRef, useState } from 'react';
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import setCanvasPreview from 'src/utils/setCanvasPreview';
const ASPECT_RATIO = 1 / 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({ closeModal, updateAvatar, fileRef, loading, setLoading }) => {
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

  const onSelectFile = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setImgSrc(imageDataUrl);
    }
  };

  const readFile = useCallback((file) => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        getNormalizedFile(file)
          .then((normalizedFile) => reader.readAsDataURL(normalizedFile))
          .catch((error) => {
            setError(error);
            reject(error);
          });
      } catch (error) {
        setError(error);
        reject(error);
      }
    });
  }, []);

  const getNormalizedFile = (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        maxWidth: 1000,
        maxHeight: 1000,
        success(normalizedFile) {
          resolve(normalizedFile);
        },
        error(error) {
          reject(error);
        },
      });
    });
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
      {loading && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
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
                setLoading(true);
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

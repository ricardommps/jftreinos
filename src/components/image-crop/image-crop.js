import 'react-image-crop/dist/ReactCrop.css';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Compressor from 'compressorjs';
import { useCallback, useRef, useState } from 'react';
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import setCanvasPreview from 'src/utils/setCanvasPreview';

const ASPECT_RATIO = 1 / 1;
const MIN_DIMENSION = 150;
const SCALE = 1;
const ROTATE = 0;

const StyledImage = styled('img')(() => ({
  transform: `scale(${SCALE}) rotate(${ROTATE}deg)`,
  width: 'auto',
  height: 'auto',
}));

const ImageCropper = ({ closeModal, updateAvatar, fileRef, setLoading, handleGoBack }) => {
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
    try {
      setLoading(true);
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        const ext = (
          file.name ? file.name.split('.').pop() : file.path.split('.').pop()
        ).toLowerCase();
        if (ext === 'heic' || ext === 'heif') {
          const heic2any = (await import('heic2any')).default;
          const outputBlob = await heic2any({
            blob: file, // Use the original file object
            toType: 'image/jpeg',
            quality: 0.7, // adjust quality as needed
          });
          const newFile = Object.assign(outputBlob, {
            preview: URL.createObjectURL(outputBlob),
          });
          const imageDataUrl = await readFile(newFile);
          setImgSrc(imageDataUrl);
        } else {
          const newFile = Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
          const imageDataUrl = await readFile(newFile);
          setImgSrc(imageDataUrl);
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log('--error-', error);
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
          console.log('-Compressor--error---', error);
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
      <Stack justifyContent={'center'} p={2}>
        <Button variant="contained" onClick={handleAttach}>
          {!imgSrc ? 'Selecione uma image' : ' Selecionar outra imagem'}
        </Button>
      </Stack>
      <input
        type="file"
        accept="image/*, .heic"
        ref={fileRef}
        style={{ display: 'none' }}
        onChange={onSelectFile}
      />

      {error && <p className="text-red-400 text-xs">{error}</p>}
      {!imgSrc && (
        <Stack justifyContent={'end'} p={1} direction={'row'} spacing={3} mt={3}>
          <Button variant="outlined" onClick={handleGoBack}>
            Cancelar
          </Button>
        </Stack>
      )}
      {imgSrc && (
        <>
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <StyledImage ref={imgRef} src={imgSrc} alt="Upload" onLoad={onImageLoad} />
          </ReactCrop>

          <Stack justifyContent={'end'} p={1} direction={'row'} spacing={3} mt={3}>
            <Button variant="outlined" onClick={handleGoBack}>
              Cancelar
            </Button>
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

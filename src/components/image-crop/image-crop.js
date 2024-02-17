import 'react-image-crop/dist/ReactCrop.css';

import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Compressor from 'compressorjs';
import { useCallback, useRef, useState } from 'react';
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import setCanvasPreview from 'src/utils/setCanvasPreview';

import Iconify from '../iconify';
import { UploadBox } from '../upload';

const ASPECT_RATIO = 1 / 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({ closeModal, updateAvatar, fileRef, loading, setLoading, handleGoBack }) => {
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

  const handleDropSingleFile = async (acceptedFiles) => {
    try {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
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
      }
    } catch (error) {
      console.log('--error-', error);
    }
  };

  const onSelectFile = async (e) => {
    try {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        const imageDataUrl = await readFile(file);
        setImgSrc(imageDataUrl);
      }
    } catch (error) {
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
      {loading && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      {false && (
        <Stack justifyContent={'center'} p={2}>
          <Button variant="contained" onClick={handleAttach}>
            {!imgSrc ? 'Selecione uma image' : ' Selecionar outra imagem'}
          </Button>
        </Stack>
      )}

      <Stack>
        <UploadBox
          onDrop={handleDropSingleFile}
          placeholder={
            <Stack spacing={0.5} alignItems="center" sx={{ color: 'text.disabled' }}>
              <Iconify icon="eva:cloud-upload-fill" width={40} />
              <Typography variant="body2">
                {' '}
                {!imgSrc ? 'Selecione uma image New' : ' Selecionar outra imagem new'}
              </Typography>
            </Stack>
          }
          sx={{
            mb: 3,
            py: 2.5,
            width: 'auto',
            height: 'auto',
            borderRadius: 1.5,
          }}
        />
      </Stack>
      {false && (
        <input
          type="file"
          accept="image/*, .heic"
          ref={fileRef}
          style={{ display: 'none' }}
          onChange={onSelectFile}
        />
      )}

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
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: '60vh' }}
              onLoad={onImageLoad}
            />
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

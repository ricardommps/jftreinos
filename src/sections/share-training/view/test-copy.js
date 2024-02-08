'use client';

import 'react-image-crop/dist/ReactCrop.css';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { asUploadButton } from '@rpldy/upload-button';
import UploadPreview, { PREVIEW_TYPES } from '@rpldy/upload-preview';
import Uploady, {
  useItemFinalizeListener,
  useItemStartListener,
  withRequestPreSendUpdate,
} from '@rpldy/uploady';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import ReactCrop from 'react-image-crop';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image/image';
import cropImage from 'src/utils/cropImage';
import exportAsImage from 'src/utils/export-as-image';
import styled from 'styled-components';

const DivUploadButton = asUploadButton(
  forwardRef((props, ref) => (
    <Button {...props} variant="contained" sx={{ width: '50%' }}>
      Escolher imagem
    </Button>
  )),
);

const StyledReactCrop = styled(ReactCrop)`
  width: 100%;
  max-width: 900px;
  height: 400px;
  max-height: 400px;
`;

const PreviewButtons = ({ finished, crop, updateRequest, onUploadCancel, onUploadCrop }) => {
  return (
    <Stack spacing={2}>
      <Button
        onClick={onUploadCrop}
        variant="outlined"
        sx={{ display: !finished && updateRequest && crop ? 'block' : 'none' }}
      >
        {' '}
        Upload Cropped
      </Button>

      <Button
        onClick={onUploadCancel}
        variant="outlined"
        sx={{ display: !finished && updateRequest && crop ? 'block' : 'none' }}
      >
        Cancel
      </Button>
    </Stack>
  );
};

const UPLOAD_STATES = {
  NONE: 0,
  UPLOADING: 1,
  FINISHED: 2,
};

const ItemPreviewWithCrop = withRequestPreSendUpdate((props) => {
  const { id, url, isFallback, type, updateRequest, requestData, previewMethods } = props;
  const [uploadState, setUploadState] = useState(UPLOAD_STATES.NONE);
  const [crop, setCrop] = useState({
    unit: '%', // Can be 'px' or '%'
    x: 10,
    y: 10,
    width: 50,
    height: 50,
  });

  const [croppedUrl, setCroppedUrl] = useState('/assets/banners/banner-run.jpg');
  const isFinished = uploadState === UPLOAD_STATES.FINISHED;
  const imgRef = useRef(null);
  const exportRef = useRef();

  useItemStartListener(() => setUploadState(UPLOAD_STATES.UPLOADING), id);
  useItemFinalizeListener(() => setUploadState(UPLOAD_STATES.FINISHED), id);

  const onUploadCrop = useCallback(async () => {
    if (updateRequest && (crop?.height || crop?.width)) {
      const {
        blob: croppedBlob,
        blobUrl,
        revokeUrl,
      } = await cropImage(imgRef.current, requestData.items[0].file, crop, true);

      requestData.items[0].file = croppedBlob;

      updateRequest({ items: requestData.items });
      setCroppedUrl({ blobUrl, revokeUrl });
    }
  }, [requestData, updateRequest, crop]);

  const onUploadCancel = useCallback(() => {
    updateRequest(false);
    if (previewMethods.current?.clear) {
      previewMethods.current.clear();
    }
  }, [updateRequest, previewMethods]);

  useEffect(() => () => croppedUrl?.revokeUrl(), [croppedUrl]);

  return isFallback || type !== PREVIEW_TYPES.IMAGE ? (
    <Image
      src={url}
      alt="fallback img"
      style={{ alignItems: 'center', justifyContent: 'center' }}
    />
  ) : (
    <>
      {requestData && !isFinished ? (
        <StyledReactCrop crop={crop} onChange={setCrop}>
          <img src={url} ref={imgRef} className="react-crop-img" />
        </StyledReactCrop>
      ) : (
        <>
          <div ref={exportRef}>
            <Stack spacing={0.5} direction="row">
              <Stack flexGrow={1} sx={{ position: 'relative' }}>
                <Stack
                  direction="row"
                  sx={{
                    top: 3,
                    left: 0,
                    zIndex: 9,
                    position: 'absolute',
                    p: '2px 6px 2px 4px',
                    color: 'common.white',
                    typography: 'h6',
                    justifyContent: 'left',
                    textAlign: 'left',
                  }}
                  spacing={1}
                >
                  <Iconify icon={'carbon:running'} width={20} />
                  <Typography width={300} fontWeight={'bold'}>
                    Florianópolis Corrida
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{
                    transform: 'rotate(90deg)',
                    top: 14,
                    right: -19,
                    zIndex: 9,
                    bgcolor: 'grey.800',
                    position: 'absolute',
                    p: '2px 6px 2px 4px',
                    color: 'common.white',
                    typography: 'subtitle2',
                  }}
                >
                  <Image
                    disabledEffect
                    alt={'home'}
                    src={`/assets/logo/logo-crop.png`}
                    style={{ width: 'auto', height: 60 }}
                    width={'auto'}
                  />
                </Stack>
                <Stack
                  direction="column"
                  alignItems="center"
                  sx={{
                    bottom: 30,
                    right: 4,
                    zIndex: 9,
                    borderRight: '2px dotted',
                    position: 'absolute',
                    p: '2px 6px 2px 4px',
                    color: 'common.white',
                    typography: 'h6',
                    justifyContent: 'end',
                    textAlign: 'end',
                    width: 130,
                  }}
                  spacing={0.5}
                >
                  <Stack>
                    <Typography width={100} fontWeight={'bold'}>
                      5,02Km
                    </Typography>
                    <Typography width={100} fontWeight={'bold'}>
                      DISTÂNCIA
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography width={100} fontWeight={'bold'}>
                      30:50
                    </Typography>
                    <Typography width={100} fontWeight={'bold'}>
                      TEMPO
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography width={100} fontWeight={'bold'}>
                      6:08/KM
                    </Typography>
                    <Typography width={100} fontWeight={'bold'}>
                      RITMO
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  sx={{
                    bottom: 2,
                    left: 0,
                    zIndex: 9,
                    position: 'absolute',
                    p: '2px 6px 2px 4px',
                    color: 'common.white',
                    typography: 'h6',
                    justifyContent: 'left',
                    textAlign: 'left',
                    width: 130,
                  }}
                >
                  <Typography width={300} fontWeight={'bold'}>
                    6 de fev de 2024 19:37 Florianópolis
                  </Typography>
                </Stack>
                <Image alt={'Placeholder'} src={croppedUrl?.blobUrl || url} ratio="1/1" />
              </Stack>
            </Stack>
          </div>
          <Stack pt={3}>
            <Button onClick={() => exportAsImage(exportRef.current, 'screenshot')}>
              Gerar imagem
            </Button>
          </Stack>
        </>
      )}
      <PreviewButtons
        finished={isFinished}
        crop={crop}
        updateRequest={updateRequest}
        onUploadCancel={onUploadCancel}
        onUploadCrop={onUploadCrop}
      />
    </>
  );
});

export default function ShareTrainingView() {
  const previewMethodsRef = useRef();

  return (
    <Uploady multiple={false} destination={{ url: '[upload-url]' }}>
      <Stack>
        <UploadPreview
          PreviewComponent={ItemPreviewWithCrop}
          previewComponentProps={{ previewMethods: previewMethodsRef }}
          previewMethodsRef={previewMethodsRef}
          fallbackUrl="https://icon-library.net/images/image-placeholder-icon/image-placeholder-icon-6.jpg"
        />
        <Stack alignItems={'center'}>
          <DivUploadButton />
        </Stack>
      </Stack>
    </Uploady>
  );
}

import Image from 'src/components/image/image';

import Logo from '../logo';
export default function GymTemplate1({ isThumbnail, urlImage }) {
  return (
    <>
      <Logo isThumbnail={isThumbnail} />
      <Image
        src={urlImage}
        alt="Preview"
        style={{ alignItems: 'center', justifyContent: 'center' }}
      />
    </>
  );
}

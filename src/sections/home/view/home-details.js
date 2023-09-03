'use client';
import { useParams } from 'next/navigation';

import ProgramDetails from '../program/program-details';
export default function HomeDetailsView() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <ProgramDetails />
    </>
  );
}

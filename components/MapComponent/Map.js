import dynamic from 'next/dynamic';
import { Spinner } from '@nextui-org/react';

const Map = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () =>
    <div className="flex items-center justify-center h-screen w-full md:w-2/3">
      <Spinner size='large' />
    </div>
});

export default Map;
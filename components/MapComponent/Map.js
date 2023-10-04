import dynamic from 'next/dynamic';
import { Spinner } from '@nextui-org/react';

const Map = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () =>
    <div className="hidden md:flex" style={{ height: '100vh', width: '66.66667vw', alignItems: 'center', justifyContent: 'center' }}>
      <Spinner size='large' />
    </div>
});

export default Map;
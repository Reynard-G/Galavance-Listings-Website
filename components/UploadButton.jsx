import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Dashboard } from '@uppy/react';
import { createUppy } from '@lib/UppyUtils';

const UploadButton = ({ plot, setImages }) => {
  const [uppy] = useState(() => createUppy(plot));

  uppy.on('upload-success', (file, response) => {
    const fileName = file.name;
    setImages(fileName);
  });

  return (
    <>
      <Dashboard
        uppy={uppy}
        locale={{
          strings: {
            dropHereOr: 'Drop here or %{browse}',
            browse: 'browse'
          }
        }}
        showProgressDetails={true}
        proudlyDisplayPoweredByUppy={false}
        note='Images only, up to 5 MB'
        theme="dark"
        height={350}
        width='100%'
        className='col-span-full'
      />
    </>
  );
};

export default dynamic(() => Promise.resolve(UploadButton), {
  ssr: false
});
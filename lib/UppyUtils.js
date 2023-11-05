import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/informer/dist/style.min.css';

import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import Informer from '@uppy/informer';
import Compressor from '@uppy/compressor';
import GoldenRetriever from '@uppy/golden-retriever';
import AwsS3 from '@uppy/aws-s3';

export function createUppy(plot) {
  const uppy = new Uppy({
    id: plot,
    debug: true,
    allowMultipleUploadBatches: false,
    restrictions: {
      maxFileSize: 5242880, // 5 MB
      allowedFileTypes: ['image/jpeg', 'image/png', 'image/webp']
    },
    // Rename file to prevent overwriting
    onBeforeFileAdded: (currentFile) => {
      const timestamp = Date.now();
      const modifiedName = `${currentFile.name.split('.').slice(0, -1).join('.')}_${timestamp}.${currentFile.name.split('.').pop()}`;
      
      Object.defineProperty(currentFile.data, 'name', {
        writable: true,
        value: modifiedName,
      });

      return { ...currentFile, name: modifiedName, meta: { ...currentFile.meta, name: modifiedName }};
    }
  })
    .use(Dashboard)
    .use(Informer)
    .use(Compressor, {
      quality: 0.8,
      mimeType: 'image/webp',
    })
    .use(GoldenRetriever)
    .use(AwsS3, {
      shouldUseMultipart: false,
      async getUploadParameters(file) {
        return fetch('/api/s3', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            return {
              method: 'PUT',
              url: data.url,
              fields: [],
              headers: { 'Content-Type': file.type },
            };
          });
      },
    });

  return uppy;
}
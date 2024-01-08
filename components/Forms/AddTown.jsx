import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';

import ErrorModal from '@components/Modals/ErrorModal';

const AddTown = () => {
  const router = useRouter();
  const [townName, setTownName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConflictModalVisible, setIsConflictModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const res = await fetch('/api/town', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ townName })
    });

    if (res.ok) {
      router.reload();
    } else if (res.status === 409) {
      setIsConflictModalVisible(true);
    } else {
      setIsErrorModalVisible(true);
    }

    setIsSubmitting(false);
  }

  return (
    <>
      <Head>
        <title>HFR Admin | Add Towns</title>
        <meta name="og:title" content="HFR Admin | Add Towns" />
        <meta property="og:description" content="Add towns through the HFR Admin Dashboard." />
        <meta name="description" content="Add towns through the HFR Admin Dashboard." />
      </Head>

      <ErrorModal
        visible={isErrorModalVisible}
        title="Error"
        onConfirmed={() => setIsErrorModalVisible(false)}
      >
        An error occurred while trying to add the town. Check to see if any
        restrictions are being violated and try again. If the problem persists,
        contact administration.
      </ErrorModal>

      <ErrorModal
        visible={isConflictModalVisible}
        title="Add Town"
        buttonText="Add"
        onConfirmed={() => setIsConflictModalVisible(false)}
      >
        A town with the name <b>{townName}</b> already exists. If you are trying to
        edit the town, go to the edit page instead.
      </ErrorModal>

      <div className="space-y-4 w-full sm:w-3/4 md:w-1/2 p-4 mx-auto">
        <div>
          <h1 className="text-2xl font-bold">Add a Town</h1>
          <p className="text-neutral-500">Fill out the form below to add a new town.</p>
        </div>

        <Divider />

        <div className="grid grid-flow-row auto-rows-auto gap-4">
          <Input
            type="text"
            label="Town Name"
            value={townName}
            placeholder="Enter the name of the town"
            variant="faded"
            isRequired
            onValueChange={setTownName}
          />

          <Button
            color="primary"
            variant="shadow"
            className="col-span-full"
            disabled={isSubmitting}
            onPress={handleSubmit}
          >
            Add Town
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddTown;
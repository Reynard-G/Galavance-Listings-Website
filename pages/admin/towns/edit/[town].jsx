import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';

import AdminNavbar from '@components/AdminNavbar';
import ErrorModal from '@components/Modals/ErrorModal';

const EditTown = ({ town }) => {
  const router = useRouter();
  const [name, setName] = useState(town[0].name);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isConflictModalVisible, setIsConflictModalVisible] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const res = await fetch(`/api/town`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: town[0].id, name }),
    });

    if (res.ok) {
      router.push('/admin/towns');
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
        <title>HFR Admin | Edit Town</title>
        <meta name="og:title" content="HFR Admin | Edit Town" />
        <meta property="og:description" content="Edit towns through the HFR Admin Dashboard." />
        <meta name="description" content="Edit towns through the HFR Admin Dashboard." />
      </Head>

      <ErrorModal
        visible={isErrorModalVisible}
        title="Error"
        onConfirmed={() => setIsErrorModalVisible(false)}
      >
        An error occurred while trying to edit the town. Check to see if any
        restrictions are being violated and try again. If the problem persists,
        contact administration.
      </ErrorModal>

      <ErrorModal
        visible={isConflictModalVisible}
        title="Conflict"
        onConfirmed={() => setIsConflictModalVisible(false)}
      >
        A town with that name already exists. Please choose a different name.
      </ErrorModal>

      <AdminNavbar />

      <div className="space-y-4 w-full sm:w-3/4 md:w-1/2 p-4 mx-auto">
        <div>
          <h1 className="text-2xl font-bold">Edit Town</h1>
          <p className="text-gray-500">Fill out the form below to edit a town.</p>
        </div>

        <Divider />

        <div className="space-y-4">
          <Input
            label="Town Name"
            type="text"
            variant="faded"
            placeholder="Enter the name of the town"
            isRequired
            isInvalid={name.length < 1}
            defaultValue={town[0].name}
            onValueChange={setName}
          />

          <Button
            className="w-full"
            size="md"
            color="primary"
            variant="shadow"
            isDisabled={name.length < 1}
            isLoading={isSubmitting}
            onPress={handleSubmit}
          >
            Edit Town
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditTown;

import sql from '@lib/db';

export async function getStaticPaths() {
  const towns = await sql`
    SELECT id FROM towns
  `;

  const paths = towns.map((town) => ({
    params: { town: town.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const rows = await sql`
    SELECT *,
      EXTRACT(epoch FROM created_at) as created_at
    FROM towns
    WHERE id = ${params.town}
  `;

  if (!rows[0]) {
    return { notFound: true };
  }

  return {
    props: {
      town: rows,
    },
  };
}
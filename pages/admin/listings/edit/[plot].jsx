import { useRouter } from 'next/router';

const EditListing = () => {
  const router = useRouter();
  const { plot } = router.query;

  return (
    <p>Edit Listings for {plot}</p>
  );
};

export default EditListing;
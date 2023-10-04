import { useRouter } from 'next/router';

const Property = () => {
  const router = useRouter();
  const { plot } = router.query;

  return <p>Property: {plot}</p>;
};

export default Property;
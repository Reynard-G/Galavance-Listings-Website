import NextImage from 'next/image';
import { Image } from '@nextui-org/image';
import { Link } from '@nextui-org/link';
import { Navbar } from '@nextui-org/navbar';

const PropertyNavbar = () => {
  return (
    <Navbar disableAnimation isBordered className="flex">
      <div className="flex gap-4 m-auto">
        <Link color="foreground" href="/">
          <Image as={NextImage} src="/hamilton-realty.png" width={32} height={32} alt="Hamilton Family Realty Logo" className="rounded-none" />
          <p className="font-bold text-inherit ml-2">Hamilton Family Realty</p>
        </Link>
      </div>
    </Navbar >
  );
};

export default PropertyNavbar;
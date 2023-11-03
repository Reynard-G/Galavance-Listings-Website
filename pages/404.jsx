import { Kanit } from "next/font/google";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import Background404 from "@components/Svg/Background404";

const kanit = Kanit({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

const Custom404 = () => {
  return (
    <div className={kanit.className}>
      <div className="py-20 px-4 bg-zinc-950 min-h-screen">
        <div className="relative max-w-4xl mx-auto">
          <Background404 classNames="absolute inset-0 opacity-75 text-zinc-800" />
          <div className="relative z-10 pt-28 sm:pt-52">
            <h3 className="text-center text-3xl font-extrabold leading-9 text-neutral-300 sm:text-4xl sm:leading-10">
              Nothing to see here
            </h3>
            <p className="max-w-xl mx-auto mt-4 text-center text-xl leading-7 text-neutral-500">
              The page you are trying to open does not exist. You may have mistyped the address, or the
              page may have been moved. If you think this is an error, please contact us.
            </p>
            <Button
              className="flex justify-center w-full max-w-xs mx-auto mt-8"
              as={Link}
              href="/"
              showAnchorIcon
              size="lg"
              radius="sm"
              color="primary"
              variant="shadow"
            >
              Take me back home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
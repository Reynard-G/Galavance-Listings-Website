import { useState } from 'react';
import NextImage from "next/image";
import { Card } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Spacer } from '@nextui-org/spacer';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Checkbox } from '@nextui-org/checkbox';

import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-1/3 p-5">
        <div className="flex justify-center">
          <Image
            as={NextImage}
            src="/hamilton-realty.png"
            alt="HFR Logo"
            width={128}
            height={128}
            isBlurred
            className="mx-auto"
          />
        </div>
        <Spacer y={5} />
        <h2 className="text-2xl font-bold text-center">HFR Admin Login</h2>
        <Input
          isClearable
          placeholder="Username"
          variant="underlined"
          startContent={<BadgeRoundedIcon />}
        />
        <Spacer y={1} />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          variant="underlined"
          startContent={<LockRoundedIcon />}
          endContent={
            <button className="focus:outline-none" onClick={toggleVisibility}>
              {showPassword
                ? <VisibilityRoundedIcon onClick={() => setShowPassword(!showPassword)} />
                : <VisibilityOffRoundedIcon onClick={() => setShowPassword(!showPassword)} />}
            </button>
          }
        />
        <Spacer y={2} />
        <Checkbox color="primary">Remember Me</Checkbox>
        <Spacer y={5} />
        <Button
          color="primary"
          variant="shadow"
          fullWidth
        >
          Login
        </Button>
      </Card>
    </div>
  );
};
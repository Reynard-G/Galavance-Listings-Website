import NextImage from "next/image";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const toggleVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, remember })
    }).then(res => {
      if (res.ok) router.push('/admin');
      else setLoading(false), setInvalidUsername(true), setInvalidPassword(true);
    });
  };

  useEffect(() => {
    router.prefetch('/admin');
    const checkAuth = async () => {
      const res = await fetch('/api/auth');
      if (res.ok) router.push('/admin');
    };

    checkAuth();
  }, [router]);

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') setLoading(true), handleLogin();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full md:w-1/3 p-5">
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
          isRequired
          label="Username"
          placeholder="Username"
          variant="underlined"
          startContent={<BadgeRoundedIcon />}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setInvalidUsername(false);
          }}
          isInvalid={invalidUsername}
          errorMessage={invalidUsername && "Incorrect username or password"}
          onKeyDown={handleEnterKeyPress}
        />
        <Spacer y={3} />
        <Input
          isRequired
          label="Password"
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
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setInvalidPassword(false);
          }}
          isInvalid={invalidPassword}
          errorMessage={invalidPassword && "Incorrect username or password"}
          onKeyDown={handleEnterKeyPress}
        />
        <Spacer y={2} />
        <Checkbox color="primary" isSelected={remember} onValueChange={setRemember}>Remember me</Checkbox>
        <Spacer y={5} />
        <Button
          color="primary"
          variant="shadow"
          fullWidth
          isLoading={loading}
          onClick={() => {
            setLoading(true);
            handleLogin();
          }}>
          Login
        </Button>
      </Card>
    </div>
  );
};

export default Login;
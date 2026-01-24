import Image from "next/image";
import Link from "next/link";
import WhiteLogo from "@/public/logo-white.png";
import GreenLogo from "@/public/logo-green.png";

interface ILogoProps {
  isGreen?: boolean;
}

const Logo = ({ isGreen = false }: ILogoProps) => {
  return (
    <Link href="/">
      <Image src={isGreen ? GreenLogo : WhiteLogo} alt="CycUp Logo" />
    </Link>
  );
};

export default Logo;

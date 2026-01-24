import { FooterSVG } from "@/components/icons";
import { Icon } from "../atoms";
import { footerLinks } from "@/config/constants";
import { Copyright, FooterItem, Logo } from "../molecules";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col bg-primary relative">
      <Icon className="relative w-full h-[55px]">
        <FooterSVG width="100%" heigth="100%" />
      </Icon>
      <div className="pt-8 w-full flex justify-around items-start">
        {footerLinks.map((item, index) => {
          if (index === 0) {
            return (
              <div className="flex flex-col gap-20" key={index}>
                <FooterItem item={item} key={item.title} />
                <Logo isGreen />
              </div>
            );
          } else {
            return <FooterItem item={item} key={index} />;
          }
        })}
      </div>
      <Copyright />
    </footer>
  );
};

export default Footer;

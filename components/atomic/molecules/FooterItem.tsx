import Link from "next/link";
import { Text } from "../atoms";

interface IFooterItemProsp {
  item: {
    title: string;
    links: {
      title: string;
      link: string;
    }[];
  };
}

const FooterItem = ({ item }: IFooterItemProsp) => {
  return (
    <div className="flex flex-col gap-5">
      <Text type="h4" className="text-white text-sm font-bold">
        {item.title}
      </Text>
      <ul className="flex flex-col gap-2">
        {item.links.map((link) => (
          <li key={link.title}>
            <Link href={link.link} className="text-white text-xs font-normal">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterItem;

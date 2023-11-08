import { Link } from "@nextui-org/link";
import DiscordIcon from "@components/Svg/DiscordIcon";

const DiscordButton = (props) => {
  return (
    <Link href="https://discord.gg/uVF5eNkaZP" target="_blank">
      <DiscordIcon className="discord-icon" {...props} />
    </Link>
  );
}

export default DiscordButton;
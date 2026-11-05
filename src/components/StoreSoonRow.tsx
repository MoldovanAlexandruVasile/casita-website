import { AppleIcon } from "./icons/AppleIcon";
import { PlayIcon } from "./icons/PlayIcon";
import { StoreSoon } from "./StoreSoon";

/** "Coming soon · App Store" and "Coming soon · Google Play", side by side. */
export const StoreSoonRow = () => (
  <div className="flex flex-wrap gap-3">
    <StoreSoon icon={<AppleIcon />} store="App Store" />
    <StoreSoon icon={<PlayIcon />} store="Google Play" />
  </div>
);

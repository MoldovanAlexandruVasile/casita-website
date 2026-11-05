type Props = { size?: number };

/** A play triangle, for the Android store row. */
export const PlayIcon = ({ size = 20 }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M5 3.8v16.4c0 .8.9 1.3 1.6.9l14-8.2c.7-.4.7-1.4 0-1.8l-14-8.2C5.9 2.5 5 3 5 3.8Z" />
  </svg>
);

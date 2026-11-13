type LoopingGifProps = {
  /** Basename under /public/media, shared by the .gif and its still .png. */
  name: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  eager?: boolean;
};

/** Animated GIF that swaps to a still frame for reduced-motion users. */
export default function LoopingGif({
  name,
  alt,
  width,
  height,
  className,
  eager = false,
}: LoopingGifProps) {
  return (
    <picture>
      <source
        srcSet={`/media/${name}.png`}
        media="(prefers-reduced-motion: reduce)"
      />
      <img
        src={`/media/${name}.gif`}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={className}
      />
    </picture>
  );
}

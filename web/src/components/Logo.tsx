import Image from "next/image";

export default function Logo({
  tone = "black",
  className = "",
  priority = false,
}: {
  tone?: "black" | "white";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={`/brand/logo-${tone}.webp`}
      alt="Independent"
      width={2000}
      height={752}
      priority={priority}
      className={`h-auto ${className}`}
    />
  );
}

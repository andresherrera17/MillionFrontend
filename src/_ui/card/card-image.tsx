export function CardImage({ image, name }: { image: string; name: string }) {
  return (
    <img
      alt={name}
      className="w-full h-56 object-cover"
      src={image || "assets/img/no-image-icon.png"}
    />
  );
}

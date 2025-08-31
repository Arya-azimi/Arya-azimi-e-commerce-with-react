interface ProductImageProps {
  imageUrl: string;
  name: string;
}

function ProductImage({ imageUrl }: ProductImageProps) {
  return (
    <div className="md:w-1/2">
      <img src={imageUrl} alt="name" className="w-full rounded-lg shadow-md" />
    </div>
  );
}

export { ProductImage };

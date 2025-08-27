type ErrorProps = {
  message: string;
};

export function Error({ message }: ErrorProps) {
  return (
    <div className="text-center p-8 text-red-500">
      <p>{message}</p>
    </div>
  );
}

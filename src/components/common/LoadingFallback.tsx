interface LoadingFallbackProps {
  message?: string;
}

const LoadingFallback = ({ message = "로딩 중입니다..." }: LoadingFallbackProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-gray6">
      <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue3 border-t-transparent"></div>
      <p className="text-base">{message}</p>
    </div>
  );
};

export default LoadingFallback;

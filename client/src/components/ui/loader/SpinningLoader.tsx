const SpinningLoader = () => {
  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-b-fuchsia-600"></div>
    </div>
  );
};

export default SpinningLoader;

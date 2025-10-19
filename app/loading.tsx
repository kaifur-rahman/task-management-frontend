export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0b0b0b] z-50">
      {/* Progress Bar */}
      <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-[#faa325] animate-loadingBar"></div>
      </div>

      {/* Optional Label */}
      <p className="mt-4 text-white text-sm tracking-wider">
        Loading, please wait...
      </p>
    </div>
  );
}

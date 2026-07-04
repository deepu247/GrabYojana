const Skeleton = () => {
  return (
    <div className="bg-white rounded-xl p-6 border border-stone-100 flex flex-col gap-4 h-full overflow-hidden relative">
      <div className="absolute inset-0 -transtone-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent z-10" />
      
      <div className="h-1 w-full bg-stone-100 rounded-full" />

      <div className="flex gap-2">
        <div className="h-5 w-16 bg-stone-100 rounded-full" />
        <div className="h-5 w-20 bg-stone-100 rounded-full" />
      </div>

      <div className="h-6 w-3/4 bg-stone-100 rounded-lg" />

      <div className="space-y-2 flex-grow">
        <div className="h-3.5 w-full bg-stone-100 rounded" />
        <div className="h-3.5 w-5/6 bg-stone-100 rounded" />
      </div>

      <div className="h-11 w-full bg-stone-100 rounded-xl" />

      <div className="flex gap-3 mt-auto">
        <div className="h-10 flex-1 bg-stone-100 rounded-xl" />
        <div className="h-10 flex-1 bg-stone-100 rounded-xl" />
      </div>
    </div>
  );
};

export default Skeleton;


//componente skeleltor para productos 
export const ProductSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col space-y-4">
                <div className="relative overflow-hidden bg-white/20 rounded-2xl h-80 w-full">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
                <div className="space-y-2">
                    <div className="h-4 bg-white/20 rounded-full w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-white/20 rounded-full w-1/4 animate-pulse"></div>
                </div>
            </div>
        ))}
    </div>
);


//componente skeleltor para blog 
export const BlogSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
            <div key={i} className="bg-white/30 rounded-lg h-60 flex flex-col md:flex-row border border-brand-sand/30 animate-pulse overflow-hidden">
                <div className="w-full md:w-1/2 h-full bg-brand-sand/20"></div>
                <div className="p-6 md:w-1/2 space-y-4">
                    <div className="h-3 bg-brand-sand/30 rounded w-1/4"></div>
                    <div className="h-6 bg-brand-sand/30 rounded w-3/4"></div>
                    <div className="space-y-2">
                        <div className="h-3 bg-brand-sand/20 rounded w-full"></div>
                        <div className="h-3 bg-brand-sand/20 rounded w-full"></div>
                        <div className="h-3 bg-brand-sand/20 rounded w-2/3"></div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

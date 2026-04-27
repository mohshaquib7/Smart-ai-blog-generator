export const Loader = () => {
    return (
        <div className="space-y-8 fade-up" data-testid="blog-loader">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#002FA7] rounded-full animate-pulse" />
                <span className="label-mono">Composing your post</span>
            </div>

            <div className="space-y-4">
                <div className="h-3 bg-zinc-200 w-1/3 pulse-bar" />
                <div className="h-12 bg-zinc-200 w-3/4 pulse-bar" style={{ animationDelay: "0.1s" }} />
                <div className="h-12 bg-zinc-200 w-2/3 pulse-bar" style={{ animationDelay: "0.2s" }} />
            </div>

            <div className="space-y-3 pt-6">
                <div className="h-4 bg-zinc-200 w-full pulse-bar" style={{ animationDelay: "0.3s" }} />
                <div className="h-4 bg-zinc-200 w-full pulse-bar" style={{ animationDelay: "0.35s" }} />
                <div className="h-4 bg-zinc-200 w-5/6 pulse-bar" style={{ animationDelay: "0.4s" }} />
            </div>

            <div className="space-y-3 pt-6">
                <div className="h-6 bg-zinc-200 w-1/2 pulse-bar" style={{ animationDelay: "0.5s" }} />
                <div className="h-4 bg-zinc-200 w-full pulse-bar" style={{ animationDelay: "0.55s" }} />
                <div className="h-4 bg-zinc-200 w-full pulse-bar" style={{ animationDelay: "0.6s" }} />
                <div className="h-4 bg-zinc-200 w-4/5 pulse-bar" style={{ animationDelay: "0.65s" }} />
            </div>

            <div className="space-y-3 pt-6">
                <div className="h-6 bg-zinc-200 w-2/5 pulse-bar" style={{ animationDelay: "0.75s" }} />
                <div className="h-4 bg-zinc-200 w-full pulse-bar" style={{ animationDelay: "0.8s" }} />
                <div className="h-4 bg-zinc-200 w-3/4 pulse-bar" style={{ animationDelay: "0.85s" }} />
            </div>
        </div>
    );
};

export default Loader;

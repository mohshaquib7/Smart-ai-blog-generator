import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowUpRight, Trash, Article } from "@phosphor-icons/react";
import { listBlogs, deleteBlog } from "../services/aiService";
import { formatDate } from "../utils/blog";

export const HistoryPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const load = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await listBlogs();
            setItems(data);
        } catch (e) {
            setError(e?.message || "Failed to load archive");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const remove = async (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await deleteBlog(id);
            setItems((prev) => prev.filter((x) => x.id !== id));
            toast.success("Removed from archive");
        } catch {
            toast.error("Failed to delete");
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12 md:py-16" data-testid="history-page">
            <header className="mb-12 flex items-end justify-between flex-wrap gap-4">
                <div>
                    <span className="label-mono">The Archive</span>
                    <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-none mt-3">
                        Every post,<br />
                        <span className="text-[#002FA7]">cataloged.</span>
                    </h1>
                </div>
                <span className="font-mono-jb text-xs text-zinc-500" data-testid="archive-count">
                    {items.length} {items.length === 1 ? "ENTRY" : "ENTRIES"}
                </span>
            </header>

            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="border border-zinc-200 p-6 h-48 bg-zinc-50 animate-pulse" />
                    ))}
                </div>
            )}

            {!loading && error && (
                <div className="border border-red-200 bg-red-50 p-6 text-red-700 font-ui">
                    {error}
                </div>
            )}

            {!loading && !error && items.length === 0 && (
                <div className="border border-dashed border-zinc-300 p-12 text-center" data-testid="empty-archive">
                    <Article size={32} weight="duotone" className="mx-auto text-zinc-400 mb-4" />
                    <p className="font-display text-xl font-bold mb-2">No drafts yet.</p>
                    <p className="font-ui text-sm text-zinc-500 mb-6">
                        Your first post is one prompt away.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#002FA7] text-white font-display font-bold hover:bg-[#002277] transition-colors"
                        data-testid="empty-archive-cta"
                    >
                        Start writing
                        <ArrowUpRight size={14} weight="bold" />
                    </Link>
                </div>
            )}

            {!loading && items.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="history-grid">
                    {items.map((b) => (
                        <Link
                            key={b.id}
                            to={`/blog/${b.id}`}
                            data-testid={`history-card-${b.id}`}
                            className="group block border border-zinc-200 p-6 bg-white hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:border-zinc-400 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <span className="label-mono">{b.tone} · {b.length}</span>
                                <button
                                    type="button"
                                    onClick={(e) => remove(b.id, e)}
                                    data-testid={`delete-blog-${b.id}`}
                                    className="text-zinc-400 hover:text-red-600 transition-colors"
                                    aria-label="Delete"
                                >
                                    <Trash size={14} weight="bold" />
                                </button>
                            </div>
                            <h3 className="font-display font-bold text-xl tracking-tight leading-tight text-zinc-900 group-hover:text-[#002FA7] transition-colors line-clamp-3 mb-6">
                                {b.title}
                            </h3>
                            <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                                <div className="flex flex-col">
                                    <span className="font-mono-jb text-[10px] text-zinc-500">
                                        {formatDate(b.created_at)}
                                    </span>
                                    <span className="font-mono-jb text-[10px] text-zinc-400 mt-1">
                                        {b.word_count} WORDS
                                    </span>
                                </div>
                                <ArrowUpRight
                                    size={18}
                                    weight="bold"
                                    className="text-zinc-400 group-hover:text-[#002FA7] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HistoryPage;

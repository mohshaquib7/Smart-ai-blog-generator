import { useMemo } from "react";
import { toast } from "sonner";
import {
    Copy,
    DownloadSimple,
    ArrowsClockwise,
    Hash,
    Quotes,
} from "@phosphor-icons/react";
import { blogToMarkdown, downloadAsTxt } from "../utils/blog";

export const BlogOutput = ({ blog, onRegenerate, regenerating }) => {
    const markdown = useMemo(() => blogToMarkdown(blog), [blog]);
    const metaLength = blog.meta_description?.length || 0;

    const copyAll = async () => {
        try {
            await navigator.clipboard.writeText(markdown);
            toast.success("Blog copied to clipboard");
        } catch {
            toast.error("Failed to copy");
        }
    };

    const copyMeta = async () => {
        try {
            await navigator.clipboard.writeText(blog.meta_description);
            toast.success("Meta description copied");
        } catch {
            toast.error("Failed to copy");
        }
    };

    return (
        <article className="fade-up" data-testid="blog-output">
            {/* Action bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-zinc-200">
                <div className="flex items-center gap-4">
                    <span className="label-mono">
                        {blog.word_count || 0} words · {blog.tone} · {blog.length}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {onRegenerate && (
                        <button
                            type="button"
                            onClick={onRegenerate}
                            disabled={regenerating}
                            data-testid="regenerate-button"
                            className="flex items-center gap-2 px-4 py-2 border border-zinc-300 hover:border-zinc-900 transition-colors text-sm font-ui font-medium disabled:opacity-50"
                        >
                            <ArrowsClockwise
                                size={14}
                                weight="bold"
                                className={regenerating ? "animate-spin" : ""}
                            />
                            Regenerate
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={copyAll}
                        data-testid="copy-button"
                        className="flex items-center gap-2 px-4 py-2 border border-zinc-300 hover:border-zinc-900 transition-colors text-sm font-ui font-medium"
                    >
                        <Copy size={14} weight="bold" />
                        Copy
                    </button>
                    <button
                        type="button"
                        onClick={() => downloadAsTxt(blog)}
                        data-testid="download-button"
                        className="flex items-center gap-2 px-4 py-2 bg-[#002FA7] text-white hover:bg-[#002277] transition-colors text-sm font-ui font-medium"
                    >
                        <DownloadSimple size={14} weight="bold" />
                        .txt
                    </button>
                </div>
            </div>

            {/* Title */}
            <h1
                className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-none text-zinc-900 mb-8"
                data-testid="blog-title"
            >
                {blog.title}
            </h1>

            {/* Intro */}
            <p
                className="font-editor text-xl sm:text-2xl leading-relaxed text-zinc-700 italic mb-12 border-l-2 border-[#002FA7] pl-6"
                data-testid="blog-introduction"
            >
                <Quotes size={20} weight="duotone" className="inline mr-2 mb-1 text-[#002FA7]" />
                {blog.introduction}
            </p>

            {/* Sections */}
            <div className="space-y-12 editor-prose" data-testid="blog-sections">
                {blog.sections.map((s, idx) => (
                    <section key={idx} data-testid={`blog-section-${idx}`}>
                        <div className="flex items-baseline gap-3 mb-4">
                            <span className="font-mono-jb text-xs text-[#002FA7] font-medium">
                                {String(idx + 1).padStart(2, "0")}
                            </span>
                            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-zinc-900">
                                {s.heading}
                            </h2>
                        </div>
                        <p className="font-editor text-lg leading-relaxed text-zinc-800 whitespace-pre-line">
                            {s.paragraph}
                        </p>
                    </section>
                ))}
            </div>

            {/* Conclusion */}
            <section className="mt-16 pt-10 border-t border-zinc-200" data-testid="blog-conclusion">
                <div className="label-mono mb-4">Final Word</div>
                <p className="font-editor text-lg leading-relaxed text-zinc-800 whitespace-pre-line">
                    {blog.conclusion}
                </p>
            </section>

            {/* SEO panel */}
            <section
                className="mt-20 p-6 md:p-8 bg-zinc-50 border border-zinc-200"
                data-testid="seo-panel"
            >
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Hash size={16} weight="duotone" className="text-[#002FA7]" />
                        <span className="label-mono">SEO Package</span>
                    </div>
                    <button
                        type="button"
                        onClick={copyMeta}
                        data-testid="copy-meta-button"
                        className="text-xs font-ui text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1"
                    >
                        <Copy size={12} weight="bold" />
                        Copy meta
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <div className="label-mono mb-3">Keywords</div>
                        <div className="flex flex-wrap gap-2" data-testid="seo-keywords">
                            {blog.keywords.map((k, i) => (
                                <span
                                    key={i}
                                    className="border border-[#002FA7]/30 text-[#002FA7] bg-[#002FA7]/5 px-3 py-1 text-[11px] uppercase tracking-widest font-mono-jb"
                                    data-testid={`seo-keyword-${i}`}
                                >
                                    {k}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="label-mono">Meta Description</span>
                            <span
                                className={`font-mono-jb text-[11px] ${
                                    metaLength >= 150 && metaLength <= 160
                                        ? "text-[#002FA7]"
                                        : "text-amber-600"
                                }`}
                                data-testid="meta-char-count"
                            >
                                {metaLength}/160
                            </span>
                        </div>
                        <p
                            className="font-ui text-sm text-zinc-700 leading-relaxed"
                            data-testid="seo-meta-description"
                        >
                            {blog.meta_description}
                        </p>
                    </div>
                </div>
            </section>
        </article>
    );
};

export default BlogOutput;

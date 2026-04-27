import { useState, useEffect } from "react";
import { toast } from "sonner";
import BlogForm from "../components/BlogForm";
import BlogOutput from "../components/BlogOutput";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { generateBlog } from "../services/aiService";

const LS_KEY = "inkwell:last-blog";
const LS_PARAMS = "inkwell:last-params";

export const GeneratorPage = () => {
    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState(null);
    const [lastParams, setLastParams] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        try {
            const saved = localStorage.getItem(LS_KEY);
            const params = localStorage.getItem(LS_PARAMS);
            if (saved) setBlog(JSON.parse(saved));
            if (params) setLastParams(JSON.parse(params));
        } catch {
            /* ignore */
        }
    }, []);

    const runGenerate = async (params) => {
        setLoading(true);
        setError("");
        try {
            const result = await generateBlog(params);
            setBlog(result);
            setLastParams(params);
            try {
                localStorage.setItem(LS_KEY, JSON.stringify(result));
                localStorage.setItem(LS_PARAMS, JSON.stringify(params));
            } catch {
                /* storage full or disabled */
            }
            toast.success("Blog generated");
        } catch (e) {
            const msg =
                e?.response?.data?.detail ||
                e?.message ||
                "Something went wrong while generating.";
            setError(typeof msg === "string" ? msg : "Generation failed");
            toast.error("Generation failed");
        } finally {
            setLoading(false);
        }
    };

    const regenerate = () => {
        if (lastParams) runGenerate(lastParams);
    };

    return (
        <div
            className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]"
            data-testid="generator-page"
        >
            {/* Left panel */}
            <aside
                className="w-full md:w-[380px] lg:w-[440px] bg-zinc-50 border-r border-zinc-200 p-6 md:p-8 lg:p-10 shrink-0 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-y-auto"
                data-testid="left-panel"
            >
                <div className="mb-10">
                    <span className="label-mono">The Brief</span>
                    <h2 className="font-display font-black text-3xl tracking-tight mt-2 leading-tight">
                        Tell us what<br />to write.
                    </h2>
                </div>
                <BlogForm
                    onGenerate={runGenerate}
                    loading={loading}
                    initial={lastParams}
                />

                {error && (
                    <div
                        className="mt-6 border border-red-200 bg-red-50 p-4 text-sm text-red-700 font-ui"
                        data-testid="error-message"
                    >
                        {error}
                    </div>
                )}
            </aside>

            {/* Right panel */}
            <main
                className="flex-1 bg-white p-6 md:p-12 lg:p-16 xl:p-24 overflow-x-hidden"
                data-testid="right-panel"
            >
                {loading ? (
                    <Loader />
                ) : blog ? (
                    <BlogOutput
                        blog={blog}
                        onRegenerate={regenerate}
                        regenerating={loading}
                    />
                ) : (
                    <EmptyState />
                )}
            </main>
        </div>
    );
};

export default GeneratorPage;

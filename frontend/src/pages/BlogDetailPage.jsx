import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import BlogOutput from "../components/BlogOutput";
import Loader from "../components/Loader";
import { getBlog } from "../services/aiService";

export const BlogDetailPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            try {
                const data = await getBlog(id);
                if (mounted) setBlog(data);
            } catch (e) {
                if (mounted) setError(e?.response?.data?.detail || "Not found");
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [id]);

    return (
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-12" data-testid="blog-detail-page">
            <Link
                to="/history"
                className="inline-flex items-center gap-2 label-mono mb-10 hover:text-zinc-900 transition-colors"
                data-testid="back-to-archive"
            >
                <ArrowLeft size={14} weight="bold" />
                Back to archive
            </Link>

            {loading && <Loader />}
            {!loading && error && (
                <div className="border border-red-200 bg-red-50 p-6 text-red-700 font-ui">
                    {error}
                </div>
            )}
            {!loading && blog && <BlogOutput blog={blog} regenerating={false} />}
        </div>
    );
};

export default BlogDetailPage;

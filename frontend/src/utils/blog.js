/**
 * Convert a blog record into a downloadable plain-text representation.
 */
export function blogToPlainText(blog) {
    const lines = [];
    lines.push(blog.title.toUpperCase());
    lines.push("=".repeat(Math.min(blog.title.length, 80)));
    lines.push("");
    lines.push(blog.introduction);
    lines.push("");
    blog.sections.forEach((s) => {
        lines.push(s.heading);
        lines.push("-".repeat(Math.min(s.heading.length, 80)));
        lines.push(s.paragraph);
        lines.push("");
    });
    lines.push("CONCLUSION");
    lines.push("-".repeat(10));
    lines.push(blog.conclusion);
    lines.push("");
    lines.push("---");
    lines.push(`Keywords: ${blog.keywords.join(", ")}`);
    lines.push(`Meta description: ${blog.meta_description}`);
    return lines.join("\n");
}

export function blogToMarkdown(blog) {
    const md = [];
    md.push(`# ${blog.title}`);
    md.push("");
    md.push(blog.introduction);
    md.push("");
    blog.sections.forEach((s) => {
        md.push(`## ${s.heading}`);
        md.push("");
        md.push(s.paragraph);
        md.push("");
    });
    md.push(`## Conclusion`);
    md.push("");
    md.push(blog.conclusion);
    return md.join("\n");
}

export function downloadAsTxt(blog) {
    const text = blogToPlainText(blog);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const safe = (blog.title || "blog").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60);
    a.href = url;
    a.download = `${safe}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export function formatDate(iso) {
    try {
        const d = new Date(iso);
        return d.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    } catch {
        return "";
    }
}

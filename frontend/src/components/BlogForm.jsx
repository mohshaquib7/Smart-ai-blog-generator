import { useState } from "react";
import {
    Sparkle,
    Briefcase,
    ChatCircleText,
    Code,
    TextAa,
} from "@phosphor-icons/react";

const TONES = [
    { id: "professional", label: "Professional", icon: Briefcase },
    { id: "casual", label: "Casual", icon: ChatCircleText },
    { id: "technical", label: "Technical", icon: Code },
];

const LENGTHS = [
    { id: "short", label: "Short", words: "300w" },
    { id: "medium", label: "Medium", words: "600w" },
    { id: "long", label: "Long", words: "1000w" },
];

export const BlogForm = ({ onGenerate, loading, initial }) => {
    const [topic, setTopic] = useState(initial?.topic || "");
    const [tone, setTone] = useState(initial?.tone || "professional");
    const [length, setLength] = useState(initial?.length || "medium");
    const [topicError, setTopicError] = useState("");

    const submit = (e) => {
        e?.preventDefault();
        if (!topic.trim() || topic.trim().length < 3) {
            setTopicError("Please enter a topic of at least 3 characters.");
            return;
        }
        setTopicError("");
        onGenerate({ topic: topic.trim(), tone, length });
    };

    return (
        <form
            onSubmit={submit}
            className="flex flex-col gap-10"
            data-testid="blog-form"
        >
            <div>
                <div className="flex items-center justify-between mb-2">
                    <span className="label-mono">01 · Topic</span>
                    <TextAa size={14} weight="duotone" className="text-zinc-400" />
                </div>
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="The future of remote work in 2026..."
                    className="brutalist-input"
                    data-testid="topic-input"
                    disabled={loading}
                    maxLength={500}
                />
                {topicError && (
                    <p
                        className="mt-2 text-xs text-red-600 font-ui"
                        data-testid="topic-error"
                    >
                        {topicError}
                    </p>
                )}
            </div>

            <div>
                <span className="label-mono mb-3 block">02 · Tone</span>
                <div className="grid grid-cols-3 gap-2" data-testid="tone-selector">
                    {TONES.map((t) => {
                        const Icon = t.icon;
                        const active = tone === t.id;
                        return (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => setTone(t.id)}
                                disabled={loading}
                                data-testid={`tone-${t.id}`}
                                className={`group flex flex-col items-start gap-2 p-3 border transition-all text-left ${
                                    active
                                        ? "border-[#002FA7] bg-[#002FA7]/5"
                                        : "border-zinc-200 hover:border-zinc-400 bg-white"
                                }`}
                            >
                                <Icon
                                    size={18}
                                    weight="duotone"
                                    className={
                                        active ? "text-[#002FA7]" : "text-zinc-600"
                                    }
                                />
                                <span
                                    className={`font-display text-sm font-bold ${
                                        active ? "text-[#002FA7]" : "text-zinc-900"
                                    }`}
                                >
                                    {t.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <span className="label-mono mb-3 block">03 · Length</span>
                <div className="flex flex-col gap-2" data-testid="length-selector">
                    {LENGTHS.map((l) => {
                        const active = length === l.id;
                        return (
                            <button
                                key={l.id}
                                type="button"
                                onClick={() => setLength(l.id)}
                                disabled={loading}
                                data-testid={`length-${l.id}`}
                                className={`flex items-center justify-between p-3 border transition-all ${
                                    active
                                        ? "border-[#002FA7] bg-[#002FA7]/5"
                                        : "border-zinc-200 hover:border-zinc-400"
                                }`}
                            >
                                <span
                                    className={`font-display font-bold ${
                                        active
                                            ? "text-[#002FA7]"
                                            : "text-zinc-900"
                                    }`}
                                >
                                    {l.label}
                                </span>
                                <span className="font-mono-jb text-xs text-zinc-500">
                                    {l.words}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                data-testid="generate-button"
                className="bg-[#002FA7] text-white hover:bg-[#002277] disabled:bg-zinc-400 disabled:cursor-not-allowed px-8 py-4 font-display text-base font-bold tracking-wide transition-colors flex items-center justify-center gap-2 group"
            >
                <Sparkle
                    size={20}
                    weight="fill"
                    className={loading ? "animate-pulse" : "group-hover:rotate-12 transition-transform"}
                />
                {loading ? "Generating..." : "Generate Blog"}
            </button>
        </form>
    );
};

export default BlogForm;

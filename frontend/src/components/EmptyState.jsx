import { ArrowLeft, Sparkle } from "@phosphor-icons/react";

const EMPTY_IMG =
    "https://images.unsplash.com/photo-1671371553620-99daf3804294?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZGVzayUyMHR5cGV3cml0ZXIlMjBvciUyMHBhcGVyJTIwdGV4dHVyZXxlbnwwfHx8fDE3NzczMjE0NTB8MA&ixlib=rb-4.1.0&q=85";

export const EmptyState = () => (
    <div
        className="flex flex-col items-start justify-center min-h-[60vh] gap-8"
        data-testid="empty-state"
    >
        <div className="flex items-center gap-3">
            <ArrowLeft size={20} weight="bold" className="text-zinc-400" />
            <span className="label-mono">Configure on the left</span>
        </div>

        <div className="relative w-full max-w-2xl overflow-hidden">
            <img
                src={EMPTY_IMG}
                alt="A minimalist typewriter on a desk"
                className="w-full h-64 md:h-80 object-cover grayscale opacity-40"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        <div className="max-w-xl">
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-none text-zinc-900 mb-6">
                A blank page,<br />
                <span className="text-[#002FA7]">re-imagined.</span>
            </h1>
            <p className="font-editor text-lg text-zinc-600 italic leading-relaxed">
                Set your topic, voice, and length — Inkwell drafts a structured,
                SEO-ready post in seconds.
            </p>
        </div>

        <div className="flex items-center gap-2 label-mono">
            <Sparkle size={12} weight="fill" className="text-[#002FA7]" />
            Powered by GPT-5.2
        </div>
    </div>
);

export default EmptyState;

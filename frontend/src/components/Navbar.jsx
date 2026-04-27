import { Link, NavLink } from "react-router-dom";
import { PenNib, ClockCounterClockwise } from "@phosphor-icons/react";

export const Navbar = () => {
    const linkClass = ({ isActive }) =>
        `label-mono px-3 py-2 transition-colors ${
            isActive ? "text-[#002FA7]" : "text-zinc-500 hover:text-zinc-900"
        }`;

    return (
        <nav
            data-testid="navbar"
            className="sticky top-0 z-50 h-16 backdrop-blur-xl bg-white/85 border-b border-zinc-200"
        >
            <div className="h-full max-w-[1600px] mx-auto px-6 md:px-8 flex items-center justify-between">
                <Link
                    to="/"
                    className="flex items-center gap-2 group"
                    data-testid="navbar-brand"
                >
                    <div className="w-8 h-8 bg-[#002FA7] flex items-center justify-center">
                        <PenNib size={18} weight="duotone" color="white" />
                    </div>
                    <div className="leading-tight">
                        <div className="font-display font-black text-base tracking-tight">
                            INKWELL
                        </div>
                        <div className="label-mono text-[9px] -mt-0.5">
                            AI · BLOG · STUDIO
                        </div>
                    </div>
                </Link>

                <div className="flex items-center gap-1">
                    <NavLink to="/" end className={linkClass} data-testid="nav-generate">
                        <span className="flex items-center gap-2">
                            <PenNib size={14} weight="duotone" />
                            Generate
                        </span>
                    </NavLink>
                    <NavLink to="/history" className={linkClass} data-testid="nav-history">
                        <span className="flex items-center gap-2">
                            <ClockCounterClockwise size={14} weight="duotone" />
                            Archive
                        </span>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

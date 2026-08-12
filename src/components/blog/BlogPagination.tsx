"use client";

import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface BlogPaginationProps {
    currentPage: number;
    totalPages: number;
    basePath?: string;
    categoryParam?: string;
}

export default function BlogPagination({
    currentPage,
    totalPages,
    basePath = "/blog",
    categoryParam,
}: BlogPaginationProps) {
    if (totalPages <= 1) return null;

    function buildUrl(page: number): string {
        const params = new URLSearchParams();
        if (page > 1) params.set("pagina", String(page));
        if (categoryParam) params.set("categoria", categoryParam);
        const qs = params.toString();
        return qs ? `${basePath}?${qs}` : basePath;
    }

    // Generate visible page numbers
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        pages.push(1);
        if (currentPage > 3) pages.push("...");
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pages.push(i);
        }
        if (currentPage < totalPages - 2) pages.push("...");
        pages.push(totalPages);
    }

    return (
        <nav className="flex items-center justify-center gap-2 mt-16" aria-label="Paginación">
            {/* Prev */}
            {currentPage > 1 ? (
                <Link
                    href={buildUrl(currentPage - 1)}
                    className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
                    aria-label="Página anterior"
                >
                    <FaChevronLeft className="text-xs" />
                </Link>
            ) : (
                <span className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-300 cursor-not-allowed">
                    <FaChevronLeft className="text-xs" />
                </span>
            )}

            {/* Pages */}
            {pages.map((p, idx) =>
                p === "..." ? (
                    <span key={`ellipsis-${idx}`} className="w-10 h-10 flex items-center justify-center text-gray-400 text-sm">
                        ···
                    </span>
                ) : (
                    <Link
                        key={p}
                        href={buildUrl(p)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-200 ${currentPage === p
                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                            : "bg-white border border-gray-200 text-gray-600 hover:bg-primary hover:text-white hover:border-primary hover:shadow-md"
                            }`}
                        aria-current={currentPage === p ? "page" : undefined}
                    >
                        {p}
                    </Link>
                )
            )}

            {/* Next */}
            {currentPage < totalPages ? (
                <Link
                    href={buildUrl(currentPage + 1)}
                    className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
                    aria-label="Página siguiente"
                >
                    <FaChevronRight className="text-xs" />
                </Link>
            ) : (
                <span className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-300 cursor-not-allowed">
                    <FaChevronRight className="text-xs" />
                </span>
            )}
        </nav>
    );
}

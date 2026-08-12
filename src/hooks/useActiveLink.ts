"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { NavLink } from "@/types/navigation";

export function useActiveLink() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const isActive = useCallback(
    (href: string | undefined): boolean => {
      if (!href) return false;
      if (href === "/") return pathname === "/";
      
      try {
        // Handle absolute or relative URLs
        const urlObj = href.startsWith("http") 
          ? new URL(href) 
          : new URL(href, "http://localhost");
          
        const matchesPath = pathname === urlObj.pathname;
        
        if (urlObj.hash) {
          return matchesPath && currentHash === urlObj.hash;
        }
        
        if (matchesPath && currentHash !== "") return false;
        return matchesPath;
      } catch {
        return false;
      }
    },
    [pathname, currentHash]
  );

  const isParentActive = useCallback(
    (link: NavLink): boolean => {
      if (isActive(link.href)) return true;
      if (link.subLinks) {
        return link.subLinks.some((sub) => isActive(sub.href));
      }
      return false;
    },
    [isActive]
  );

  return { isActive, isParentActive, pathname, currentHash };
}

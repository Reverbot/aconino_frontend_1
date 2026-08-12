"use client";

/**
 * ComingSoonOverlayWrapper
 * 
 * Previously rendered the ComingSoonOverlay via portal from the layout.
 * Now disabled because the overlay is rendered directly inline within 
 * ApoyanosClient to avoid hydration mismatches and z-index conflicts 
 * that caused visual overlap in production (Vercel).
 */
export default function ComingSoonOverlayWrapper() {
  return null;
}
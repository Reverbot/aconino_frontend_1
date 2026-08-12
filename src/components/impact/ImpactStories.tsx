"use client";

import React, { useRef } from "react";
import { useScrollTracker } from "./useScrollTracker";
import { ProcessedStory } from "./types";

interface ImpactStoriesProps {
  stories: ProcessedStory[];
}

export default function ImpactStories({ stories }: ImpactStoriesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Custom hook handles all the mobile scroll tracking logic
  const { activeIndex, isMobile, scrollToItem } = useScrollTracker(scrollRef, stories.length, 16);

  return (
    <div style={{ width: "100%", marginBottom: isMobile ? "2rem" : "3rem" }}>
      {/* Cards container */}
      <div
        ref={scrollRef}
        style={{
          display: isMobile ? "flex" : "grid",
          gridTemplateColumns: isMobile ? undefined : "repeat(3, 1fr)",
          gap: isMobile ? "1rem" : "1.5rem",
          overflowX: isMobile ? "auto" : "visible",
          scrollSnapType: isMobile ? "x mandatory" : undefined,
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingBottom: isMobile ? "0.5rem" : 0,
        }}
      >
        {stories.map((story, idx) => (
          <div
            key={story.id}
            style={{
              position: "relative",
              flexShrink: 0,
              width: isMobile ? "85vw" : "auto",
              minWidth: isMobile ? 0 : 0,
              maxWidth: isMobile ? "280px" : "none",
              height: isMobile ? "260px" : "240px",
              borderRadius: isMobile ? "1rem" : "1.5rem",
              overflow: "hidden",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              border: "1px solid #f3f4f6",
              scrollSnapAlign: "center",
            }}
          >
            {/* Using native img ensures rendering in mobile horizontal scroll context */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={story.img}
              alt={`Historia de ${story.name}`}
              loading="lazy"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.7s ease",
              }}
              onMouseEnter={(e) => {
                if (!isMobile) e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                if (!isMobile) e.currentTarget.style.transform = "scale(1)";
              }}
            />
            
            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(12,32,112,0.95) 0%, rgba(12,32,112,0.3) 50%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
            
            {/* Text content */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: isMobile ? "1.25rem" : "1.5rem",
                color: "white",
                zIndex: 2,
              }}
            >
              <h3
                style={{
                  fontSize: isMobile ? "1.1rem" : "1.5rem",
                  fontWeight: 900,
                  marginBottom: "0.25rem",
                }}
              >
                {story.name}
              </h3>
              <p
                style={{
                  fontSize: isMobile ? "0.75rem" : "0.85rem",
                  opacity: 0.85,
                  fontStyle: "italic",
                  lineHeight: 1.4,
                  fontWeight: 500,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                &ldquo;{story.story}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators — mobile only */}
      {isMobile && (
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1rem" }}>
          {stories.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToItem(i, 24)}
              aria-label={`Ver testimonio ${i + 1}`}
              style={{
                width: i === activeIndex ? "1.5rem" : "0.5rem",
                height: "0.5rem",
                borderRadius: "9999px",
                backgroundColor: i === activeIndex ? "#f8b719" : "#d1d5db",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

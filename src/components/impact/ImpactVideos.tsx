"use client";

import { motion } from "@/compat/motion";

export interface ImpactVideoItem {
  _key?: string;
  name?: string;
  text?: string;
  videoUrl?: string;
  posterUrl?: string;
}

export default function ImpactVideos({ videos }: { videos: ImpactVideoItem[] }) {
  if (!videos || videos.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
      {videos.map((v, i) => (
        <motion.div
          key={v._key || i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="flex flex-col"
        >
          {/* Video tipo reel (9:16) */}
          <div
            className="relative w-full overflow-hidden shadow-xl bg-gray-900 border-4 border-white"
            style={{ aspectRatio: "9 / 16", borderRadius: "24px" }}
          >
            {v.videoUrl ? (
              <video
                src={v.videoUrl}
                poster={v.posterUrl || undefined}
                controls
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/40 text-sm text-center px-4">
                Video próximamente disponible
              </div>
            )}
          </div>

          {/* Texto debajo del video */}
          {(v.name || v.text) && (
            <div className="mt-4 text-center px-2">
              {v.name && (
                <h4 className="font-black text-primary text-base md:text-lg mb-1">{v.name}</h4>
              )}
              {v.text && (
                <p className="text-slate-500 text-sm leading-relaxed">{v.text}</p>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

import { ProcessedStory } from "./types";

interface ImpactStoriesProps {
  stories: ProcessedStory[];
}

export default function ImpactStories({ stories }: ImpactStoriesProps) {
  return (
    <div className="w-full mb-8 md:mb-12">
      <div className="flex overflow-x-auto scroll-smooth pb-2 hide-scrollbar gap-4 md:grid md:grid-cols-3 md:gap-6" style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
        {stories.map((story) => (
          <div
            key={story.id}
            className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-gray-100 shadow-md flex-shrink-0 scroll-snap-align-center group h-[260px] md:h-[300px] w-[85vw] max-w-[280px] md:w-auto md:max-w-none"
            style={{ scrollSnapAlign: "center" }}
          >
            <img
              src={story.img}
              alt={`Historia de ${story.name}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(12,32,112,0.95) 0%, rgba(12,32,112,0.3) 50%, transparent 100%)" }} />
            <div className="absolute bottom-0 left-0 right-0 z-10 text-white p-5 md:p-6">
              <h3 className="font-bold mb-1 leading-tight text-lg md:text-2xl">{story.name}</h3>
              <p className="italic opacity-85 leading-snug font-medium line-clamp-3 text-xs md:text-sm">&ldquo;{story.story}&rdquo;</p>
            </div>
          </div>
        ))}
      </div>
      <p className="md:hidden text-center text-xs font-bold uppercase tracking-widest text-gray-400 mt-4">Desliza para ver más historias</p>
    </div>
  );
}

"use client";

import Image from "next/image";
import ScrollReveal from "../animations/ScrollReveal";

interface AppInfoProps {
  infoSection: {
    title: string;
    text1: string;
    text2: string;
  };
  quoteSection: {
    quote: string;
    author: string;
    avatarUrl: string;
  };
}

export default function AppInfo({ infoSection, quoteSection }: AppInfoProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20 md:mb-28">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                Aconiño
              </span>
              <div className="h-[2px] bg-accent w-12" />
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary leading-tight mb-8">
              {infoSection.title}
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.3}>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
              {infoSection.text1}
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.4}>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {infoSection.text2}
            </p>
          </ScrollReveal>
        </div>

        <div>
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className="w-20 h-1 bg-accent rounded-full mb-8 mx-auto" />
          </ScrollReveal>

          <ScrollReveal animation="zoom-in" delay={0.2}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary text-center leading-tight mb-12">
              ¿Por qué es importante?
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.3}>
            <div className="flex flex-col md:flex-row items-start gap-8 bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100">
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-lg border-4 border-white">
                  <Image
                    src={quoteSection.avatarUrl}
                    alt={quoteSection.author}
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="flex-1">
                <blockquote className="text-gray-600 text-base md:text-lg leading-relaxed italic mb-6">
                  «{quoteSection.quote}»
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[2px] bg-accent rounded-full" />
                  <p className="text-primary font-bold text-sm">
                    {quoteSection.author}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

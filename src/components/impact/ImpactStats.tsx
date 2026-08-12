"use client";

import React from "react";
import { motion } from "@/compat/motion";
import { FaChild, FaCalendarAlt, FaHandsHelping } from "react-icons/fa";

const STAT_ICONS = [FaChild, FaCalendarAlt, FaHandsHelping];

import { ProcessedStat } from "./types";

interface ImpactStatsProps {
  stats: ProcessedStat[];
}

export default function ImpactStats({ stats }: ImpactStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
      {stats.map((stat, idx) => {
        const IconComponent = STAT_ICONS[idx % STAT_ICONS.length];
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`bg-gray-50 rounded-2xl md:rounded-3xl p-5 md:p-6 text-center flex flex-col items-center justify-center shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow group ${
              idx === 2 ? "col-span-2 md:col-span-1 w-full max-w-[calc(50%-8px)] md:max-w-none mx-auto" : ""
            }`}
          >
            <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-xl md:text-2xl text-secondary mb-3 md:mb-3 shadow-sm group-hover:scale-110 transition-transform duration-300">
              <IconComponent />
            </div>
            <div className="text-2xl md:text-4xl font-black text-primary mb-1 flex items-baseline justify-center">
              <span>{stat.value}</span>
              <span className="text-lg md:text-3xl text-accent ml-0.5">{stat.suffix}</span>
            </div>
            <p className="text-[10px] md:text-lg font-bold text-gray-400 uppercase tracking-widest leading-tight">
              {stat.label}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

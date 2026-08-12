"use client";

import { motion } from "@/compat/motion";
import { IconShield, IconDocument, IconChart } from "@/constants/apoyanos-icons";

const badges = [
  { icon: IconShield, text: "Donaciones 100% seguras" },
  { icon: IconDocument, text: "Certificados de donación" },
  { icon: IconChart, text: "Transparencia total" },
];

export default function TrustBadges() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-8 py-8 bg-gray-50 border-y border-gray-100"
    >
      {badges.map((badge, index) => {
        const IconComponent = badge.icon;
        return (
          <motion.div
            key={badge.text}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 text-gray-600"
          >
            <IconComponent className="w-6 h-6 text-primary" />
            <span className="font-medium">{badge.text}</span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

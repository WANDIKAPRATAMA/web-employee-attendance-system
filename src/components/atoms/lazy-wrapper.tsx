"use client";
import { JSX } from "react";
import { useInView } from "react-intersection-observer";

export function LazyWrapper({
  children,
  fallback,
}: {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { ref, inView } = useInView({
    triggerOnce: true, // Hanya trigger sekali saat pertama kali masuk layar
    threshold: 0.1, // Trigger saat 10% komponen terlihat
  });

  return (
    <div ref={ref}>
      {inView ? children : fallback ?? null}
      {/* Tampilkan placeholder setinggi layar agar layout tidak rusak */}
    </div>
  );
}

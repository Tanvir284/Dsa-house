'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { visualizerCatalog } from '@/data/visualizers';

export default function VisualizersIndexPage() {
  return (
    <div className="flex flex-col gap-8 py-4 w-full animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Visualizers</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Interactive algorithm visualizations. Input custom data, control speed, and step through each operation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {visualizerCatalog.map((box) => {
          const diffBadge =
            box.difficulty === 'Beginner' ? 'badge-easy' :
            box.difficulty === 'Intermediate' ? 'badge-medium' : 'badge-hard';

          return (
            <Link
              key={box.slug}
              href={`/visualizer/${box.slug}`}
              className="card p-5 flex flex-col justify-between hover-lift gap-4 group"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] text-muted-foreground">{box.category}</span>
                  <span className={`badge ${diffBadge}`}>{box.difficulty}</span>
                </div>
                <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{box.title}</h3>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{box.description}</p>
              </div>

              <div className="pt-3 border-t border-border flex justify-between items-center text-xs font-medium text-primary">
                <span>Open visualizer</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import { Sweet } from '@/api';
import { SweetCard } from './SweetCard';

interface SweetGridProps {
  sweets: Sweet[];
  onPurchase: (id: string) => void;
  onEdit?: (sweet: Sweet) => void;
  onDelete?: (id: string) => void;
  isPurchasing?: boolean;
}

export function SweetGrid({ sweets, onPurchase, onEdit, onDelete, isPurchasing }: SweetGridProps) {
  if (sweets.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🍭</div>
        <h3 className="text-xl font-semibold text-muted-foreground mb-2">
          No sweets found
        </h3>
        <p className="text-muted-foreground">
          Try adjusting your search or check back later for new arrivals!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sweets.map((sweet) => (
        <SweetCard
          key={sweet.id}
          sweet={sweet}
          onPurchase={onPurchase}
          onEdit={onEdit}
          onDelete={onDelete}
          isPurchasing={isPurchasing}
        />
      ))}
    </div>
  );
}
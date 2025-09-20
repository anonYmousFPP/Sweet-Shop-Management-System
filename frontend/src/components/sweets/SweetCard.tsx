import React from 'react';
import { Sweet } from '@/api';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SweetCardProps {
  sweet: Sweet;
  onPurchase: (id: string) => void;
  onEdit?: (sweet: Sweet) => void;
  onDelete?: (id: string) => void;
  isPurchasing?: boolean;
}

export function SweetCard({ sweet, onPurchase, onEdit, onDelete, isPurchasing }: SweetCardProps) {
  const { isAdmin } = useAuth();
  const isOutOfStock = sweet.quantity <= 0;
  const isLowStock = sweet.quantity <= 5 && sweet.quantity > 0;

  return (
    <Card className="group hover:shadow-sweet transition-sweet overflow-hidden bg-gradient-to-br from-card to-card/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {sweet.name}
            </h3>
            <Badge variant="secondary" className="text-xs mt-1">
              {sweet.category}
            </Badge>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Package className="h-4 w-4" />
            <span className="text-sm font-medium">{sweet.quantity}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {sweet.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {sweet.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${sweet.price.toFixed(2)}
          </span>
          
          <div className="flex items-center space-x-2">
            {isOutOfStock && (
              <Badge variant="destructive" className="text-xs">
                Out of Stock
              </Badge>
            )}
            {isLowStock && (
              <Badge variant="default" className="text-xs bg-warning text-warning-foreground">
                Low Stock
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex flex-col space-y-2">
        <Button
          onClick={() => onPurchase(sweet.id)}
          disabled={isOutOfStock || isPurchasing}
          variant={isOutOfStock ? "ghost" : "hero"}
          size="sm"
          className="w-full"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isPurchasing ? 'Processing...' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>

        {isAdmin && (
          <div className="flex space-x-2 w-full">
            <Button
              onClick={() => onEdit?.(sweet)}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => onDelete?.(sweet.id)}
              variant="outline"
              size="sm"
              className="flex-1 hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
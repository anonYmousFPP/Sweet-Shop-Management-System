import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';

interface SearchFilters {
  query: string;
  category: string;
  minPrice: string;
  maxPrice: string;
}

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  categories?: string[];
}

export function SearchBar({ onSearch, categories = [] }: SearchBarProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    onSearch(filters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      query: '',
      category: '',
      minPrice: '',
      maxPrice: '',
    };
    setFilters(clearedFilters);
    onSearch(clearedFilters);
  };

  const hasActiveFilters = filters.category || filters.minPrice || filters.maxPrice;

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for sweets..."
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch} variant="hero">
          <Search className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant={hasActiveFilters ? "sweet" : "outline"}
        >
          <Filter className="h-4 w-4" />
          {hasActiveFilters && (
            <span className="ml-2 bg-white text-primary text-xs rounded-full px-2 py-1">
              {[filters.category, filters.minPrice, filters.maxPrice].filter(Boolean).length}
            </span>
          )}
        </Button>
      </div>

      {showFilters && (
        <div className="p-4 bg-muted/30 rounded-lg border border-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Advanced Filters</h3>
            {hasActiveFilters && (
              <Button onClick={clearFilters} variant="ghost" size="sm">
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select
                value={filters.category}
                onValueChange={(value) => setFilters({ ...filters, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Min Price</label>
              <Input
                type="number"
                placeholder="$0.00"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                min="0"
                step="0.01"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Max Price</label>
              <Input
                type="number"
                placeholder="$100.00"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
          <Button onClick={handleSearch} variant="sweet" className="w-full">
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );
}
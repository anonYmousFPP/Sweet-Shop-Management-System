import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { SearchBar } from '@/components/sweets/SearchBar';
import { SweetGrid } from '@/components/sweets/SweetGrid';
import { SweetForm } from '@/components/admin/SweetForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { Sweet, sweetsAPI } from '@/api';
import { useToast } from '@/hooks/use-toast';
import { Plus, Loader2 } from 'lucide-react';
import heroImage from '@/assets/sweet-shop-hero.jpg';

export default function Dashboard() {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [filteredSweets, setFilteredSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showSweetForm, setShowSweetForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | undefined>(undefined);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    try {
      setLoading(true);
      const response = await sweetsAPI.getAll();
      setSweets(response.data);
      setFilteredSweets(response.data);
    } catch (error: any) {
      toast({
        title: "Error loading sweets",
        description: error.response?.data?.message || "Failed to load sweets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (filters: any) => {
    try {
      if (filters.query || filters.category || filters.minPrice || filters.maxPrice) {
        const searchFilters = {
          query: filters.query,
          category: filters.category || undefined,
          minPrice: filters.minPrice ? parseFloat(filters.minPrice) : undefined,
          maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined
        };
        const response = await sweetsAPI.search(searchFilters);
        setFilteredSweets(response.data);
      } else {
        setFilteredSweets(sweets);
      }
    } catch (error: any) {
      toast({
        title: "Search failed",
        description: error.response?.data?.message || "Failed to search sweets",
        variant: "destructive",
      });
    }
  };

  const handlePurchase = async (id: string) => {
    try {
      setIsPurchasing(true);
      await sweetsAPI.purchase(id);
      toast({
        title: "Sweet purchased!",
        description: "Your sweet treat is being prepared. Enjoy!",
      });
      loadSweets();
    } catch (error: any) {
      toast({
        title: "Purchase failed",
        description: error.response?.data?.message || "Failed to purchase sweet",
        variant: "destructive",
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleCreateSweet = async (data: Omit<Sweet, 'id'>) => {
    try {
      setIsSubmittingForm(true);
      await sweetsAPI.create(data);
      toast({
        title: "Sweet added!",
        description: `${data.name} has been added to the collection`,
      });
      setShowSweetForm(false);
      loadSweets();
    } catch (error: any) {
      toast({
        title: "Failed to add sweet",
        description: error.response?.data?.message || "Failed to create sweet",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const handleUpdateSweet = async (data: Omit<Sweet, 'id'>) => {
    if (!editingSweet) return;
    
    try {
      setIsSubmittingForm(true);
      await sweetsAPI.update(editingSweet.id, data);
      toast({
        title: "Sweet updated!",
        description: `${data.name} has been updated successfully`,
      });
      setShowSweetForm(false);
      setEditingSweet(undefined);
      loadSweets();
    } catch (error: any) {
      toast({
        title: "Failed to update sweet",
        description: error.response?.data?.message || "Failed to update sweet",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const handleDeleteSweet = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sweet?')) return;
    
    try {
      await sweetsAPI.delete(id);
      toast({
        title: "Sweet deleted",
        description: "The sweet has been removed from the collection",
      });
      loadSweets();
    } catch (error: any) {
      toast({
        title: "Failed to delete sweet",
        description: error.response?.data?.message || "Failed to delete sweet",
        variant: "destructive",
      });
    }
  };

  const handleEditSweet = (sweet: Sweet) => {
    setEditingSweet(sweet);
    setShowSweetForm(true);
  };

  const handleCloseSweetForm = () => {
    setShowSweetForm(false);
    setEditingSweet(undefined);
  };

  const categories = Array.from(new Set(sweets.map(sweet => sweet.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="relative rounded-2xl overflow-hidden shadow-glow">
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
          <img 
            src={heroImage} 
            alt="Sweet Shop Collection" 
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <div className="max-w-2xl px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                Welcome to Sweet Shop
              </h1>
              <p className="text-xl md:text-2xl opacity-90 drop-shadow">
                Discover our delicious collection of handcrafted sweets and treats
              </p>
            </div>
          </div>
        </section>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="flex justify-end">
            <Button
              onClick={() => setShowSweetForm(true)}
              variant="sweet"
              size="lg"
              className="shadow-sweet"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Sweet
            </Button>
          </div>
        )}

        {/* Search and Filters */}
        <SearchBar onSearch={handleSearch} categories={categories} />

        {/* Sweet Collection */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-sweet bg-clip-text text-transparent">
            Our Sweet Collection
          </h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading sweets...</span>
            </div>
          ) : (
            <SweetGrid
              sweets={filteredSweets}
              onPurchase={handlePurchase}
              onEdit={isAdmin ? handleEditSweet : undefined}
              onDelete={isAdmin ? handleDeleteSweet : undefined}
              isPurchasing={isPurchasing}
            />
          )}
        </section>
      </main>

      {/* Sweet Form Dialog */}
      <Dialog open={showSweetForm} onOpenChange={setShowSweetForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">
              {editingSweet ? 'Edit Sweet' : 'Add New Sweet'}
            </DialogTitle>
          </DialogHeader>
          <SweetForm
            sweet={editingSweet}
            onSubmit={editingSweet ? handleUpdateSweet : handleCreateSweet}
            onCancel={handleCloseSweetForm}
            isSubmitting={isSubmittingForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
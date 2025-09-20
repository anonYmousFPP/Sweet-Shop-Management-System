import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sweet } from '@/api';

const sweetSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  quantity: z.number().min(0, 'Quantity must be 0 or greater'),
  description: z.string().optional(),
});

type SweetFormData = z.infer<typeof sweetSchema>;

interface SweetFormProps {
  sweet?: Sweet;
  onSubmit: (data: Omit<Sweet, 'id'>) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const categories = [
  'Chocolates',
  'Gummies',
  'Hard Candy',
  'Lollipops',
  'Marshmallows',
  'Cookies',
  'Cakes',
  'Ice Cream',
  'Other',
];

export function SweetForm({ sweet, onSubmit, onCancel, isSubmitting }: SweetFormProps) {
  const isEditing = !!sweet;
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SweetFormData>({
    resolver: zodResolver(sweetSchema),
    defaultValues: sweet ? {
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
      description: sweet.description || '',
    } : {
      name: '',
      category: '',
      price: 0,
      quantity: 0,
      description: '',
    },
  });

  const categoryValue = watch('category');

  const handleFormSubmit = (data: SweetFormData) => {
    onSubmit(data);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold bg-gradient-sweet bg-clip-text text-transparent">
          {isEditing ? 'Edit Sweet' : 'Add New Sweet'}
        </h2>
        <p className="text-muted-foreground mt-1">
          {isEditing ? 'Update sweet details' : 'Add a delicious new treat to your collection'}
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Sweet Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Chocolate Truffle"
              {...register('name')}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={categoryValue}
              onValueChange={(value) => setValue('category', value)}
            >
              <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-destructive">{errors.category.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price ($) *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register('price', { valueAsNumber: true })}
              className={errors.price ? 'border-destructive' : ''}
            />
            {errors.price && (
              <p className="text-sm text-destructive">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity in Stock *</Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              placeholder="0"
              {...register('quantity', { valueAsNumber: true })}
              className={errors.quantity ? 'border-destructive' : ''}
            />
            {errors.quantity && (
              <p className="text-sm text-destructive">{errors.quantity.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe this delicious sweet..."
            rows={3}
            {...register('description')}
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <Button
            type="submit"
            variant="sweet"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? 'Saving...' : (isEditing ? 'Update Sweet' : 'Add Sweet')}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
'use client';
import AddToCart from '@/app/_services/card-services/add-to-cart';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

type CartBtnProps = {
  productId: string;
  onClick?: (productId: string) => void;
  text?: string;
  fullWidth?: boolean;
  disabled?: boolean;
};

export default function AddToCartBtn({
  productId,
  onClick,
  text = 'Add to Cart',
  fullWidth = false,
  disabled = false,
}: CartBtnProps) {
  const queryClient = useQueryClient();

  const { mutate: addProductToCart, isPending } = useMutation({
    mutationFn: AddToCart,
    onSuccess: (data: any) => {
      toast.success(data?.message || 'Added to cart!');
      queryClient.invalidateQueries({ queryKey: ['Get-cart'] });
    },
    onError: () => {
      toast.error('Please login first');
    },
  });

  const handleClick = () => {
    if (onClick) {
      onClick(productId);
    } else {
      addProductToCart(productId);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || isPending}
      className={`bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-200 ${
        fullWidth ? 'w-full' : 'w-3/4'
      } py-2 px-4 flex justify-center items-center`}
    >
      {isPending ? 'Adding...' : text}
    </Button>
  );
}
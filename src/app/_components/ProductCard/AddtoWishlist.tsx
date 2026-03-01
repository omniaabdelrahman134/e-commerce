'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import AddToWishList from '@/app/_services/wislist/wislist';
import DeleteListItem from '@/app/_services/wislist/removeItemList';

type Props = {
  productId: string;
};

export default function AddToWishlistBtn({ productId }: Props) {
  const queryClient = useQueryClient();

  const { data: wishlistData } = useQuery({
    queryKey: ['Get-list'],
    queryFn: async () => {
      const res = await fetch(`/api/wishlist`);
      return res.json();
    },
  });

  const isInWishlist = wishlistData?.data?.some(
    (item: any) => item._id === productId
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (isInWishlist) {
        return DeleteListItem(productId);
      } else {
        return AddToWishList(productId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Get-list'] });
      toast.success(
        isInWishlist
          ? 'Removed from wishlist'
          : 'Added to wishlist'
      );
    },
    onError: () => toast.error('Something went wrong'),
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={isInWishlist ? 'currentColor' : 'none'}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      onClick={() => mutate()}
      className={`size-6 cursor-pointer transition-all duration-200 ${
        isInWishlist
          ? 'text-yellow-400'
          : 'text-gray-500 hover:text-yellow-400'
      } ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  );
}
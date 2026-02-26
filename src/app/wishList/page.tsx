'use client';

import cartImg from '@/assets/images/cart.jpg';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { toast } from 'sonner';
import DeleteListItem from '../_services/wislist/removeItemList';
import { WishlistType } from '../_types/carrt-types/cartTypes';
import { Button } from '@/components/ui/button';
import AddToCartBtn from '../_components/ProductCard/AddToCartBtn';
import { WishlistSkeleton } from './wishlistLoading';



export default function Wishlist() {
  const queryClient = useQueryClient();

  const { data: wishListData, isLoading, isError } = useQuery<WishlistType>({
    queryKey: ['Get-list'],
    queryFn: async () => {
      const res = await fetch(`/api/wishlist`);
      const payload = await res.json();
      return payload;
    },
  });

  const { mutate: delCart } = useMutation({
    mutationFn: DeleteListItem,
    onSuccess: () => {
      toast.success('Item removed from WishList');
      queryClient.invalidateQueries({ queryKey: ['Get-list'] });
    },
    onError: () => toast.error('Failed to remove item from WishList'),
  });

  if (isLoading) return <WishlistSkeleton />;
  if (isError) return <p className="text-red-500 text-center mt-10">Failed to load wishlist.</p>;
  if (!wishListData) return null;

  if (wishListData?.count === 0)
    return (
      <div className="flex flex-col justify-center items-center gap-4 my-20">
        <h2 className="font-bold text-3xl">WishList is Clear!</h2>
        <h3 className="font-bold text-2xl">Go Add Some Products!</h3>
        <Image width={200} height={200} src={cartImg} alt="cart image" />
      </div>
    );

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Wishlist</h1>
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {wishListData.data.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="p-4">
                  <Image
                    src={item.imageCover}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="object-contain rounded-md"
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-800">{item.title}</td>
                <td className="px-6 py-4 font-semibold text-gray-800">{item.price} EGP</td>
                <td className="px-6 py-4 flex flex-col gap-2">
                  <Button
                    className="bg-green-400 hover:bg-green-500"
                    onClick={() => delCart(item._id)}
                  >
                    Remove
                  </Button>
                  <AddToCartBtn productId={item._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 md:hidden">
        {wishListData.data.map((item) => (
          <div
            key={item._id}
            className="flex items-center bg-white rounded-xl shadow-sm p-4 gap-4"
          >
            <Image
              src={item.imageCover}
              alt={item.title}
              width={80}
              height={80}
              className="object-contain rounded-md"
            />
            <div className="flex-1 flex flex-col">
              <span className="font-semibold text-gray-800">{item.title}</span>
              <span className="text-gray-600">{item.price} EGP</span>
              <div className="flex gap-2 mt-2">
                <Button
                  className="bg-green-400 hover:bg-green-500 text-sm"
                  onClick={() => delCart(item._id)}
                >
                  Remove
                </Button>
                <AddToCartBtn productId={item._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
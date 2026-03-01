'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CartType } from '../_types/carrt-types/cartTypes';
import DeleteCartItem from '../_services/card-services/DeleteCart';
import { toast } from 'sonner';
import UpdateCartItem from '../_services/card-services/UpdateCart';
import ClearCart from '../_services/card-services/clearCart';
import cartImg from '@/assets/images/cart.jpg';
import Image from 'next/image';
import CheckoutBtn from '../_components/checkout/checkout';
import { Button } from '@/components/ui/button';
import CartSkeleton from './cartloading';
import { Spinner } from '@/components/ui/spinner';

export default function Cart() {
  const queryClient = useQueryClient();

  const {
    data: cartData,
    isLoading,
    isError,
  } = useQuery<CartType>({
    queryKey: ['Get-cart'],
    queryFn: async () => {
      const res = await fetch(`/api/cart`);
      return await res.json();
    },
  });

  const { mutate: delCart, isPending: DeletePending } = useMutation({
    mutationFn: DeleteCartItem,
    onSuccess: () => {
      toast.success('Item removed from cart');
      queryClient.invalidateQueries({ queryKey: ['Get-cart'] });
    },
    onError: () => toast.error('Failed to remove item from cart'),
  });

  const { mutate: clearCart, isPending: ClearPending } = useMutation({
    mutationFn: ClearCart,
    onSuccess: () => {
      toast.success('Cart cleared');
      queryClient.invalidateQueries({ queryKey: ['Get-cart'] });
    },
    onError: () => toast.error('Failed to clear cart'),
  });

  const { mutate: updateCart, isPending: UpdatePending } = useMutation({
    mutationFn: UpdateCartItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['Get-cart'] }),
  });

  function handleUpdateCart(productId: string, count: number) {
    if (count > 0) updateCart({ productId, count });
  }

  if (isLoading) return <CartSkeleton />;
  if (isError)
    return (
      <h2 className="text-center mt-24 text-xl text-red-500">
        Error Loading Cart
      </h2>
    );
  if (!cartData) return null;

  return (
    <>
      {cartData?.numOfCartItems > 0 ? (
        <div className="flex flex-col lg:flex-row justify-between gap-8 px-5 md:px-10 my-16">
          <div className="flex-1 overflow-x-auto bg-white shadow-md rounded-2xl p-6">
            <table className="w-full text-left text-sm md:text-base">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartData.data.products.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        width={80}
                        height={80}
                        className="rounded-lg object-contain"
                      />
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      {item.product.title}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          className="cursor-pointer bg-green-400 hover:bg-green-500"
                          size="sm"
                          onClick={() =>
                            handleUpdateCart(item.product._id, item.count - 1)
                          }
                        >
                          {UpdatePending ? <Spinner /> : '-'}
                        </Button>
                        <span className="px-2">{item.count}</span>
                        <Button
                          className="cursor-pointer bg-green-400 hover:bg-green-500"
                          size="sm"
                          onClick={() =>
                            handleUpdateCart(item.product._id, item.count + 1)
                          }
                        >
                          {UpdatePending ? <Spinner /> : '+'}
                        </Button>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold text-green-600">
                      {item.price} EGP
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        className="cursor-pointer bg-red-500 hover:bg-red-600"
                        variant="destructive"
                        size="sm"
                        onClick={() => delCart(item.product._id)}
                      >
                        {DeletePending ? <Spinner /> : 'Remove'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3 bg-white shadow-md rounded-2xl p-6 flex flex-col gap-6">
            <h2 className="text-2xl font-bold border-b pb-4">Order Summary</h2>
            <div className="flex justify-between text-lg font-semibold">
              <span>Items:</span>
              <span>{cartData.numOfCartItems}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Price:</span>
              <span>{cartData.data.totalCartPrice ?? 0} EGP</span>
            </div>
            <Button
              className="bg-green-400 hover:bg-green-500 cursor-pointer w-full"
              onClick={() => clearCart()}
            >
              {ClearPending ? <Spinner /> : 'Clear Cart'}
            </Button>
            <CheckoutBtn cartId={cartData.cartId} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 my-20">
          <h2 className="font-bold text-3xl">Your Cart is Empty!</h2>
          <h3 className="font-semibold text-xl">
            Add some products to get started
          </h3>
          <Image src={cartImg} alt="empty cart" width={200} height={200} />
        </div>
      )}
    </>
  );
}

// app/orders/page.tsx
import { getServerSession } from "next-auth/next";
import GetUserOrders from "@/app/_services/orders/GetUserOrders";
import Image from "next/image";
import { authOptions } from "@/lib/nextauth.config";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Please login first.
      </div>
    );
  }

  const accessToken = session.user.accessToken;
  if (!accessToken) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Invalid session. Please login again.
      </div>
    );
  }

  // ✅ Use the array directly
  let orders = [];
  try {
    orders = await GetUserOrders(accessToken); // <- no .data
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Failed to load orders. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
            <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
            <p className="text-gray-500">You haven't placed any orders.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order: any) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-semibold">#{order._id.slice(-6).toUpperCase()}</p>
                  </div>
                  <div className="flex gap-3 mt-4 md:mt-0">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Unpaid"}
                    </span>
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        order.isDelivered ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.isDelivered ? "Delivered" : "Processing"}
                    </span>
                  </div>
                </div>

                {/* Products */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {order.cartItems.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium line-clamp-1">{item.product.title}</p>
                        <p className="text-xs text-gray-500">Qty: {item.count}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-between items-center border-t pt-4">
                  <p className="text-sm text-gray-500">
                    Ordered on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-lg font-bold text-green-600">${order.totalOrderPrice}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
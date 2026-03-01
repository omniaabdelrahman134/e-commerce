import checkoutSession from '@/app/_services/checkout-service';
import checkoutCash from '@/app/_services/checkoutCash';
import { shipping } from '@/app/_types/products.type';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { set } from 'zod';

export default function CheckoutBtn({ cartId }: { cartId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const details = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);
  const city = useRef<HTMLInputElement>(null);

  async function chekOutFnOnline() {
    setIsLoading(true);
    const shippingAddress: shipping = {
      details: details.current?.value as string,
      phone: phone.current?.value as string,
      city: city.current?.value as string,
    };
    const response = await checkoutSession(cartId, shippingAddress);
    if (response.status === 'success') {
      window.location.href = response.session.url;
            toast.success('Order Placed Successfully')
    }else {
      toast.success('Order Failed, Try Again!')
    }
    setIsPending(false);
    console.log(response);
  }

   async function chekOutFnCash() {
    setIsPending(true);
    const shippingAddress: shipping = {
      details: details.current?.value as string,
      phone: phone.current?.value as string,
      city: city.current?.value as string,
    };
    const response = await checkoutCash(cartId, shippingAddress);
    if (response.status === 'success') {
      window.location.href = `/allorders`;
      toast.success('Order Placed Successfully')
    }else {
      window.location.href = `/cart`;
      toast.success('Order Failed, Try Again!')
    }
    setIsLoading(false);
    console.log(response);


  }

  return (
    <>
      <Dialog >
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-green-400 font-semibold hover:bg-green-600 cursor-pointer py-3 text-sm text-white uppercase w-full"
            >
              Checkout
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md ">
            <DialogHeader>
              <DialogTitle>Add your Shipping Details</DialogTitle>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="Address">Address</Label>
                <Input id="Address" name="Address" ref={details} />
              </Field>
              <Field>
                <Label htmlFor="Phone">Phone</Label>
                <Input id="Phone" name="Phone" ref={phone} />
              </Field>
              <Field>
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" ref={city} />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
              className='bg-green-400 hover:bg-green-500'
                type="submit"
                disabled={isLoading}
                onClick={() => chekOutFnOnline()}
              >
                {isLoading && <Loader2 className="animate-spin mr-2" />}
                Pay With Visa !
              </Button>
              <Button
              className='bg-green-400 hover:bg-green-500'
                type="submit"
                disabled={isPending}
                onClick={() => chekOutFnCash()}
              >
                {isPending && <Loader2 className="animate-spin mr-2" />}
                Pay With Cash !
              </Button>
            </DialogFooter>
          </DialogContent>
      </Dialog>
    </>
  );
}

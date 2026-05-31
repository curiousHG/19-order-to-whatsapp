import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, MessageCircle, ShoppingCart } from "lucide-react";
import { useCartStore, buildWhatsAppUrl } from "@/lib/cart-store";
import { postOrder } from "@/lib/api";
import { SunBadge } from "@/components/layout/SunBadge";
import { ProductThumb } from "@/components/ProductThumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const isEmpty = items.length === 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isEmpty) return;
    setLoading(true);

    const customerName = name.trim() || "NoName";
    const customerAddress = address.trim() || "NoAddress";

    try {
      await postOrder({
        customer: { name: customerName, address: customerAddress },
        products: items.map((item) => ({
          productId: item.productId,
          quantity: `${item.quantity} ${item.unit}`,
        })),
      });
      const snapshot = [...items];
      clearCart();
      window.location.href = buildWhatsAppUrl(
        customerName,
        customerAddress,
        snapshot
      );
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Could not submit order. Please check your connection and try again.";
      toast.error("Order failed", { description: message });
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 to-white flex flex-col">
      <CheckoutHeader />

      <div className="max-w-2xl mx-auto w-full p-4 space-y-4">
        {isEmpty ? (
          <EmptyState />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden"
          >
            {/* Order summary */}
            <div className="px-5 py-4 border-b border-border bg-amber-50/40">
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-800">
                Order summary
              </h2>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                The shop will confirm the final amount on WhatsApp
              </p>
            </div>
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li
                  key={item.productId}
                  className="px-5 py-3 flex items-center gap-3"
                >
                  <ProductThumb
                    src={item.image}
                    alt={item.name}
                    className="h-10 w-10"
                  />
                  <span className="flex-1 text-sm font-medium truncate">
                    {item.name}
                  </span>
                  <span className="text-sm text-muted-foreground shrink-0">
                    <span className="font-bold text-green-700">
                      {item.quantity}
                    </span>{" "}
                    {item.unit}
                  </span>
                </li>
              ))}
            </ul>

            <Separator />

            {/* Delivery details */}
            <div className="px-5 py-5 space-y-4">
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-800">
                Delivery details
              </h2>

              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="name">
                  Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  className="h-10"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="address">
                  Address
                </label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Your delivery address"
                  autoComplete="street-address"
                  className="h-10"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-green-600 hover:bg-green-700 text-white gap-2 text-sm font-semibold shadow-sm"
              >
                <MessageCircle className="h-4 w-4" />
                {loading ? "Submitting…" : "Submit & Open WhatsApp"}
              </Button>

              <p className="text-[11px] text-center text-muted-foreground">
                Your order is recorded with us and sent to the shop via
                WhatsApp.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function CheckoutHeader() {
  return (
    <header className="sticky top-0 z-40 bg-green-600 text-white shadow-md">
      <div className="relative max-w-2xl mx-auto h-14 flex items-center justify-center px-3">
        <Link
          to="/"
          aria-label="Back to shop"
          className="absolute left-2 h-10 w-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 active:bg-white/20 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2.5">
          <SunBadge className="h-9 w-9" />
          <span className="flex flex-col leading-none">
            <span className="font-serif font-bold text-base tracking-wide">
              Khari Baoli
            </span>
            <span className="text-amber-200 text-[10px] uppercase tracking-[0.25em] mt-0.5">
              Confirm order
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm p-10 text-center space-y-3">
      <ShoppingCart className="h-10 w-10 text-muted-foreground mx-auto" />
      <p className="text-sm font-medium text-foreground">Your cart is empty</p>
      <Link
        to="/"
        className="inline-block text-green-700 font-semibold hover:underline"
      >
        ← Back to shop
      </Link>
    </div>
  );
}

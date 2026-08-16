import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { toast } from "sonner";
import { ArrowLeft, MessageCircle, ShoppingCart, X } from "lucide-react";
import {
  useCartStore,
  useCustomerStore,
  buildWhatsAppUrl,
} from "@/lib/cart-store";
import { getMe, postOrder } from "@/lib/api";
import { SunBadge } from "@/components/layout/SunBadge";
import { ProductThumb } from "@/components/ProductThumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { QtyButtons } from "@/components/ui/QtyButtons";

export const CheckoutPage = () => {
  const { items, setItem, removeItem, clearCart } = useCartStore();
  // Persisted across visits via localStorage["customer"].
  const customer = useCustomerStore();
  const setCustomer = useCustomerStore((s) => s.setCustomer);
  const resetCustomer = useCustomerStore((s) => s.resetCustomer);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);

  const { data: me } = useSWR("me", getMe);

  // A different identity replaces these; within one identity, never overwrite typing.
  useEffect(() => {
    if (!me) return;

    if (!me.authenticated) {
      if (customer.owner) resetCustomer(null);
      return;
    }

    const identity = me.email || me.name || "signed-in";
    if (customer.owner !== identity) {
      setCustomer({
        name: me.name ?? "",
        email: me.email ?? "",
        phone: me.phone ?? "",
        address: me.address ?? "",
        owner: identity,
      });
      return;
    }

    const patch: Partial<{ name: string; email: string; phone: string; address: string }> = {};
    if (!customer.name.trim() && me.name) patch.name = me.name;
    if (!customer.email.trim() && me.email) patch.email = me.email;
    if (!customer.phone.trim() && me.phone) patch.phone = me.phone;
    if (!customer.address.trim() && me.address) patch.address = me.address;
    if (Object.keys(patch).length > 0) setCustomer(patch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  // Phone is displayed as a 10-digit local number next to a fixed +91 badge.
  // Storage normalisation: strip everything non-digit and keep the last 10
  // digits. Handles legacy localStorage values like "+91 9876543210" and any
  // /me/ pre-fill the server returns from older Customer rows.
  const phoneDigits = customer.phone.replace(/\D/g, '').slice(-10);

  const isEmpty = items.length === 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isEmpty) return;

    const customerName = customer.name.trim();
    const customerAddress = customer.address.trim();
    const customerEmail = customer.email.trim();
    // Always send +91-prefixed; phoneDigits is the 10-digit local portion.
    const customerPhone = phoneDigits ? `+91 ${phoneDigits}` : "";

    if (!customerName) {
      toast.error("Enter your name", {
        description: "The shop needs a name to label your order.",
      });
      nameInputRef.current?.focus();
      return;
    }

    if (phoneDigits.length !== 10) {
      toast.error("Enter a 10-digit phone number", {
        description: "The shop needs a number to confirm your order.",
      });
      phoneInputRef.current?.focus();
      return;
    }

    if (!customerAddress) {
      toast.error("Enter your delivery address", {
        description: "The shop needs somewhere to deliver to.",
      });
      addressInputRef.current?.focus();
      return;
    }

    setLoading(true);
    try {
      await postOrder({
        customer: {
          name: customerName,
          address: customerAddress,
          phone: customerPhone,
          email: customerEmail || undefined,
        },
        products: items.map((item) => ({
          productId: item.productId,
          quantity: `${item.quantity} ${item.unit}`,
        })),
      });
      const snapshot = [...items];
      clearCart();
      window.location.href = buildWhatsAppUrl(
        { name: customerName, address: customerAddress },
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
                <li key={item.productId} className="px-5 py-3">
                  <div className="flex items-start gap-3">
                    <ProductThumb
                      src={item.image}
                      alt={item.name}
                      className="h-10 w-10"
                    />
                    <span className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <span className="text-sm font-medium leading-snug line-clamp-2">
                        {item.name}
                      </span>
                      <span className="text-sm font-bold text-green-700 tabular-nums">
                        {item.quantity}
                        <span className="text-[11px] uppercase tracking-wider text-green-700/70 ml-0.5">
                          {item.unit}
                        </span>
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      aria-label={`Remove ${item.name}`}
                      className="shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-red-50 active:bg-red-100 transition-colors touch-manipulation"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <QtyButtons
                    className="mt-2 rounded-lg border border-green-100"
                    value={item.quantity}
                    unit={item.unit}
                    onChange={(n) =>
                      setItem({
                        productId: item.productId,
                        name: item.name,
                        image: item.image,
                        quantity: n,
                        unit: item.unit,
                      })
                    }
                  />
                </li>
              ))}
            </ul>

            <Separator />

            {/* Delivery details */}
            <div className="px-5 py-5 space-y-4">
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-800">
                Delivery details
              </h2>

              {/* Plain <a>: the browser must leave the SPA for the OAuth round-trip. */}
              {me?.authenticated ? (
                <p className="text-xs text-muted-foreground -mt-2">
                  Your details are filled in below.{" "}
                  <a
                    href="/accounts/logout/?next=/checkout"
                    className="text-green-700 hover:underline"
                  >
                    Not you?
                  </a>
                </p>
              ) : (
                <>
                  <a
                    href="/accounts/google/login/?process=login&next=/checkout"
                    className="flex items-center justify-center gap-2 w-full h-10 rounded-md border border-border bg-white text-sm font-medium text-foreground hover:bg-gray-50 active:bg-gray-100 transition-colors touch-manipulation"
                  >
                    <GoogleG className="h-4 w-4" />
                    Sign in with Google
                  </a>
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    <span className="flex-1 h-px bg-border" />
                    or fill in below
                    <span className="flex-1 h-px bg-border" />
                  </div>
                </>
              )}

              <div className="space-y-1.5">
                <label
                  className="text-sm font-medium flex items-center gap-1"
                  htmlFor="name"
                >
                  Name
                  <span className="text-destructive" aria-hidden>
                    *
                  </span>
                </label>
                <Input
                  ref={nameInputRef}
                  id="name"
                  value={customer.name}
                  onChange={(e) => setCustomer({ name: e.target.value })}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                  className="h-10"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  className="text-sm font-medium flex items-center gap-1"
                  htmlFor="phone"
                >
                  Phone
                  <span className="text-destructive" aria-hidden>
                    *
                  </span>
                </label>
                <div className="flex">
                  <span
                    className="flex items-center px-3 h-10 rounded-l-lg border border-r-0 border-input bg-muted text-sm font-medium text-muted-foreground select-none"
                    aria-hidden
                  >
                    +91
                  </span>
                  <Input
                    ref={phoneInputRef}
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={phoneDigits}
                    onChange={(e) =>
                      setCustomer({
                        phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                      })
                    }
                    placeholder="98765 43210"
                    required
                    className="h-10 rounded-l-none tracking-wide"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  className="text-sm font-medium flex items-center gap-1"
                  htmlFor="email"
                >
                  Email
                  <span className="text-xs text-muted-foreground font-normal">
                    (optional)
                  </span>
                </label>
                <Input
                  id="email"
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer({ email: e.target.value })}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="h-10"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  className="text-sm font-medium flex items-center gap-1"
                  htmlFor="address"
                >
                  Delivery address
                  <span className="text-destructive" aria-hidden>
                    *
                  </span>
                </label>
                <textarea
                  ref={addressInputRef}
                  id="address"
                  value={customer.address}
                  onChange={(e) => setCustomer({ address: e.target.value })}
                  placeholder={"House / shop no., street\nArea, landmark\nCity — Pincode"}
                  autoComplete="street-address"
                  rows={3}
                  required
                  className="w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-2 text-base leading-relaxed placeholder:text-muted-foreground placeholder:whitespace-pre-line focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none resize-y md:text-sm"
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
      <div className="relative max-w-2xl mx-auto h-16 flex items-center justify-center px-3">
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

// Google's official "G" mark — inline SVG to avoid an extra asset round-trip.
function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.2 1.13-.84 2.08-1.78 2.72v2.26h2.88c1.68-1.55 2.66-3.83 2.66-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.46-.8 5.94-2.18l-2.88-2.26c-.8.54-1.82.86-3.06.86-2.35 0-4.34-1.58-5.05-3.71H.92v2.34A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.71A5.41 5.41 0 0 1 3.66 9c0-.59.1-1.17.29-1.71V4.95H.92A8.997 8.997 0 0 0 0 9c0 1.45.35 2.82.92 4.05l3.03-2.34z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.92 4.95l3.03 2.34C4.66 5.16 6.65 3.58 9 3.58z"
      />
    </svg>
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

import Link from "next/link";

const SuccessPage = () => {
  return (
    <main className="px-6 md:px-16 py-24 bg-[#1a1a1a] min-h-screen flex flex-col items-center justify-center text-center">
      <p className="text-[#c9a87c] text-4xl mb-4">✓</p>
      <h1 className="font-serif text-3xl text-white mb-4">Order Placed!</h1>
      <p className="text-[#a89a80] text-sm mb-8">Thank you for your order. We'll be in touch soon.</p>
      <Link href="/products" className="px-8 py-3 bg-[#c9a87c] text-[#1a1a1a] text-xs tracking-[2px] uppercase font-medium hover:bg-[#b8976b] transition-colors">
        Continue Shopping
      </Link>
    </main>
  );
};

export default SuccessPage;
export default function Footer() {
  const links = {
    Shop: ["New Arrivals", "Skincare", "Makeup", "Fragrance", "Hair"],
    Help: ["FAQ", "Shipping", "Returns", "Track Order"],
    Company: ["About", "Careers", "Privacy", "Terms"],
  };

  return (
    <footer className="bg-[#111] border-t border-[rgba(201,168,124,0.15)] px-6 md:px-16 py-12">
      <div className="flex flex-col md:flex-row gap-12 mb-12">
        {/* Brand */}
        <div className="md:w-64">
          <p className="text-xl tracking-[4px] text-white font-medium mb-3">VELOUR</p>
          <p className="text-[#a89a80] text-sm leading-relaxed">
            Curated luxury beauty for every skin, every mood, every moment.
          </p>
        </div>

        {/* Links */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="text-[11px] tracking-[3px] uppercase text-[#c9a87c] mb-4">{group}</p>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[13px] text-[#a89a80] hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[rgba(201,168,124,0.1)] pt-6 flex flex-col md:flex-row justify-between gap-2">
        <p className="text-[11px] text-[#a89a80]">© 2026 Velour. All rights reserved.</p>
        <p className="text-[11px] text-[#a89a80]">Built with Next.js & ❤️</p>
      </div>
    </footer>
  );
}
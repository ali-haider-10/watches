import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-200 bg-[#f7f6f3]">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">Join Our Watch Club</h3>
              <p className="mt-1 text-sm text-gray-600">
                Get launch alerts, exclusive drops, and limited-time offers.
              </p>
            </div>
            <form className="flex w-full max-w-md gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-gray-300 bg-white px-5 py-3 text-sm text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
              <button
                type="submit"
                className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
                <span className="text-xl font-bold text-white">L</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">LUMINA</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              Premium watches for everyday precision and timeless style.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" className="rounded-full border border-gray-200 p-2.5 text-gray-500 transition hover:border-gray-300 hover:text-gray-900" aria-label="Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="rounded-full border border-gray-200 p-2.5 text-gray-500 transition hover:border-gray-300 hover:text-gray-900" aria-label="Instagram">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
              <a href="#" className="rounded-full border border-gray-200 p-2.5 text-gray-500 transition hover:border-gray-300 hover:text-gray-900" aria-label="YouTube">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">Shop</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/products" className="text-sm text-gray-600 transition hover:text-gray-900">
                  All Watches
                </Link>
              </li>
              <li>
                <Link href="/products?category=Men%27s%20Watches" className="text-sm text-gray-600 transition hover:text-gray-900">
                  Men&apos;s Watches
                </Link>
              </li>
              <li>
                <Link href="/products?category=Women%27s%20Watches" className="text-sm text-gray-600 transition hover:text-gray-900">
                  Women&apos;s Watches
                </Link>
              </li>
              <li>
                <Link href="/products?category=Smart%20Watches" className="text-sm text-gray-600 transition hover:text-gray-900">
                  Smart Watches
                </Link>
              </li>
              <li>
                <Link href="/products?category=Couple%20Watches" className="text-sm text-gray-600 transition hover:text-gray-900">
                  Couple Watches
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">Customer Care</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/contact" className="text-sm text-gray-600 transition hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-gray-600 transition hover:text-gray-900">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-600 transition hover:text-gray-900">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/orders/tracking" className="text-sm text-gray-600 transition hover:text-gray-900">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">Company</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/about" className="text-sm text-gray-600 transition hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-sm text-gray-600 transition hover:text-gray-900">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-sm text-gray-600 transition hover:text-gray-900">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} LUMINA Watches. All rights reserved.</p>
            <Link href="/privacy" className="transition hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-gray-900">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="transition hover:text-gray-900">
              Accessibility
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span className="mr-2 text-xs text-gray-500">We accept:</span>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-12 items-center justify-center rounded border border-gray-200 bg-white">
                <svg className="h-4" viewBox="0 0 48 32" fill="none">
                  <rect width="48" height="32" rx="4" fill="white" />
                  <path d="M18.169 21.5h-2.61l1.634-10h2.61l-1.634 10zm11.077-9.76a6.48 6.48 0 00-2.35-.42c-2.596 0-4.425 1.38-4.44 3.354-.015 1.46 1.308 2.274 2.307 2.76 1.025.498 1.37.817 1.366 1.263-.007.682-.82 1-1.577 1-.055 0-.11 0-.163-.003-1.044-.023-1.99-.27-2.773-.57l-.38-.18-.414 2.55c.688.32 1.96.597 3.285.612 2.766 0 4.56-1.364 4.58-3.472.01-1.157-.69-2.037-2.204-2.762-.917-.47-1.48-.784-1.475-1.26 0-.423.476-.875 1.506-.875.86-.013 1.484.184 1.97.39l.236.118.358-2.185m5.494 6.42l1.05-2.84c-.016.038.216-.595.349-.98l.178.887.61 2.934h-2.187zm3.25-6.66h-2.024c-.627 0-1.096.18-1.372.842l-3.894 9.158h2.756l.55-1.514h3.368c.078.352.318 1.514.318 1.514h2.436l-2.138-10zm-22.99 0l-2.373 6.814-.254-1.292c-.44-1.498-1.816-3.126-3.353-3.936l2.354 8.406h2.78l4.13-10h-2.784" fill="#1434CB" />
                </svg>
              </div>
              <div className="flex h-8 w-12 items-center justify-center rounded border border-gray-200 bg-white">
                <svg className="h-5" viewBox="0 0 48 32" fill="none">
                  <rect width="48" height="32" rx="4" fill="white" />
                  <circle cx="18" cy="16" r="9" fill="#EB001B" />
                  <circle cx="30" cy="16" r="9" fill="#F79E1B" />
                  <path d="M24 9.8a9 9 0 000 12.4 9 9 0 000-12.4z" fill="#FF5F00" />
                </svg>
              </div>
              <div className="flex h-8 w-12 items-center justify-center rounded border border-gray-200 bg-[#016FD0]">
                <span className="text-[10px] font-bold text-white">AMEX</span>
              </div>
              <div className="flex h-8 w-12 items-center justify-center rounded border border-gray-200 bg-white">
                <span className="text-[10px] font-bold text-[#003087]">PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

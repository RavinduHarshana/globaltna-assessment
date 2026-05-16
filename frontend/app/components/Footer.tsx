import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              SkillLink
            </h2>

            <p className="text-sm leading-6 text-gray-400">
              Connecting customers with trusted local professionals.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/jobs" className="hover:text-white transition">
                  Browse Jobs
                </Link>
              </li>

              <li>
                <Link href="/jobs/new" className="hover:text-white transition">
                  Post Request
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">
              Categories
            </h3>

            <ul className="space-y-3 text-sm">
              <li>Plumbing</li>
              <li>Electrical</li>
              <li>Painting</li>
              <li>Gardening</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">
              Contact
            </h3>

            <ul className="space-y-3 text-sm">
              <li>📍 Service Board, Sri Lanka</li>
              <li>📧 support@skilllink.com</li>
              <li>📞 +94 770 000 000</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} SkillLink. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CriteriaInfo from "@/components/criteria-info"

export default function InfoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-600">
            Sleep Advisor
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm">
              Masuk
            </Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-12 px-4">
        <CriteriaInfo />
      </div>
    </main>
  )
}

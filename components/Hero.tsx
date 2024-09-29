import { Button } from "@/components/ui/button"
import { BarChart2, BookOpen, Globe, Sparkles } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-28 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 dark:text-white">
            AI-Driven Research Engine for Indian Commercial Courts
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-[800px] mx-auto leading-relaxed">
            Revolutionizing legal research with advanced LLMs, blockchain integration, and multi-lingual support for faster, more accurate justice delivery.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <FeatureItem icon={<BarChart2 className="h-6 w-6" />} text="Intelligent Case Analysis" />
            <FeatureItem icon={<BookOpen className="h-6 w-6" />} text="Comprehensive Legal Database" />
            <FeatureItem icon={<Globe className="h-6 w-6" />} text="Multi-lingual Support" />
            <FeatureItem icon={<Sparkles className="h-6 w-6" />} text="Predictive Analytics" />
          </div>
          <div className="pt-8">
            <Link href="/demo">
              <Button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium py-5 px-8 rounded-md text-lg">
                Experience the Future of Legal Tech
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            Developed for Smart India Hackathon 2024 | Problem Statement ID: SIH1701
          </p>
        </div>
      </div>
    </section>
  )
}

function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-md">
        <div className="text-indigo-600 dark:text-indigo-400">
          {icon}
        </div>
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{text}</span>
    </div>
  )
}

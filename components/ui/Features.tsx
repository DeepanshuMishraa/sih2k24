import React from 'react'
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import {
  BarChart2,
  BookOpen,
  Globe,
  Sparkles,
  Link,
  Shield,
  Mic,
  Network,
  Scale
} from 'lucide-react'

type IconType = typeof BarChart2 | typeof BookOpen | typeof Globe | typeof Sparkles |
                typeof Link | typeof Shield | typeof Mic | typeof Network | typeof Scale

interface FeatureProps {
  icon: IconType
  title: string
  description: string
}

export default function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-primary/10 rounded-full">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

import React from 'react'
import {
  BarChart2,
  BookOpen,
  Globe,
  Sparkles,
  Link,
  Shield,
  Mic,
  Network,
  Scale,
  Clock,
  Search,
  FileText,
  Briefcase,
  Users,
  AlertTriangle
} from 'lucide-react'
import Feature from './ui/Features'

export default function FeaturesSection() {
  const features = [
    {
      icon: BarChart2,
      title: 'Intelligent Case Analysis',
      description: 'Advanced LLMs analyze cases for faster, more accurate insights.'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Legal Database',
      description: 'Access a vast repository of Indian commercial law documents.'
    },
    {
      icon: Globe,
      title: 'Multi-lingual Support',
      description: 'Break language barriers with support for regional languages.'
    },
    {
      icon: Sparkles,
      title: 'Predictive Analytics',
      description: 'Forecast case outcomes based on historical data and patterns.'
    },
    {
      icon: Link,
      title: 'Blockchain Integration',
      description: 'Ensure document authenticity and maintain immutable case records.'
    },
    {
      icon: Shield,
      title: 'Ethical AI Framework',
      description: 'Implement fairness and prevent bias in AI-driven insights.'
    },
    {
      icon: Mic,
      title: 'Voice-Activated Interface',
      description: 'Hands-free operation for efficient courtroom use.'
    },
    {
      icon: Network,
      title: 'Visual Case Mapping',
      description: 'Visualize complex legal relationships and case connections.'
    },
    {
      icon: Scale,
      title: 'Semantic Search',
      description: 'Context-aware search for more relevant results.'
    },
    // Dummy features start here
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Stay informed with instant notifications on case developments.'
    },
    {
      icon: Search,
      title: 'Advanced Citation Analysis',
      description: 'Automatically identify and validate legal citations in documents.'
    },
    {
      icon: FileText,
      title: 'Automated Document Generation',
      description: 'Create legal documents using AI-powered templates and insights.'
    },
    {
      icon: Briefcase,
      title: 'Case Portfolio Management',
      description: 'Organize and track multiple cases with ease and efficiency.'
    },
    {
      icon: Users,
      title: 'Collaborative Workspaces',
      description: 'Enable secure, real-time collaboration among legal teams.'
    },
    {
      icon: AlertTriangle,
      title: 'Risk Assessment Tool',
      description: 'Evaluate potential legal risks and compliance issues proactively.'
    }
  ]

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Key Features of AI-Driven Research Engine
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

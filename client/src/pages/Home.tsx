import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Zap, 
  Target, 
  TrendingUp, 
  Shield, 
  Code2,
  Brain,
  Network,
  ArrowRight,
  Download,
  Moon,
  Sun
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "wouter";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  const features = [
    {
      icon: Target,
      title: "Intent-Based Routing",
      description: "Automatically classifies queries and routes to the most relevant models based on domain expertise.",
      color: "text-cyan-400"
    },
    {
      icon: TrendingUp,
      title: "Weighted Synthesis",
      description: "Trust scores (0.0-1.0) ensure domain experts have more influence in final aggregated outputs.",
      color: "text-blue-400"
    },
    {
      icon: Zap,
      title: "Cost Optimization",
      description: "Only 2-4 relevant models called per query, reducing API costs by 60-80% vs brute force.",
      color: "text-purple-400"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Weighted synthesis produces better answers than simple concatenation or equal-weight averaging.",
      color: "text-pink-400"
    }
  ];

  const models = [
    { name: "ChatGPT", family: "OpenAI", color: "bg-green-500/20 text-green-400 border-green-500/30" },
    { name: "Claude", family: "Anthropic", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    { name: "Gemini", family: "Google", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    { name: "Grok", family: "xAI", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    { name: "DeepSeek", family: "DeepSeek", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
    { name: "Qwen", family: "Alibaba", color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
    { name: "Kimi K2", family: "Moonshot", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    { name: "Manus", family: "Manus AI", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" },
    { name: "Copilot", family: "Microsoft", color: "bg-teal-500/20 text-teal-400 border-teal-500/30" },
    { name: "LLaMA", family: "Meta", color: "bg-red-500/20 text-red-400 border-red-500/30" },
    { name: "Genspark", family: "Genspark", color: "bg-violet-500/20 text-violet-400 border-violet-500/30" },
    { name: "Perplexity", family: "Perplexity", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" }
  ];

  const intents = [
    { name: "Coding", icon: Code2, models: 3, weight: "0.40" },
    { name: "Trading", icon: TrendingUp, models: 3, weight: "0.50" },
    { name: "Writing", icon: Sparkles, models: 3, weight: "0.45" },
    { name: "Research", icon: Brain, models: 3, weight: "0.45" },
    { name: "Automation", icon: Zap, models: 2, weight: "0.55" },
    { name: "Translation", icon: Network, models: 3, weight: "0.50" }
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Network className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Omni-LLM
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('features')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection('models')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Models
            </button>
            <button onClick={() => scrollToSection('routing')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Routing
            </button>
            <Link href="/docs">
              <a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </a>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Link href="/docs">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
              <Sparkles className="w-3 h-3 mr-2" />
              Intelligent Multi-Model Orchestration
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Orchestrate{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                12 LLMs
              </span>
              {" "}with Weighted Intelligence
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A production-ready orchestration layer that unifies ChatGPT, Claude, Gemini, Grok, Perplexity, and 7 more frontier models through OpenRouter with intelligent weighted routing and synthesis.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/chat">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group">
                  Try Chat Interface
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <button onClick={() => scrollToSection('features')}>
                <Button size="lg" variant="outline" className="group">
                  Explore Architecture
                </Button>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">LLM Families</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">10</div>
                <div className="text-sm text-muted-foreground">Intent Categories</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">60-80%</div>
                <div className="text-sm text-muted-foreground">Cost Reduction</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">&lt;3s</div>
                <div className="text-sm text-muted-foreground">Avg Latency</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Why Weighted Routing?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Instead of treating all models equally, assign trust scores based on domain expertise for intelligent synthesis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <feature.icon className={`w-10 h-10 mb-4 ${feature.color}`} />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section id="models" className="py-20 px-4 bg-card/30">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Supported Models</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect to 12 frontier LLM families through OpenRouter for unified orchestration.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {models.map((model, idx) => (
              <Badge 
                key={idx} 
                variant="outline" 
                className={`px-4 py-2 text-sm font-medium border ${model.color} backdrop-blur`}
              >
                {model.name}
                <span className="ml-2 text-xs opacity-70">{model.family}</span>
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Routing Section */}
      <section id="routing" className="py-20 px-4">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Intent-Based Routing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Queries are automatically classified and routed to domain experts with weighted priorities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {intents.map((intent, idx) => (
              <Card key={idx} className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <intent.icon className="w-8 h-8 text-primary" />
                  <Badge variant="secondary" className="text-xs">
                    Weight: {intent.weight}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">{intent.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {intent.models} specialized models
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container">
          <Card className="p-12 bg-gradient-to-br from-primary/10 via-card to-card border-primary/20 backdrop-blur">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-4xl font-bold">Ready to Build?</h2>
              <p className="text-lg text-muted-foreground">
                Download the routing configuration and start orchestrating multiple LLMs with intelligent weighted synthesis.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a href="/routing.yaml" download>
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Download className="w-4 h-4 mr-2" />
                    Download routing.yaml
                  </Button>
                </a>
                <Link href="/docs">
                  <Button size="lg" variant="outline">
                    View Documentation
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-4">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Network className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">Omni-LLM Orchestrator</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built by Sunil Singh · Powered by OpenRouter
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


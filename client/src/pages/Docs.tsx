import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Network, 
  Moon, 
  Sun,
  Book,
  Code2,
  Layers,
  Settings,
  Download,
  ArrowLeft
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "wouter";
import yaml from "js-yaml";

interface RoutingConfig {
  intents: Record<string, {
    description: string;
    models: Array<{
      id: string;
      weight: number;
      rationale: string;
    }>;
  }>;
  synthesis: {
    strategy: string;
    conflict_resolution: string;
    attribution: boolean;
    min_confidence_threshold: number;
  };
}

export default function Docs() {
  const { theme, toggleTheme } = useTheme();
  const [routingConfig, setRoutingConfig] = useState<RoutingConfig | null>(null);
  const [selectedIntent, setSelectedIntent] = useState<string>("coding");

  useEffect(() => {
    fetch('/routing.yaml')
      .then(res => res.text())
      .then(text => {
        const config = yaml.load(text) as RoutingConfig;
        setRoutingConfig(config);
      })
      .catch(err => console.error('Failed to load routing config:', err));
  }, []);

  const downloadFile = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/${filename}`;
    link.download = filename;
    link.click();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-16">
          <Link href="/">
            <a className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Network className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Omni-LLM
              </span>
            </a>
          </Link>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="container max-w-7xl">
          <div className="grid lg:grid-cols-[250px_1fr] gap-8">
            {/* Sidebar */}
            <aside className="space-y-2">
              <div className="sticky top-24">
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Documentation</h3>
                <nav className="space-y-1">
                  <a href="#overview" className="block px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors">
                    Overview
                  </a>
                  <a href="#architecture" className="block px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors">
                    Architecture
                  </a>
                  <a href="#routing" className="block px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors">
                    Routing System
                  </a>
                  <a href="#weights" className="block px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors">
                    Weight Configuration
                  </a>
                  <a href="#synthesis" className="block px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors">
                    Synthesis Strategies
                  </a>
                  <a href="#implementation" className="block px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors">
                    Implementation
                  </a>
                  <a href="#downloads" className="block px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors">
                    Downloads
                  </a>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="space-y-12">
              {/* Overview */}
              <section id="overview" className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold mb-3">Documentation</h1>
                  <p className="text-lg text-muted-foreground">
                    Complete guide to implementing the Omni-LLM Orchestrator with weighted routing.
                  </p>
                </div>

                <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Book className="w-6 h-6 text-primary" />
                    What is Omni-LLM Orchestrator?
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      The Omni-LLM Orchestrator is a production-ready system that unifies multiple frontier LLMs into a single intelligent orchestration layer. Instead of calling a single model or treating all models equally, it implements <strong className="text-foreground">weighted routing</strong> based on domain expertise.
                    </p>
                    <p>
                      When a query arrives, the system classifies its intent (coding, trading, writing, etc.), selects 2-4 relevant domain expert models, calls them in parallel via OpenRouter, and synthesizes their responses using configurable trust weights.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 pt-4">
                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <div className="text-2xl font-bold text-primary mb-1">12</div>
                        <div className="text-sm">LLM Families</div>
                      </div>
                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <div className="text-2xl font-bold text-primary mb-1">10</div>
                        <div className="text-sm">Intent Categories</div>
                      </div>
                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <div className="text-2xl font-bold text-primary mb-1">60-80%</div>
                        <div className="text-sm">Cost Reduction</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>

              {/* Architecture */}
              <section id="architecture" className="space-y-6">
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  <Layers className="w-7 h-7 text-primary" />
                  Architecture
                </h2>

                <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">System Flow</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">1</div>
                          <div>
                            <div className="font-medium">User Query</div>
                            <div className="text-sm text-muted-foreground">User submits a natural language query</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">2</div>
                          <div>
                            <div className="font-medium">Intent Classification</div>
                            <div className="text-sm text-muted-foreground">System classifies query into intent category</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">3</div>
                          <div>
                            <div className="font-medium">Model Selection</div>
                            <div className="text-sm text-muted-foreground">Router selects 2-4 domain expert models with weights</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">4</div>
                          <div>
                            <div className="font-medium">Parallel API Calls</div>
                            <div className="text-sm text-muted-foreground">All selected models called simultaneously via OpenRouter</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">5</div>
                          <div>
                            <div className="font-medium">Weighted Synthesis</div>
                            <div className="text-sm text-muted-foreground">Responses merged based on trust weights</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">6</div>
                          <div>
                            <div className="font-medium">Unified Response</div>
                            <div className="text-sm text-muted-foreground">Single coherent answer returned to user</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>

              {/* Routing System */}
              <section id="routing" className="space-y-6">
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  <Network className="w-7 h-7 text-primary" />
                  Routing System
                </h2>

                <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
                  <h3 className="text-xl font-semibold mb-4">Intent Categories</h3>
                  
                  {routingConfig && (
                    <Tabs value={selectedIntent} onValueChange={setSelectedIntent}>
                      <TabsList className="grid grid-cols-3 lg:grid-cols-5 gap-2 h-auto bg-transparent">
                        {Object.keys(routingConfig.intents).slice(0, 10).map((intent) => (
                          <TabsTrigger 
                            key={intent} 
                            value={intent}
                            className="capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                          >
                            {intent}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {Object.entries(routingConfig.intents).map(([intent, config]) => (
                        <TabsContent key={intent} value={intent} className="mt-6 space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Description</h4>
                            <p className="text-muted-foreground">{config.description}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3">Selected Models</h4>
                            <div className="space-y-3">
                              {config.models.map((model, idx) => (
                                <div key={idx} className="p-4 rounded-lg bg-muted/50 border border-border/50">
                                  <div className="flex items-start justify-between mb-2">
                                    <code className="text-sm font-mono text-primary">{model.id}</code>
                                    <Badge variant="secondary">Weight: {model.weight}</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{model.rationale}</p>
                                  
                                  {/* Weight bar */}
                                  <div className="mt-3">
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                                        style={{ width: `${model.weight * 100}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  )}
                </Card>
              </section>

              {/* Weights */}
              <section id="weights" className="space-y-6">
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  <Settings className="w-7 h-7 text-primary" />
                  Weight Configuration
                </h2>

                <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Understanding Weights</h3>
                      <p className="text-muted-foreground mb-4">
                        Weights are trust scores (0.0 - 1.0) that determine how much influence each model has during synthesis. Higher weights mean more influence in the final aggregated output.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                          <div className="font-semibold mb-2">0.0 - 0.2</div>
                          <div className="text-sm text-muted-foreground">Low influence (supplementary perspective)</div>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                          <div className="font-semibold mb-2">0.2 - 0.4</div>
                          <div className="text-sm text-muted-foreground">Moderate influence (supporting analysis)</div>
                        </div>
                        <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                          <div className="font-semibold mb-2">0.4 - 0.6</div>
                          <div className="text-sm text-muted-foreground">High influence (primary contributor)</div>
                        </div>
                        <div className="p-4 rounded-lg bg-primary/20 border border-primary/40">
                          <div className="font-semibold mb-2">0.6 - 1.0</div>
                          <div className="text-sm text-muted-foreground">Dominant influence (domain expert)</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Example: Trading Intent</h3>
                      <div className="space-y-3">
                        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                          <div className="flex items-center justify-between mb-2">
                            <code className="text-sm font-mono">deepseek/deepseek-r1</code>
                            <Badge>0.50</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Domain expert in quantitative finance</p>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: '50%' }} />
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                          <div className="flex items-center justify-between mb-2">
                            <code className="text-sm font-mono">qwen/qwen-2.5-72b</code>
                            <Badge>0.30</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Strong mathematical precision</p>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: '30%' }} />
                          </div>
                        </div>

                        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                          <div className="flex items-center justify-between mb-2">
                            <code className="text-sm font-mono">openai/gpt-4.1</code>
                            <Badge>0.20</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">Balanced reasoning for synthesis</p>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: '20%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>

              {/* Synthesis */}
              <section id="synthesis" className="space-y-6">
                <h2 className="text-3xl font-bold">Synthesis Strategies</h2>

                {routingConfig && (
                  <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Current Configuration</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                            <div className="text-sm text-muted-foreground mb-1">Strategy</div>
                            <div className="font-semibold capitalize">{routingConfig.synthesis.strategy.replace('_', ' ')}</div>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                            <div className="text-sm text-muted-foreground mb-1">Conflict Resolution</div>
                            <div className="font-semibold capitalize">{routingConfig.synthesis.conflict_resolution.replace('_', ' ')}</div>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                            <div className="text-sm text-muted-foreground mb-1">Attribution</div>
                            <div className="font-semibold">{routingConfig.synthesis.attribution ? 'Enabled' : 'Disabled'}</div>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                            <div className="text-sm text-muted-foreground mb-1">Min Confidence</div>
                            <div className="font-semibold">{routingConfig.synthesis.min_confidence_threshold}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-3">Available Strategies</h3>
                        <div className="space-y-3">
                          <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                            <div className="font-semibold mb-1">Weighted Average (Default)</div>
                            <p className="text-sm text-muted-foreground">Combines responses proportionally to their weights. Higher-weighted models have more influence.</p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                            <div className="font-semibold mb-1">Consensus</div>
                            <p className="text-sm text-muted-foreground">Identifies common themes across all models, useful for validation.</p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                            <div className="font-semibold mb-1">Best-of-N</div>
                            <p className="text-sm text-muted-foreground">Selects the single best response based on weight and quality metrics.</p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                            <div className="font-semibold mb-1">Ensemble</div>
                            <p className="text-sm text-muted-foreground">Creates structured output showing all perspectives with clear attribution.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </section>

              {/* Implementation */}
              <section id="implementation" className="space-y-6">
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  <Code2 className="w-7 h-7 text-primary" />
                  Implementation
                </h2>

                <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
                  <h3 className="text-xl font-semibold mb-4">Quick Start</h3>
                  
                  <Tabs defaultValue="nodejs">
                    <TabsList>
                      <TabsTrigger value="nodejs">Node.js</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                    </TabsList>

                    <TabsContent value="nodejs" className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">1. Install Dependencies</h4>
                        <pre className="p-4 rounded-lg bg-muted/50 border border-border/50 overflow-x-auto">
                          <code className="text-sm">npm install js-yaml node-fetch</code>
                        </pre>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">2. Load Configuration</h4>
                        <pre className="p-4 rounded-lg bg-muted/50 border border-border/50 overflow-x-auto">
                          <code className="text-sm">{`import yaml from "js-yaml";
import fs from "fs";

const routing = yaml.load(
  fs.readFileSync("routing.yaml", "utf8")
);`}</code>
                        </pre>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">3. Get Models for Intent</h4>
                        <pre className="p-4 rounded-lg bg-muted/50 border border-border/50 overflow-x-auto">
                          <code className="text-sm">{`function getModelsForIntent(intent) {
  const config = routing.intents[intent];
  return config.models;
}

const models = getModelsForIntent("trading");
// Returns models with weights`}</code>
                        </pre>
                      </div>
                    </TabsContent>

                    <TabsContent value="python" className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">1. Install Dependencies</h4>
                        <pre className="p-4 rounded-lg bg-muted/50 border border-border/50 overflow-x-auto">
                          <code className="text-sm">pip install pyyaml requests</code>
                        </pre>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">2. Load Configuration</h4>
                        <pre className="p-4 rounded-lg bg-muted/50 border border-border/50 overflow-x-auto">
                          <code className="text-sm">{`import yaml

with open("routing.yaml", "r") as f:
    routing = yaml.safe_load(f)`}</code>
                        </pre>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">3. Get Models for Intent</h4>
                        <pre className="p-4 rounded-lg bg-muted/50 border border-border/50 overflow-x-auto">
                          <code className="text-sm">{`def get_models_for_intent(intent: str):
    config = routing["intents"][intent]
    return config["models"]

models = get_models_for_intent("trading")
# Returns models with weights`}</code>
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </section>

              {/* Downloads */}
              <section id="downloads" className="space-y-6">
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  <Download className="w-7 h-7 text-primary" />
                  Downloads
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
                    <h3 className="text-lg font-semibold mb-2">routing.yaml</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Intent-to-model mapping with weighted scoring configuration
                    </p>
                    <Button 
                      className="w-full" 
                      onClick={() => downloadFile('routing.yaml')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </Card>

                  <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
                    <h3 className="text-lg font-semibold mb-2">config.yaml</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Master model registry with metadata and classifications
                    </p>
                    <Button 
                      className="w-full" 
                      onClick={() => downloadFile('config.yaml')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </Card>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}


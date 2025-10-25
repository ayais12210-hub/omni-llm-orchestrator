import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Send,
  Mic,
  Paperclip,
  Camera,
  Image as ImageIcon,
  File,
  Video,
  Music,
  Sparkles,
  Settings,
  Volume2,
  Copy,
  RotateCcw,
  Share2,
  ChevronRight,
  Globe,
  Clock,
} from "lucide-react";
import { Link } from "wouter";
import { APP_LOGO } from "@/const";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  model?: string;
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState("auto");
  const [isRecording, setIsRecording] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [responseStyle, setResponseStyle] = useState("normal");
  const [extendedThinking, setExtendedThinking] = useState(false);
  const [webSearch, setWebSearch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const models = [
    { id: "auto", name: "Auto", description: "Chooses best model for task", icon: Sparkles },
    { id: "openai/gpt-4.1", name: "GPT-4.1", family: "OpenAI" },
    { id: "anthropic/claude-3.5-sonnet", name: "Claude 3.5", family: "Anthropic" },
    { id: "google/gemini-2.5-pro", name: "Gemini 2.5 Pro", family: "Google" },
    { id: "xai/grok-2-beta", name: "Grok 2", family: "xAI" },
    { id: "deepseek/deepseek-r1", name: "DeepSeek R1", family: "DeepSeek" },
    { id: "perplexity/llama-3.1-sonar-large-128k-online", name: "Perplexity Sonar", family: "Perplexity" },
  ];

  const suggestions = [
    "Explain quantum computing in simple terms",
    "Write a Python script for data analysis",
    "Help me plan a marketing strategy",
    "Generate creative content ideas",
  ];

  const responseStyles = [
    { id: "normal", name: "Normal", description: "Default responses" },
    { id: "learning", name: "Learning", description: "Patient, educational responses" },
    { id: "concise", name: "Concise", description: "Shorter responses & more messages" },
    { id: "explanatory", name: "Explanatory", description: "Educational responses for learning" },
    { id: "formal", name: "Formal", description: "Clear and well-structured responses" },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "This is a demo response. In production, this would connect to your orchestrator backend and route the query through the appropriate LLM based on intent detection and weighted routing.",
        model: selectedModel === "auto" ? "openai/gpt-4.1" : selectedModel,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (type: string) => {
    console.log(`Upload ${type}`);
    // Implement file upload logic
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Implement voice recording logic
  };

  const speakMessage = (text: string) => {
    // Implement TTS logic
    console.log("Speaking:", text);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                <img src={APP_LOGO} alt="Logo" className="w-8 h-8" />
                <span className="text-xl font-bold">Omni-LLM</span>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-[200px] bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      <div className="flex items-center gap-2">
                        {model.id === "auto" && <Sparkles className="w-4 h-4 text-primary" />}
                        <span>{model.name}</span>
                        {model.family && (
                          <span className="text-xs text-muted-foreground">({model.family})</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowSettings(true)}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {messages.length === 0 ? (
            <div className="text-center space-y-8 py-12">
              <div className="space-y-3">
                <h1 className="text-4xl font-bold">
                  What can I help you with?
                </h1>
                <p className="text-muted-foreground">
                  Ask anything - the orchestrator will route your query to the best model
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {suggestions.map((suggestion, idx) => (
                  <Card
                    key={idx}
                    className="p-4 cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => setInput(suggestion)}
                  >
                    <p className="text-sm">{suggestion}</p>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === "user" ? "justify-end" : ""}`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                  )}

                  <div className={`flex-1 max-w-[80%] space-y-2`}>
                    <Card className={`p-4 ${message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-card"}`}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </Card>

                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {message.model && (
                          <Badge variant="outline" className="text-xs">
                            {models.find(m => m.id === message.model)?.name}
                          </Badge>
                        )}
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => navigator.clipboard.writeText(message.content)}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => speakMessage(message.content)}
                          >
                            <Volume2 className="w-3 h-3 mr-1" />
                            Speak
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 px-2">
                            <RotateCcw className="w-3 h-3 mr-1" />
                            Regenerate
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium">U</span>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  </div>
                  <Card className="p-4 bg-card">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </Card>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border/40 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="relative">
            <Card className="p-2 bg-background">
              <div className="flex items-end gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="flex-shrink-0">
                      <Paperclip className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuItem onClick={() => handleFileUpload("camera")}>
                      <Camera className="w-4 h-4 mr-2" />
                      Use Camera
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFileUpload("image")}>
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Upload Image
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFileUpload("video")}>
                      <Video className="w-4 h-4 mr-2" />
                      Upload Video
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleFileUpload("audio")}>
                      <Music className="w-4 h-4 mr-2" />
                      Upload Audio
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleFileUpload("file")}>
                      <File className="w-4 h-4 mr-2" />
                      Upload Files
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything..."
                  className="min-h-[44px] max-h-[200px] resize-none border-0 focus-visible:ring-0 bg-transparent"
                  rows={1}
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className={`flex-shrink-0 ${isRecording ? "text-red-500" : ""}`}
                  onClick={toggleRecording}
                >
                  <Mic className={`w-5 h-5 ${isRecording ? "animate-pulse" : ""}`} />
                </Button>

                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="flex-shrink-0 bg-primary hover:bg-primary/90"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </div>

          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3" />
              <span>Web search: {webSearch ? "On" : "Off"}</span>
            </div>
            {extendedThinking && (
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>Extended thinking enabled</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span>Style: {responseStyles.find(s => s.id === responseStyle)?.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Chat Settings</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Response Style */}
            <div className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <span>Response Style</span>
              </h3>
              <div className="space-y-2">
                {responseStyles.map((style) => (
                  <Card
                    key={style.id}
                    className={`p-3 cursor-pointer transition-colors ${
                      responseStyle === style.id ? "bg-primary/10 border-primary" : "hover:bg-accent"
                    }`}
                    onClick={() => setResponseStyle(style.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{style.name}</div>
                        <div className="text-xs text-muted-foreground">{style.description}</div>
                      </div>
                      {responseStyle === style.id && (
                        <ChevronRight className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Advanced Options */}
            <div className="space-y-3">
              <h3 className="font-medium">Advanced Options</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Extended Thinking</div>
                  <div className="text-xs text-muted-foreground">Deeper analysis, slower responses</div>
                </div>
                <Switch checked={extendedThinking} onCheckedChange={setExtendedThinking} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Web Search</div>
                  <div className="text-xs text-muted-foreground">Search across the internet</div>
                </div>
                <Switch checked={webSearch} onCheckedChange={setWebSearch} />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


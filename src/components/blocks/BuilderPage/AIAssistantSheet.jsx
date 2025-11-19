import { AlertCircleIcon, LogIn, MessageSquareIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Context,
  ContextContent,
  ContextContentBody,
  ContextContentHeader,
  ContextTrigger,
} from "@/components/ai-elements/context";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputProvider,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Suggestion } from "@/components/ai-elements/suggestion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";

const PROMPT_TEMPLATES = [
  { id: 1, text: "How do I format text in markdown?" },
  { id: 2, text: "Show me how to create a table" },
  { id: 3, text: "How do I add links?" },
  { id: 4, text: "Explain markdown headings" },
];

const SUBMITTING_TIMEOUT = 200;
const STREAMING_TIMEOUT = 2000;
const MAX_REQUESTS_PER_MONTH = 3;
const STORAGE_KEY = "ai_assistant_usage";

// Helper to get current month key
const getCurrentMonthKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}`;
};

// Helper to get usage data from localStorage
const getUsageData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

// Helper to save usage data to localStorage
const saveUsageData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save usage data:", error);
  }
};

export default function AIAssistantSheet({ open, onOpenChange }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState("ready");
  const [messages, setMessages] = useState([]);
  const [requestsRemaining, setRequestsRemaining] = useState(MAX_REQUESTS_PER_MONTH);
  const textareaRef = useRef(null);

  // Load usage data on mount
  useEffect(() => {
    const monthKey = getCurrentMonthKey();
    const usageData = getUsageData();
    const currentMonthUsage = usageData[monthKey] || 0;
    setRequestsRemaining(MAX_REQUESTS_PER_MONTH - currentMonthUsage);
  }, []);

  const handleSubmit = (message) => {
    const hasText = Boolean(message.text);

    if (!hasText) {
      return;
    }

    // Check if user has requests remaining
    if (requestsRemaining <= 0) {
      const errorMessage = {
        key: nanoid(),
        value: "You've reached your monthly limit of 3 requests. Your limit will reset next month.",
        from: "assistant",
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    setStatus("submitted");

    // Add user message
    const userMessage = {
      key: nanoid(),
      value: message.text,
      from: "user",
    };
    setMessages((prev) => [...prev, userMessage]);

    // Update usage count
    const monthKey = getCurrentMonthKey();
    const usageData = getUsageData();
    const currentMonthUsage = (usageData[monthKey] || 0) + 1;
    usageData[monthKey] = currentMonthUsage;
    saveUsageData(usageData);
    setRequestsRemaining(MAX_REQUESTS_PER_MONTH - currentMonthUsage);

    setTimeout(() => {
      setStatus("streaming");
    }, SUBMITTING_TIMEOUT);

    // Simulate assistant response with context-aware replies
    setTimeout(() => {
      const userText = message.text.toLowerCase();
      let responseText = "I'm here to help with your markdown document. ";

      if (userText.includes("format") || userText.includes("style")) {
        responseText +=
          "You can format text using markdown syntax like **bold**, *italic*, or `code`. Would you like specific formatting help?";
      } else if (userText.includes("table")) {
        responseText +=
          "To create a table, use pipes (|) and hyphens (-). For example:\n\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |";
      } else if (userText.includes("link")) {
        responseText += "To add a link, use this syntax: [link text](https://example.com)";
      } else if (userText.includes("image") || userText.includes("picture")) {
        responseText += "To add an image, use: ![alt text](image-url.jpg)";
      } else if (userText.includes("list")) {
        responseText += "For bullet lists use -, *, or +. For numbered lists use 1., 2., etc.";
      } else if (userText.includes("heading") || userText.includes("title")) {
        responseText += "Use # for headings. # for H1, ## for H2, ### for H3, and so on.";
      } else {
        responseText +=
          "I can help you with markdown formatting, tables, links, lists, headings, and more. What would you like to know?";
      }

      const assistantMessage = {
        key: nanoid(),
        value: responseText,
        from: "assistant",
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setStatus("ready");
    }, STREAMING_TIMEOUT);
  };

  const handleTemplateClick = (templateText) => {
    if (requestsRemaining > 0) {
      handleSubmit({ text: templateText });
    }
  };

  const handleLoginClick = () => {
    onOpenChange(false);
    navigate("/login");
  };

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="w-full sm:w-[400px] md:w-[500px] sm:max-w-none flex flex-col p-0"
        >
          <div className="border-b px-4 py-3 h-16">
            <h2 className="text-lg font-semibold">AI Assistant</h2>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <LogIn className="size-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Login Required</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              The AI Assistant is available exclusively for logged-in users. Sign in to get help
              with your markdown documents.
            </p>
            <div className="flex gap-3">
              <Button onClick={handleLoginClick}>
                <LogIn className="size-4 mr-2" />
                Sign In
              </Button>
              <Button variant="outline" onClick={() => navigate("/signup")}>
                Create Account
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:w-[400px] md:w-[500px] sm:max-w-none flex flex-col p-0"
      >
        <div className="border-b px-4 py-3 h-16">
          <h2 className="text-lg font-semibold">AI Assistant</h2>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <Conversation className="flex-1">
            <ConversationContent>
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6">
                  <ConversationEmptyState
                    description="Start a conversation with the AI assistant to get help with your markdown document."
                    icon={<MessageSquareIcon className="size-6" />}
                    title="No messages yet"
                  />
                  <div className="mt-6 w-full max-w-md space-y-2">
                    <p className="text-sm text-muted-foreground mb-3">Try these prompts:</p>
                    {PROMPT_TEMPLATES.map((template) => (
                      <Suggestion
                        key={template.id}
                        onClick={() => handleTemplateClick(template.text)}
                        disabled={requestsRemaining === 0}
                      >
                        {template.text}
                      </Suggestion>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map(({ key, value, from }) => (
                  <Message from={from} key={key}>
                    <MessageContent>{value}</MessageContent>
                  </Message>
                ))
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
          <div className="p-4 border-t space-y-3">
            {requestsRemaining === 0 && (
              <Alert variant="destructive">
                <AlertCircleIcon className="h-4 w-4" />
                <AlertDescription>
                  You've used all 3 requests this month. Your limit resets next month.
                </AlertDescription>
              </Alert>
            )}
            <PromptInputProvider>
              <PromptInput onSubmit={handleSubmit}>
                <PromptInputBody>
                  <PromptInputTextarea
                    ref={textareaRef}
                    placeholder={
                      requestsRemaining > 0
                        ? "Ask me anything about markdown..."
                        : "Monthly limit reached"
                    }
                    disabled={requestsRemaining === 0}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Context
                      usedTokens={MAX_REQUESTS_PER_MONTH - requestsRemaining}
                      maxTokens={MAX_REQUESTS_PER_MONTH}
                    >
                      <ContextTrigger />
                      <ContextContent>
                        <ContextContentHeader />
                        <ContextContentBody>
                          <div className="text-sm">
                            <p className="text-muted-foreground">
                              You have {requestsRemaining} of {MAX_REQUESTS_PER_MONTH} requests
                              remaining this month.
                            </p>
                          </div>
                        </ContextContentBody>
                      </ContextContent>
                    </Context>
                  </div>
                </PromptInputBody>
                <PromptInputFooter>
                  <PromptInputSubmit status={status} disabled={requestsRemaining === 0} />
                </PromptInputFooter>
              </PromptInput>
            </PromptInputProvider>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

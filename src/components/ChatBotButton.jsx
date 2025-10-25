import { MessageCircle, Mic, MicOff, Send, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const ChatBotButton = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [speakingMsgIndex, setSpeakingMsgIndex] = useState(null);

  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  const currentUtteranceRef = useRef(null);

  const suggestedPrompts = [
    "How do I report a civic issue?",
    "Take me to the dashboard",
    "How to create a new report?",
    "Show me the issue feed",
  ];

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = () => setIsListening(false);
      recognitionInstance.onend = () => setIsListening(false);

      setRecognition(recognitionInstance);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const stopTTS = () => {
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsSpeaking(false);
    setSpeakingMsgIndex(null);
  };

  const speakText = async (text, language = "en", index = null) => {
    if (isSpeaking && speakingMsgIndex === index) {
      stopTTS();
      return;
    }

    stopTTS();
    setIsSpeaking(true);
    setSpeakingMsgIndex(index);

    try {
      const response = await fetch("http://localhost:5000/speakBot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, language }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        if (audioRef.current) {
          audioRef.current.src = audioUrl;
          audioRef.current.onended = stopTTS;
          audioRef.current.onerror = stopTTS;
          await audioRef.current.play();
        }
      } else throw new Error("TTS service unavailable");
    } catch {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === "hi" ? "hi-IN" : "en-US";
        utterance.onend = stopTTS;
        utterance.onerror = stopTTS;
        currentUtteranceRef.current = utterance;
        speechSynthesis.speak(utterance);
      } else stopTTS();
    }
  };

  const handleSend = async (prompt) => {
    const currentInput = (typeof prompt === "string" ? prompt : input).trim();
    if (!currentInput) return;

    const userMsg = { from: "user", text: currentInput, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chatBot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput, language: null }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const res = await response.json();

      const botReply = res.data?.reply || "Sorry, I couldn't get a response.";
      const detectedLanguage = res.data?.language || "en";
      const languageName = res.data?.language_name || "English";

      const botMsg = {
        from: "bot",
        text: botReply,
        timestamp: Date.now(),
        language: detectedLanguage,
        languageName,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg = {
        from: "bot",
        text: "Sorry, something went wrong. Please make sure the server is running.",
        timestamp: Date.now(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ from: "bot", text: "Hi! I'm CivicAssist. How can I help you today?" }]);
    }
  }, [isOpen, messages.length]);

  return (
    <>
      <audio ref={audioRef} style={{ display: "none" }} />
      <div className="fixed bottom-6 right-6 z-50">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button className="rounded-full h-14 w-14 p-0 shadow-lg">
              <MessageCircle className="w-6 h-6" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            side="top"
            align="end"
            sideOffset={12}
            className="w-[90vw] max-w-[400px] h-[70vh] sm:h-[600px] flex flex-col p-0 rounded-xl shadow-xl"
          >
            <div className="border-b px-4 py-2 text-sm font-semibold flex justify-between items-center">
              CivicAssist
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setIsOpen(false)}
              >
                &times;
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
              {messages.map((msg, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div
                    className={`px-3 py-2 rounded-lg max-w-[85%] whitespace-pre-wrap ${
                      msg.from === "user"
                        ? "ml-auto bg-primary text-primary-foreground"
                        : msg.isError
                          ? "bg-destructive/10 text-destructive border border-destructive/20"
                          : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.from === "bot" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0"
                      onClick={() => speakText(msg.text, msg.language || "en", index)}
                    >
                      {isSpeaking && speakingMsgIndex === index ? (
                        <VolumeX className="h-3 w-3" />
                      ) : (
                        <Volume2 className="h-3 w-3" />
                      )}
                    </Button>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground px-3 py-2 rounded-lg max-w-[85%]">
                    ...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 1 && !isLoading && (
              <div className="p-4 border-t">
                <p className="text-xs text-muted-foreground mb-2 font-medium">
                  Or try one of these prompts:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((prompt, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="text-xs h-auto py-1.5 text-wrap text-left"
                      onClick={() => handleSend(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t p-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask CivicAssist anything..."
                  className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                />

                {recognition && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={isListening ? stopListening : startListening}
                    disabled={isLoading}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                )}

                <Button type="submit" size="sm" disabled={isLoading}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>

              {(isListening || isSpeaking) && (
                <div className="mt-2 flex gap-2 justify-center">
                  {isListening && (
                    <Badge variant="secondary" className="text-xs">
                      🎤 Listening...
                    </Badge>
                  )}
                  {isSpeaking && (
                    <Badge variant="secondary" className="text-xs">
                      🔊 Speaking...
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default ChatBotButton;

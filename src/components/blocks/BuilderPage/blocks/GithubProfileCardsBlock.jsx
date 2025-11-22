import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  CreditCard,
  Github,
  Maximize,
  Plus,
  Trash2,
} from "lucide-react";
import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const COUNTRIES_WITH_UTC = [
  { name: "United States (EST)", offset: "-5" },
  { name: "United States (PST)", offset: "-8" },
  { name: "United Kingdom", offset: "0" },
  { name: "Germany", offset: "1" },
  { name: "India", offset: "5.5" },
  { name: "China", offset: "8" },
  { name: "Japan", offset: "9" },
  { name: "Brazil", offset: "-3" },
  { name: "South Korea", offset: "9" },
  { name: "Singapore", offset: "8" },
];

const THEMES = [
  { value: "default", label: "Default" },
  { value: "material_palenight", label: "Material Palenight" },
  { value: "solarized", label: "Solarized" },
  { value: "solarized_dark", label: "Solarized Dark" },
  { value: "github", label: "GitHub" },
  { value: "github_dark", label: "GitHub Dark" },
  { value: "vue", label: "Vue" },
  { value: "dracula", label: "Dracula" },
  { value: "monokai", label: "Monokai" },
  { value: "nord_dark", label: "Nord Dark" },
];

const CARD_TYPES = [
  { value: "profile-details", label: "Profile Details" },
  { value: "repos-per-language", label: "Repos per Language" },
  { value: "most-commit-language", label: "Most Commit Language" },
  { value: "stats", label: "Stats" },
  { value: "productive-time", label: "Productive Time" },
];

const GithubProfileCardsBlock = memo(function GithubProfileCardsBlock({ block, onUpdate }) {
  const cards = block.cards || [
    {
      cardType: "profile-details",
      theme: "github_dark",
      utcOffset: "8",
      height: "",
      width: "",
    },
  ];
  const username = block.username || "";
  const align = block.align || "left";

  const handleUpdate = useCallback(
    (updates) => {
      onUpdate(block.id, { ...block, ...updates });
    },
    [block, onUpdate]
  );

  const handleCardChange = useCallback(
    (index, field, value) => {
      const newCards = [...cards];
      newCards[index] = { ...newCards[index], [field]: value };
      handleUpdate({ cards: newCards });
    },
    [cards, handleUpdate]
  );

  const addCard = useCallback(() => {
    const newCards = [
      ...cards,
      {
        cardType: "stats",
        theme: "github_dark",
        utcOffset: "8",
        height: "",
        width: "",
      },
    ];
    handleUpdate({ cards: newCards });
  }, [cards, handleUpdate]);

  const removeCard = useCallback(
    (index) => {
      if (cards.length === 1) return;
      const newCards = cards.filter((_, i) => i !== index);
      handleUpdate({ cards: newCards });
    },
    [cards, handleUpdate]
  );

  const generateCardUrl = useCallback(
    (card) => {
      if (!username.trim()) return null;
      const baseUrl = "http://github-profile-summary-cards.vercel.app/api/cards";
      let url = `${baseUrl}/${card.cardType}?username=${username}&theme=${card.theme}`;
      if (card.cardType === "productive-time") {
        url += `&utcOffset=${card.utcOffset}`;
      }
      return url;
    },
    [username]
  );

  return (
    <div className="group relative rounded-md border border-border bg-background transition-all focus-within:border-ring">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/40 bg-muted/10">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <CreditCard className="h-3.5 w-3.5" />
          <span>Profile Cards</span>
        </div>

        <ButtonGroup className="bg-background/80">
          <Button variant="ghost" size="sm" onClick={addCard} className="h-7 text-xs gap-1.5 px-2">
            <Plus className="h-3 w-3" /> Add Card
          </Button>

          <ButtonGroupSeparator />

          <Button
            variant={align === "left" ? "secondary" : "ghost"}
            size="icon"
            className="h-7 w-7"
            onClick={() => handleUpdate({ align: "left" })}
          >
            <AlignLeft className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={align === "center" ? "secondary" : "ghost"}
            size="icon"
            className="h-7 w-7"
            onClick={() => handleUpdate({ align: "center" })}
          >
            <AlignCenter className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={align === "right" ? "secondary" : "ghost"}
            size="icon"
            className="h-7 w-7"
            onClick={() => handleUpdate({ align: "right" })}
          >
            <AlignRight className="h-3.5 w-3.5" />
          </Button>
        </ButtonGroup>
      </div>

      <div className="p-3 space-y-3">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Github className="h-3.5 w-3.5" />
          </div>
          <Input
            value={username}
            onChange={(e) => handleUpdate({ username: e.target.value })}
            placeholder="GitHub Username (required to view preview)"
            className="pl-9 border-0 bg-muted/20 h-9 shadow-none focus-visible:ring-1 focus-visible:bg-background transition-colors text-sm"
          />
        </div>

        {cards.map((card, index) => {
          const previewUrl = generateCardUrl(card);

          return (
            <div
              key={index}
              className="rounded-md border border-border/50 bg-background p-3 space-y-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  Card {index + 1}
                </span>
                {cards.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCard(index)}
                    className="h-5 w-5 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Select
                  value={card.cardType}
                  onValueChange={(val) => handleCardChange(index, "cardType", val)}
                >
                  <SelectTrigger className="h-8 text-xs bg-muted/5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CARD_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value} className="text-xs">
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={card.theme}
                  onValueChange={(val) => handleCardChange(index, "theme", val)}
                >
                  <SelectTrigger className="h-8 text-xs bg-muted/5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {THEMES.map((t) => (
                      <SelectItem key={t.value} value={t.value} className="text-xs">
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {card.cardType === "productive-time" && (
                <Select
                  value={card.utcOffset}
                  onValueChange={(val) => handleCardChange(index, "utcOffset", val)}
                >
                  <SelectTrigger className="h-8 text-xs bg-muted/5">
                    <SelectValue placeholder="Select Timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES_WITH_UTC.map((c, i) => (
                      <SelectItem key={i} value={c.offset} className="text-xs">
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50">
                    <Maximize className="h-3 w-3" />
                  </div>
                  <Input
                    value={card.width}
                    onChange={(e) => handleCardChange(index, "width", e.target.value)}
                    placeholder="Width (e.g. 100%)"
                    className="h-8 text-xs pl-7 bg-muted/5"
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50">
                    <Maximize className="h-3 w-3 rotate-90" />
                  </div>
                  <Input
                    value={card.height}
                    onChange={(e) => handleCardChange(index, "height", e.target.value)}
                    placeholder="Height"
                    className="h-8 text-xs pl-7 bg-muted/5"
                  />
                </div>
              </div>

              {previewUrl && username.trim() && (
                <div
                  className={cn(
                    "rounded bg-muted/5 p-2 flex overflow-hidden",
                    align === "center"
                      ? "justify-center"
                      : align === "right"
                        ? "justify-end"
                        : "justify-start"
                  )}
                >
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-w-full h-auto rounded-sm shadow-sm"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default GithubProfileCardsBlock;

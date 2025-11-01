import { CreditCard, Plus, Trash2 } from "lucide-react";
import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Common countries with their UTC offsets
const COUNTRIES_WITH_UTC = [
  { name: "United States (EST)", offset: "-5" },
  { name: "United States (PST)", offset: "-8" },
  { name: "United Kingdom", offset: "0" },
  { name: "Germany", offset: "1" },
  { name: "France", offset: "1" },
  { name: "India", offset: "5.5" },
  { name: "China", offset: "8" },
  { name: "Japan", offset: "9" },
  { name: "Australia (Sydney)", offset: "11" },
  { name: "Brazil", offset: "-3" },
  { name: "Canada (EST)", offset: "-5" },
  { name: "Russia (Moscow)", offset: "3" },
  { name: "South Korea", offset: "9" },
  { name: "Singapore", offset: "8" },
  { name: "UAE", offset: "4" },
  { name: "Netherlands", offset: "1" },
  { name: "Spain", offset: "1" },
  { name: "Italy", offset: "1" },
  { name: "Mexico", offset: "-6" },
  { name: "Argentina", offset: "-3" },
];

const GithubProfileCardsBlock = memo(function GithubProfileCardsBlock({ block, onUpdate }) {
  const cards = block.cards || [
    {
      cardType: "profile-details",
      theme: "material_palenight",
      utcOffset: "8",
      height: "",
      width: "",
    },
  ];
  const username = block.username || "";
  const align = block.align || "left";

  const handleUsernameChange = useCallback(
    (value) => {
      onUpdate(block.id, { ...block, username: value });
    },
    [block, onUpdate]
  );

  const handleAlignChange = useCallback(
    (value) => {
      onUpdate(block.id, { ...block, align: value });
    },
    [block, onUpdate]
  );

  const handleCardChange = useCallback(
    (index, field, value) => {
      const newCards = [...cards];
      newCards[index] = { ...newCards[index], [field]: value };
      onUpdate(block.id, { ...block, cards: newCards });
    },
    [block, cards, onUpdate]
  );

  const addCard = useCallback(() => {
    const newCards = [
      ...cards,
      {
        cardType: "profile-details",
        theme: "material_palenight",
        utcOffset: "8",
        height: "",
        width: "",
      },
    ];
    onUpdate(block.id, { ...block, cards: newCards });
  }, [block, cards, onUpdate]);

  const removeCard = useCallback(
    (index) => {
      if (cards.length === 1) return;
      const newCards = cards.filter((_, i) => i !== index);
      onUpdate(block.id, { ...block, cards: newCards });
    },
    [block, cards, onUpdate]
  );

  const generateCardUrl = useCallback(
    (card) => {
      if (!username.trim()) return null;

      const baseUrl = "http://github-profile-summary-cards.vercel.app/api/cards";
      let url = `${baseUrl}/${card.cardType}?username=${username}&theme=${card.theme}`;

      // Add utcOffset only for productive-time card
      if (card.cardType === "productive-time") {
        url += `&utcOffset=${card.utcOffset}`;
      }

      return url;
    },
    [username]
  );

  return (
    <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">GitHub Profile Cards</span>
        </div>
        <Button onClick={addCard} size="sm" variant="outline" className="h-7 text-xs">
          <Plus className="w-3 h-3 mr-1" />
          Add Card
        </Button>
      </div>

      <div>
        <Label className="text-xs font-medium text-muted-foreground mb-1">GitHub Username</Label>
        <Input
          type="text"
          value={username}
          onChange={(e) => handleUsernameChange(e.target.value)}
          placeholder="your-github-username"
          className="bg-background h-8 text-xs"
        />
      </div>

      <div>
        <Label className="text-xs font-medium text-muted-foreground mb-1">Alignment</Label>
        <Select value={align} onValueChange={handleAlignChange}>
          <SelectTrigger className="bg-background h-8 text-xs">
            <SelectValue placeholder="Select alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {cards.map((card, index) => {
        const previewUrl = generateCardUrl(card);

        return (
          <div key={index} className="space-y-2 p-3 border rounded-md bg-background/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Card {index + 1}</span>
              {cards.length > 1 && (
                <Button
                  onClick={() => removeCard(index)}
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>

            <div className="flex items-end gap-2">
              <div className="flex-1 min-w-0">
                <Label className="text-xs font-medium text-muted-foreground mb-1">Card Type</Label>
                <Select
                  value={card.cardType}
                  onValueChange={(value) => handleCardChange(index, "cardType", value)}
                >
                  <SelectTrigger className="bg-background h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="profile-details">Profile Details</SelectItem>
                    <SelectItem value="repos-per-language">Repos per Language</SelectItem>
                    <SelectItem value="most-commit-language">Most Commit Language</SelectItem>
                    <SelectItem value="stats">Stats</SelectItem>
                    <SelectItem value="productive-time">Productive Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-0">
                <Label className="text-xs font-medium text-muted-foreground mb-1">Theme</Label>
                <Select
                  value={card.theme}
                  onValueChange={(value) => handleCardChange(index, "theme", value)}
                >
                  <SelectTrigger className="bg-background h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="material_palenight">Material Palenight</SelectItem>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="solarized">Solarized</SelectItem>
                    <SelectItem value="solarized_dark">Solarized Dark</SelectItem>
                    <SelectItem value="github">GitHub</SelectItem>
                    <SelectItem value="github_dark">GitHub Dark</SelectItem>
                    <SelectItem value="vue">Vue</SelectItem>
                    <SelectItem value="dracula">Dracula</SelectItem>
                    <SelectItem value="monokai">Monokai</SelectItem>
                    <SelectItem value="nord_dark">Nord Dark</SelectItem>
                    <SelectItem value="nord_bright">Nord Bright</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {card.cardType === "productive-time" && (
              <div>
                <Label className="text-xs font-medium text-muted-foreground mb-1">Country</Label>
                <Select
                  value={card.utcOffset}
                  onValueChange={(value) => handleCardChange(index, "utcOffset", value)}
                >
                  <SelectTrigger className="bg-background h-8 text-xs">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {COUNTRIES_WITH_UTC.map((country, countryIndex) => (
                      <SelectItem key={`${country.name}-${countryIndex}`} value={country.offset}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Label className="text-xs font-medium text-muted-foreground mb-1">
                  Height (optional)
                </Label>
                <Input
                  type="text"
                  value={card.height || ""}
                  onChange={(e) => handleCardChange(index, "height", e.target.value)}
                  placeholder="180em"
                  className="bg-background h-8 text-xs"
                />
              </div>
              <div className="flex-1">
                <Label className="text-xs font-medium text-muted-foreground mb-1">
                  Width (optional)
                </Label>
                <Input
                  type="text"
                  value={card.width || ""}
                  onChange={(e) => handleCardChange(index, "width", e.target.value)}
                  placeholder="49%"
                  className="bg-background h-8 text-xs"
                />
              </div>
            </div>

            {previewUrl && username.trim() && (
              <div className="mt-2 p-2 bg-muted/30 rounded border">
                <div className="text-[10px] text-muted-foreground mb-2 font-mono">Preview:</div>
                <div className="flex justify-center items-center">
                  <img
                    src={previewUrl}
                    alt={`GitHub ${card.cardType} card`}
                    className="block mx-auto max-w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});

export default GithubProfileCardsBlock;

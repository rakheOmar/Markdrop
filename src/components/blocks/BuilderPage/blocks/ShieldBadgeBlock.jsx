import { Plus, Shield, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ShieldBadgeBlock({ block, onUpdate }) {
  const badges = block.badges || [
    { label: "", message: "", color: "blue", style: "flat", logo: "" },
  ];
  const align = block.align || "left";

  const handleBadgeChange = (index, field, value) => {
    const newBadges = [...badges];
    newBadges[index] = { ...newBadges[index], [field]: value };
    onUpdate(block.id, { ...block, badges: newBadges });
  };

  const handleAlignChange = (value) => {
    onUpdate(block.id, { ...block, align: value });
  };

  const addBadge = () => {
    const newBadges = [
      ...badges,
      { label: "", message: "", color: "blue", style: "flat", logo: "" },
    ];
    onUpdate(block.id, { ...block, badges: newBadges });
  };

  const removeBadge = (index) => {
    if (badges.length === 1) return;
    const newBadges = badges.filter((_, i) => i !== index);
    onUpdate(block.id, { ...block, badges: newBadges });
  };

  const generateBadgeUrl = (badge) => {
    const label = (badge.label || "label").replace(/ /g, "_").replace(/-/g, "--");
    const message = (badge.message || "message").replace(/ /g, "_").replace(/-/g, "--");
    const color = badge.color || "blue";
    let url = `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(message)}-${color}`;

    const params = [];
    if (badge.style && badge.style !== "flat") {
      params.push(`style=${badge.style}`);
    }
    if (badge.logo) {
      params.push(`logo=${encodeURIComponent(badge.logo)}`);
    }

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    return url;
  };

  const colors = [
    { value: "brightgreen", label: "Bright Green" },
    { value: "green", label: "Green" },
    { value: "yellowgreen", label: "Yellow Green" },
    { value: "yellow", label: "Yellow" },
    { value: "orange", label: "Orange" },
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "lightgrey", label: "Light Grey" },
    { value: "blueviolet", label: "Blue Violet" },
    { value: "ff69b4", label: "Pink" },
  ];

  const styles = [
    { value: "flat", label: "Flat" },
    { value: "flat-square", label: "Flat Square" },
    { value: "plastic", label: "Plastic" },
    { value: "for-the-badge", label: "For The Badge" },
    { value: "social", label: "Social" },
  ];

  return (
    <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">Shields.io Badges</span>
        </div>
        <Button onClick={addBadge} size="sm" variant="outline" className="h-7 text-xs">
          <Plus className="w-3 h-3 mr-1" />
          Add Badge
        </Button>
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Alignment</label>
        <Select value={align} onValueChange={handleAlignChange}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {badges.map((badge, index) => (
        <div key={index} className="space-y-3 p-3 border rounded bg-background/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Badge {index + 1}</span>
            {badges.length > 1 && (
              <Button
                onClick={() => removeBadge(index)}
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Label</label>
              <Input
                value={badge.label || ""}
                onChange={(e) => handleBadgeChange(index, "label", e.target.value)}
                placeholder="build"
                className="bg-background h-8 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Message</label>
              <Input
                value={badge.message || ""}
                onChange={(e) => handleBadgeChange(index, "message", e.target.value)}
                placeholder="passing"
                className="bg-background h-8 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Color</label>
              <Select
                value={badge.color || "blue"}
                onValueChange={(value) => handleBadgeChange(index, "color", value)}
              >
                <SelectTrigger className="bg-background h-8 text-sm">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {colors.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      {color.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Style</label>
              <Select
                value={badge.style || "flat"}
                onValueChange={(value) => handleBadgeChange(index, "style", value)}
              >
                <SelectTrigger className="bg-background h-8 text-sm">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  {styles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Logo (optional)</label>
            <Input
              value={badge.logo || ""}
              onChange={(e) => handleBadgeChange(index, "logo", e.target.value)}
              placeholder="github"
              className="bg-background h-8 text-sm"
            />
          </div>

          {badge.label && badge.message && (
            <div className="mt-2 p-2 bg-muted/30 rounded">
              <img
                src={generateBadgeUrl(badge)}
                alt={`${badge.label}: ${badge.message}`}
                className="inline-block"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}
        </div>
      ))}

      {badges.some((b) => b.label && b.message) && (
        <div className="mt-3 p-3 bg-background rounded border">
          <div style={{ textAlign: align }}>
            {badges
              .filter((b) => b.label && b.message)
              .map((badge, index) => (
                <img
                  key={index}
                  src={generateBadgeUrl(badge)}
                  alt={`${badge.label}: ${badge.message}`}
                  className="inline-block mr-1 mb-1"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

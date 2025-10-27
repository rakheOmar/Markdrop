import { Users, Plus, Trash2 } from "lucide-react";
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

export default function SocialBadgesBlock({ block, onUpdate }) {
  const badges = block.badges || [
    { type: "twitter", username: "", label: "Followers" },
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
      { type: "twitter", username: "", label: "Followers" },
    ];
    onUpdate(block.id, { ...block, badges: newBadges });
  };

  const removeBadge = (index) => {
    if (badges.length === 1) return;
    const newBadges = badges.filter((_, i) => i !== index);
    onUpdate(block.id, { ...block, badges: newBadges });
  };

  const generateBadgeUrl = (badge) => {
    const { type, username, label } = badge;

    if (!username) return "";

    const baseUrl = "https://img.shields.io";

    switch (type) {
      case "twitter":
        return `${baseUrl}/twitter/follow/${username}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=twitter&logoColor=white`;
      case "youtube":
        return `${baseUrl}/youtube/channel/subscribers/${username}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=youtube&logoColor=red`;
      case "discord":
        return `${baseUrl}/discord/${username}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=discord&logoColor=white`;
      case "twitch":
        return `${baseUrl}/twitch/status/${username}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=twitch&logoColor=white`;
      case "instagram":
        return `${baseUrl}/instagram/followers/${username}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=instagram&logoColor=white`;
      case "linkedin":
        return `${baseUrl}/linkedin/followers/${username}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=linkedin&logoColor=white`;
      case "github":
        return `${baseUrl}/github/followers/${username}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=github&logoColor=white`;
      case "reddit":
        return `${baseUrl}/reddit/user-karma/${username}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=reddit&logoColor=white`;
      default:
        return "";
    }
  };

  const badgeTypes = [
    { value: "twitter", label: "Twitter Followers" },
    { value: "youtube", label: "YouTube Subscribers" },
    { value: "discord", label: "Discord Members" },
    { value: "twitch", label: "Twitch Status" },
    { value: "instagram", label: "Instagram Followers" },
    { value: "linkedin", label: "LinkedIn Followers" },
    { value: "github", label: "GitHub Followers" },
    { value: "reddit", label: "Reddit Karma" },
  ];

  return (
    <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">
            Social Badges
          </span>
        </div>
        <Button
          onClick={addBadge}
          size="sm"
          variant="outline"
          className="h-7 text-xs"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Badge
        </Button>
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">
          Alignment
        </label>
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
        <div key={index} className="space-y-2 p-3 bg-background rounded border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Badge {index + 1}
            </span>
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
              <Label className="text-xs">Platform</Label>
              <Select
                value={badge.type}
                onValueChange={(value) =>
                  handleBadgeChange(index, "type", value)
                }
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {badgeTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs">Label</Label>
              <Input
                value={badge.label}
                onChange={(e) =>
                  handleBadgeChange(index, "label", e.target.value)
                }
                placeholder="Custom label"
                className="bg-background"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs">Username/ID</Label>
            <Input
              value={badge.username}
              onChange={(e) =>
                handleBadgeChange(index, "username", e.target.value)
              }
              placeholder="Username or channel ID"
              className="bg-background"
            />
          </div>

          {badge.username && (
            <div className="mt-2 p-2 bg-muted rounded">
              <img
                src={generateBadgeUrl(badge)}
                alt={`${badge.type} badge`}
                className="max-w-full h-auto"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}
        </div>
      ))}

      {badges.some((badge) => badge.username) && (
        <div className="mt-3 p-3 bg-background rounded border">
          <div style={{ textAlign: align }}>
            {badges
              .filter((badge) => badge.username)
              .map((badge, index) => (
                <img
                  key={index}
                  src={generateBadgeUrl(badge)}
                  alt={`${badge.type} badge`}
                  className="max-w-full h-auto inline-block mr-2 mb-2"
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

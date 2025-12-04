import { AlignCenter, AlignLeft, AlignRight, Palette, Plus, Shield, Trash2 } from "lucide-react";
import { useCallback } from "react";
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

const BADGE_TYPES = [
  { value: "custom", label: "Custom Badge", needsRepo: false },
  { value: "stars", label: "GitHub Stars", needsRepo: true },
  { value: "forks", label: "GitHub Forks", needsRepo: true },
  { value: "issues", label: "GitHub Issues", needsRepo: true },
  { value: "license", label: "GitHub License", needsRepo: true },
  { value: "last-commit", label: "Last Commit", needsRepo: true },
  { value: "repo-size", label: "Repository Size", needsRepo: true },
  { value: "languages", label: "Languages", needsRepo: true },
  { value: "contributors", label: "Contributors", needsRepo: true },
  { value: "pull-requests", label: "Pull Requests", needsRepo: true },
  { value: "gitbook", label: "GitBook", needsRepo: false },
  { value: "notion", label: "Notion", needsRepo: false },
  { value: "confluence", label: "Confluence", needsRepo: false },
  { value: "docusaurus", label: "Docusaurus", needsRepo: false },
  { value: "mkdocs", label: "MkDocs", needsRepo: false },
  { value: "sphinx", label: "Sphinx", needsRepo: false },
  { value: "twitter", label: "Twitter Follow", needsRepo: false },
  { value: "discord", label: "Discord Members", needsRepo: false },
  { value: "twitch", label: "Twitch Status", needsRepo: false },
  { value: "instagram", label: "Instagram Follow", needsRepo: false },
  { value: "linkedin", label: "LinkedIn Follow", needsRepo: false },
  { value: "github-followers", label: "GitHub Followers", needsRepo: false },
  { value: "reddit", label: "Reddit Karma", needsRepo: false },
  { value: "npm-downloads", label: "NPM Downloads", needsPackage: true },
  { value: "npm-version", label: "NPM Version", needsPackage: true },
  { value: "pypi-downloads", label: "PyPI Downloads", needsPackage: true },
  { value: "pypi-version", label: "PyPI Version", needsPackage: true },
  { value: "codecov", label: "Codecov", needsRepo: true },
  { value: "coveralls", label: "Coveralls", needsRepo: true },
  { value: "github-actions", label: "GitHub Actions", needsRepo: true },
  { value: "docker-pulls", label: "Docker Pulls", needsPackage: true },
  { value: "docker-stars", label: "Docker Stars", needsPackage: true },
];

const STYLES = [
  { value: "flat", label: "Flat" },
  { value: "flat-square", label: "Flat Square" },
  { value: "plastic", label: "Plastic" },
  { value: "for-the-badge", label: "For The Badge" },
  { value: "social", label: "Social" },
];

const COLORS = [
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
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
];

export default function ShieldBadgeBlock({ block, onUpdate }) {
  const badges = block.badges || [
    {
      type: "custom",
      label: "Hello",
      message: "World",
      color: "blue",
      style: "flat",
      logo: "",
      username: "",
      repo: "",
      package: "",
    },
  ];
  const align = block.align || "left";

  const handleUpdate = useCallback(
    (updates) => {
      onUpdate(block.id, { ...block, ...updates });
    },
    [block, onUpdate]
  );

  const handleBadgeChange = (index, field, value) => {
    const newBadges = [...badges];
    newBadges[index] = { ...newBadges[index], [field]: value };
    handleUpdate({ badges: newBadges });
  };

  const addBadge = () => {
    const newBadges = [
      ...badges,
      {
        type: "custom",
        label: "Label",
        message: "Message",
        color: "blue",
        style: "flat",
        logo: "",
        username: "",
        repo: "",
        package: "",
      },
    ];
    handleUpdate({ badges: newBadges });
  };

  const removeBadge = (index) => {
    if (badges.length === 1) return;
    const newBadges = badges.filter((_, i) => i !== index);
    handleUpdate({ badges: newBadges });
  };

  const generateBadgeUrl = (badge) => {
    const baseUrl = "https://img.shields.io";
    const { type, username, repo, label, package: pkg, color, style, message, logo } = badge;

    if (type === "custom") {
      if (!label && !message) return "";

      const safeLabel = (label || " ").replace(/ /g, "_").replace(/-/g, "--");
      const safeMessage = (message || " ").replace(/ /g, "_").replace(/-/g, "--");
      const safeColor = color || "blue";

      let url = `${baseUrl}/badge/${encodeURIComponent(safeLabel)}-${encodeURIComponent(safeMessage)}-${safeColor}`;
      const params = [];
      if (style && style !== "flat") params.push(`style=${style}`);
      if (logo) params.push(`logo=${encodeURIComponent(logo)}`);
      if (params.length > 0) url += `?${params.join("&")}`;

      return url;
    }

    const badgeType = BADGE_TYPES.find((t) => t.value === type);
    if (badgeType?.needsRepo && (!username || !repo)) return "";
    if (badgeType?.needsPackage && !pkg) return "";
    if (
      (type === "twitter" ||
        type === "github-followers" ||
        type === "twitch" ||
        type === "reddit" ||
        type === "discord") &&
      !username
    )
      return "";

    let styleParam = style ? `&style=${style}` : "";
    let logoParam = "";
    let labelParam = label ? `&label=${encodeURIComponent(label)}` : "";

    switch (type) {
      case "stars":
      case "forks":
      case "issues":
      case "license":
      case "last-commit":
      case "repo-size":
      case "languages":
      case "contributors":
      case "pull-requests":
      case "github-followers":
        logoParam = "&logo=github";
        break;
      case "twitter":
        logoParam = "&logo=twitter";
        break;
      case "youtube":
        logoParam = "&logo=youtube";
        break;
      case "discord":
        logoParam = "&logo=discord";
        break;
      case "twitch":
        logoParam = "&logo=twitch";
        break;
      case "instagram":
        logoParam = "&logo=instagram";
        break;
      case "linkedin":
        logoParam = "&logo=linkedin";
        break;
      case "reddit":
        logoParam = "&logo=reddit";
        break;
      case "npm-downloads":
      case "npm-version":
        logoParam = "&logo=npm";
        break;
      case "pypi-downloads":
      case "pypi-version":
        logoParam = "&logo=pypi";
        break;
      case "docker-pulls":
      case "docker-stars":
        logoParam = "&logo=docker";
        break;
    }

    const commonParams = `${styleParam}${logoParam}${labelParam}`;

    switch (type) {
      case "stars":
        return `${baseUrl}/github/stars/${username}/${repo}?${commonParams}`;
      case "forks":
        return `${baseUrl}/github/forks/${username}/${repo}?${commonParams}`;
      case "issues":
        return `${baseUrl}/github/issues/${username}/${repo}?${commonParams}`;
      case "license":
        return `${baseUrl}/github/license/${username}/${repo}?${commonParams}`;
      case "last-commit":
        return `${baseUrl}/github/last-commit/${username}/${repo}?${commonParams}`;
      case "repo-size":
        return `${baseUrl}/github/repo-size/${username}/${repo}?${commonParams}`;
      case "languages":
        return `${baseUrl}/github/languages/top/${username}/${repo}?${commonParams}`;
      case "contributors":
        return `${baseUrl}/github/contributors/${username}/${repo}?${commonParams}`;
      case "pull-requests":
        return `${baseUrl}/github/issues-pr/${username}/${repo}?${commonParams}`;
      case "gitbook":
        return `${baseUrl}/static/v1?label=${encodeURIComponent(label || "Docs")}&message=GitBook&color=3884FF&logo=gitbook&logoColor=white${styleParam}`;
      case "notion":
        return `${baseUrl}/static/v1?label=${encodeURIComponent(label || "Docs")}&message=Notion&color=000000&logo=notion&logoColor=white${styleParam}`;
      case "confluence":
        return `${baseUrl}/static/v1?label=${encodeURIComponent(label || "Docs")}&message=Confluence&color=172B4D&logo=confluence&logoColor=white${styleParam}`;
      case "docusaurus":
        return `${baseUrl}/static/v1?label=${encodeURIComponent(label || "Docs")}&message=Docusaurus&color=2E8555&logo=docusaurus&logoColor=white${styleParam}`;
      case "mkdocs":
        return `${baseUrl}/static/v1?label=${encodeURIComponent(label || "Docs")}&message=MkDocs&color=000000&logo=markdown&logoColor=white${styleParam}`;
      case "sphinx":
        return `${baseUrl}/static/v1?label=${encodeURIComponent(label || "Docs")}&message=Sphinx&color=4B8B3B&logo=sphinx&logoColor=white${styleParam}`;
      case "twitter":
        return `${baseUrl}/static/v1?label=Follow&message=@${username}&color=1DA1F2&logo=twitter&logoColor=white${styleParam}`;
      case "discord":
        return `${baseUrl}/discord/${username}?logoColor=white${commonParams}`;
      case "twitch":
        return `${baseUrl}/twitch/status/${username}?logoColor=white${commonParams}`;
      case "instagram":
        return `${baseUrl}/static/v1?label=Follow&message=@${username}&color=E4405F&logo=instagram&logoColor=white${styleParam}`;
      case "linkedin":
        return `${baseUrl}/static/v1?label=Follow&message=@${username}&color=0077B5&logo=linkedin&logoColor=white${styleParam}`;
      case "github-followers":
        return `${baseUrl}/github/followers/${username}?${commonParams}`;
      case "reddit":
        return `${baseUrl}/reddit/user-karma/combined/${username}?${commonParams}`;
      case "npm-downloads":
        return `${baseUrl}/npm/dm/${pkg}?${commonParams}`;
      case "npm-version":
        return `${baseUrl}/npm/v/${pkg}?${commonParams}`;
      case "pypi-downloads":
        return `${baseUrl}/pypi/dm/${pkg}?${commonParams}`;
      case "pypi-version":
        return `${baseUrl}/pypi/v/${pkg}?${commonParams}`;
      case "codecov":
        return `${baseUrl}/codecov/c/github/${username}/${repo}?logo=codecov&logoColor=white${styleParam}${labelParam}`;
      case "coveralls":
        return `${baseUrl}/coveralls/github/${username}/${repo}?logo=coveralls&logoColor=white${styleParam}${labelParam}`;
      case "github-actions":
        return `${baseUrl}/static/v1?label=GitHub+Actions&message=Status&color=2088FF&logo=github-actions&logoColor=white${styleParam}`;
      case "docker-pulls":
        return `${baseUrl}/docker/pulls/${pkg}?${commonParams}`;
      case "docker-stars":
        return `${baseUrl}/docker/stars/${pkg}?${commonParams}`;
      default:
        return "";
    }
  };

  const generatedBadges = badges.map((badge) => ({ ...badge, url: generateBadgeUrl(badge) }));

  return (
    <div className="group relative rounded-md border border-border bg-background transition-all focus-within:border-ring">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/40 bg-muted/10">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Shield className="h-3.5 w-3.5" />
          <span>Shields.io</span>
        </div>

        <ButtonGroup className="bg-background/80">
          <Button variant="ghost" size="sm" onClick={addBadge} className="h-7 text-xs gap-1.5 px-2">
            <Plus className="h-3 w-3" /> Add Badge
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
        {badges.map((badge, index) => {
          const badgeType = BADGE_TYPES.find((t) => t.value === badge.type);
          const needsRepo = badgeType?.needsRepo;
          const needsPackage = badgeType?.needsPackage;
          const badgeUrl = generatedBadges[index].url;

          return (
            <div
              key={index}
              className="rounded-md border border-border/50 bg-background p-3 space-y-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider shrink-0">
                    Badge {index + 1}
                  </span>
                  <Select
                    value={badge.type || "custom"}
                    onValueChange={(value) => handleBadgeChange(index, "type", value)}
                  >
                    <SelectTrigger className="h-7 text-xs w-full max-w-[200px] bg-muted/5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {BADGE_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="text-xs">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {badges.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeBadge(index)}
                    className="h-5 w-5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 ml-2"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {badge.type === "custom" ? (
                  <>
                    <Input
                      value={badge.label || ""}
                      onChange={(e) => handleBadgeChange(index, "label", e.target.value)}
                      placeholder="Label (e.g. Build)"
                      className="h-8 text-xs bg-muted/5"
                    />
                    <Input
                      value={badge.message || ""}
                      onChange={(e) => handleBadgeChange(index, "message", e.target.value)}
                      placeholder="Message (e.g. Passing)"
                      className="h-8 text-xs bg-muted/5"
                    />
                    <Select
                      value={badge.color || "blue"}
                      onValueChange={(value) => handleBadgeChange(index, "color", value)}
                    >
                      <SelectTrigger className="h-8 text-xs bg-muted/5">
                        <div className="flex items-center gap-2">
                          <Palette className="h-3 w-3 opacity-50" />
                          <SelectValue placeholder="Color" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {COLORS.map((color) => (
                          <SelectItem key={color.value} value={color.value} className="text-xs">
                            {color.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      value={badge.logo || ""}
                      onChange={(e) => handleBadgeChange(index, "logo", e.target.value)}
                      placeholder="Logo (e.g. github)"
                      className="h-8 text-xs bg-muted/5"
                    />
                  </>
                ) : (
                  <>
                    {(needsRepo || (!needsPackage && badge.type !== "npm-downloads")) && (
                      <Input
                        value={badge.username || ""}
                        onChange={(e) => handleBadgeChange(index, "username", e.target.value)}
                        placeholder={needsRepo ? "GitHub User/Org" : "Username/ID"}
                        className="h-8 text-xs bg-muted/5"
                      />
                    )}
                    {needsRepo && (
                      <Input
                        value={badge.repo || ""}
                        onChange={(e) => handleBadgeChange(index, "repo", e.target.value)}
                        placeholder="Repository Name"
                        className="h-8 text-xs bg-muted/5"
                      />
                    )}
                    {needsPackage && (
                      <Input
                        value={badge.package || ""}
                        onChange={(e) => handleBadgeChange(index, "package", e.target.value)}
                        placeholder="Package Name"
                        className="h-8 text-xs bg-muted/5"
                      />
                    )}
                    <Input
                      value={badge.label || ""}
                      onChange={(e) => handleBadgeChange(index, "label", e.target.value)}
                      placeholder="Label Override (Optional)"
                      className="h-8 text-xs bg-muted/5"
                    />
                  </>
                )}

                <Select
                  value={badge.style || "flat"}
                  onValueChange={(value) => handleBadgeChange(index, "style", value)}
                >
                  <SelectTrigger className="h-8 text-xs bg-muted/5">
                    <SelectValue placeholder="Style" />
                  </SelectTrigger>
                  <SelectContent>
                    {STYLES.map((style) => (
                      <SelectItem key={style.value} value={style.value} className="text-xs">
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {badgeUrl ? (
                <div className="mt-2 flex items-center justify-center bg-muted/10 rounded p-2 border border-border/50 border-dashed min-h-[40px]">
                  <img src={badgeUrl} alt="Badge Preview" className="max-w-full h-auto" />
                </div>
              ) : (
                <div className="mt-2 flex items-center justify-center bg-muted/5 rounded p-2 border border-border/20 min-h-[40px] text-[10px] text-muted-foreground/50 italic">
                  Incomplete parameters
                </div>
              )}
            </div>
          );
        })}

        {generatedBadges.some((b) => b.url) && (
          <div
            className={cn(
              "mt-4 rounded bg-muted/5 p-3 border border-border/50 flex flex-wrap gap-1.5 min-h-[40px] items-center",
              align === "center"
                ? "justify-center"
                : align === "right"
                  ? "justify-end"
                  : "justify-start"
            )}
          >
            {generatedBadges.map(
              (badge, i) => badge.url && <img key={i} src={badge.url} alt="Badge" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import { Plus, Shield, Trash2 } from "lucide-react";
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

export default function ShieldBadgeBlock({ block, onUpdate }) {
  const badges = block.badges || [
    {
      type: "custom",
      label: "",
      message: "",
      color: "blue",
      style: "flat",
      logo: "",
      username: "",
      repo: "",
      package: "",
    },
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
      {
        type: "custom",
        label: "",
        message: "",
        color: "blue",
        style: "flat",
        logo: "",
        username: "",
        repo: "",
        package: "",
      },
    ];
    onUpdate(block.id, { ...block, badges: newBadges });
  };

  const removeBadge = (index) => {
    if (badges.length === 1) return;
    const newBadges = badges.filter((_, i) => i !== index);
    onUpdate(block.id, { ...block, badges: newBadges });
  };

  const generateBadgeUrl = (badge) => {
    const baseUrl = "https://img.shields.io";

    if (badge.type === "custom") {
      const label = (badge.label || "label").replace(/ /g, "_").replace(/-/g, "--");
      const message = (badge.message || "message").replace(/ /g, "_").replace(/-/g, "--");
      const color = badge.color || "blue";
      let url = `${baseUrl}/badge/${encodeURIComponent(
        label
      )}-${encodeURIComponent(message)}-${color}`;

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
    } else {
      // All other badge types
      const { type, username, repo, label, package: pkg } = badge;

      switch (type) {
        // GitHub badges
        case "stars":
          return `${baseUrl}/github/stars/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
            label
          )}&logo=github&logoColor=white`;
        case "forks":
          return `${baseUrl}/github/forks/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
            label
          )}&logo=github&logoColor=white`;
        case "issues":
          return `${baseUrl}/github/issues/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
            label
          )}&logo=github&logoColor=white`;
        case "license":
          return `${baseUrl}/github/license/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
            label
          )}&logo=github&logoColor=white`;
        case "last-commit":
          return `${baseUrl}/github/last-commit/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
            label
          )}&logo=github&logoColor=white`;
        case "repo-size":
          return `${baseUrl}/github/repo-size/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
            label
          )}&logo=github&logoColor=white`;
        case "languages":
          return `${baseUrl}/github/languages/top/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
            label
          )}&logo=github&logoColor=white`;
        case "contributors":
          return `${baseUrl}/github/contributors/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
            label
          )}&logo=github&logoColor=white`;
        case "pull-requests":
          return `${baseUrl}/github/issues-pr/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
            label
          )}&logo=github&logoColor=white`;

        // Documentation platforms
        case "gitbook":
          return `${baseUrl}/static/v1?label=${encodeURIComponent(
            label
          )}&message=GitBook&color=3884FF&logo=gitbook&logoColor=white&style=flat-square`;
        case "notion":
          return `${baseUrl}/static/v1?label=${encodeURIComponent(
            label
          )}&message=Notion&color=000000&logo=notion&logoColor=white&style=flat-square`;
        case "confluence":
          return `${baseUrl}/static/v1?label=${encodeURIComponent(
            label
          )}&message=Confluence&color=172B4D&logo=confluence&logoColor=white&style=flat-square`;
        case "docusaurus":
          return `${baseUrl}/static/v1?label=${encodeURIComponent(
            label
          )}&message=Docusaurus&color=2E8555&logo=docusaurus&logoColor=white&style=flat-square`;
        case "mkdocs":
          return `${baseUrl}/static/v1?label=${encodeURIComponent(
            label
          )}&message=MkDocs&color=000000&logo=markdown&logoColor=white&style=flat-square`;
        case "sphinx":
          return `${baseUrl}/static/v1?label=${encodeURIComponent(
            label
          )}&message=Sphinx&color=4B8B3B&logo=sphinx&logoColor=white&style=flat-square`;

        // Social badges
        case "twitter":
          return `${baseUrl}/static/v1?label=Follow&message=@${username}&color=1DA1F2&logo=twitter&logoColor=white&style=flat-square`;
        case "youtube":
          // Note: YouTube API may be deprecated or having issues
          return `${baseUrl}/static/v1?label=YouTube&message=API+Unavailable&color=FF0000&logo=youtube&logoColor=white&style=flat-square`;
        case "discord":
          return `${baseUrl}/discord/${username}?style=flat-square&label=${encodeURIComponent(
            label
          )}&logo=discord&logoColor=white`;
        case "twitch":
          return `${baseUrl}/twitch/status/${username}?style=flat-square&label=${encodeURIComponent(
            label
          )}&logo=twitch&logoColor=white`;
        case "instagram":
          // Note: Shields.io doesn't support Instagram follower counts
          return `${baseUrl}/static/v1?label=Follow&message=@${username}&color=E4405F&logo=instagram&logoColor=white&style=flat-square`;
        case "linkedin":
          // Note: Shields.io doesn't support LinkedIn follower counts
          return `${baseUrl}/static/v1?label=Follow&message=@${username}&color=0077B5&logo=linkedin&logoColor=white&style=flat-square`;
        case "github-followers":
          return `${baseUrl}/github/followers/${username}?style=flat-square&label=${encodeURIComponent(
            label
          )}&logo=github&logoColor=white`;
        case "reddit":
          return `${baseUrl}/reddit/user-karma/combined/${username}?style=flat-square&label=${encodeURIComponent(
            label
          )}&logo=reddit&logoColor=white`;

        // Dev metrics
        case "npm-downloads":
          return `${baseUrl}/npm/dm/${pkg}?style=flat-square&label=${encodeURIComponent(
            label
          )}&logo=npm&logoColor=white`;
        case "npm-version":
          return `${baseUrl}/npm/v/${pkg}?style=flat-square&label=${encodeURIComponent(
            label
          )}&logo=npm&logoColor=white`;
        case "pypi-downloads":
          return `${baseUrl}/pypi/dm/${pkg}?style=flat-square&label=${encodeURIComponent(
            label
          )}&logo=pypi&logoColor=white`;
        case "pypi-version":
          return `${baseUrl}/pypi/v/${pkg}?style=flat-square&label=${encodeURIComponent(
            label
          )}&logo=pypi&logoColor=white`;
        case "codecov":
          return `${baseUrl}/codecov/c/github/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
            label
          )}&logo=codecov&logoColor=white`;
        case "coveralls":
          return `${baseUrl}/coveralls/github/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
            label
          )}&logo=coveralls&logoColor=white`;
        case "travis-ci":
          // Note: Travis CI API may be deprecated or having issues
          return `${baseUrl}/static/v1?label=Travis+CI&message=API+Unavailable&color=3EAAAF&logo=travis-ci&logoColor=white&style=flat-square`;
        case "github-actions":
          // Note: GitHub Actions badge requires workflow ID, using a placeholder for now
          // Format should be: /github/workflows/{workflow_id}/{username}/{repo}/{branch}
          return `${baseUrl}/static/v1?label=GitHub+Actions&message=Workflow+Status&color=2088FF&logo=github-actions&logoColor=white&style=flat-square`;
        case "docker-pulls":
          return `${baseUrl}/docker/pulls/${pkg}?style=flat-square&label=${encodeURIComponent(
            label
          )}&logo=docker&logoColor=white`;
        case "docker-stars":
          return `${baseUrl}/docker/stars/${pkg}?style=flat-square&label=${encodeURIComponent(
            label
          )}&logo=docker&logoColor=white`;

        default:
          return "";
      }
    }
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

  const badgeTypes = [
    // Custom badges
    { value: "custom", label: "Custom Badge", needsRepo: false },

    // GitHub/Documentation badges
    { value: "stars", label: "GitHub Stars", needsRepo: true },
    { value: "forks", label: "GitHub Forks", needsRepo: true },
    { value: "issues", label: "GitHub Issues", needsRepo: true },
    { value: "license", label: "GitHub License", needsRepo: true },
    { value: "last-commit", label: "Last Commit", needsRepo: true },
    { value: "repo-size", label: "Repository Size", needsRepo: true },
    { value: "languages", label: "Languages", needsRepo: true },
    { value: "contributors", label: "Contributors", needsRepo: true },
    { value: "pull-requests", label: "Pull Requests", needsRepo: true },

    // Documentation platforms
    { value: "gitbook", label: "GitBook", needsRepo: false },
    { value: "notion", label: "Notion", needsRepo: false },
    { value: "confluence", label: "Confluence", needsRepo: false },
    { value: "docusaurus", label: "Docusaurus", needsRepo: false },
    { value: "mkdocs", label: "MkDocs", needsRepo: false },
    { value: "sphinx", label: "Sphinx", needsRepo: false },

    // Social badges
    { value: "twitter", label: "Twitter Follow Button", needsRepo: false },
    // { value: "youtube", label: "YouTube Subscribers", needsRepo: false }, // Disabled: API issues
    { value: "discord", label: "Discord Members", needsRepo: false },
    { value: "twitch", label: "Twitch Status", needsRepo: false },
    { value: "instagram", label: "Instagram Follow Button", needsRepo: false },
    { value: "linkedin", label: "LinkedIn Follow Button", needsRepo: false },
    { value: "github-followers", label: "GitHub Followers", needsRepo: false },
    { value: "reddit", label: "Reddit Karma", needsRepo: false },

    // Dev metrics
    { value: "npm-downloads", label: "NPM Downloads", needsPackage: true },
    { value: "npm-version", label: "NPM Version", needsPackage: true },
    { value: "pypi-downloads", label: "PyPI Downloads", needsPackage: true },
    { value: "pypi-version", label: "PyPI Version", needsPackage: true },
    { value: "codecov", label: "Codecov Coverage", needsRepo: true },
    { value: "coveralls", label: "Coveralls Coverage", needsRepo: true },
    // { value: "travis-ci", label: "Travis CI Status", needsRepo: true }, // Disabled: API issues
    { value: "github-actions", label: "GitHub Actions", needsRepo: true },
    { value: "docker-pulls", label: "Docker Pulls", needsPackage: true },
    { value: "docker-stars", label: "Docker Stars", needsPackage: true },
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

      {badges.map((badge, index) => {
        const badgeType = badgeTypes.find((t) => t.value === badge.type);
        const needsRepo = badgeType?.needsRepo;
        const needsPackage = badgeType?.needsPackage;

        return (
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

            <div>
              <Label className="text-xs">Badge Type</Label>
              <Select
                value={badge.type || "custom"}
                onValueChange={(value) => handleBadgeChange(index, "type", value)}
              >
                <SelectTrigger className="bg-background h-8 text-sm">
                  <SelectValue placeholder="Select badge type" />
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

            {badge.type === "custom" ? (
              <>
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
                  <label className="text-xs text-muted-foreground mb-1 block">
                    Logo (optional)
                  </label>
                  <Input
                    value={badge.logo || ""}
                    onChange={(e) => handleBadgeChange(index, "logo", e.target.value)}
                    placeholder="github"
                    className="bg-background h-8 text-sm"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Label</label>
                  <Input
                    value={badge.label || ""}
                    onChange={(e) => handleBadgeChange(index, "label", e.target.value)}
                    placeholder="Custom label"
                    className="bg-background h-8 text-sm"
                  />
                </div>

                {needsRepo && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Username</label>
                      <Input
                        value={badge.username || ""}
                        onChange={(e) => handleBadgeChange(index, "username", e.target.value)}
                        placeholder="GitHub username"
                        className="bg-background h-8 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Repository</label>
                      <Input
                        value={badge.repo || ""}
                        onChange={(e) => handleBadgeChange(index, "repo", e.target.value)}
                        placeholder="Repository name"
                        className="bg-background h-8 text-sm"
                      />
                    </div>
                  </div>
                )}

                {needsPackage && (
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Package Name</label>
                    <Input
                      value={badge.package || ""}
                      onChange={(e) => handleBadgeChange(index, "package", e.target.value)}
                      placeholder="Package name (e.g., react, express)"
                      className="bg-background h-8 text-sm"
                    />
                  </div>
                )}

                {!needsRepo && !needsPackage && (
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Username/ID</label>
                    <Input
                      value={badge.username || ""}
                      onChange={(e) => handleBadgeChange(index, "username", e.target.value)}
                      placeholder="Username or channel ID"
                      className="bg-background h-8 text-sm"
                    />
                  </div>
                )}
              </>
            )}

            {(() => {
              const badgeUrl = generateBadgeUrl(badge);
              const shouldShow =
                ((badge.type === "custom" && badge.label && badge.message) ||
                  (badge.type !== "custom" &&
                    ((needsRepo && badge.username && badge.repo) ||
                      (needsPackage && badge.package) ||
                      (!needsRepo && !needsPackage && badge.label)))) &&
                badgeUrl;

              return shouldShow ? (
                <div className="mt-2 p-2 bg-muted/30 rounded">
                  <img
                    src={badgeUrl}
                    alt={`${badge.label}: ${badge.message || badge.type}`}
                    className="inline-block"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              ) : null;
            })()}
          </div>
        );
      })}

      {badges.some((badge) => {
        const badgeType = badgeTypes.find((t) => t.value === badge.type);
        const needsRepo = badgeType?.needsRepo;
        const needsPackage = badgeType?.needsPackage;
        return (
          (badge.type === "custom" && badge.label && badge.message) ||
          (badge.type !== "custom" &&
            ((needsRepo && badge.username && badge.repo) ||
              (needsPackage && badge.package) ||
              (!needsRepo && !needsPackage && badge.label)))
        );
      }) && (
        <div className="mt-3 p-3 bg-background rounded border">
          <div style={{ textAlign: align }}>
            {badges
              .filter((badge) => {
                const badgeType = badgeTypes.find((t) => t.value === badge.type);
                const needsRepo = badgeType?.needsRepo;
                const needsPackage = badgeType?.needsPackage;
                return (
                  (badge.type === "custom" && badge.label && badge.message) ||
                  (badge.type !== "custom" &&
                    ((needsRepo && badge.username && badge.repo) ||
                      (needsPackage && badge.package) ||
                      (!needsRepo && !needsPackage && badge.label)))
                );
              })
              .map((badge, index) => {
                const badgeUrl = generateBadgeUrl(badge);
                return badgeUrl ? (
                  <img
                    key={index}
                    src={badgeUrl}
                    alt={`${badge.label}: ${badge.message || badge.type}`}
                    className="inline-block mr-1 mb-1"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : null;
              })}
          </div>
        </div>
      )}
    </div>
  );
}

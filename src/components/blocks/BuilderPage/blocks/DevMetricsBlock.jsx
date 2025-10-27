import { BarChart3, Plus, Trash2 } from "lucide-react";
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

export default function DevMetricsBlock({ block, onUpdate }) {
  const metrics = block.metrics || [
    { type: "npm-downloads", package: "", label: "Downloads" },
  ];
  const align = block.align || "left";

  const handleMetricChange = (index, field, value) => {
    const newMetrics = [...metrics];
    newMetrics[index] = { ...newMetrics[index], [field]: value };
    onUpdate(block.id, { ...block, metrics: newMetrics });
  };

  const handleAlignChange = (value) => {
    onUpdate(block.id, { ...block, align: value });
  };

  const addMetric = () => {
    const newMetrics = [
      ...metrics,
      { type: "npm-downloads", package: "", label: "Downloads" },
    ];
    onUpdate(block.id, { ...block, metrics: newMetrics });
  };

  const removeMetric = (index) => {
    if (metrics.length === 1) return;
    const newMetrics = metrics.filter((_, i) => i !== index);
    onUpdate(block.id, { ...block, metrics: newMetrics });
  };

  const generateMetricUrl = (metric) => {
    const { type, package: pkg, label, username, repo } = metric;

    const baseUrl = "https://img.shields.io";

    switch (type) {
      case "npm-downloads":
        if (!pkg) return "";
        return `${baseUrl}/npm/dm/${pkg}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=npm&logoColor=white`;
      case "npm-version":
        if (!pkg) return "";
        return `${baseUrl}/npm/v/${pkg}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=npm&logoColor=white`;
      case "pypi-downloads":
        if (!pkg) return "";
        return `${baseUrl}/pypi/dm/${pkg}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=pypi&logoColor=white`;
      case "pypi-version":
        if (!pkg) return "";
        return `${baseUrl}/pypi/v/${pkg}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=pypi&logoColor=white`;
      case "codecov":
        if (!username || !repo) return "";
        return `${baseUrl}/codecov/c/github/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=codecov&logoColor=white`;
      case "coveralls":
        if (!username || !repo) return "";
        return `${baseUrl}/coveralls/github/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=coveralls&logoColor=white`;
      case "travis-ci":
        if (!username || !repo) return "";
        return `${baseUrl}/travis-ci/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=travis-ci&logoColor=white`;
      case "github-actions":
        if (!username || !repo) return "";
        return `${baseUrl}/github/workflows/status/${username}/${repo}/main?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=github-actions&logoColor=white`;
      case "docker-pulls":
        if (!pkg) return "";
        return `${baseUrl}/docker/pulls/${pkg}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=docker&logoColor=white`;
      case "docker-stars":
        if (!pkg) return "";
        return `${baseUrl}/docker/stars/${pkg}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=docker&logoColor=white`;
      default:
        return "";
    }
  };

  const metricTypes = [
    { value: "npm-downloads", label: "NPM Downloads", needsPackage: true },
    { value: "npm-version", label: "NPM Version", needsPackage: true },
    { value: "pypi-downloads", label: "PyPI Downloads", needsPackage: true },
    { value: "pypi-version", label: "PyPI Version", needsPackage: true },
    { value: "codecov", label: "Codecov Coverage", needsRepo: true },
    { value: "coveralls", label: "Coveralls Coverage", needsRepo: true },
    { value: "travis-ci", label: "Travis CI Status", needsRepo: true },
    { value: "github-actions", label: "GitHub Actions", needsRepo: true },
    { value: "docker-pulls", label: "Docker Pulls", needsPackage: true },
    { value: "docker-stars", label: "Docker Stars", needsPackage: true },
  ];

  return (
    <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">
            Dev Metrics
          </span>
        </div>
        <Button
          onClick={addMetric}
          size="sm"
          variant="outline"
          className="h-7 text-xs"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Metric
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

      {metrics.map((metric, index) => {
        const metricType = metricTypes.find((t) => t.value === metric.type);
        const needsPackage = metricType?.needsPackage;
        const needsRepo = metricType?.needsRepo;

        return (
          <div
            key={index}
            className="space-y-2 p-3 bg-background rounded border"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                Metric {index + 1}
              </span>
              {metrics.length > 1 && (
                <Button
                  onClick={() => removeMetric(index)}
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
                <Label className="text-xs">Type</Label>
                <Select
                  value={metric.type}
                  onValueChange={(value) =>
                    handleMetricChange(index, "type", value)
                  }
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {metricTypes.map((type) => (
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
                  value={metric.label}
                  onChange={(e) =>
                    handleMetricChange(index, "label", e.target.value)
                  }
                  placeholder="Custom label"
                  className="bg-background"
                />
              </div>
            </div>

            {needsPackage && (
              <div>
                <Label className="text-xs">Package Name</Label>
                <Input
                  value={metric.package}
                  onChange={(e) =>
                    handleMetricChange(index, "package", e.target.value)
                  }
                  placeholder="Package name (e.g., react, express)"
                  className="bg-background"
                />
              </div>
            )}

            {needsRepo && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Username</Label>
                  <Input
                    value={metric.username || ""}
                    onChange={(e) =>
                      handleMetricChange(index, "username", e.target.value)
                    }
                    placeholder="GitHub username"
                    className="bg-background"
                  />
                </div>

                <div>
                  <Label className="text-xs">Repository</Label>
                  <Input
                    value={metric.repo || ""}
                    onChange={(e) =>
                      handleMetricChange(index, "repo", e.target.value)
                    }
                    placeholder="Repository name"
                    className="bg-background"
                  />
                </div>
              </div>
            )}

            {((needsPackage && metric.package) ||
              (needsRepo && metric.username && metric.repo)) && (
              <div className="mt-2 p-2 bg-muted rounded">
                <img
                  src={generateMetricUrl(metric)}
                  alt={`${metric.type} badge`}
                  className="max-w-full h-auto"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>
        );
      })}

      {metrics.some((metric) => {
        const metricType = metricTypes.find((t) => t.value === metric.type);
        const needsPackage = metricType?.needsPackage;
        const needsRepo = metricType?.needsRepo;
        return (
          (needsPackage && metric.package) ||
          (needsRepo && metric.username && metric.repo)
        );
      }) && (
        <div className="mt-3 p-3 bg-background rounded border">
          <div style={{ textAlign: align }}>
            {metrics
              .filter((metric) => {
                const metricType = metricTypes.find(
                  (t) => t.value === metric.type
                );
                const needsPackage = metricType?.needsPackage;
                const needsRepo = metricType?.needsRepo;
                return (
                  (needsPackage && metric.package) ||
                  (needsRepo && metric.username && metric.repo)
                );
              })
              .map((metric, index) => (
                <img
                  key={index}
                  src={generateMetricUrl(metric)}
                  alt={`${metric.type} badge`}
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

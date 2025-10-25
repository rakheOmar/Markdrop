import {
  Award,
  Calendar,
  Camera,
  CheckCircle,
  Coins,
  Edit,
  Eye,
  FileText,
  Gift,
  Home,
  Mail,
  MapPin,
  Phone,
  Plus,
  Save,
  Star,
  ThumbsUp,
  TrendingUp,
  Trophy,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import axiosInstance from "@/lib/axios";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const resUser = await axiosInstance.get(`/users/profile/${id}`);
        setUser(resUser.data.data);
        setFormData(resUser.data.data);

        const resReports = await axiosInstance.get(`/reports?citizenId=${id}`);
        setReports(resReports.data.data.reports);
        setPagination(resReports.data.data.pagination);
      } catch (_error) {
        toast.error("Failed to load user profile or reports");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const capitalize = (word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : "");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axiosInstance.patch("/users/me", formData);
      setUser(res.data.data);
      setEditMode(false);
      toast.success("Profile updated successfully");
    } catch (_error) {
      toast.error("Failed to update profile");
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("avatar", file);

    try {
      setUploading(true);
      const res = await axiosInstance.patch("/users/me/avatar", formDataUpload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser((prev) => ({ ...prev, avatar: res.data.data.avatar }));
      toast.success("Avatar updated successfully");
    } catch (_error) {
      toast.error("Failed to update avatar");
    } finally {
      setUploading(false);
    }
  };

  const handleViewReport = (reportId) => {
    navigate(`/reports/${reportId}`);
  };

  const handleCreateReport = () => {
    navigate("/create-report");
  };

  const getDisplayCategory = (report) => {
    if (report.category === "other" && report.customCategory) {
      return report.customCategory;
    }
    return report.category || "Other";
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "resolved":
        return "default";
      case "in_progress":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getPriorityVariant = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getRewardsForScore = (score) => {
    const rewards = [];

    if (score >= 100) {
      rewards.push({
        id: "discount_voucher",
        title: "Discount Voucher",
        description: "Get 20% off on local services",
        icon: Gift,
        unlocked: true,
        value: "20% OFF",
      });
    }

    if (score >= 250) {
      rewards.push({
        id: "cash_reward",
        title: "Cash Reward",
        description: "Earn ₹100 for your community contribution",
        icon: Coins,
        unlocked: true,
        value: "₹100",
      });
    }

    if (score < 100) {
      rewards.push({
        id: "discount_voucher_locked",
        title: "Discount Voucher",
        description: "Unlock at 100 community score",
        icon: Gift,
        unlocked: false,
        value: "20% OFF",
        requiredScore: 100,
      });
    }

    if (score < 250) {
      rewards.push({
        id: "cash_reward_locked",
        title: "Cash Reward",
        description: "Unlock at 250 community score",
        icon: Coins,
        unlocked: false,
        value: "₹100",
        requiredScore: 250,
      });
    }

    return rewards;
  };

  const getNextReward = (score) => {
    if (score < 100) return { score: 100, reward: "Discount Voucher (20% OFF)" };
    if (score < 250) return { score: 250, reward: "Cash Reward (₹100)" };
    return { score: 500, reward: "Premium Badge" };
  };

  const getCommunityScoreBadge = (score) => {
    if (score >= 80) return { variant: "default", label: "Excellent" };
    if (score >= 60) return { variant: "secondary", label: "Good" };
    if (score >= 40) return { variant: "outline", label: "Fair" };
    if (score >= 20) return { variant: "destructive", label: "Poor" };
    return { variant: "destructive", label: "New" };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl space-y-6 p-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>
            <div className="lg:col-span-8">
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="mx-auto max-w-md">
          <CardContent className="p-8 text-center">
            <User className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-semibold">User Not Found</h2>
            <p className="text-muted-foreground">
              The user profile you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate(-1)} className="mt-4">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold">User Profile</h1>
            <p className="mt-1 text-muted-foreground">
              Manage profile information and view submitted reports
            </p>
          </div>
          <Button onClick={handleCreateReport} size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Create Report
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Card>
              <CardHeader className="pb-4 text-center">
                <div className="group relative mx-auto">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-2xl">{user.fullname?.[0]}</AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-all duration-200 group-hover:opacity-100"
                  >
                    {uploading ? (
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <Camera className="h-6 w-6" />
                    )}
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
                <div className="mt-4">
                  <CardTitle className="text-xl">{user.fullname}</CardTitle>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <Badge variant="secondary">{capitalize(user.role)}</Badge>
                    {user.citizenProfile && (
                      <Badge
                        variant={getCommunityScoreBadge(user.citizenProfile.communityScore).variant}
                      >
                        <Star className="mr-1 h-3 w-3" />
                        {getCommunityScoreBadge(user.citizenProfile.communityScore).label}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              {user.citizenProfile && (
                <CardContent className="border-b">
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 font-semibold">
                      <TrendingUp className="h-4 w-4" />
                      Citizen Statistics
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-muted p-3 text-center">
                        <div className="flex items-center justify-center gap-1 text-2xl font-bold text-primary">
                          <FileText className="h-5 w-5" />
                          {user.citizenProfile.reportsSubmitted}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">Reports Submitted</p>
                      </div>

                      <div className="rounded-lg bg-muted p-3 text-center">
                        <div className="text-2xl font-bold text-primary">
                          <div className="flex items-center justify-center gap-1">
                            <Award className="h-5 w-5" />
                            {user.citizenProfile.communityScore}
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">Community Score</p>
                      </div>
                    </div>

                    {user.citizenProfile.favorites && user.citizenProfile.favorites.length > 0 && (
                      <div className="rounded-lg bg-muted p-3 text-center">
                        <div className="text-lg font-bold text-accent-foreground">
                          {user.citizenProfile.favorites.length}
                        </div>
                        <p className="text-xs text-muted-foreground">Favorite Reports</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              )}

              {user.citizenProfile && (
                <CardContent className="border-b">
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 font-semibold">
                      <Trophy className="h-4 w-4" />
                      Rewards & Achievements
                    </h3>

                    <div className="space-y-3">
                      {getRewardsForScore(user.citizenProfile.communityScore).map((reward) => {
                        const IconComponent = reward.icon;
                        return (
                          <div
                            key={reward.id}
                            className={`rounded-lg border p-4 transition-all duration-200 ${
                              reward.unlocked
                                ? "border-border bg-card"
                                : "border-muted bg-muted opacity-60"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`rounded-lg p-2 ${reward.unlocked ? "bg-primary/10" : "bg-muted"}`}
                                >
                                  <IconComponent
                                    className={`h-5 w-5 ${reward.unlocked ? "text-primary" : "text-muted-foreground"}`}
                                  />
                                </div>
                                <div>
                                  <h4
                                    className={`font-semibold ${reward.unlocked ? "text-foreground" : "text-muted-foreground"}`}
                                  >
                                    {reward.title}
                                  </h4>
                                  <p
                                    className={`text-sm ${reward.unlocked ? "text-muted-foreground" : "text-muted-foreground/60"}`}
                                  >
                                    {reward.description}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div
                                  className={`text-lg font-bold ${reward.unlocked ? "text-primary" : "text-muted-foreground"}`}
                                >
                                  {reward.value}
                                </div>
                                {reward.unlocked ? (
                                  <Badge variant="default" className="text-xs">
                                    <CheckCircle className="mr-1 h-3 w-3" />
                                    Unlocked
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-xs">
                                    <Star className="mr-1 h-3 w-3" />
                                    {reward.requiredScore} points
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {(() => {
                      const nextReward = getNextReward(user.citizenProfile.communityScore);
                      const progress = Math.min(
                        (user.citizenProfile.communityScore / nextReward.score) * 100,
                        100
                      );

                      return (
                        <div className="rounded-lg border bg-card p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <h4 className="font-semibold text-foreground">Next Reward</h4>
                            <span className="text-sm text-muted-foreground">
                              {user.citizenProfile.communityScore}/{nextReward.score} points
                            </span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Trophy className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">{nextReward.reward}</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div
                                className="h-2 rounded-full bg-primary transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {nextReward.score - user.citizenProfile.communityScore} more points
                              needed
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </CardContent>
              )}

              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    <Input
                      name="fullname"
                      value={formData.fullname || ""}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input value={user.email} disabled />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      name="phoneNumber"
                      value={formData.phoneNumber || ""}
                      onChange={handleChange}
                      disabled={!editMode}
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Home className="h-4 w-4" />
                      Address
                    </Label>
                    <Input
                      name="address"
                      value={formData.address || ""}
                      onChange={handleChange}
                      disabled={!editMode}
                      placeholder="Enter address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Calendar className="h-4 w-4" />
                      Member Since
                    </Label>
                    <Input
                      value={new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      disabled
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 border-t pt-4">
                  {editMode ? (
                    <>
                      <Button onClick={handleSave} className="w-full">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditMode(false);
                          setFormData(user);
                        }}
                        className="w-full"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" onClick={() => setEditMode(true)} className="w-full">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl">Submitted Reports</CardTitle>
                <Badge variant="outline" className="text-sm">
                  {user.citizenProfile?.reportsSubmitted ||
                    pagination?.totalReports ||
                    reports.length}{" "}
                  report
                  {(user.citizenProfile?.reportsSubmitted ||
                    pagination?.totalReports ||
                    reports.length) !== 1
                    ? "s"
                    : ""}{" "}
                  total
                </Badge>
              </CardHeader>

              <CardContent>
                {reports.length === 0 ? (
                  <div className="py-16 text-center">
                    <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                      <Eye className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium">No Reports Yet</h3>
                    <p className="mb-4 text-muted-foreground">
                      This user hasn't submitted any reports yet.
                    </p>
                    <Button onClick={handleCreateReport} variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Create First Report
                    </Button>
                  </div>
                ) : (
                  <ScrollArea className="h-[75vh] w-full">
                    <div className="space-y-4 pr-4">
                      {reports.map((report) => (
                        <Card
                          key={report._id}
                          className="group cursor-pointer transition-all duration-200 hover:shadow-md"
                          onClick={() => handleViewReport(report._id)}
                        >
                          <CardContent className="p-6">
                            <div className="mb-4 flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="line-clamp-1 text-lg font-semibold transition-colors group-hover:text-primary">
                                  {report.title}
                                </h4>
                                <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                                  <span>Category: {capitalize(getDisplayCategory(report))}</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(report.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4 flex items-center gap-2">
                                <Badge variant="secondary">
                                  <ThumbsUp className="mr-1 h-3 w-3" />
                                  {report.vote || 0}
                                </Badge>
                                <Badge variant={getStatusVariant(report.status)}>
                                  {capitalize(report.status?.replace("_", " ") || "pending")}
                                </Badge>
                              </div>
                            </div>

                            <p className="line-clamp-2 mb-4 text-sm text-muted-foreground">
                              {report.description || "No description provided."}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm">
                                <Badge variant={getPriorityVariant(report.priority)}>
                                  {capitalize(report.priority || "Low")} Priority
                                </Badge>

                                {report.images && report.images.length > 0 && (
                                  <span className="flex items-center gap-1 text-muted-foreground">
                                    <Camera className="h-3 w-3" />
                                    {report.images.length} image
                                    {report.images.length !== 1 ? "s" : ""}
                                  </span>
                                )}

                                {report.location && (
                                  <span className="flex items-center gap-1 text-muted-foreground">
                                    <MapPin className="h-3 w-3" />
                                    Location attached
                                  </span>
                                )}
                              </div>

                              <Button
                                size="sm"
                                variant="ghost"
                                className="opacity-0 transition-opacity group-hover:opacity-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewReport(report._id);
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

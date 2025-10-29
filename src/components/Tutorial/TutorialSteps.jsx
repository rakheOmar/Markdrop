export default function TutorialSteps() {
  const steps = [
    {
      title: "Sign up & create profile",
      body: "Sign up, add a display name, short bio, and optionally an avatar. This makes your profile discoverable.",
    },
    {
      title: "Open the builder",
      body: "Visit the Builder page, create a new markdown file, and use the editor blocks to compose content (headings, lists, code, images).",
    },
    {
      title: "Preview & publish",
      body: "Use the preview pane to verify formatting, then save/publish. Your markdown will be accessible via a shareable URL.",
    },
    {
      title: "Share & iterate",
      body: "Share the link, gather feedback, and update the markdown. Consider adding a license and contribution section.",
    },
  ];

  return (
    <ol className="list-decimal ml-5 space-y-4 text-sm text-muted-foreground">
      {steps.map((s, idx) => (
        <li key={idx}>
          <div className="font-semibold text-foreground">{s.title}</div>
          <div className="mt-1">{s.body}</div>
        </li>
      ))}
    </ol>
  );
}

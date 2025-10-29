import { Link } from "react-router-dom";

export default function TutorialCard({ title, description, ctaText, ctaHref }) {
  return (
    <div className="p-4 bg-card rounded-lg border border-border">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <Link to={ctaHref} className="inline-block text-sm font-medium text-primary">
        {ctaText} →
      </Link>
    </div>
  );
}

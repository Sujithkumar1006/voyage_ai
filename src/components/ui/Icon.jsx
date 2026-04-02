import {
  ArrowRight,
  Bot,
  FlaskConical,
  HelpCircle,
  History,
  Home,
  Trash2,
  Plus,
  Search,
  Settings,
  Sparkles,
  User,
} from "lucide-react";

const iconMap = {
  add: Plus,
  arrow_forward: ArrowRight,
  auto_awesome: Sparkles,
  biotech: FlaskConical,
  delete: Trash2,
  explore: Bot,
  help: HelpCircle,
  history: History,
  history_edu: Sparkles,
  home: Home,
  person: User,
  search: Search,
  settings: Settings,
};

export function Icon({ name, className, filled = false }) {
  const LucideIcon = iconMap[name] ?? Search;

  return (
    <LucideIcon
      aria-hidden="true"
      className={className}
      fill={filled ? "currentColor" : "none"}
      strokeWidth={filled ? 1.75 : 2}
    />
  );
}

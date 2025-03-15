import { Badge } from "../ui/badge";

export default function FluffTrait({ title }: { title: string }) {
  return (
    <Badge
      className="max-w-[80px] truncate text-xs font-extralight"
      title={title}
    >
      {title}
    </Badge>
  );
}

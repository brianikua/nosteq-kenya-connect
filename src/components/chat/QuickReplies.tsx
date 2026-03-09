interface QuickRepliesProps {
  onSelect: (reply: string) => void;
}

const quickReplies = [
  "Show fintech & banking case studies",
  "I need Fiber Internet for my business",
  "I need CCTV & branch security setup",
  "I need a Data Center / server room upgrade",
  "I need custom Software & App Development",
  "Request a quote for my project",
  "I need technical support",
];

const QuickReplies = ({ onSelect }: QuickRepliesProps) => (
  <div className="flex flex-wrap gap-2">
    {quickReplies.map((reply, index) => (
      <button
        key={index}
        onClick={() => onSelect(reply)}
        className="text-xs px-3 py-2 rounded-full border border-primary/30 text-primary hover:bg-primary/5 transition-colors"
      >
        {reply}
      </button>
    ))}
  </div>
);

export default QuickReplies;

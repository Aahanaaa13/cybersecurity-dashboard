interface StatCardProps {
  title: string;
  value: number;
  color: "red" | "orange" | "yellow" | "blue";
  icon: string;
}

export default function StatCard({ title, value, color, icon }: StatCardProps) {
  const styles = {
    red: "border-red-500/30 bg-red-900/20 text-red-400",
    orange: "border-orange-500/30 bg-orange-900/20 text-orange-400",
    yellow: "border-yellow-500/30 bg-yellow-900/20 text-yellow-400",
    blue: "border-blue-500/30 bg-blue-900/20 text-blue-400",
  };

  return (
    <div className={"rounded-xl border p-5 " + styles[color]}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <span className="text-xs uppercase tracking-widest opacity-60">
          {title}
        </span>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
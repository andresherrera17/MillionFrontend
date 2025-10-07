export function CardDescription({
  name,
  owner,
}: {
  name: string;
  owner: string;
}) {
  return (
    <div className="p-6">
      <h3 className="font-display text-2xl font-bold text-text-light dark:text-text-dark">
        {name}
      </h3>
      <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">
        Owner: {owner}
      </p>
    </div>
  );
}

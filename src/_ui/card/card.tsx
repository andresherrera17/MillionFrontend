export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-card-light dark:bg-card-dark p-4 sm:p-6 rounded-lg shadow-md mb-8">
      {children}
    </div>
  );
}

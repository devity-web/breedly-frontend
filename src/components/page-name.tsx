interface PageNameProps {
  name: string;
}

export function PageName({name}: PageNameProps) {
  return (
    <div className="mb-2 flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center">
      <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
    </div>
  );
}

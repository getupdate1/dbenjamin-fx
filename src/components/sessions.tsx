const SESSIONS = [
  { city: "Sydney", zone: "Australia/Sydney" },
  { city: "Tokyo", zone: "Asia/Tokyo" },
  { city: "London", zone: "Europe/London" },
  { city: "New York", zone: "America/New_York" },
];

export function SessionClocks() {
  const now = new Date();
  return (
    <ul className="mt-6 grid grid-cols-2 gap-4">
      {SESSIONS.map((s) => (
        <li key={s.city}>
          <p className="text-[11px] tracking-[0.16em] text-muted uppercase">{s.city}</p>
          <p className="mt-1 font-mono text-2xl">
            {new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: s.zone }).format(now)}
          </p>
        </li>
      ))}
    </ul>
  );
}

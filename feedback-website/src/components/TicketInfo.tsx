interface TicketInfoProps {
  ticketId: number;
  subject: string | null;
}

/**
 * Purely read-only display. Ticket ID (and subject, when present in the
 * link) must never become editable inputs — they're the identity of the
 * feedback record and come straight from the Freshdesk email link.
 */
export function TicketInfo({ ticketId, subject }: TicketInfoProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
      <dl className="space-y-1">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Ticket
          </dt>
          <dd className="font-mono text-sm font-medium text-slate-800">#{ticketId}</dd>
        </div>
        {subject && (
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Subject
            </dt>
            <dd className="truncate text-right text-sm text-slate-700" title={subject}>
              {subject}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}

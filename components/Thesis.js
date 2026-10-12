'use client';

import { useState } from 'react';

// The hero statement makes three claims; each margin note is the evidence for one.
const NOTES = [
  {
    id: 1,
    title: 'In production',
    body: '24/7 customer-service agents on WhatsApp, Instagram and web chat for Kribaat, and HisabKitab, a WhatsApp accountant with about 1,600 automated tests in CI.',
  },
  {
    id: 2,
    title: 'Verified, not guessed',
    body: 'NyayaSathi checks every citation in five stages. 0 fabricated citations on an adversarial set, Precision@10 0.871.',
  },
  {
    id: 3,
    title: 'Low-resource languages',
    body: 'NEPVERSA, a version-aware Nepali statutory retrieval benchmark. Under review at ACM TALLIP.',
  },
];

function Marker({ id, active, setActive }) {
  return (
    <a
      href={`#note-${id}`}
      className="note-marker"
      aria-describedby={`note-${id}`}
      aria-label={`Note ${id}`}
      data-active={active === id}
      onMouseEnter={() => setActive(id)}
      onMouseLeave={() => setActive(null)}
      onFocus={() => setActive(id)}
      onBlur={() => setActive(null)}
    >
      {id}
    </a>
  );
}

export default function Thesis() {
  const [active, setActive] = useState(null);
  const marker = (id) => <Marker id={id} active={active} setActive={setActive} />;

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-14">
      <h1 className="text-[2.6rem] leading-[1.04] font-bold tracking-[-0.025em] text-ink sm:text-6xl lg:text-[4.5rem]">
        I build AI systems{marker(1)} that have to be right,{marker(2)} not
        just fluent.{marker(3)}
      </h1>

      <ol className="space-y-4 self-end font-sans text-[0.9rem] leading-snug" aria-label="Notes">
        {NOTES.map((note, i) => (
          <li
            key={note.id}
            id={`note-${note.id}`}
            className="note note-enter py-1 pl-4 pr-2"
            style={{ animationDelay: `${500 + i * 140}ms` }}
            data-active={active === note.id}
            onMouseEnter={() => setActive(note.id)}
            onMouseLeave={() => setActive(null)}
          >
            <p className="font-semibold text-ink">
              <span className="note-num mr-1.5 font-bold">{note.id}</span>
              {note.title}
            </p>
            <p className="mt-1 text-muted">{note.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

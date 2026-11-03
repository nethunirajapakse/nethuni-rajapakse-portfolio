"use client";

import { useInView } from "../hooks/useInView";
import { volunteering, type Volunteering as Entry } from "../data/community";
import EventPhotos from "./EventPhotos";
import ScrambleText from "./ScrambleText";

const RULE = "color-mix(in srgb, var(--color-body), transparent 88%)";

/**
 * One entry of the volunteering log: a photo collage on one side and the
 * details on the other, flipping sides on every row. Photos are kept to a
 * modest size so the engineering work stays the main story. Entries without
 * photos become plain text rows.
 */
function Row({ v, index }: { v: Entry; index: number }) {
  const { ref, inView } = useInView<HTMLElement>();
  const hasPhotos = (v.photos?.length ?? 0) > 0;
  const flip = index % 2 === 1;

  return (
    <article
      ref={ref}
      className={`${inView ? "animate-reveal" : "opacity-0"} grid items-center gap-x-12 gap-y-8 border-t py-10 ${
        hasPhotos ? "md:grid-cols-12" : ""
      }`}
      style={{ borderColor: RULE }}
    >
      {hasPhotos && (
        <div className={`pb-4 md:col-span-4 ${flip ? "md:order-2" : ""}`}>
          <EventPhotos
            photos={v.photos ?? []}
            title={v.title}
            icon="bi-heart"
            fit={v.photoFit}
            variant="collage"
            aspect="aspect-[4/3]"
          />
        </div>
      )}

      <div className={hasPhotos ? "md:col-span-8" : "max-w-3xl"}>
        <p className="font-mono text-sm text-amber">{v.date}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-heading">
          {v.title}
        </h3>
        <p className="mt-1.5 font-medium text-accent">{v.role}</p>
        <p className="mt-1 font-mono text-xs leading-relaxed text-body/60">
          {v.organiser}
        </p>
        {v.location && (
          <p className="mt-1 font-mono text-xs text-body/60">
            <i className="bi bi-geo-alt mr-1.5" />
            {v.location}
          </p>
        )}

        <p className="mt-4 max-w-2xl leading-relaxed text-body/80">
          {v.description}
        </p>
      </div>
    </article>
  );
}

export default function Volunteering() {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section id="volunteering" ref={ref} className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`${inView ? "animate-reveal" : "opacity-0"} mb-8 max-w-2xl`}
        >
          <p className="mb-3 font-mono text-sm tracking-tight text-accent">
            — volunteering
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-tight text-heading">
            <ScrambleText text="Giving back, behind the scenes" />
          </h2>
          <p className="mt-4 leading-relaxed text-body/80">
            Selected events and outreach I helped organise through different societies and clubs.
          </p>
        </div>

        <div>
          {volunteering.map((v, i) => (
            <Row key={v.id} v={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

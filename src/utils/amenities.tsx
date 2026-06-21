import { AMENITY_ICONS, AMENITY_LABELS } from "../types/amenities";

export const AmenityBadge: React.FC<{ amenity: string }> = ({ amenity }) => (
  <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/8 border border-white/10 text-white/60 text-[10px] font-medium">
    <span>{AMENITY_ICONS[amenity] ?? "✓"}</span>
    <span>{AMENITY_LABELS[amenity] ?? amenity}</span>
  </span>
);

export const AmenitiesRow: React.FC<{ amenities: string[] }> = ({ amenities }) => {
  if (!amenities?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {amenities.map((a) => (
        <AmenityBadge key={a} amenity={a} />
      ))}
    </div>
  );
};
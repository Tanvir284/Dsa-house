/**
 * Ambient backdrop — soft, slowly drifting colour fields.
 *
 * Previously a WebGL scene (three.js + @react-three/fiber + drei, ~883 KB of
 * JavaScript) rendered at 12% opacity behind content. That is an enormous
 * payload for decoration nobody consciously perceives, and it was the single
 * largest dependency in the app.
 *
 * Three blurred radial gradients on the compositor produce the same effect for
 * roughly a kilobyte, run on the GPU without a render loop, cost no main-thread
 * time, and work during SSR. `prefers-reduced-motion` stops the drift in CSS
 * rather than in JavaScript, so it is honoured before first paint.
 */

interface AmbientOrbFieldProps {
  className?: string;
  /** Fewer, tighter fields for constrained spaces (auth cards, page headers). */
  compact?: boolean;
}

export default function AmbientOrbField({
  className = 'absolute inset-0 -z-10',
  compact = false,
}: AmbientOrbFieldProps) {
  return (
    <div className={`ambient-field ${className}`} aria-hidden="true">
      <span className="ambient-orb ambient-orb-a" />
      {!compact && (
        <>
          <span className="ambient-orb ambient-orb-b" />
          <span className="ambient-orb ambient-orb-c" />
        </>
      )}
    </div>
  );
}

export function ModuleVisual({ label = "Planning view" }: { label?: string }) {
  return (
    <div className="module-visual" aria-label={label}>
      <div className="module-visual__toolbar">
        <span />
        <span />
        <span />
      </div>
      <div className="module-visual__screen">
        <span className="scan-grid" />
        <span className="scan scan-a" />
        <span className="scan scan-b" />
        <span className="scan scan-c" />
        <span className="target-ring" />
        <span className="slice slice-horizontal" />
        <span className="slice slice-vertical" />
        <span className="slice slice-angle" />
        <div className="module-visual__label">
          <strong>{label}</strong>
          <span>app preview in development</span>
        </div>
        <div className="module-visual__readout glass">
          <strong>Angle</strong>
          <span>aligned</span>
        </div>
      </div>
    </div>
  );
}

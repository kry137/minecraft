export function FitScreen({ className, children }) {
  return (
    <div className={`w-screen h-screen ${className}`}>
      {children}
    </div>
  );
}

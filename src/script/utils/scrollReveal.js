export function scrollReveal(options) {
  const sr = ScrollReveal();
  return sr.reveal(
    options.selector,
    {
      origin: options.origin || "top",
      distance: options.distance || "40px",
      duration: options.duration || 1000,
      reset: options.reset || true,
      interval: options.interval || 275,

    }
  );
}

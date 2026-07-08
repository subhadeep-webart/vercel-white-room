import { useLayoutEffect } from "react";
import gsap from "gsap";

export function useGsap(ref, animationFn, deps = []) {
  useLayoutEffect(() => {
    if (!ref.current) return;

    // Create GSAP context to scope animations and enable cleanup
    const ctx = gsap.context(() => {
      animationFn(gsap, ref.current);
    }, ref);

    // Cleanup on unmount or deps change
    return () => ctx.revert();
  }, deps);
}

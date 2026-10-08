"use client";

import { useEffect } from "react";

export function MenuBinder() {
  useEffect(() => {
    const nav = document.querySelector(".nav");
    const burger = document.querySelector(".nav-burger");
    if (!nav || !burger || nav.dataset.bound) return undefined;
    nav.dataset.bound = "1";
    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    }
    function onBurger() {
      setOpen(!nav.classList.contains("is-open"));
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    const closers = [...nav.querySelectorAll(".nav-links a")].map((a) => {
      const fn = () => setOpen(false);
      a.addEventListener("click", fn);
      return [a, fn];
    });
    burger.addEventListener("click", onBurger);
    document.addEventListener("keydown", onKey);
    return () => {
      delete nav.dataset.bound;
      burger.removeEventListener("click", onBurger);
      document.removeEventListener("keydown", onKey);
      closers.forEach(([a, fn]) => a.removeEventListener("click", fn));
    };
  }, []);
  return null;
}

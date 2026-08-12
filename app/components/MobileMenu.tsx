"use client";

import { useRef } from "react";

const links = [
  ["#para-quem", "Para quem é"],
  ["#como-funciona", "Como funciona"],
  ["#sobre", "Sobre"],
  ["#perguntas", "Perguntas frequentes"],
] as const;

export function MobileMenu() {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => menuRef.current?.removeAttribute("open");

  return (
    <details className="mobile-menu" ref={menuRef}>
      <summary aria-label="Abrir menu"><span></span><span></span></summary>
      <nav aria-label="Navegação móvel">
        {links.map(([href, label]) => (
          <a href={href} key={href} onClick={closeMenu}>{label}</a>
        ))}
        <a className="button button-primary" href="#candidatura" data-funnel-cta="mobile_menu" onClick={closeMenu}>Quero me candidatar</a>
      </nav>
    </details>
  );
}

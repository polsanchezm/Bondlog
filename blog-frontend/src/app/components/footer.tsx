"use client";

import { Footer } from "flowbite-react";

export function FooterPersonalized() {
  return (
    <Footer container className="rounded-none bg-gray-100 dark:bg-gray-700">
      <Footer.Copyright href="#" by="Pol Sanchez" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}

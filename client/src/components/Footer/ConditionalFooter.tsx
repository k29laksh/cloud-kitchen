"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    setShowFooter(pathname !== "/community");
  }, [pathname]);

  return showFooter ? <Footer /> : null;
}

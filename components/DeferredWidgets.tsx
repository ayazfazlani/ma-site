"use client";

import dynamic from "next/dynamic";

const WhatsAppButton = dynamic(() => import("./WhatsAppButton"), {
  ssr: false,
});

const Toaster = dynamic(
  () => import("react-hot-toast").then((m) => m.Toaster),
  { ssr: false }
);

export default function DeferredWidgets() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { borderRadius: "12px", fontWeight: "600" } }} />
      <WhatsAppButton />
    </>
  );
}

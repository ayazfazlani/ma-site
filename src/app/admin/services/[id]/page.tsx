"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ServiceForm from "../ServiceForm";

export default function EditServicePage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  useEffect(() => { fetch(`/api/admin/services/${id}`).then((response) => response.json()).then(setData); }, [id]);
  if (!data) return <p className="py-20 text-center text-gray-500">Loading service...</p>;
  const features = typeof data.features === "string" ? JSON.parse(data.features || "[]") : data.features;
  return <ServiceForm id={id} initialData={{ ...data, features: Array.isArray(features) ? features.join("\n") : "" } as never} />;
}
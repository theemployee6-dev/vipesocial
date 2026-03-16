import { useEffect, useState } from "react";

import { createServerSupabaseClient } from "@/lib/infrastructure/supabase/server";

interface AvatarProps {
  path: string;
  size?: number;
  className?: string;
}

export function AvatarPage({ path, size = 64, className = "" }: AvatarProps) {
  const [url, setUrl] = useState<string | null>(null);

  const supabase = createServerSupabaseClient();

  function fetchAvatarImageFromSupabaseBucket() {
    if (!path) return;
  }

  useEffect(() => {}, []);
}

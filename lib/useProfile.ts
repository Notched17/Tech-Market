"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Profile } from "@/lib/types";

// Tracks the logged-in user's auth session and their matching profiles row.
// `loading` is true until the initial session check finishes.
export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadProfile(uid: string | null) {
      if (!uid) {
        if (active) {
          setUserId(null);
          setProfile(null);
          setLoading(false);
        }
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", uid)
        .single();
      if (active) {
        setUserId(uid);
        setProfile(data ?? null);
        setLoading(false);
      }
    }

    supabase.auth.getSession().then(({ data }) => {
      loadProfile(data.session?.user.id ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoading(true);
      loadProfile(session?.user.id ?? null);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return { profile, userId, loading, isLoggedIn: !!userId };
}

import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const useGetSession = () => {
  const [session, setSession] = useState<Session | null | "loading">("loading");

  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
  };

  useEffect(() => {
    getSession();
  }, []);

  return { session };
};

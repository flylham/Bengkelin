import { Session, User } from "@supabase/supabase-js";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { supabase } from "../../lib/supabase";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, callsign: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Memantau perubahan status login
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });

    // Memeriksa sesi login yang tersimpan
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.log("Gagal mengambil sesi:", error.message);
      }

      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Registrasi akun baru
  const signUp = async (email: string, password: string, callsign: string) => {
    return await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          callsign: callsign.trim(),
        },
      },
    });
  };

  // Login menggunakan email dan password
  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
  };

  // Logout akun
  const signOut = async () => {
    return await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook untuk mengakses AuthContext
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }

  return context;
}

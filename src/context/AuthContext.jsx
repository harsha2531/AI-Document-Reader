import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    async function loadProfile(userId) {

        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", userId)
            .single();

        if (!error) {
            setProfile(data);
        }
    }

    useEffect(() => {

        supabase.auth.getSession().then(async ({ data }) => {

            const session = data.session;

            if (session) {

                setUser(session.user);

                await loadProfile(session.user.id);
            }

            setLoading(false);

        });

        const {
            data: listener
        } = supabase.auth.onAuthStateChange(async (_, session) => {

            if (session) {

                setUser(session.user);

                await loadProfile(session.user.id);

            } else {

                setUser(null);

                setProfile(null);

            }

        });

        return () => listener.subscription.unsubscribe();

    }, []);

    async function register(
        fullName,
        email,
        password,
        department
    ) {

        const { data, error } =
            await supabase.auth.signUp({

                email,

                password

            });

        if (error) return { error };

        const userId = data.user.id;

        await supabase
            .from("users")
            .insert({

                id: userId,

                full_name: fullName,

                department: department,

                role: "user",

                approved: false

            });

        return { success: true };

    }

    async function login(email, password) {

        return await supabase.auth.signInWithPassword({

            email,

            password

        });

    }

    async function logout() {

        await supabase.auth.signOut();

    }

    return (

        <AuthContext.Provider

            value={{

                user,

                profile,

                loading,

                register,

                login,

                logout

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}
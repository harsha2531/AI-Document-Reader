import { useAuth } from "../context/AuthContext";
import UserLayout from "../layouts/UserLayout";

export default function Dashboard() {

    const { profile } = useAuth();

    return (

        <UserLayout>

            <h2>

                Dashboard

            </h2>

            <hr />

            <h4>

                Welcome,

                {" "}

                {profile?.full_name}

            </h4>

            <p>

                Department :

                {" "}

                {profile?.department}

            </p>

            <p>

                Role :

                {" "}

                {profile?.role}

            </p>

        </UserLayout>

    );

}
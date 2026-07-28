import UserLayout from "../layouts/UserLayout";
import { useAuth } from "../context/AuthContext";

export default function Profile() {

    const { profile } = useAuth();

    return (

        <UserLayout>

            <h2>Profile</h2>

            <hr />

            <p>

                <strong>Name:</strong>

                {" "}

                {profile?.full_name}

            </p>

            <p>

                <strong>Department:</strong>

                {" "}

                {profile?.department}

            </p>

            <p>

                <strong>Role:</strong>

                {" "}

                {profile?.role}

            </p>

            <p>

                <strong>Approved:</strong>

                {" "}

                {profile?.approved ? "Yes" : "No"}

            </p>

        </UserLayout>

    );

}
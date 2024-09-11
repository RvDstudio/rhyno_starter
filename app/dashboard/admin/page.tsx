import { auth } from "@/auth";
import { User } from "@/types"; // Adjust the import based on your project structure

interface ExtendedUser extends Omit<User, "isAdmin"> {
  isAdmin: boolean; // Add isAdmin property
}

export default async function Page() {
  const session = await auth();

  // Type guard to ensure session.user is ExtendedUser
  if (session && session.user && "isAdmin" in session.user) {
    const user = session.user as ExtendedUser;

    // Check if isAdmin is truthy
    if (user.isAdmin) {
      return <p>You are an admin, welcome!</p>;
    }
  }

  return <p>You are not authorized to view this page!</p>;
}

// lib/roleMiddleware.js
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const checkUserRole = (user, requiredRole) => {
  if (!user || user.role !== requiredRole) {
    throw new Error("Unauthorized");
  }
};

const useRoleMiddleware = (requiredRole) => {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    try {
      checkUserRole(user, requiredRole);
    } catch (error) {
      router.push("/unauthorized");
    }
  }, [user]);

  return null; // We return null to ensure the middleware doesn't render any additional content
};

export default useRoleMiddleware;

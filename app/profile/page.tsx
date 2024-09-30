"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { DashNav } from "@/components/Navbar";
import { Poppins } from "next/font/google";

interface UserDetails {
  name: string;
  email: string;
  role: string;
  image?: string;
  lawFirm: string;
  barAssociationId: string;
  specialization: string;
}

const poppin = Poppins({
    subsets:['latin'],
    weight:["400","500","600","700"]
})

export default function ProfilePage() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        setUserDetails(data);
      } catch (err) {
        setError("An error occurred while fetching user details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <Skeleton className="h-4 w-[300px]" />
            <Skeleton className="h-4 w-[250px]" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-md">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-red-500">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="container mx-auto p-4 max-w-md">
        <Card>
          <CardContent className="p-6">
            <p className="text-center">
              Unable to load user profile. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <DashNav />
      <div
        className={`container mx-auto flex items-center justify-center h-screen p-4 max-w-md ${poppin.className}`}
      >
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={session?.user?.image}
                  alt={userDetails.name}
                />
                <AvatarFallback>
                  {userDetails.name ? userDetails.name.charAt(0) : "?"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{userDetails.name}</h2>
                <p className="text-sm text-gray-500">{userDetails.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p>
                <strong>Law Firm</strong> {userDetails.lawFirm}
              </p>
              <p>
                <strong>Email:</strong> {userDetails.email}
              </p>
              <p>
                <strong>Bar ID:</strong> {userDetails.barAssociationId}
              </p>
              <p>
                <strong>Specialization:</strong> {userDetails.specialization}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

'use client'

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconBrain, IconScale, IconSearch, IconHistory } from "@tabler/icons-react";
import ProfileCompletionModal from '@/components/Completionmodal';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  profileCompleted: boolean;
  lawFirm?: string;
  barAssociationId?: string;
  specialization?: string;
  phoneNumber?: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (session?.user) {
      fetchUser();
    }
  }, [session]);

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/user');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (user && !user.profileCompleted) {
      setIsModalOpen(true);
    }
  }, [user?.profileCompleted]);

  const handleProfileSubmit = async (formData: Partial<User>) => {
    try {
      const response = await axios.post<{ message: string; user: User }>('/api/user', formData);
      setUser(response.data.user);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">Please sign in to access the dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <IconScale className="h-8 w-8 text-indigo-600" />
                <IconBrain className="h-8 w-8 text-blue-600 ml-2" />
                <span className="ml-2 text-xl font-bold text-gray-800">
                  Cortex
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <Avatar>
                <AvatarImage
                  src={session?.user?.image || undefined}
                  alt={session?.user?.name || ""}
                />
                <AvatarFallback>
                  {session?.user?.name ? session.user.name.charAt(0) : "?"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Welcome, {session?.user?.name}
          </h1>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Quick Search</CardTitle>
                <CardDescription>
                  Search through legal documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/search">
                  <Button className="w-full">
                    <IconSearch className="mr-2" /> Start New Search
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Searches</CardTitle>
                <CardDescription>Your latest research queries</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <IconHistory className="mr-2 text-gray-400" />
                    <span>Copyright infringement cases 2023</span>
                  </li>
                  <li className="flex items-center">
                    <IconHistory className="mr-2 text-gray-400" />
                    <span>Contract breach precedents</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
                <CardDescription>
                  Finish setting up your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  variant={user?.profileCompleted ? "outline" : "default"}
                  onClick={() => setIsModalOpen(true)}
                >
                  {user?.profileCompleted ? "Edit Profile" : "Complete Profile"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {user && (
        <ProfileCompletionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleProfileSubmit}
          initialData={user}
        />
      )}
    </div>
  );
}

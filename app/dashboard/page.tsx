'use client'

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { IconBrain, IconScale, IconSearch, IconHistory, IconLanguage, IconChartBar } from "@tabler/icons-react";
import ProfileCompletionModal from '@/components/Completionmodal';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { VerifiedIcon, VoicemailIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { predictCaseOutcome } from '@/lib/action';
import { DashNav } from '@/components/Navbar';
import Footer from '@/components/Footer';


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

const mockChartData = [
  { name: 'Jan', cases: 65 },
  { name: 'Feb', cases: 59 },
  { name: 'Mar', cases: 80 },
  { name: 'Apr', cases: 81 },
  { name: 'May', cases: 56 },
  { name: 'Jun', cases: 55 },
];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [casePredictionInput, setCasePredictionInput] = useState('');
  const [casePredictionResult, setCasePredictionResult] = useState('');
  const [isPredicting, setIsPredicting] = useState(false);

  useEffect(() => {
    if (session?.user) {
      fetchUser();
    }
    loadRecentSearches();
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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Implement your search logic here
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating search
    addRecentSearch(searchQuery);
    setIsSearching(false);
  };

  const handleVoiceSearch = () => {
    // Implement voice search functionality
    alert('Voice search activated');
  };

  const loadRecentSearches = () => {
    const storedSearches = localStorage.getItem('recentSearches');
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  };

  const addRecentSearch = (query: string) => {
    const updatedSearches = [query, ...recentSearches.slice(0, 4)];
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    // Implement language change logic here
    console.log(`Language changed to: ${value}`);
  };

  const handleCasePrediction = async () => {
    if (!casePredictionInput.trim()) {
      alert('Please enter case details');
      return;
    }
    setIsPredicting(true);
    try {
      const prediction = await predictCaseOutcome(casePredictionInput);
      setCasePredictionResult(prediction);
    } catch (error) {
      console.error('Error predicting case outcome:', error);
      setCasePredictionResult('Error predicting case outcome. Please try again.');
    } finally {
      setIsPredicting(false);
    }
  };

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100"><p>Loading...</p></div>;
  }

  if (status === "unauthenticated" || !session) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100"><p>Please sign in to access the dashboard.</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
        <DashNav/>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome, {session?.user?.name}</h1>

          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search legal documents..."
                className="flex-grow"
              />
              <Button type="submit" disabled={isSearching}>
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
              <Button type="button" onClick={handleVoiceSearch}>
                <VoicemailIcon />
              </Button>
            </form>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Quick Search</CardTitle>
                <CardDescription>Search through legal documents</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/search">
                  <Button className="w-full">
                    <IconSearch className="mr-2" /> Advanced Search
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Multilingual Support</CardTitle>
                <CardDescription>Access documents in multiple languages</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="bengali">Bengali</SelectItem>
                    <SelectItem value="tamil">Tamil</SelectItem>
                    <SelectItem value="telugu">Telugu</SelectItem>
                    <SelectItem value="marathi">Marathi</SelectItem>
                    <SelectItem value="gujarati">Gujarati</SelectItem>
                    <SelectItem value="kannada">Kannada</SelectItem>
                    <SelectItem value="malayalam">Malayalam</SelectItem>
                    <SelectItem value="punjabi">Punjabi</SelectItem>
                    <SelectItem value="odia">Odia</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Case Prediction</CardTitle>
                <CardDescription>AI-powered case outcome forecasting</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  type="text"
                  value={casePredictionInput}
                  onChange={(e) => setCasePredictionInput(e.target.value)}
                  placeholder="Enter case details..."
                  className="mb-2"
                />
                <Button onClick={handleCasePrediction} className="w-full" disabled={isPredicting}>
                  <IconChartBar className="mr-2" /> {isPredicting ? 'Predicting...' : 'Predict Outcome'}
                </Button>
                {casePredictionResult && (
                  <p className="mt-2 text-sm">Prediction: {casePredictionResult}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blockchain Verification</CardTitle>
                <CardDescription>Verify document authenticity</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <VerifiedIcon className="mr-2" /> Verify Documents
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Searches</CardTitle>
                <CardDescription>Your latest research queries</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <li key={index} className="flex items-center">
                      <IconHistory className="mr-2 text-gray-400" />
                      <span>{search}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Case Analytics</CardTitle>
                <CardDescription>Monthly case resolution trends</CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cases" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
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
      <Footer/>
    </div>
  );
}

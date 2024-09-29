'use client';

import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { IconBrandGoogle, IconScale, IconBrain } from "@tabler/icons-react";
import { signIn } from "next-auth/react"
import { Poppins } from 'next/font/google';

const poppin = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const LegalAILoginPage = () => {
  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-indigo-100 ${poppin.className}`}
    >
      <Card className="w-[400px] shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <IconScale size={48} className="text-indigo-600" />
            <IconBrain size={48} className="text-blue-600 ml-2" />
          </div>
          <CardTitle className="text-2xl font-bold text-center dark:text-gray-100 text-gray-800">
            Cortex
          </CardTitle>
          <CardDescription className="text-center dark:text-gray-100 text-gray-600">
            Your AI-powered legal research assistant
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm dark:text-gray-200 text-center text-gray-700">
            Access cutting-edge legal research tools powered by artificial
            intelligence.
          </p>
          <Button
            onClick={() => signIn("google",{callbackUrl:"/dashboard"})}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <IconBrandGoogle className="mr-2" /> Sign in with Google
          </Button>
        </CardContent>
        <CardFooter className="text-xs dark:text-gray-100 text-center text-gray-500">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </CardFooter>
      </Card>
    </div>
  );
}

export default LegalAILoginPage;

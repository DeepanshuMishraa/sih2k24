import React from 'react';
import { CardSpotlight } from "./ui/card-spotlight";

export function CardSpotlightDemo() {
  return (
    <CardSpotlight className="h-96 w-96 bg-gradient-to-br from-blue-900 to-indigo-900">
      <p className="text-xl font-bold relative z-20 mt-2 text-white">
        Personalized Blockchain-Secured Lawyer ID
      </p>
      <div className="text-neutral-200 mt-4 relative z-20">
        Your AI-Enhanced Legal Identity:
        <ul className="list-none mt-2">
          <Step title="Cryptographic Signature Verification" />
          <Step title="Smart Contract Integration" />
          <Step title="Decentralized Credential Storage" />
          <Step title="AI-Powered Case Law Access" />
        </ul>
      </div>
      <p className="text-neutral-300 mt-4 relative z-20 text-sm">
        Leveraging blockchain technology and AI to revolutionize legal research and identity management in the judicial system.
      </p>
    </CardSpotlight>
  );
}

const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      <LegalTechIcon />
      <p className="text-white">{title}</p>
    </li>
  );
};

const LegalTechIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0"
    >
      <path d="m21 12-8-2-8 2 8 2 8-2Z" />
      <path d="M3 12v8l8 2M21 12v8l-8 2" />
      <path d="m3 12 8-8 8 8" />
    </svg>
  );
};

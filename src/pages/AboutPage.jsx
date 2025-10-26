import React from "react";
import Navbar from "@/components/blocks/Navbar/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-background text-foreground">
      {/* Navbar */}
      <Navbar />

      {/* Main About Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center mb-6">About Markdrop</h1>

        {/* Description */}
        <p className="text-lg mb-8">
          Markdrop is a modern platform for creating, managing, and sharing Markdown files. 
          It is designed to be simple, clean, and intuitive, keeping your workflow smooth and productive.
        </p>

        {/* Key Features */}
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc list-inside space-y-2 mb-8">
          <li>Create and preview Markdown files in real-time</li>
          <li>Organize multiple repositories</li>
          <li>Collaborate and share your work easily</li>
          <li>Clean interface with dark/light mode support</li>
        </ul>

        {/* Design Philosophy */}
        <h2 className="text-2xl font-semibold mb-4">Our Philosophy</h2>
        <p className="text-lg mb-8">
          We focus on simplicity, clarity, and accessibility. Our goal is to make Markdown editing 
          effortless and visually appealing, for beginners and experts alike.
        </p>

        {/* Getting Started */}
        <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
        <p className="text-lg mb-8">
          Sign up today, create your profile, and start building your Markdown projects with ease!
        </p>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

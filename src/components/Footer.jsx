import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#F5F7F8] dark:bg-[#45474B] border-t border-gray-200 dark:border-gray-600 py-8 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto text-center text-[#495E57] dark:text-[#adb5bd] text-sm">
        <p>&copy; 2025 Copyright, All rights reserved.</p>
        <p className="mt-2">Built with ❤️ by Raveen Abeydeera.</p>
        <div className="mt-4 flex justify-center space-x-4">
        </div>
      </div>
    </footer>
  );
}
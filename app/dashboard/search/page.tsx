'use client'

import React, { useState, useEffect, useRef } from 'react';
import { getGroqChatCompletion, Vision } from '@/lib/action';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { IconSearch, IconMicrophone, IconDownload, IconShare, IconMessage, IconTrash, IconPlus, IconChevronLeft, IconChevronRight, IconUpload } from "@tabler/icons-react"
import { Appbar, DashNav } from '@/components/Navbar';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
}

interface SearchFilters {
  searchType: string;
  jurisdiction: string;
  dateRange: string;
  useBlockchain: boolean;
}

export default function Component() {
  const [query, setQuery] = useState('');
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('search');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({
    searchType: 'semantic',
    jurisdiction: '',
    dateRange: '',
    useBlockchain: false,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedChats = localStorage.getItem('legalChats');
    if (storedChats) {
      setChats(JSON.parse(storedChats));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('legalChats', JSON.stringify(chats));
  }, [chats]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let chatHistory = '';
      if (currentChat) {
        chatHistory = currentChat.messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
      }

      const result = await getGroqChatCompletion(query, filters, chatHistory);
      const assistantResponse = result.choices[0]?.message?.content || 'No response';

      const newMessage: ChatMessage = { role: 'assistant', content: assistantResponse };

      if (currentChat) {
        const updatedChat = {
          ...currentChat,
          messages: [...currentChat.messages, { role: 'user', content: query }, newMessage]
        };
        setCurrentChat(updatedChat);
        setChats(chats.map(chat => chat.id === updatedChat.id ? updatedChat : chat));
      } else {
        const newChat: Chat = {
          id: Date.now().toString(),
          title: query.substring(0, 30) + (query.length > 30 ? '...' : ''),
          messages: [{ role: 'user', content: query }, newMessage]
        };
        setCurrentChat(newChat);
        setChats([...chats, newChat]);
      }

      setQuery('');
    } catch (error) {
      console.error('Error:', error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const fileContent = event.target?.result as string;
        const result = await Vision(fileContent, filters, '');
        const assistantResponse = result! || 'No response from Vision model';

        const newMessage: ChatMessage = { role: 'assistant', content: assistantResponse };
        const newChat: Chat = {
          id: Date.now().toString(),
          title: `File Analysis: ${file.name}`,
          messages: [{ role: 'user', content: `Analyzed file: ${file.name}` }, newMessage]
        };
        setCurrentChat(newChat);
        setChats([...chats, newChat]);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing file:', error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatSelect = (chatId: string) => {
    const selected = chats.find(chat => chat.id === chatId);
    if (selected) {
      setCurrentChat(selected);
    }
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleNewChat = () => {
    setCurrentChat(null);
    setQuery('');
  };

  const handleDeleteChat = (chatId: string) => {
    setChats(chats.filter(chat => chat.id !== chatId));
    if (currentChat?.id === chatId) {
      setCurrentChat(null);
    }
  };

  const handleVoiceSearch = () => {
    alert('Voice search activated. This feature would use speech-to-text to populate the search query.');
  };

  const handleExport = () => {
    alert('Export functionality would be implemented here, allowing users to download search results in various formats.');
  };

  const handleShare = () => {
    alert('Share functionality would be implemented here, allowing users to share search results with colleagues.');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <DashNav />
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "w-64" : "w-16"
          } bg-white border-r border-gray-200 transition-all duration-300 ease-in-out overflow-hidden flex flex-col`}
        >
          {/* Sidebar content */}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 p-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              AI-Powered Legal Research
            </h1>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <Card className="mb-6">
              <CardContent className="p-6">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="search">Search</TabsTrigger>
                    <TabsTrigger value="filters">Advanced Filters</TabsTrigger>
                  </TabsList>
                  <TabsContent value="search">
                    <form onSubmit={handleSearch} className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Enter your legal query..."
                          className="flex-grow"
                        />
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {isLoading ? "Searching..." : <IconSearch />}
                        </Button>
                        <Button
                          type="button"
                          onClick={handleVoiceSearch}
                          variant="outline"
                        >
                          <IconMicrophone />
                        </Button>
                        <Button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          variant="outline"
                        >
                          <IconUpload />
                        </Button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          className="hidden"
                          accept="image/*,application/pdf"
                        />
                      </div>
                    </form>
                  </TabsContent>
                  <TabsContent value="filters">
                    {/* Filters content */}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {currentChat && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Chat History
                    </h2>
                    <div className="space-x-2">
                      <Button
                        onClick={handleExport}
                        variant="outline"
                        size="sm"
                      >
                        <IconDownload className="mr-2 h-4 w-4" /> Export
                      </Button>
                      <Button onClick={handleShare} variant="outline" size="sm">
                        <IconShare className="mr-2 h-4 w-4" /> Share
                      </Button>
                    </div>
                  </div>
                  <ScrollArea className="h-[calc(100vh-400px)]">
                    <div className="space-y-4 pr-4">
                      {currentChat.messages.map((message, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg ${
                            message.role === "user"
                              ? "bg-blue-50 text-blue-800"
                              : "bg-gray-50 text-gray-800"
                          }`}
                        >
                          <p className="font-semibold mb-1">
                            {message.role === "user" ? "You:" : "Assistant:"}
                          </p>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

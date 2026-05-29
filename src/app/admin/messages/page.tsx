"use client";

import { useState, useEffect } from "react";
import { Mail, CheckCircle, Trash2, User, Phone, Clock, MessageSquare, Tag } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { cn, formatDate } from "@/lib/utils";

export default function MessagesManagementPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        toast.success(`Message marked as ${status}`);
        fetchMessages();
        if (selectedMessage?.id === id) {
            setSelectedMessage({ ...selectedMessage, status });
        }
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <Toaster />
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Customer Inquiries</h2>
        <p className="text-gray-500 dark:text-neutral-400 font-medium">Manage leads and messages from your contact form.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Messages List */}
        <div className="lg:col-span-4 space-y-4 max-h-[700px] overflow-y-auto pr-2">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              onClick={() => setSelectedMessage(msg)}
              className={cn(
                "p-5 rounded-3xl border transition-all cursor-pointer group relative",
                selectedMessage?.id === msg.id
                  ? "bg-primary-600 border-primary-600 text-white shadow-xl shadow-primary-600/20"
                  : "bg-white dark:bg-dark-900 border-gray-100 dark:border-white/[0.05] hover:border-primary-500/30"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className={cn("font-bold truncate pr-6", selectedMessage?.id === msg.id ? "text-white" : "text-gray-900 dark:text-white")}>
                  {msg.name}
                </h4>
                {msg.status === "unread" && (
                    <span className="absolute top-5 right-5 w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                )}
              </div>
              <p className={cn("text-[12px] font-medium truncate mb-3", selectedMessage?.id === msg.id ? "text-white/80" : "text-gray-500 dark:text-neutral-400")}>
                {msg.service || "General Inquiry"}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className={cn("text-[10px] font-bold uppercase tracking-widest", selectedMessage?.id === msg.id ? "text-white/60" : "text-gray-400")}>
                  {formatDate(msg.createdAt)}
                </span>
                <span className={cn(
                  "text-[10px] font-black uppercase px-2 py-0.5 rounded-md",
                  msg.status === "unread" 
                    ? (selectedMessage?.id === msg.id ? "bg-white/20 text-white" : "bg-amber-500/10 text-amber-500") 
                    : (selectedMessage?.id === msg.id ? "bg-white/20 text-white" : "bg-green-500/10 text-green-500")
                )}>
                  {msg.status}
                </span>
              </div>
            </div>
          ))}
          {messages.length === 0 && !loading && (
              <div className="text-center py-20 bg-gray-50 dark:bg-white/[0.02] rounded-3xl border border-dashed border-gray-200 dark:border-white/10">
                  <Mail className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-bold">No messages found</p>
              </div>
          )}
        </div>

        {/* Message Detail View */}
        <div className="lg:col-span-8">
          {selectedMessage ? (
            <div className="bg-white dark:bg-dark-900 rounded-[2.5rem] border border-gray-100 dark:border-white/[0.05] shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300">
               <div className="bg-primary-600 p-8 text-white">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl font-black">
                            {selectedMessage.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">{selectedMessage.name}</h3>
                            <p className="text-white/70 font-medium">{selectedMessage.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {selectedMessage.status === "unread" && (
                            <button 
                                onClick={() => handleStatusUpdate(selectedMessage.id, "read")}
                                className="px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all font-bold text-sm flex items-center gap-2"
                            >
                                <CheckCircle className="w-4.5 h-4.5" />
                                Mark Read
                            </button>
                        )}
                        <button className="p-3 rounded-xl bg-red-500 hover:bg-red-600 transition-all">
                            <Trash2 className="w-5 h-5 text-white" />
                        </button>
                    </div>
                  </div>
               </div>

               <div className="p-8 md:p-10 space-y-10">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-5 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05]">
                            <div className="flex items-center gap-3 text-primary-500 mb-2">
                                <Tag className="w-4 h-4" />
                                <span className="text-[11px] font-bold uppercase tracking-widest">Service</span>
                            </div>
                            <p className="font-bold text-gray-900 dark:text-white">{selectedMessage.service || "General Inquiry"}</p>
                        </div>
                        <div className="p-5 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05]">
                            <div className="flex items-center gap-3 text-primary-500 mb-2">
                                <Phone className="w-4 h-4" />
                                <span className="text-[11px] font-bold uppercase tracking-widest">Phone</span>
                            </div>
                            <p className="font-bold text-gray-900 dark:text-white">{selectedMessage.phone || "Not Provided"}</p>
                        </div>
                        <div className="p-5 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.05]">
                            <div className="flex items-center gap-3 text-primary-500 mb-2">
                                <Clock className="w-4 h-4" />
                                <span className="text-[11px] font-bold uppercase tracking-widest">Received</span>
                            </div>
                            <p className="font-bold text-gray-900 dark:text-white">{formatDate(selectedMessage.createdAt)}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-gray-400">
                            <MessageSquare className="w-4 h-4" />
                            <span className="text-[13px] font-bold uppercase tracking-widest">Message Body</span>
                        </div>
                        <div className="text-lg text-gray-700 dark:text-neutral-300 font-medium leading-relaxed bg-gray-50 dark:bg-white/[0.01] p-8 rounded-3xl border border-gray-100 dark:border-white/[0.05]">
                            {selectedMessage.message}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-white/[0.05]">
                        <a 
                            href={`mailto:${selectedMessage.email}`}
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            <Mail className="w-5 h-5" />
                            Reply via Email
                        </a>
                    </div>
               </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-40 bg-gray-50/50 dark:bg-white/[0.01] rounded-[2.5rem] border border-dashed border-gray-200 dark:border-white/10 text-center space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-white dark:bg-dark-900 shadow-xl flex items-center justify-center text-primary-500 mb-4 opacity-50">
                    <MessageSquare className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-400">Select a message to view details</h3>
                <p className="text-gray-400/60 max-w-xs mx-auto">Pick an inquiry from the left panel to read the full message and start a conversation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ChefHat, MessageCircle, PieChart, Send, ThumbsUp, Image as ImageIcon, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Message = {
  id: number
  user: string
  content: string
  avatar: string
  isChef: boolean
  isPoll?: boolean
  pollOptions?: string[]
  pollVotes?: number[]
  pollImage?: string
  userVotes?: Record<string, number>
}

const initialMessages: Message[] = [
  { 
    id: 1, 
    user: "Gordon Ramsay", 
    content: "Hello everyone! Excited to connect with food enthusiasts!", 
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1377&q=80", 
    isChef: true 
  },
  { 
    id: 2, 
    user: "Foodie123", 
    content: "Hi Chef Ramsay! Love your shows!", 
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", 
    isChef: false 
  },
  {
    id: 3,
    user: "Gordon Ramsay",
    content: "What do you think of this new dish?",
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1377&q=80",
    isChef: true,
    isPoll: true,
    pollOptions: ["Love it!", "Looks good", "Not my taste"],
    pollVotes: [0, 0, 0],
    pollImage: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    userVotes: {}
  }
]

export default function ChefConnect() {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [newPoll, setNewPoll] = useState({ question: "", options: ["", ""], image: "" })
  const [isPollDialogOpen, setIsPollDialogOpen] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        user: "You",
        content: newMessage,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
        isChef: false
      }
      setMessages([...messages, newMsg])
      setNewMessage("")
    }
  }

  const handleCreatePoll = () => {
    if (newPoll.question && newPoll.options.every(option => option.trim())) {
      const newPollMessage: Message = {
        id: messages.length + 1,
        user: "You (Chef)",
        content: newPoll.question,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80",
        isChef: true,
        isPoll: true,
        pollOptions: newPoll.options,
        pollVotes: new Array(newPoll.options.length).fill(0),
        pollImage: newPoll.image,
        userVotes: {}
      }
      setMessages([...messages, newPollMessage])
      setNewPoll({ question: "", options: ["", ""], image: "" })
      setIsPollDialogOpen(false)
    }
  }

  const handleVote = (messageId: number, optionIndex: number) => {
    setMessages(messages.map(msg => 
      msg.id === messageId && msg.isPoll
        ? {
            ...msg,
            pollVotes: msg.pollVotes!.map((v, i) => i === optionIndex ? v + 1 : v),
            userVotes: { ...msg.userVotes, [messageId]: optionIndex }
          }
        : msg
    ))
  }

  return (
    <div className="container mx-auto w-full sm:max-w-4xl md:max-w-5xl">
      <Button
        variant="ghost"
        className="mb-4 gap-2 p-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4 " />
        Back / Community
      </Button>
      <Card className="w-full h-[94vh] sm:h-[95vh]  overflow-hidden bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900">
       
        <CardContent className="p-4 flex flex-col justify-between">
          <ScrollArea className="h-[82vh] sm:h-[79vh] rounded-md border p-4" ref={chatRef}>
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex items-start space-x-2 mb-4 ${msg.isChef ? 'justify-start' : 'justify-end'}`}
                >
                  {msg.isChef && (
                    <Avatar>
                      <AvatarImage className="object-cover" src={msg.avatar} alt={msg.user} />
                      <AvatarFallback>{msg.user[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`rounded-lg p-2 sm:p-3 text-sm max-w-[70%] ${msg.isChef ? 'bg-orange-200 text-orange-900' : 'bg-blue-200 text-blue-900'}`}>
                    <p className="font-semibold">{msg.user}</p>
                    <p>{msg.content}</p>
                    {msg.isPoll && (
                      <div className="mt-2">
                        {msg.pollImage && (
                          <img src={msg.pollImage} alt="Poll" className="w-full h-32 object-cover rounded-lg mb-2" />
                        )}
                        {msg.pollOptions!.map((option, optionIndex) => (
                          <Button
                            key={optionIndex}
                            variant="outline"
                            className="w-full text-xs sm:text-base justify-between mb-2"
                            onClick={() => handleVote(msg.id, optionIndex)}
                            disabled={msg.userVotes && msg.userVotes[msg.id] !== undefined}
                          >
                            {option}
                            <span className="bg-orange-300 text-orange-900 px-2 py-1 rounded-full text-xs">
                              {msg.pollVotes![optionIndex]} votes
                            </span>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                  {!msg.isChef && (
                    <Avatar>
                      <AvatarImage className="object-cover" src={msg.avatar} alt={msg.user} />
                      <AvatarFallback>{msg.user[0]}</AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>
          <div className="flex items-center pt-4">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow mr-2 border border-blue-400 bg-white"
            />
            <Dialog open={isPollDialogOpen} onOpenChange={setIsPollDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="mr-2">
                  <PieChart className="mr-2" /> <span className='hidden sm:block'>Create Poll</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create a New Poll</DialogTitle>
                  <DialogDescription>
                    Ask a question and add options for your poll.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="question" className="text-right">
                      Question
                    </Label>
                    <Textarea
                      id="question"
                      value={newPoll.question}
                      onChange={(e) => setNewPoll({ ...newPoll, question: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  {newPoll.options.map((option, index) => (
                    <div key={index} className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor={`option-${index}`} className="text-right">
                        Option {index + 1}
                      </Label>
                      <Input
                        id={`option-${index}`}
                        value={option}
                        onChange={(e) => setNewPoll({
                          ...newPoll,
                          options: newPoll.options.map((opt, i) => i === index ? e.target.value : opt)
                        })}
                        className="col-span-3"
                      />
                    </div>
                  ))}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image URL
                    </Label>
                    <Input
                      id="image"
                      value={newPoll.image}
                      onChange={(e) => setNewPoll({ ...newPoll, image: e.target.value })}
                      className="col-span-3"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                <DialogFooter className='gap-4'>
                  <Button onClick={() => setNewPoll({ ...newPoll, options: [...newPoll.options, ""] })}>
                    Add Option
                  </Button>
                  <Button onClick={handleCreatePoll}>Create Poll</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button className='flex items-center' onClick={handleSendMessage}>
              <Send className="mr-2" /> <span className='hidden sm:block'>Send</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
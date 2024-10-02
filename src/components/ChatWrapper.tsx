"use client";
import { Message, useChat } from 'ai/react';
import { Messages } from './Messages';
import { ChatInput } from './ChatInput';
import { useEffect, useRef } from 'react';

export const ChatWrapper = ({ sessionId, initialMessages }: { sessionId: string, initialMessages: Message[] }) => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const { messages, handleInputChange, input, handleSubmit, setInput } = useChat({
        api: "/api/chat-stream",
        body: { sessionId },
        initialMessages
    });

    // Scroll to end
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className='relative min-h-full bg-zinc-900 flex flex-col justify-between gap-2'>
            <div className='flex-1 text-black bg-zinc-800 flex flex-col overflow-y-auto'>
                <Messages messageRef={messagesEndRef} messages={messages} />
            </div>
            <ChatInput handleInputChange={handleInputChange} handleSubmit={handleSubmit} setInput={setInput} input={input} />
            
        </div>
    );
};

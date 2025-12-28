import Image from 'next/image';
import React from 'react';

interface MessageData {
    name: string;
    lastMessage: string;
    timeAgo: string;
    profilepic: string;
    unreadMsg: number;
    status: string;
}

interface MessageCardProps {
    data: MessageData;
}

const MessageCard: React.FC<MessageCardProps> = ({ data }) => {
    const { name, lastMessage, timeAgo, profilepic, unreadMsg, status } = data;

    return (
        <div className="group flex items-center p-4 bg-white hover:bg-purple-50/50 border-b border-slate-50 last:border-0 transition-all duration-300 cursor-pointer relative overflow-hidden">
            {/* Active Indicator Bar (Left Side) */}
            {unreadMsg > 0 && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600"></div>
            )}

            {/* Profile Avatar Wrapper */}
            <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-100 group-hover:ring-purple-200 transition-all">
                    <Image
                        src={profilepic}
                        alt={name}
                        width={48}
                        height={48}
                        className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
                {/* Status Indicator */}
                <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${
                    status === 'online' ? 'bg-emerald-500' : 'bg-slate-300'
                }`}></span>
            </div>

            {/* Content Area */}
            <div className="ml-4 flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                    <h3 className={`text-sm truncate pr-2 transition-colors ${
                        unreadMsg > 0 ? 'font-black text-slate-900' : 'font-bold text-slate-700'
                    }`}>
                        {name}
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap uppercase tracking-wider">
                        {timeAgo}
                    </span>
                </div>
                
                <div className="flex justify-between items-center">
                    <p className={`text-xs truncate pr-5 ${
                        unreadMsg > 0 ? 'text-slate-700 font-medium' : 'text-slate-400 font-normal'
                    }`}>
                        {lastMessage}
                    </p>
                    
                    {/* Unread Counter Badge */}
                    {unreadMsg > 0 && (
                        <span className="flex-shrink-0 min-w-[18px] h-[18px] flex items-center justify-center px-1 text-[9px] font-black text-white bg-purple-600 rounded-full animate-pulse shadow-sm shadow-purple-300">
                            {unreadMsg}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MessageCard;
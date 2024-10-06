import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import ChevronLeft from '@/public/assets/chevron-left.svg';
import Send from '@/public/assets/send.svg';
import Button from '@/common/components/Button';
import Input from '@/common/components/Inputs/Input';
import Bubble from '@/common/components/Bubble';
import ChatServices from '@/common/services/ChatServices';
import parperclip from '@/public/assets/paperclip.svg';
import Img from '@/common/components/Img';
import close from '@/public/assets/close.svg';
import carrot from '@//public/assets/carrot.svg';
import lettuce from '@//public/assets/lettuce.svg';
import tomato from '@//public/assets/tomato.svg';
import potato from '@//public/assets/potato.svg';
import { useRouter } from 'next/router';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hi! How can I help you?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showCropOptions, setShowCropOptions] = useState(false);
  const [showAlertOptions, setAlertOptions] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { query } = router;
      if (query && query.question) {
        handleSend(
          `${query.question} Tell me how to protect my tomato plant.` as string
        );
      }
    }
  }, [router.isReady]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const cropOptions = [
    {
      label: 'Lettuce',
      image: lettuce,
      color: '#16A34A',
    },
    {
      label: 'Tomatoes',
      image: tomato,
      color: '#DC2626',
    },
    {
      label: 'Potato',
      image: potato,
      color: '#CA8A04',
    },
  ];

  const alerts = [
    {
      id: 1,
      title: 'Wet season',
      timeAgo: '5 min ago',
      message: "Your carrots will be wetter than usual. Don't overwater them.",
      type: 'info', // Default, not highlighted
    },
    {
      id: 2,
      title: 'A drought is coming',
      timeAgo: '5 min ago',
      message: 'Hot temperatures are coming.',
      type: 'warning', // Highlighted in yellow
    },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatMessage = (text: string) => {
    const paragraphs = text.split('\n');

    return paragraphs.map((paragraph, index) => {
      const formattedParagraph = paragraph.replace(
        /\*\*(.*?)\*\*/g,
        '<strong>$1</strong>'
      );
      const formattedParagraph2 = formattedParagraph.replace('*', '-');
      return (
        <p
          key={index}
          className="mb-2"
          dangerouslySetInnerHTML={{ __html: formattedParagraph2 }}
        />
      );
    });
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSend = async (text: string = inputValue) => {
    if (text.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: text,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
      setIsLoading(true);

      try {
        const { ok, data } = await ChatServices.sendMessageToLina(text);
        if (ok && data) {
          const botMessage: Message = {
            id: messages.length + 2,
            text: data,
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleScroll = () => {
    const { scrollTop } = chatContainerRef.current!;
  };

  const handleCropClick = () => {
    setShowCropOptions(!showCropOptions);
  };

  const handleCropSelect = (crop: string) => {
    handleSend(`What should I concern about my ${crop} plant?`);
    setShowCropOptions(false);
  };

  const handleAlertClick = () => {
    setAlertOptions(!showAlertOptions);
  };
  const handleAlert = (alert: string) => {
    handleSend(`${alert} Tell me how to protect my tomato plant.`);
    setAlertOptions(false);
  };
  return (
    <div className="w-full max-w-md mx-auto h-screen flex flex-col relative animate__animated animate__fadeIn">
      <div className="p-4 pb-0 flex items-center">
        <Button
          variant="ghost"
          className="mr-4 pt-4"
          onClick={() => router.back()}
        >
          <Image src={ChevronLeft} alt="Back" width={16} height={16} />
        </Button>
      </div>
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        onScroll={handleScroll}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user'
                ? 'justify-end flex gap-2'
                : 'justify-start'
            }`}
          >
            {message.sender !== 'user' && <Bubble user="Lina" />}
            <div className="flex flex-col">
              <div
                className={`rounded-lg animate__animated animate__fadeIn px-4 py-2 max-w-[95%] ml-2 ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white shadow-Elevation3blue'
                    : 'bg-white text-gray-800 border border-[#E5E7EB] rounded-2xl shadow-Elevation1 w-full'
                }`}
              >
                {message.sender === 'bot'
                  ? formatMessage(message.text)
                  : message.text}
              </div>
              <div
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                {formatTimestamp(message.timestamp)}
              </div>
            </div>
            {message.sender === 'user' && <Bubble user="user" />}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <Bubble user="Lina" />
            <div className="rounded-lg px-4 py-2 bg-white text-gray-800 ml-2  shadow-Elevation2">
              <span className="animate_animated animate-pulse">...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white">
        <div className="flex space-x-2 mb-4 relative">
          <Button
            variant="outline"
            className="flex-1 rounded-full"
            onClick={handleCropClick}
          >
            Ask about my crops
          </Button>
          <Button
            variant="outline"
            className="flex-1 rounded-full"
            onClick={handleAlertClick}
          >
            Ask about my alerts
          </Button>
        </div>
        <div className="flex items-center border border-[#6B7280] rounded-[1rem] bg-white shadow-Elevation3">
          <form
            className="flex items-center space-x-2 flex-1 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <div className="py-2 w-full">
              <Input
                type="text"
                name="chat-input"
                placeholder="Talk to Lina"
                value={inputValue}
                handleChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent outline-none"
              />
            </div>
            <Img src={parperclip} alt="Attach file" width={20} height={20} />
          </form>
          <div
            onClick={() => handleSend()}
            className="cursor-pointer flex items-center justify-center p-3 border-l-[1px] border-[#6B7280] bg-white"
          >
            <Image src={Send} alt="Send" width={20} height={20} />
          </div>
        </div>
      </div>
      {showCropOptions && (
        <div className="absolute bottom-0 left-0 right-0 bg-white z-20   ">
          <div className="animate__animated  animate__slideInUp border-t border-gray-300  rounded-t-2xl shadow-lg   ">
            <div className="flex w-full justify-between p-4 px-6 items-center">
              <p className="text-[#6B7280]">Crop types</p>
              <div onClick={() => setShowCropOptions(false)}>
                <Img src={close} alt="cerrar" />
              </div>
            </div>
            <div className="w-full bg-white h-full flex gap-2 px-4 flex-col pb-4">
              {cropOptions.map((crop, index) => (
                <button
                  key={index}
                  className="flex items-center w-full justify-center gap-2 px-4 py-3 bg-white border rounded-[1rem]"
                  style={{ borderColor: crop.color }}
                  onClick={() => handleCropSelect(crop.label)}
                >
                  <Img
                    src={crop.image}
                    alt={crop.label}
                    width={24}
                    height={24}
                  />
                  <span
                    style={{ color: crop.color }}
                    className="font-semibold text-lg"
                  >
                    {crop.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {showAlertOptions && (
        <div className="absolute bottom-0 left-0 right-0 bg-white z-20   ">
          <div className="animate__animated  animate__slideInUp border-t border-gray-300  rounded-t-2xl shadow-lg   ">
            <div className="flex w-full justify-between p-4 px-6 items-center">
              <p className="text-[#6B7280]">My alerts</p>
              <div onClick={() => setAlertOptions(false)}>
                <Img src={close} alt="cerrar" />
              </div>
            </div>
            <div className="w-full bg-white h-full flex gap-4 px-4 flex-col pb-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => handleAlert(alert.message)}
                  className={`border border-[#E5E7EB] rounded-xl p-4 shadow-Elevation1 ${
                    alert.type === 'warning'
                      ? 'bg-[#FEF9C3] border border-[#FEF08A]'
                      : 'bg-white'
                  }`}
                >
                  <div className="alert-title flex justify-between">
                    <strong className="test-[#854D0E]">{alert.title}</strong>
                    <span className="time-ago test-[#854D0E]">
                      {alert.timeAgo}
                    </span>
                  </div>
                  <p>{alert.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Sparkles,
  Bot,
  User,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Users,
  FileText,
  Volume2,
  RefreshCw,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useUDAAN } from '../../context/UDAANContext';
import { useLanguage } from '../../context/LanguageContext';
import { geminiService, ChatMessage } from '../../services/geminiService';
import { speechService } from '../../services/speechService';
import { AIStructuredAssessment, AssistanceCategory } from '../../types';

interface ConversationalAIAssistantProps {
  onSuccess?: (caseId: string) => void;
}

export const ConversationalAIAssistant: React.FC<ConversationalAIAssistantProps> = ({ onSuccess }) => {
  const { submitAssistanceRequest } = useUDAAN();
  const { currentLanguage, setLanguage, t } = useLanguage();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text:
        currentLanguage === 'kn'
          ? 'ನಮಸ್ಕಾರ! ನಾನು ಉಡಾನ್ (UDAAN) ಎಐ ಸಹಾಯಕ. ನಿಮಗೆ ಅಥವಾ ನಿಮ್ಮ ಸುತ್ತಮುತ್ತಲಿನ ಯಾರಿಗಾದರೂ ಆಹಾರ, ಆಶ್ರಯ, ಚಿಕಿತ್ಸೆ ಅಥವಾ ದಾಖಲೆಗಳ ನೆರವು ಬೇಕಿದ್ದರೆ ಇಲ್ಲಿ ತಿಳಿಸಿ. ನೀವು ಮಾತನಾಡಬಹುದು ಅಥವಾ ಟೈಪ್ ಮಾಡಬಹುದು.'
          : currentLanguage === 'hi'
          ? 'नमस्ते! मैं उड़ान (UDAAN) एआई सहायक हूँ। यदि आपको या किसी अन्य व्यक्ति को भोजन, आश्रय, चिकित्सा या दस्तावेजों की सहायता चाहिए, तो कृपया बताएं। आप बोलकर या लिखकर अपनी बात कह सकते हैं।'
          : "Hello! I am the UDAAN AI Assistance Coordinator. Please tell me what help you or someone near you needs (food, safe shelter, healthcare, Aadhaar/ID, or clothing). You can speak or type in Kannada, Hindi, or English.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentExtraction, setCurrentExtraction] = useState<AIStructuredAssessment | null>(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [submittedCaseId, setSubmittedCaseId] = useState<string | null>(null);

  // Editable fields in review card
  const [editedName, setEditedName] = useState('Person in Need');
  const [editedLocation, setEditedLocation] = useState('Majestic / KSR Hub, Bengaluru');
  const [editedPeople, setEditedPeople] = useState(1);
  const [editedUrgency, setEditedUrgency] = useState<'low' | 'medium' | 'high' | 'critical'>('high');
  const [editedCategories, setEditedCategories] = useState<AssistanceCategory[]>(['food_water', 'emergency_shelter']);
  const [editedNotes, setEditedNotes] = useState('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsProcessing(true);

    try {
      const response = await geminiService.converseWithBeneficiary(text, currentLanguage, messages);

      const assistantMsg: ChatMessage = {
        id: `msg-resp-${Date.now()}`,
        sender: 'assistant',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        extractedDraft: response.structuredAssessment
      };

      setMessages(prev => [...prev, assistantMsg]);
      setCurrentExtraction(response.structuredAssessment);

      // Populate review form with extracted details
      setEditedLocation(response.structuredAssessment.extractedLocation || 'Majestic, Bengaluru');
      setEditedPeople(response.structuredAssessment.numberOfPeople || 1);
      setEditedUrgency(response.structuredAssessment.urgency || 'high');
      setEditedNotes(text);

      const cats: AssistanceCategory[] = [];
      if (response.structuredAssessment.food_assistance !== 'not_indicated') cats.push('food_water');
      if (response.structuredAssessment.shelter !== 'not_indicated') cats.push('emergency_shelter');
      if (response.structuredAssessment.medical_evaluation !== 'not_indicated') cats.push('medical_support');
      if (response.structuredAssessment.identity_docs !== 'not_indicated') cats.push('identity_docs');
      if (response.structuredAssessment.elderly_care !== 'not_indicated') cats.push('elderly_care');
      if (response.structuredAssessment.child_protection !== 'not_indicated') cats.push('child_protection');
      setEditedCategories(cats.length > 0 ? cats : ['food_water']);

      setReviewMode(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceInput = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
      return;
    }

    if (!speechService.isSupported()) {
      // Sample prompt simulation for testing
      const sample =
        currentLanguage === 'kn'
          ? 'ನಾನು ಮೆಜೆಸ್ಟಿಕ್ ನಿಲ್ದಾಣದ ಬಳಿ ಇದ್ದೇನೆ. ನಿನ್ನೆಯಿಂದ ಊಟ ಮಾಡಿಲ್ಲ, ಕಾಲು ನೋವಿದೆ, ನಾವಿಬ್ಬರು ಇದ್ದೇವೆ.'
          : currentLanguage === 'hi'
          ? 'मैं मैजेस्टिक बस स्टैंड के पास हूँ। कल से खाना नहीं खाया, पैर में चोट है और हम दो लोग हैं।'
          : 'I am near Majestic station with my elderly mother. We have not eaten since yesterday and need shelter tonight.';
      setInputMessage(sample);
      return;
    }

    try {
      setIsListening(true);
      speechService.startListening(
        currentLanguage,
        (transcript, isFinal) => {
          setInputMessage(transcript);
          if (isFinal) {
            setIsListening(false);
            handleSendMessage(transcript);
          }
        },
        () => setIsListening(false),
        () => setIsListening(false)
      );
    } catch {
      setIsListening(false);
    }
  };

  const handleConfirmSubmission = async () => {
    setIsProcessing(true);
    try {
      const created = await submitAssistanceRequest({
        identifierName: editedName || 'Beneficiary in Need',
        isAnonymous: false,
        preferredLanguage: currentLanguage,
        contactMethod: 'Conversational intake',
        approximateLocation: {
          lat: 12.9778,
          lng: 77.5713,
          zone: editedLocation.includes('KR Market') ? 'Kalasipalya / KR Market' : 'Majestic / KSR Hub',
          address: editedLocation
        },
        categories: editedCategories,
        numberOfPeople: editedPeople,
        description: editedNotes || 'Request submitted through UDAAN Conversational AI.',
        immediateDanger: editedUrgency === 'critical',
        reportedByRole: 'self',
        reporterName: 'Conversational AI Intake'
      });

      setSubmittedCaseId(created.id);
      setReviewMode(false);
      if (onSuccess) onSuccess(created.id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (submittedCaseId) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 sm:p-8 text-center space-y-4 max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-extrabold text-udaan-navy">
          Assistance Request Registered!
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Unique Tracking Case ID: <strong className="text-udaan-blue font-mono text-sm">{submittedCaseId}</strong>
        </p>
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 text-left space-y-1">
          <strong className="block font-semibold">What happens next:</strong>
          <p>1. Matched service providers in your sector have been alerted.</p>
          <p>2. An authorized caseworker is reviewing the referral.</p>
          <p>3. You can track this case anytime using this Case ID without logging in.</p>
        </div>
        <button
          onClick={() => {
            setSubmittedCaseId(null);
            setReviewMode(false);
            setMessages([]);
          }}
          className="px-5 py-2.5 bg-udaan-navy text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden flex flex-col md:flex-row">
      {/* Left Chat Window */}
      <div className="flex-1 flex flex-col h-[520px] border-b md:border-b-0 md:border-r border-slate-200">
        {/* Chat Header */}
        <div className="bg-udaan-navy text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-udaan-teal flex items-center justify-center text-white">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Conversational AI Assistant</h3>
              <p className="text-[10px] text-slate-300">Feature 1: Multilingual Natural Language Intake</p>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-lg text-xs">
            <button
              onClick={() => setLanguage('kn')}
              className={`px-1.5 py-0.5 rounded ${currentLanguage === 'kn' ? 'bg-udaan-teal text-white font-bold' : 'text-slate-300'}`}
            >
              ಕನ್ನಡ
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-1.5 py-0.5 rounded ${currentLanguage === 'hi' ? 'bg-udaan-teal text-white font-bold' : 'text-slate-300'}`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded ${currentLanguage === 'en' ? 'bg-udaan-teal text-white font-bold' : 'text-slate-300'}`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-udaan-navy text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-udaan-teal" />
                </div>
              )}
              <div
                className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-udaan-blue text-white rounded-tr-none shadow-sm'
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-subtle'
                }`}
              >
                <p>{msg.text}</p>
                <span className={`block text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </span>
              </div>
              {msg.sender === 'user' && (
                <div className="w-6 h-6 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2 bg-white rounded-xl border border-slate-200 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-udaan-teal animate-spin" />
              <span>AI is understanding your requirements in {currentLanguage.toUpperCase()}...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <button
            type="button"
            onClick={handleVoiceInput}
            title="Speak using microphone"
            className={`p-2.5 rounded-xl transition ${
              isListening
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={
              currentLanguage === 'kn'
                ? 'ನಿಮ್ಮ ಪರಿಸ್ಥಿತಿ ಮತ್ತು ಸ್ಥಳವನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...'
                : currentLanguage === 'hi'
                ? 'अपनी जरूरत और जगह यहाँ लिखें...'
                : 'Describe your situation (e.g., "I need food and shelter near Majestic for 2 people")...'
            }
            className="flex-1 text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
          />

          <button
            type="button"
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isProcessing}
            className="p-2.5 bg-udaan-navy hover:bg-slate-800 disabled:opacity-40 text-white rounded-xl transition shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right: Structured AI Extraction & Review Panel */}
      <div className="w-full md:w-80 bg-white p-5 flex flex-col justify-between space-y-4 text-xs">
        <div className="space-y-3">
          <div className="border-b border-slate-100 pb-2">
            <span className="bg-udaan-teal-soft text-udaan-teal font-bold px-2 py-0.5 rounded text-[10px] uppercase">
              Feature 1 Extraction
            </span>
            <h4 className="font-bold text-sm text-udaan-navy mt-1">Structured Need Summary</h4>
            <p className="text-[11px] text-slate-500">Extracted dynamically from your natural conversation</p>
          </div>

          {currentExtraction ? (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div>
                  <span className="text-slate-400 block text-[10px]">Identified Needs:</span>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {currentExtraction.assistanceTypes.map((t, idx) => (
                      <span key={idx} className="bg-udaan-navy text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center text-[11px] pt-1 border-t border-slate-200">
                  <span className="text-slate-500">People needing help:</span>
                  <input
                    type="number"
                    min={1}
                    value={editedPeople}
                    onChange={(e) => setEditedPeople(Number(e.target.value))}
                    className="w-12 text-center border border-slate-300 rounded font-bold text-xs"
                  />
                </div>

                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500">Urgency Level:</span>
                  <select
                    value={editedUrgency}
                    onChange={(e) => setEditedUrgency(e.target.value as any)}
                    className="text-xs font-bold border border-slate-300 rounded px-1.5 py-0.5 bg-white uppercase text-udaan-red"
                  >
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div className="text-[11px]">
                  <span className="text-slate-500 block">Identified Area:</span>
                  <input
                    type="text"
                    value={editedLocation}
                    onChange={(e) => setEditedLocation(e.target.value)}
                    className="w-full border border-slate-300 rounded p-1 text-xs font-medium mt-0.5"
                  />
                </div>
              </div>

              {currentExtraction.safety_alert && (
                <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-900 text-[11px] flex items-start gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                  <span>{currentExtraction.safety_alert}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center text-slate-400 text-xs">
              Type or speak your need in the chat. The AI will parse categories, headcount, and urgency in real-time.
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={handleConfirmSubmission}
            disabled={!currentExtraction || isProcessing}
            className="w-full py-3 bg-udaan-navy hover:bg-slate-800 disabled:opacity-40 text-white font-bold rounded-xl transition shadow-sm flex items-center justify-center gap-2 text-xs"
          >
            <CheckCircle2 className="w-4 h-4 text-udaan-teal" />
            <span>Confirm & Submit Request</span>
          </button>
        </div>
      </div>
    </div>
  );
};

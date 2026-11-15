import React, { useState } from 'react';
import { Mic, MicOff, Volume2, X, Sparkles, Check, Play, AlertCircle } from 'lucide-react';
import { speechService } from '../../services/speechService';
import { useLanguage } from '../../context/LanguageContext';

interface VoiceAssistanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTranscriptComplete: (text: string, lang: 'en' | 'kn' | 'hi') => void;
}

export const VoiceAssistanceModal: React.FC<VoiceAssistanceModalProps> = ({
  isOpen,
  onClose,
  onTranscriptComplete
}) => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const sampleVoicePrompts = {
    kn: [
      'ನಾನು ಮೆಜೆಸ್ಟಿಕ್ ರೈಲ್ವೇ ನಿಲ್ದಾಣದ ಬಳಿ ಇದ್ದೇನೆ. ನಿನ್ನೆಯಿಂದ ಊಟ ಮಾಡಿಲ್ಲ, ಕಾಲು ಗಾಯವಾಗಿದೆ, ಮಲಗಲು ಆಶ್ರಯ ಬೇಕು.',
      'ನನಗೆ ವೃದ್ಧಾಶ್ರಮದ ನೆರವು ಬೇಕು, ಕಣ್ಣು ಸರಿಯಾಗಿ ಕಾಣಿಸುತ್ತಿಲ್ಲ, ಔಷಧಿ ಬೇಕು.'
    ],
    hi: [
      'मैं मैजेस्टिक बस स्टैंड के पास हूँ, कल से कुछ नहीं खाया, पैर में चोट है और रात को सोने के लिए जगह चाहिए।',
      'मुझे आधार कार्ड और सरकारी पेंशन की सहायता चाहिए, रहने का कोई ठिकाना नहीं है।'
    ],
    en: [
      'I have not eaten since yesterday. I am sleeping outside near Majestic station and my leg is hurting.',
      'We found an abandoned elderly person in KR Market who needs food and immediate shelter tonight.'
    ]
  };

  const handleToggleRecord = () => {
    if (isRecording) {
      speechService.stopListening();
      setIsRecording(false);
      return;
    }

    setErrorMessage('');
    setLiveTranscript('');

    if (!speechService.isSupported()) {
      // If browser doesn't support Web Speech API, provide graceful fallback simulation
      setIsRecording(true);
      const sample = sampleVoicePrompts[currentLanguage][0];
      let charIdx = 0;
      const interval = setInterval(() => {
        if (charIdx <= sample.length) {
          setLiveTranscript(sample.slice(0, charIdx));
          charIdx += 3;
        } else {
          clearInterval(interval);
          setIsRecording(false);
        }
      }, 50);
      return;
    }

    try {
      setIsRecording(true);
      speechService.startListening(
        currentLanguage,
        (transcript, isFinal) => {
          setLiveTranscript(transcript);
          if (isFinal) {
            setIsRecording(false);
          }
        },
        (err) => {
          console.warn('Speech error:', err);
          setIsRecording(false);
          // Fall back to sample on error
          setLiveTranscript(sampleVoicePrompts[currentLanguage][0]);
        },
        () => {
          setIsRecording(false);
        }
      );
    } catch (e: any) {
      setIsRecording(false);
      setLiveTranscript(sampleVoicePrompts[currentLanguage][0]);
    }
  };

  const handleUsePrompt = (text: string) => {
    setLiveTranscript(text);
    speechService.speakText(text, currentLanguage);
  };

  const handleConfirm = () => {
    if (liveTranscript.trim()) {
      onTranscriptComplete(liveTranscript, currentLanguage);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden space-y-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-udaan-red/10 text-udaan-red flex items-center justify-center">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-udaan-navy">Multilingual Voice Intake</h3>
              <p className="text-xs text-slate-500">Kannada, Hindi & English Speech Recognition</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Selection */}
        <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
          <span className="text-slate-600 font-medium">Speaking Language:</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setLanguage('kn')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                currentLanguage === 'kn' ? 'bg-udaan-blue text-white' : 'bg-white text-slate-700 border'
              }`}
            >
              ಕನ್ನಡ (Kannada)
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                currentLanguage === 'hi' ? 'bg-udaan-blue text-white' : 'bg-white text-slate-700 border'
              }`}
            >
              हिन्दी (Hindi)
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                currentLanguage === 'en' ? 'bg-udaan-blue text-white' : 'bg-white text-slate-700 border'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Big Mic Button */}
        <div className="flex flex-col items-center justify-center py-6 space-y-3">
          <button
            onClick={handleToggleRecord}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all ${
              isRecording
                ? 'bg-red-600 text-white animate-pulse ring-8 ring-red-200 scale-105'
                : 'bg-udaan-blue hover:bg-blue-700 text-white hover:scale-105'
            }`}
          >
            {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </button>
          <span className="text-xs font-semibold text-slate-600">
            {isRecording ? t.listening : t.tapToSpeak}
          </span>
        </div>

        {/* Live Transcript Box */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Recognized Speech:</span>
            {liveTranscript && (
              <button
                onClick={() => speechService.speakText(liveTranscript, currentLanguage)}
                className="flex items-center gap-1 text-udaan-blue hover:underline"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen Back</span>
              </button>
            )}
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 min-h-[70px] text-xs text-slate-800 leading-relaxed font-medium">
            {liveTranscript || (
              <span className="text-slate-400 italic">
                {t.voicePlaceholder}
              </span>
            )}
          </div>
        </div>

        {/* Quick Sample Prompts */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] font-semibold text-slate-500 block">
            Or test with a sample voice input ({currentLanguage.toUpperCase()}):
          </span>
          <div className="space-y-1 text-xs">
            {sampleVoicePrompts[currentLanguage].map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleUsePrompt(prompt)}
                className="w-full text-left p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition truncate text-[11px]"
              >
                ▶ "{prompt}"
              </button>
            ))}
          </div>
        </div>

        {/* Confirm and Use */}
        <div className="pt-2 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!liveTranscript.trim()}
            className="flex-1 py-2.5 bg-udaan-teal hover:bg-teal-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Use This Voice Request</span>
          </button>
        </div>
      </div>
    </div>
  );
};

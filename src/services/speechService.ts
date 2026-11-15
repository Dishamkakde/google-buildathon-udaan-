export class SpeechAssistanceService {
  private recognition: any = null;
  private isListening: boolean = false;

  constructor() {
    // Check for Web Speech API in browser window
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
      } catch (e) {
        console.warn('SpeechRecognition initialization failed:', e);
      }
    }
  }

  public isSupported(): boolean {
    return Boolean(this.recognition);
  }

  public startListening(
    language: 'en' | 'kn' | 'hi',
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (err: any) => void,
    onEnd: () => void
  ) {
    if (!this.recognition) {
      onError(new Error('Speech recognition is not supported in this browser environment.'));
      return;
    }

    const langCodes: Record<string, string> = {
      en: 'en-IN',
      kn: 'kn-IN',
      hi: 'hi-IN'
    };

    this.recognition.lang = langCodes[language] || 'en-IN';

    this.recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      onResult(final || interim, Boolean(final));
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      onEnd();
    };

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (err) {
      onError(err);
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (err) {
        // ignore
      }
      this.isListening = false;
    }
  }

  /**
   * Text-to-Speech synthesis in user's preferred language
   */
  public speakText(text: string, language: 'en' | 'kn' | 'hi' = 'en') {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    const langCodes: Record<string, string> = {
      en: 'en-IN',
      kn: 'kn-IN',
      hi: 'hi-IN'
    };

    utterance.lang = langCodes[language] || 'en-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    window.speechSynthesis.speak(utterance);
  }

  public cancelSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const speechService = new SpeechAssistanceService();

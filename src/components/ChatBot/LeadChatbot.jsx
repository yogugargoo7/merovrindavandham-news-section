import { useState, useEffect, useRef } from "react";
import { submitLeadToCRM } from "../../utils/crmApi";
import { isValidIndianMobile, sanitizeIndianMobileInput } from "../../utils/leadValidation";
import { trackConversionEvent, trackLeadEvent } from "../../utils/analytics";

const steps = [
  { key: "name", text: "May I know your name?", options: null },
  { key: "phone", text: "Please share your phone number so our team can contact you:", options: null },
  { key: "plotType", text: "Which latest payment-plan option do you want?", options: ["Normal Plot", "Corner Plot", "Commercial Plot"] },
  { key: "plotSize", text: "Choose plot size as per latest payment plan:", options: ["60 sq yd - Rs. 9,60,000", "100 sq yd - Rs. 16,00,000", "150 sq yd corner - Rs. 27,00,000", "30 sq yd commercial - Rs. 6,00,000"] },
  { key: "budget", text: "Booking amount as per latest plan:", options: ["Token Rs. 11,000", "40% booking within 7 days", "Remaining in 6-12 months"] },
];

export default function LeadChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! Welcome to Mero Vrindavan Dham support." },
  ]);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, step]);

  // Note: the chat no longer auto-opens. It used to pop open after 5s and
  // float over page content (plot details, map, headings) — visitors open
  // it themselves from the chat bubble.

  const currentStep = steps[step];

  const playNotificationSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(500, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {
      console.error("Sound play failed", e);
    }
  };

  const submitToCRM = async (finalAnswers) => {
    if (submitted) return;
    setSubmitted(true);
    trackLeadEvent('chatbot_lead_submit_attempt', { source: 'Chatbot' });
    const result = await submitLeadToCRM({
      fullName: finalAnswers.name || "Unknown",
      mobile: finalAnswers.phone || "",   // ✅ Fixed: now using dedicated phone field
      plotInterest: `${finalAnswers.plotType || ""} - ${finalAnswers.plotSize || ""}`.trim(),
      budget: finalAnswers.budget || "",
      message: `Name: ${finalAnswers.name || "N/A"}, Phone: ${finalAnswers.phone || "N/A"}, Plot Type: ${finalAnswers.plotType || "N/A"}, Size: ${finalAnswers.plotSize || "N/A"}, Budget: ${finalAnswers.budget || "N/A"}`,
      source: "Chatbot",
      page: "Home",
    });
    if (result.success || result.duplicate) {
      trackConversionEvent('generate_lead', 'Chatbot', {
        duplicate: Boolean(result.duplicate),
      });
    } else {
      trackLeadEvent('chatbot_lead_submit_error', { source: 'Chatbot' });
      setMessages((current) => [
        ...current,
        { from: "bot", text: "Sorry, your details could not be submitted right now. Please use the enquiry form on the Contact page." },
      ]);
    }
  };

  const addAnswer = (value) => {
    const answerValue = currentStep.key === "phone" ? sanitizeIndianMobileInput(value) : value;

    if (currentStep.key === "phone" && !isValidIndianMobile(answerValue)) {
      setMessages((current) => [
        ...current,
        { from: "user", text: answerValue || value },
        { from: "bot", text: "Please enter a valid 10 digit mobile number." },
      ]);
      setInput("");
      return;
    }

    const updatedAnswers = { ...answers, [currentStep.key]: answerValue };
    const newMessages = [...messages, { from: "user", text: answerValue }];
    const next = step + 1;

    if (next < steps.length) {
      newMessages.push({ from: "bot", text: steps[next].text });
      playNotificationSound();
      setStep(next);
    } else {
      newMessages.push(
        { from: "bot", text: "Thank you! Aapki details save ho rahi hain..." },
        { from: "bot", text: "Our team will review your details and get back to you shortly." }
      );
      playNotificationSound();

      submitToCRM(updatedAnswers);

      setStep(steps.length);
    }

    setAnswers(updatedAnswers);
    setMessages(newMessages);
    setInput("");
  };

  const sendText = () => {
    if (!input.trim()) return;
    addAnswer(input.trim());
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 p-3.5 sm:p-4 bg-[var(--brand-primary)] text-[var(--true-white)] rounded-full shadow-lg ring-2 ring-[var(--brand-accent)] hover:bg-[var(--brand-secondary)] transition-all duration-300 flex items-center justify-center"
        aria-label="Toggle Chat"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bubbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#FFEB3B", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#FBC02D", stopOpacity: 1 }} />
              </linearGradient>
              <filter id="softShadow" x="-20%" y="-20%" width="150%" height="150%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
                <feOffset dx="1" dy="2" result="offsetblur" />
                <feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer>
                <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="url(#bubbleGradient)" filter="url(#softShadow)" stroke="#F57F17" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19 5H7C5.89543 5 5 5.89543 5 7" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-36 left-3 right-3 sm:left-auto sm:bottom-24 sm:right-6 sm:w-[380px] h-[min(500px,62vh)] sm:h-[min(500px,72vh)] max-h-[62vh] sm:max-h-[72vh] bg-[var(--true-white)] rounded-2xl shadow-2xl border border-[var(--border-primary)] flex flex-col overflow-hidden z-50 transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--brand-primary)] via-[var(--brand-secondary)] to-[var(--brand-accent)] text-[var(--true-white)] px-5 py-4">
          <div className="font-bold text-lg">Mero Vrindavan Dham</div>
          <div className="text-xs font-normal text-[var(--brand-accent)]">Official Support - Online</div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[var(--section-bg-secondary)]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "bot" ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                  m.from === "bot"
                    ? "bg-[var(--true-white)] text-[var(--text-primary)] rounded-tl-none border border-[var(--border-primary)] border-l-4 border-l-[var(--brand-accent)]"
                    : "bg-[var(--brand-primary)] text-[var(--true-white)] rounded-tr-none"
                }`}
                style={{ animation: "fadeIn 0.5s ease-in-out" }}
              >
                {m.text}
              </div>
            </div>
          ))}

          {step < steps.length && messages[messages.length - 1]?.from === "user" && (
            <div className="flex justify-start">
              <div className="bg-[var(--true-white)] text-[var(--text-primary)] rounded-2xl rounded-tl-none px-4 py-2.5 text-sm shadow-sm border border-[var(--border-primary)] border-l-4 border-l-[var(--brand-accent)]">
                {currentStep.text}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input / Options area */}
        <div className="p-4 border-t border-[var(--border-primary)] bg-[var(--true-white)]">
          {step < steps.length && (
            <>
              {currentStep.options ? (
                <div className="flex flex-wrap gap-2">
                  {currentStep.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => addAnswer(opt)}
                      className="border border-[var(--brand-accent)] text-[var(--brand-primary)] rounded-full px-4 py-2 text-sm font-semibold hover:bg-[var(--brand-accent)] hover:text-[var(--brand-primary)] transition-colors duration-200"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <input
                    value={input}
                    onChange={(e) => setInput(currentStep.key === "phone" ? sanitizeIndianMobileInput(e.target.value) : e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendText()}
                    placeholder="Type your answer..."
                    inputMode={currentStep.key === "phone" ? "numeric" : undefined}
                    maxLength={currentStep.key === "phone" ? 10 : undefined}
                    className="flex-1 border border-[var(--border-primary)] rounded-full px-4 py-2 text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-accent)] focus:ring-1 focus:ring-[var(--brand-accent)]"
                  />
                  <button
                    onClick={sendText}
                    className="bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] p-2.5 rounded-full hover:bg-[var(--btn-primary-hover)] transition-colors shadow-md flex-shrink-0"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  </button>
                </div>
              )}
            </>
          )}

          {step >= steps.length && (
            <div className="text-center py-2">
              <p className="text-xs text-[var(--text-muted)] mt-2">Aapki details successfully submit ho gayi ✅ Hamari team jald aapse contact karegi.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

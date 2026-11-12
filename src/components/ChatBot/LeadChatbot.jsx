import { useState, useEffect, useRef } from "react";
import "./LeadChatbot.css";
import logo from "../../assets/siteImages/VrindavanLogoSmall.webp";
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

  const listRef = useRef(null);

  // keep the newest message in view (scrolls only the message list, never the page)
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
  }, [messages, step, isOpen]);

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
        className={`lcb-toggle${isOpen ? " lcb-toggle--open" : ""}`}
        aria-label="Toggle Chat"
        aria-expanded={isOpen}
      >
        <span className="lcb-toggle__ring" aria-hidden="true" />
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M8 9h8M8 13h5" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      <div className={`lcb-window${isOpen ? " lcb-window--open" : ""}`} aria-hidden={!isOpen} inert={!isOpen}>
        {/* Header */}
        <div className="lcb-head">
          <img className="lcb-head__logo" src={logo} alt="" width="42" height="42" />
          <div>
            <div className="lcb-head__title">Mero Vrindavan Dham</div>
            <div className="lcb-head__status"><i aria-hidden="true" />Official Support - Online</div>
          </div>
        </div>

        {/* Messages */}
        <div className="lcb-messages" ref={listRef} data-lenis-prevent>
          {messages.map((m, i) => (
            <div key={i} className={`lcb-row lcb-row--${m.from}`}>
              <div className="lcb-bubble">{m.text}</div>
            </div>
          ))}

          {step < steps.length && messages[messages.length - 1]?.from === "user" && (
            <div className="lcb-row lcb-row--bot">
              <div className="lcb-bubble">{currentStep.text}</div>
            </div>
          )}
        </div>

        {/* Input / Options area */}
        <div className="lcb-foot">
          {step < steps.length && (
            <>
              {currentStep.options ? (
                <div className="lcb-options">
                  {currentStep.options.map((opt) => (
                    <button key={opt} onClick={() => addAnswer(opt)} className="lcb-option">
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="lcb-input-row">
                  <input
                    value={input}
                    onChange={(e) => setInput(currentStep.key === "phone" ? sanitizeIndianMobileInput(e.target.value) : e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendText()}
                    placeholder="Type your answer..."
                    inputMode={currentStep.key === "phone" ? "numeric" : undefined}
                    maxLength={currentStep.key === "phone" ? 10 : undefined}
                    className="lcb-input"
                    aria-label="Your answer"
                  />
                  <button onClick={sendText} className="lcb-send" aria-label="Send">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  </button>
                </div>
              )}
            </>
          )}

          {step >= steps.length && (
            <p className="lcb-done">Aapki details successfully submit ho gayi ✅ Hamari team jald aapse contact karegi.</p>
          )}
        </div>
      </div>
    </>
  );
}

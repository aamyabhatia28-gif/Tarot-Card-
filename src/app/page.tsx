"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { drawRandomCard, type TarotCard } from "@/lib/tarot-cards";

type AppState = "idle" | "drawing" | "revealed" | "interpreting" | "done";

type Star = { id: number; x: number; y: number; size: number; duration: number; delay: number };

function Starfield() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.2 + 0.4,
        duration: Math.random() * 4 + 1.5,
        delay: Math.random() * 6,
      }))
    );
  }, []);

  return (
    <div className="starfield">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            "--duration": `${s.duration}s`,
            "--delay": `${s.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function OracleSVG({
  state,
  card,
  onBallClick,
  canDraw,
}: {
  state: AppState;
  card: TarotCard | null;
  onBallClick: () => void;
  canDraw: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isActive = state !== "idle";
  const isDrawing = state === "drawing";
  const isRevealed = state === "revealed" || state === "interpreting" || state === "done";
  const glowOpacity = hovered || isActive ? 0.7 : 0.25;
  const glowR = hovered && canDraw ? 100 : isActive ? 95 : 85;

  const eyeState = isDrawing
    ? "wide"
    : state === "interpreting"
    ? "squint"
    : state === "done"
    ? "happy"
    : "normal";

  return (
    <svg
      viewBox="0 0 400 440"
      width="100%"
      style={{ maxWidth: 400, display: "block", margin: "0 auto" }}
      aria-label="The Oracle — crystal ball scene"
    >
      <defs>
        <radialGradient id="ballGrad" cx="35%" cy="28%" r="68%">
          <stop offset="0%" stopColor="#f5e6ff" stopOpacity="0.95" />
          <stop offset="22%" stopColor="#d8b4fe" />
          <stop offset="55%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#2e0a6e" />
        </radialGradient>
        <radialGradient id="ballGradActive" cx="35%" cy="28%" r="68%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="15%" stopColor="#f0abfc" />
          <stop offset="45%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#3b0764" />
        </radialGradient>
        <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity={glowOpacity} />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="skinGrad" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fde8cb" />
          <stop offset="100%" stopColor="#e8b87a" />
        </radialGradient>
        <filter id="softBlur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
        </filter>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="ballClip">
          <circle cx="200" cy="320" r="68" />
        </clipPath>
      </defs>

      {/* HAT */}
      <polygon points="200,14 153,112 247,112" fill="#1a0844" />
      <polygon points="200,14 170,80 190,85" fill="#2d1269" opacity="0.5" />
      <ellipse cx="200" cy="114" rx="58" ry="15" fill="#250f60" />
      <ellipse cx="200" cy="112" rx="55" ry="12" fill="#300d78" />
      <rect x="157" y="106" width="86" height="10" rx="3" fill="#c9a84c" opacity="0.75" />
      <text x="200" y="75" textAnchor="middle" fontSize="14" fill="#f0d080" filter="url(#glow)">✦</text>
      <text x="172" y="97" textAnchor="middle" fontSize="9" fill="#f0d080" opacity="0.5">✧</text>
      <text x="228" y="97" textAnchor="middle" fontSize="9" fill="#f0d080" opacity="0.5">✧</text>

      {/* HAIR — dark with purple streak */}
      <path d="M 154,116 Q 137,130 143,152 Q 136,167 148,178" fill="none" stroke="#160335" strokeWidth="14" strokeLinecap="round" />
      <path d="M 246,116 Q 263,130 257,152 Q 264,167 252,178" fill="none" stroke="#160335" strokeWidth="14" strokeLinecap="round" />
      <path d="M 157,118 Q 142,132 147,152" fill="none" stroke="#9333ea" strokeWidth="4.5" strokeLinecap="round" opacity="0.75" />
      <path d="M 243,118 Q 258,132 253,152" fill="none" stroke="#9333ea" strokeWidth="4.5" strokeLinecap="round" opacity="0.75" />

      {/* HEAD — rounder, more youthful */}
      <ellipse cx="200" cy="163" rx="48" ry="50" fill="url(#skinGrad)" />

      {/* GLASSES — round, stylish */}
      <circle cx="183" cy="160" r="15" fill="none" stroke="#7a4a00" strokeWidth="2.5" opacity="0.8" />
      <circle cx="217" cy="160" r="15" fill="none" stroke="#7a4a00" strokeWidth="2.5" opacity="0.8" />
      <line x1="198" y1="160" x2="202" y2="160" stroke="#7a4a00" strokeWidth="2" />
      <line x1="168" y1="159" x2="161" y2="155" stroke="#7a4a00" strokeWidth="2" />
      <line x1="232" y1="159" x2="239" y2="155" stroke="#7a4a00" strokeWidth="2" />
      <circle cx="183" cy="160" r="14" fill="#c084fc" opacity="0.08" />
      <circle cx="217" cy="160" r="14" fill="#c084fc" opacity="0.08" />

      {/* EYE WHITES */}
      <circle cx="183" cy="160" r="10" fill="white" opacity="0.95" />
      <circle cx="217" cy="160" r="10" fill="white" opacity="0.95" />

      {/* EYES — big, expressive, violet iris */}
      {eyeState === "normal" && (
        <>
          <circle cx="183" cy="160" r="7" fill="#6d28d9" />
          <circle cx="217" cy="160" r="7" fill="#6d28d9" />
          <circle cx="183" cy="160" r="4.5" fill="#1a0835" />
          <circle cx="217" cy="160" r="4.5" fill="#1a0835" />
          <circle cx="185" cy="157.5" r="2.2" fill="white" opacity="0.9" />
          <circle cx="219" cy="157.5" r="2.2" fill="white" opacity="0.9" />
          <circle cx="181" cy="162" r="1" fill="white" opacity="0.45" />
          <circle cx="215" cy="162" r="1" fill="white" opacity="0.45" />
        </>
      )}
      {eyeState === "wide" && (
        <>
          <circle cx="183" cy="160" r="8.5" fill="#7c3aed" />
          <circle cx="217" cy="160" r="8.5" fill="#7c3aed" />
          <circle cx="183" cy="160" r="5.5" fill="#1a0835" />
          <circle cx="217" cy="160" r="5.5" fill="#1a0835" />
          <circle cx="183" cy="160" r="2.5" fill="#c084fc" opacity="0.55" />
          <circle cx="217" cy="160" r="2.5" fill="#c084fc" opacity="0.55" />
          <circle cx="185.5" cy="156.5" r="2.5" fill="white" opacity="0.95" />
          <circle cx="219.5" cy="156.5" r="2.5" fill="white" opacity="0.95" />
        </>
      )}
      {eyeState === "squint" && (
        <>
          <ellipse cx="183" cy="161" rx="9" ry="5.5" fill="#6d28d9" />
          <ellipse cx="217" cy="161" rx="9" ry="5.5" fill="#6d28d9" />
          <ellipse cx="183" cy="161" rx="6" ry="3.5" fill="#1a0835" />
          <ellipse cx="217" cy="161" rx="6" ry="3.5" fill="#1a0835" />
          <circle cx="185" cy="159" r="1.8" fill="white" opacity="0.85" />
          <circle cx="219" cy="159" r="1.8" fill="white" opacity="0.85" />
        </>
      )}
      {eyeState === "happy" && (
        <>
          <path d="M 173,163 Q 183,153 193,163" fill="#6d28d9" />
          <path d="M 207,163 Q 217,153 227,163" fill="#6d28d9" />
          <circle cx="183" cy="158" r="1.8" fill="white" opacity="0.8" />
          <circle cx="217" cy="158" r="1.8" fill="white" opacity="0.8" />
        </>
      )}

      {/* LASHES */}
      {eyeState !== "happy" && (
        <>
          <path d="M 172,151 Q 175,146 179,150" fill="none" stroke="#2d1050" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 180,149 Q 183,145 187,148" fill="none" stroke="#2d1050" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 188,150 Q 191,147 194,151" fill="none" stroke="#2d1050" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 206,150 Q 209,146 213,150" fill="none" stroke="#2d1050" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 214,148 Q 217,144 221,148" fill="none" stroke="#2d1050" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 222,150 Q 225,146 228,151" fill="none" stroke="#2d1050" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}

      {/* EYEBROWS — defined arch */}
      <path d="M 169,144 Q 183,138 197,143" fill="none" stroke="#2d1050" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 203,143 Q 217,138 231,144" fill="none" stroke="#2d1050" strokeWidth="2.5" strokeLinecap="round" />

      {/* NOSE — small, cute */}
      <path d="M 196,177 Q 200,182 204,177" fill="none" stroke="#c8896a" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="196.5" cy="178" r="1.5" fill="#d4906a" opacity="0.35" />
      <circle cx="203.5" cy="178" r="1.5" fill="#d4906a" opacity="0.35" />

      {/* MOUTH */}
      {state === "done" ? (
        <>
          <path d="M 185,193 Q 200,207 215,193" fill="none" stroke="#c05a38" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 187,194 Q 200,205 213,194" fill="#e07858" opacity="0.28" />
          <circle cx="183" cy="193" r="1.5" fill="#d07060" opacity="0.45" />
          <circle cx="217" cy="193" r="1.5" fill="#d07060" opacity="0.45" />
        </>
      ) : isDrawing ? (
        <ellipse cx="200" cy="196" rx="8" ry="7" fill="none" stroke="#b05a38" strokeWidth="2" />
      ) : (
        <path d="M 188,193 Q 200,203 212,193" fill="none" stroke="#c05a38" strokeWidth="2.5" strokeLinecap="round" />
      )}

      {/* CHEEKS — round anime blush */}
      <circle cx="161" cy="178" r="13" fill="#e86050" opacity="0.13" />
      <circle cx="239" cy="178" r="13" fill="#e86050" opacity="0.13" />
      <circle cx="161" cy="178" r="7" fill="#ff8070" opacity="0.09" />
      <circle cx="239" cy="178" r="7" fill="#ff8070" opacity="0.09" />

      {/* BODY */}
      <path d="M 157,208 Q 115,270 105,420 L 295,420 Q 285,270 243,208 Z" fill="#1a0844" />
      <path d="M 157,210 Q 200,226 243,210" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.4" />
      <path d="M 178,225 Q 172,300 168,390" fill="none" stroke="#2d1b69" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 222,225 Q 228,300 232,390" fill="none" stroke="#2d1b69" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 108,415 Q 200,425 292,415" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.3" />

      {/* SLEEVES */}
      <path d="M 162,218 Q 122,258 108,292" fill="none" stroke="#1a0844" strokeWidth="30" strokeLinecap="round" />
      <path d="M 238,218 Q 278,258 292,292" fill="none" stroke="#1a0844" strokeWidth="30" strokeLinecap="round" />
      <ellipse cx="107" cy="295" rx="20" ry="10" fill="#2d1b69" opacity="0.8" />
      <ellipse cx="293" cy="295" rx="20" ry="10" fill="#2d1b69" opacity="0.8" />

      {/* HANDS */}
      <ellipse cx="108" cy="296" rx="17" ry="11" fill="url(#skinGrad)" />
      <ellipse cx="292" cy="296" rx="17" ry="11" fill="url(#skinGrad)" />
      <path d="M 96,290 Q 100,284 108,287" fill="none" stroke="#d4a070" strokeWidth="2" strokeLinecap="round" />
      <path d="M 304,290 Q 300,284 292,287" fill="none" stroke="#d4a070" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="98" cy="295" rx="3" ry="4" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.7" />

      {/* ENERGY STREAMS */}
      {isActive && (
        <>
          <path d="M 122,296 Q 158,308 188,318" fill="none" stroke="#c084fc" strokeWidth="2" opacity="0.55" strokeDasharray="5,4">
            <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="0.7s" repeatCount="indefinite" />
          </path>
          <path d="M 278,296 Q 242,308 212,318" fill="none" stroke="#c084fc" strokeWidth="2" opacity="0.55" strokeDasharray="5,4">
            <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="0.7s" repeatCount="indefinite" />
          </path>
          {[140, 160, 175].map((x, i) => (
            <circle key={`sl${i}`} cx={x} cy={308} r="2" fill="#e879f9" opacity="0.6">
              <animate attributeName="opacity" values="0.6;0;0.6" dur={`${0.8 + i * 0.2}s`} begin={`${i * 0.2}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {[260, 245, 228].map((x, i) => (
            <circle key={`sr${i}`} cx={x} cy={308} r="2" fill="#e879f9" opacity="0.6">
              <animate attributeName="opacity" values="0.6;0;0.6" dur={`${0.8 + i * 0.2}s`} begin={`${i * 0.25}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </>
      )}

      {/* CRYSTAL BALL — outer glow */}
      <circle cx="200" cy="320" r={glowR} fill="url(#outerGlow)" filter="url(#softBlur)">
        {isActive && <animate attributeName="r" values={`${glowR};${glowR + 8};${glowR}`} dur="2.5s" repeatCount="indefinite" />}
      </circle>

      {/* Clickable zone */}
      <circle
        cx="200"
        cy="320"
        r="70"
        fill="transparent"
        style={{ cursor: canDraw ? "pointer" : "default" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onBallClick}
      />

      {/* Ball sphere */}
      <circle
        cx="200"
        cy="320"
        r="68"
        fill={isRevealed ? "url(#ballGradActive)" : "url(#ballGrad)"}
        style={{ pointerEvents: "none" }}
      />

      {/* Ball interior */}
      <g clipPath="url(#ballClip)">
        {!isRevealed && (
          <>
            <path d="M 148,308 Q 178,292 212,315 Q 242,335 262,308" fill="none" stroke="#c084fc" strokeWidth="3" opacity="0.35">
              {isDrawing && (
                <animate
                  attributeName="d"
                  values="M 148,308 Q 178,292 212,315 Q 242,335 262,308; M 148,318 Q 182,302 212,320 Q 240,338 262,318; M 148,308 Q 178,292 212,315 Q 242,335 262,308"
                  dur="2s"
                  repeatCount="indefinite"
                />
              )}
            </path>
            <path d="M 144,328 Q 170,344 208,328 Q 238,314 256,334" fill="none" stroke="#a855f7" strokeWidth="2.5" opacity="0.25">
              {isDrawing && (
                <animate
                  attributeName="d"
                  values="M 144,328 Q 170,344 208,328 Q 238,314 256,334; M 144,338 Q 174,350 208,336 Q 238,322 256,342; M 144,328 Q 170,344 208,328 Q 238,314 256,334"
                  dur="3s"
                  repeatCount="indefinite"
                />
              )}
            </path>
            {[
              { cx: 175, cy: 302 }, { cx: 220, cy: 298 }, { cx: 195, cy: 328 },
              { cx: 230, cy: 330 }, { cx: 163, cy: 325 }, { cx: 210, cy: 345 },
            ].map((p, i) => (
              <circle key={i} cx={p.cx} cy={p.cy} r="1.8" fill="white" opacity="0.7">
                <animate attributeName="opacity" values="0.7;0.1;0.7" dur={`${1.8 + i * 0.5}s`} begin={`${i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {canDraw && (
              <text x="200" y="325" textAnchor="middle" fontSize="11" fill="rgba(240,208,128,0.7)" fontFamily="Cinzel, serif">
                Click to reveal
                <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite" />
              </text>
            )}
          </>
        )}
        {isRevealed && card && (
          <>
            <circle cx="200" cy="320" r="70" fill="#1a0844" opacity="0.85" />
            {Array.from({ length: 12 }, (_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={200 + 44 * Math.cos(angle)}
                  y1={320 + 44 * Math.sin(angle)}
                  x2={200 + 65 * Math.cos(angle)}
                  y2={320 + 65 * Math.sin(angle)}
                  stroke="#f0d080"
                  strokeWidth="1.2"
                  opacity="0.3"
                />
              );
            })}
            <text x="200" y="332" textAnchor="middle" fontSize="44" fill="#f0d080" filter="url(#glow)">
              {card.symbol}
            </text>
          </>
        )}
      </g>

      {/* Ball highlight */}
      <ellipse cx="178" cy="297" rx="24" ry="17" fill="white" opacity="0.14" />
      <ellipse cx="172" cy="291" rx="11" ry="8" fill="white" opacity="0.22" />

      {/* STAND */}
      <path d="M 148,382 Q 200,395 252,382" fill="#140830" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.5" />
      <rect x="170" y="380" width="60" height="20" rx="5" fill="#140830" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.45" />
      <ellipse cx="200" cy="400" rx="40" ry="9" fill="#0a0515" opacity="0.8" />
    </svg>
  );
}

function SpeechBubble({ state, hasQuestion }: { state: AppState; hasQuestion: boolean }) {
  const messages: Record<AppState, string> = {
    idle: hasQuestion
      ? "I feel your question stir in the ether... Click the crystal ball to reveal your fate!"
      : "What troubles your heart, dearie? Write your question and I shall consult the cards…",
    drawing: "The ancient forces stir… your destiny takes shape in the mist…",
    revealed: "Ah yes — I see it clearly now! The card speaks to your soul…",
    interpreting: "The cards speak to me of your path… one moment, dear…",
    done: "The reading is complete. Ponder these words with an open heart.",
  };

  return (
    <div
      key={state + String(hasQuestion)}
      className="speech-bubble scroll-reveal mx-auto max-w-md text-center px-6 py-4 rounded-2xl relative"
      style={{
        background: "rgba(20, 8, 48, 0.85)",
        border: "1px solid rgba(201,168,76,0.35)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="absolute"
        style={{
          top: -10,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "10px solid transparent",
          borderRight: "10px solid transparent",
          borderBottom: "10px solid rgba(201,168,76,0.35)",
        }}
      />
      <p className="text-base italic" style={{ color: "rgba(232,213,183,0.88)", fontFamily: "EB Garamond, serif", fontSize: "1.05rem" }}>
        &ldquo;{messages[state]}&rdquo;
      </p>
    </div>
  );
}

function CardDetails({ card, visible }: { card: TarotCard; visible: boolean }) {
  if (!visible) return null;
  const suit = card.suit ? card.suit.charAt(0).toUpperCase() + card.suit.slice(1) : null;
  return (
    <div className="scroll-reveal text-center w-full max-w-md mx-auto">
      <div className="text-xs tracking-[0.3em] uppercase mb-1" style={{ color: "rgba(201,168,76,0.55)", fontFamily: "Cinzel, serif" }}>
        {card.arcana === "major" ? "Major Arcana" : suit}
      </div>
      <h2 className="text-2xl font-semibold mb-3" style={{ color: "#f0d080", fontFamily: "Cinzel, serif" }}>
        {card.name}
      </h2>
      <div className="flex flex-wrap justify-center gap-2">
        {card.keywords.map((k) => (
          <span
            key={k}
            className="text-xs px-3 py-1 rounded-full"
            style={{ background: "rgba(45,27,105,0.5)", border: "1px solid rgba(201,168,76,0.3)", color: "rgba(240,208,128,0.85)", fontFamily: "EB Garamond, serif" }}
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <div className="flex gap-2 items-center justify-center py-4">
      <div className="loading-dot" />
      <div className="loading-dot" />
      <div className="loading-dot" />
    </div>
  );
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [card, setCard] = useState<TarotCard | null>(null);
  const [state, setState] = useState<AppState>("idle");
  const [interpretation, setInterpretation] = useState("");
  const [error, setError] = useState("");
  const interpretRef = useRef<HTMLDivElement>(null);

  const handleDraw = useCallback(async () => {
    if (!question.trim() || state !== "idle") return;

    setError("");
    const drawn = drawRandomCard();
    setCard(drawn);
    setState("drawing");

    await new Promise((r) => setTimeout(r, 1000));
    setState("revealed");
    await new Promise((r) => setTimeout(r, 700));
    setState("interpreting");

    try {
      const res = await fetch("/api/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.trim(), card: drawn }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setInterpretation(data.interpretation);
      setState("done");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Reading failed");
      setState("done");
    }
  }, [question, state]);

  const handleReset = () => {
    setQuestion("");
    setCard(null);
    setInterpretation("");
    setError("");
    setState("idle");
  };

  useEffect(() => {
    if (state === "done" && interpretRef.current) {
      setTimeout(() => interpretRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 200);
    }
  }, [state]);

  const canDraw = state === "idle" && question.trim().length > 0;

  return (
    <div className="relative min-h-screen flex flex-col items-center" style={{ zIndex: 1 }}>
      <Starfield />

      <div className="relative z-10 w-full max-w-xl px-5 py-10 flex flex-col items-center gap-7">
        <header className="text-center">
          <div className="text-xs tracking-[0.55em] uppercase mb-2" style={{ color: "rgba(201,168,76,0.45)", fontFamily: "Cinzel, serif" }}>
            ✦ Mystical Oracle ✦
          </div>
          <h1 className="text-4xl font-semibold mb-2" style={{ color: "#f0d080", fontFamily: "Cinzel, serif", letterSpacing: "0.05em" }}>
            The Oracle
          </h1>
          <p className="text-sm italic" style={{ color: "rgba(232,213,183,0.5)" }}>
            Ask your question. Draw your card. Receive your reading.
          </p>
        </header>

        <OracleSVG state={state} card={card} onBallClick={handleDraw} canDraw={canDraw} />

        <SpeechBubble state={state} hasQuestion={question.trim().length > 0} />

        {state === "idle" && (
          <section className="w-full scroll-reveal flex flex-col gap-3">
            <label className="text-xs tracking-[0.25em] uppercase text-center" style={{ color: "rgba(201,168,76,0.6)", fontFamily: "Cinzel, serif" }}>
              Your Question
            </label>
            <textarea
              className="question-input w-full rounded-xl px-5 py-4 text-base leading-relaxed"
              rows={3}
              maxLength={280}
              placeholder="What weighs on your heart? Ask openly and with sincerity…"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && e.metaKey) handleDraw(); }}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: "rgba(232,213,183,0.3)" }}>{question.length}/280</span>
              <button
                className="draw-btn px-7 py-3 rounded-xl text-sm"
                disabled={!canDraw}
                onClick={handleDraw}
              >
                Draw Your Card
              </button>
            </div>
            {question.trim().length > 0 && (
              <p className="text-center text-xs italic" style={{ color: "rgba(201,168,76,0.45)" }}>
                — or click the crystal ball —
              </p>
            )}
          </section>
        )}

        {state !== "idle" && question && (
          <div
            className="w-full text-center px-5 py-3 rounded-xl scroll-reveal"
            style={{ background: "rgba(13,8,38,0.55)", border: "1px solid rgba(201,168,76,0.18)" }}
          >
            <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "rgba(201,168,76,0.45)", fontFamily: "Cinzel, serif" }}>
              Your Question
            </p>
            <p className="text-sm italic" style={{ color: "rgba(232,213,183,0.75)" }}>
              &ldquo;{question}&rdquo;
            </p>
          </div>
        )}

        <CardDetails
          card={card!}
          visible={card !== null && (state === "revealed" || state === "interpreting" || state === "done")}
        />

        {state === "interpreting" && (
          <div className="text-center">
            <p className="text-xs italic mb-1" style={{ color: "rgba(201,168,76,0.5)" }}>Reading the cards…</p>
            <LoadingDots />
          </div>
        )}

        <div ref={interpretRef} className="w-full">
          {state === "done" && !error && interpretation && (
            <div
              className="scroll-reveal w-full rounded-2xl p-7"
              style={{ background: "rgba(8,5,24,0.9)", border: "1px solid rgba(201,168,76,0.3)", backdropFilter: "blur(5px)" }}
            >
              <div className="text-center mb-4">
                <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "rgba(201,168,76,0.6)", fontFamily: "Cinzel, serif" }}>
                  Your Reading
                </span>
              </div>
              <div className="w-20 h-px mx-auto mb-5" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)" }} />
              <p className="whitespace-pre-wrap" style={{ color: "rgba(232,213,183,0.92)", fontFamily: "EB Garamond, serif", fontSize: "1.1rem", lineHeight: "1.9" }}>
                {interpretation}
              </p>
            </div>
          )}

          {state === "done" && error && (
            <div
              className="w-full rounded-xl p-5 text-center"
              style={{ background: "rgba(80,10,10,0.5)", border: "1px solid rgba(200,50,50,0.4)" }}
            >
              <p className="text-sm" style={{ color: "#f87171" }}>{error}</p>
              <p className="text-xs mt-2" style={{ color: "rgba(200,100,100,0.7)" }}>
                Add <strong>ANTHROPIC_API_KEY</strong> in your Vercel project under{" "}
                <em>Settings → Environment Variables</em>, then redeploy.
              </p>
            </div>
          )}
        </div>

        {state === "done" && (
          <button className="scroll-reveal draw-btn px-8 py-3 rounded-xl text-sm" onClick={handleReset}>
            Ask Another Question
          </button>
        )}

        <footer className="text-center mt-2">
          <div className="text-xs tracking-widest" style={{ color: "rgba(201,168,76,0.2)", fontFamily: "Cinzel, serif" }}>
            ✦ ✦ ✦
          </div>
        </footer>
      </div>
    </div>
  );
}

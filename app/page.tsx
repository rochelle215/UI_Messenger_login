"use client";

import { useState } from "react";

export default function MessengerLanding() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Optimistic+Display:wght@700&family=Helvetica+Neue:wght@400;500;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --blue:   #0084ff;
          --purple: #7b2ff7;
          --pink:   #e4007c;
          --grad: linear-gradient(90deg, #7b2ff7 0%, #e4007c 100%);
          --text-dark: #1c1e21;
          --text-mid: #606770;
          --bg: #fff;
          --input-bg: #f0f2f5;
          --radius: 8px;
        }

        body { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; background: var(--bg); color: var(--text-dark); }

        /* ── NAV ── */
        .nav {
          position: sticky; top: 0; z-index: 100;
          display: flex; align-items: center;
          padding: 0 40px; height: 68px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .nav-logo { display: flex; align-items: center; gap: 10px; }
        .nav-links { margin-left: auto; display: flex; gap: 36px; list-style: none; }
        .nav-links a {
          font-size: 15px; font-weight: 500; color: var(--text-dark);
          text-decoration: none; transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--blue); }

        /* ── HERO ── */
        .hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          min-height: calc(100vh - 68px);
          padding: 60px 80px 60px 80px;
          gap: 40px;
          max-width: 1280px;
          margin: 0 auto;
        }

        /* ── LEFT SIDE ── */
        .hero-left { display: flex; flex-direction: column; gap: 0; }

        .hero-headline {
          font-size: clamp(52px, 6vw, 80px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -1.5px;
          margin-bottom: 24px;
        }
        .grad-text {
          background: var(--grad);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .blue-text { color: var(--blue); -webkit-text-fill-color: var(--blue); }

        .hero-sub {
          font-size: 17px; line-height: 1.55;
          color: var(--text-mid);
          max-width: 420px;
          margin-bottom: 36px;
        }

        /* ── FORM ── */
        .login-form { display: flex; flex-direction: column; gap: 12px; max-width: 380px; }

        .input-field {
          width: 100%; padding: 14px 16px;
          background: var(--input-bg);
          border: 1.5px solid transparent; border-radius: var(--radius);
          font-size: 15px; color: var(--text-dark);
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .input-field::placeholder { color: #bcc0c4; }
        .input-field:focus {
          background: #fff;
          border-color: var(--blue);
          box-shadow: 0 0 0 3px rgba(0,132,255,0.14);
        }

        .form-row { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }

        .login-btn {
          padding: 14px 28px;
          background: var(--blue);
          color: #fff; font-size: 16px; font-weight: 700;
          border: none; border-radius: 50px;
          cursor: pointer;
          transition: filter 0.2s, transform 0.1s;
          white-space: nowrap;
        }
        .login-btn:hover { filter: brightness(1.1); }
        .login-btn:active { transform: scale(0.97); }

        .forgot-link {
          font-size: 15px; color: var(--blue);
          text-decoration: none; font-weight: 500;
          transition: opacity 0.2s;
        }
        .forgot-link:hover { opacity: 0.75; }

        .keep-signed {
          display: flex; align-items: center; gap: 10px;
          font-size: 14px; color: var(--text-mid);
          cursor: pointer; user-select: none;
          margin-top: 4px;
        }
        .keep-signed input[type="checkbox"] {
          width: 17px; height: 17px;
          accent-color: var(--blue); cursor: pointer;
        }

        /* ── APP STORE BUTTONS ── */
        .store-buttons { display: flex; gap: 12px; margin-top: 28px; flex-wrap: wrap; }

        .store-btn {
          display: flex; align-items: center; gap: 10px;
          background: #000; color: #fff;
          padding: 10px 18px; border-radius: 10px;
          text-decoration: none; transition: opacity 0.2s;
        }
        .store-btn:hover { opacity: 0.82; }
        .store-btn-text { display: flex; flex-direction: column; }
        .store-btn-small { font-size: 10px; letter-spacing: 0.05em; }
        .store-btn-large { font-size: 15px; font-weight: 700; }

        .store-btn.windows { background: #f3f3f3; color: #000; }

        /* ── RIGHT SIDE (MOCKUP) ── */
        .hero-right {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          height: 560px;
        }

        /* Video call grid */
        .video-grid {
          position: absolute;
          left: 0; top: 50%;
          transform: translateY(-50%);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          width: 310px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }
        .video-tile {
          aspect-ratio: 1;
          border-radius: 4px;
          overflow: hidden;
          background: #e0e0e0;
        }
        .video-tile img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* Placeholder avatars when no real images */
        .avatar-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 36px;
        }
        .tile-1 { background: linear-gradient(135deg, #f8b4c8, #f48fb1); }
        .tile-2 { background: linear-gradient(135deg, #b3e0f7, #81d4fa); }
        .tile-3 { background: linear-gradient(135deg, #c8e6c9, #a5d6a7); }
        .tile-4 { background: linear-gradient(135deg, #ffe0b2, #ffcc80); }

        /* Phone mockup */
        .phone-mockup {
          position: absolute;
          right: 0; top: 50%;
          transform: translateY(-50%);
          width: 270px;
          background: #fff;
          border-radius: 40px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06);
          overflow: hidden;
          z-index: 2;
        }

        .phone-status {
          display: flex; justify-content: space-between; align-items: center;
          padding: 12px 20px 6px;
          font-size: 12px; font-weight: 700; color: #111;
        }
        .status-icons { display: flex; gap: 5px; align-items: center; font-size: 11px; }

        .phone-header {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 14px 10px;
          border-bottom: 1px solid #f0f2f5;
        }
        .phone-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, #a29bfe, #6c5ce7);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 14px; font-weight: 700;
        }
        .phone-name { font-size: 14px; font-weight: 700; flex: 1; }
        .phone-actions { display: flex; gap: 14px; }
        .phone-icon { font-size: 16px; color: var(--blue); }

        .phone-messages {
          padding: 12px 10px;
          display: flex; flex-direction: column; gap: 10px;
          min-height: 320px;
          background: #fff;
        }

        .msg { display: flex; flex-direction: column; }
        .msg.sent { align-items: flex-end; }
        .msg.received { align-items: flex-start; }

        .msg-sender { font-size: 10px; color: #8a8d91; margin-bottom: 3px; padding-left: 2px; }

        .bubble {
          max-width: 75%; padding: 9px 13px;
          border-radius: 18px; font-size: 13px; line-height: 1.4;
        }
        .bubble.sent { background: var(--blue); color: #fff; border-bottom-right-radius: 4px; }
        .bubble.received { background: #f0f2f5; color: #111; border-bottom-left-radius: 4px; }

        .reply-preview {
          background: #f0f2f5; border-radius: 12px;
          padding: 8px 12px; margin: 0 10px;
          font-size: 11px; color: #606770;
          border-left: 3px solid var(--blue);
        }
        .reply-preview strong { display: block; color: var(--blue); font-size: 10px; margin-bottom: 2px; }

        .big-bubble-row { display: flex; justify-content: flex-end; padding: 0 10px; }
        .big-bubble {
          background: var(--blue); color: #fff;
          border-radius: 20px; border-bottom-right-radius: 4px;
          padding: 10px 14px; font-size: 13.5px; font-weight: 500;
          display: flex; align-items: center; gap: 8px;
        }
        .hearts { font-size: 18px; }

        .phone-bar {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 12px;
          border-top: 1px solid #f0f2f5;
          background: #fff;
        }
        .bar-icon { font-size: 20px; color: var(--blue); }
        .bar-input {
          flex: 1; background: #f0f2f5;
          border-radius: 20px; padding: 7px 14px;
          font-size: 13px; color: #bcc0c4;
        }
        .bar-emoji { font-size: 18px; }
        .bar-like { font-size: 20px; color: var(--blue); }

        .phone-home { display: flex; justify-content: center; padding: 10px; }
        .home-bar { width: 100px; height: 4px; background: #000; border-radius: 2px; }

        /* Floating reaction */
        .float-reaction {
          position: absolute;
          right: 30px; top: 180px;
          background: #fff;
          border-radius: 24px;
          padding: 8px 14px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          font-size: 13px; font-weight: 600; color: #111;
          display: flex; align-items: center; gap: 8px;
          animation: floatUp 3s ease-in-out infinite;
          z-index: 3;
        }
        .float-avatar {
          width: 28px; height: 28px; border-radius: 50%;
          background: linear-gradient(135deg, #fd79a8, #e17055);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 11px; font-weight: 700;
        }

        @keyframes floatUp {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        /* ── ANIMATIONS ── */
        .fade-in { animation: fadeIn 0.6s ease both; }
        .fade-in-1 { animation: fadeIn 0.6s ease 0.1s both; }
        .fade-in-2 { animation: fadeIn 0.6s ease 0.2s both; }
        .fade-in-3 { animation: fadeIn 0.6s ease 0.3s both; }
        .fade-in-4 { animation: fadeIn 0.6s ease 0.4s both; }
        .fade-in-5 { animation: fadeIn 0.6s ease 0.5s both; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .hero {
            grid-template-columns: 1fr;
            padding: 40px 32px;
            min-height: auto;
          }
          .hero-right { display: none; }
          .nav { padding: 0 24px; }
          .nav-links { gap: 20px; }
          .nav-links a { font-size: 13px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="36" height="36">
            <defs>
              <linearGradient id="ng" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d300c5" />
                <stop offset="50%" stopColor="#7B2FF7" />
                <stop offset="100%" stopColor="#00B2FF" />
              </linearGradient>
            </defs>
            <circle cx="28" cy="28" r="28" fill="url(#ng)" />
            <path d="M28 10C17.507 10 9 17.925 9 27.7c0 5.456 2.56 10.332 6.587 13.668V47l5.9-3.238c1.575.436 3.244.67 4.97.67 10.494 0 19-7.925 19-17.7S38.494 10 28 10zm1.88 23.84l-4.834-5.158-9.43 5.158 10.376-11.02 4.952 5.157 9.313-5.157L29.88 33.84z" fill="white" />
          </svg>
        </div>
        <ul className="nav-links">
          <li><a href="#">Features</a></li>
          <li><a href="#">Desktop App</a></li>
          <li><a href="#">Privacy &amp; Safety</a></li>
          <li><a href="#">For Developers</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <main>
        <div className="hero">
          {/* LEFT */}
          <div className="hero-left">
            <h1 className="hero-headline fade-in">
              <span className="blue-text">Hang out</span><br />
              <span className="grad-text">anytime,</span><br />
              <span className="grad-text">anywhere</span>
            </h1>

            <p className="hero-sub fade-in-1">
              Messenger makes it easy and fun to stay close to your favorite people.
            </p>

            <div className="login-form fade-in-2">
              <input
                type="email"
                className="input-field"
                placeholder="Email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <input
                type="password"
                className="input-field"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <div className="form-row">
                <button className="login-btn">Log in</button>
                <a href="#" className="forgot-link">Forgotten your password?</a>
              </div>
              <label className="keep-signed">
                <input type="checkbox" checked={keepSignedIn} onChange={(e) => setKeepSignedIn(e.target.checked)} />
                <span>Keep me signed in</span>
              </label>
            </div>

            <div className="store-buttons fade-in-3">
              {/* App Store */}
              <a href="#" className="store-btn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <div className="store-btn-text">
                  <span className="store-btn-small">Download on the</span>
                  <span className="store-btn-large">App Store</span>
                </div>
              </a>
              {/* Microsoft Store */}
              <a href="#" className="store-btn windows">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#00a4ef"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>
                <div className="store-btn-text">
                  <span className="store-btn-small">Get it from</span>
                  <span className="store-btn-large">Microsoft</span>
                </div>
              </a>
            </div>
          </div>

          {/* RIGHT — MOCKUP */}
          <div className="hero-right fade-in-2">
            {/* Video grid */}
            <div className="video-grid">
              <div className="video-tile tile-1"><div className="avatar-placeholder">😄</div></div>
              <div className="video-tile tile-2"><div className="avatar-placeholder">🤗</div></div>
              <div className="video-tile tile-3"><div className="avatar-placeholder">😍</div></div>
              <div className="video-tile tile-4"><div className="avatar-placeholder">😂</div></div>
            </div>

            {/* Floating reaction */}
            <div className="float-reaction">
              <div className="float-avatar">A</div>
              I am! 🩷
            </div>

            {/* Phone mockup */}
            <div className="phone-mockup">
              {/* Status bar */}
              <div className="phone-status">
                <span>9:41</span>
                <div className="status-icons">
                  <span>▲▲▲</span>
                  <span>WiFi</span>
                  <span>🔋</span>
                </div>
              </div>

              {/* Header */}
              <div className="phone-header">
                <span style={{fontSize: 18, color: '#0084ff'}}>‹</span>
                <div className="phone-avatar">Fr</div>
                <span className="phone-name">Framily</span>
                <div className="phone-actions">
                  <span className="phone-icon">📞</span>
                  <span className="phone-icon">📹</span>
                </div>
              </div>

              {/* Messages */}
              <div className="phone-messages">
                <div className="msg sent">
                  <div className="bubble sent">Hey Framily! Who is down to hang tonight</div>
                </div>
                <div className="msg received">
                  <div className="msg-sender">Ning</div>
                  <div className="bubble received">Let's gooo noww 🎉</div>
                </div>
                <div className="msg received">
                  <div className="msg-sender">Gordon</div>
                  <div className="bubble received">I'm in!</div>
                </div>
                <div className="msg sent">
                  <div className="bubble sent">Great! What about Alice?</div>
                </div>

                <div className="reply-preview">
                  <strong>↩ Alice replied to You</strong>
                  Hey Framily? Who is down to hang tonight
                </div>

                <div className="msg received">
                  <div className="bubble received">I am!</div>
                </div>

                <div className="big-bubble-row">
                  <div className="big-bubble">
                    Yerp. Love you!! <span className="hearts">🩷💗</span>
                  </div>
                </div>

                <div style={{display:'flex', justifyContent:'flex-end', padding:'0 10px', fontSize:'16px'}}>🧑‍🤝‍🧑</div>
              </div>

              {/* Input bar */}
              <div className="phone-bar">
                <span className="bar-icon">➕</span>
                <span className="bar-icon">📷</span>
                <span className="bar-icon">🖼️</span>
                <span className="bar-icon">🎤</span>
                <div className="bar-input">Aa</div>
                <span className="bar-emoji">😊</span>
                <span className="bar-like">👍</span>
              </div>

              <div className="phone-home">
                <div className="home-bar" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
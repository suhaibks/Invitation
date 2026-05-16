import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

const App = () => {
  const [revealOpen, setRevealOpen] = useState(false);
  const [revealHidden, setRevealHidden] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target); 
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Countdown Timer Logic - Set to Nikah Time: Oct 25, 2026 at 11:30 AM
  useEffect(() => {
    const targetDate = new Date("Oct 25, 2026 11:30:00").getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Open the floral reveal
  const handleReveal = () => {
    setRevealOpen(true);
    setTimeout(() => { setRevealHidden(true); }, 1500);
  };

  // Ambient Particle Generator
  const Particles = () => (
    <div className="particles-container">
      {[...Array(15)].map((_, i) => (
        <div key={i} className="particle" style={{
          left: `${Math.random() * 100}vw`,
          animationDuration: `${Math.random() * 10 + 8}s`,
          animationDelay: `${Math.random() * 5}s`
        }} />
      ))}
    </div>
  );

  return (
    <>
      <Particles />

      {/* Floral Center Button Reveal */}
      <div className={`floral-reveal-overlay ${revealOpen ? 'open' : ''} ${revealHidden ? 'hidden' : ''}`}>
        <div className="flower-container" onClick={handleReveal}>
          <div className="css-flower">
            <div className="flower-petal"></div>
            <div className="flower-petal"></div>
            <div className="flower-petal"></div>
            <div className="flower-petal"></div>
          </div>
          <div className="bismillah-circle">
            <span style={{ fontFamily: 'Arial', lineHeight: '1', marginTop: '-5px' }}>﷽</span>
          </div>
        </div>
      </div>

      {/* 1. Landing / Hero Screen */}
      <header className="hero" id="home">
        <div className="hero-content fade-in">
          <p className="bismillah delay-1">﷽</p>
          <p className="tagline delay-1" style={{ textTransform: 'none', fontStyle: 'italic', color: 'var(--text-main)' }}>
            "And We created you in pairs" (Quran 78:8)
          </p>
          
          <p className="tagline delay-2" style={{ marginTop: '20px' }}>Together with their families</p>
          <p className="tagline delay-2" style={{ fontSize: '0.6rem', marginTop: '5px' }}>
            Mr. Sulaiman KM & Mrs. Zaurabi KA
          </p>
          
          <h1 className="delay-2" style={{ lineHeight: '1.2' }}>
            Bilal <br />
            <span style={{ fontSize: '0.6em', color: 'var(--accent-color)', fontStyle: 'italic' }}>&</span> <br />
            Fathima Zakiya
          </h1>

          <p className="tagline delay-2" style={{ fontSize: '0.6rem', marginTop: '5px' }}>
            Mr. Iqbal Hussain & Mrs. Rahamath
          </p>
          
          <p className="invitation-line delay-3">Joyfully invite you to witness the Nikah and celebrate their union</p>
          <p className="tagline delay-3" style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>October 25, 2026 • 11:30 AM</p>
          <p className="tagline delay-3">Anvaya The Marquee, Kushalnagar</p>
        </div>
      </header>

      {/* 2. Editorial Couple Showcase */}
      <section className="section-padding" id="couple">
        <div className="container fade-in">
          <h2>Two Souls, One Journey</h2>
          <p className="section-subtitle">Alhamdulillah</p>
          
          <div className="couple-showcase">
            <div className="portrait-wrapper portrait-groom fade-in delay-1">
              <img src="/Groom.jpg" alt="Bilal" loading="lazy" />
              <div className="portrait-caption">
                Bilal
                <div className="portrait-role">The Groom</div>
              </div>
            </div>

            <div className="portrait-wrapper portrait-bride fade-in delay-2">
              <img src="/Bride.jpg" alt="Zakya Fathima" loading="lazy" />
              <div className="portrait-caption">
                Fathima Zakiya
                <div className="portrait-role">The Bride</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Countdown Section */}
      <section className="section-padding" id="countdown">
        <div className="container fade-in">
          <h2>Countdown to Nikah</h2>
          <p className="section-subtitle">Every moment brings us closer, Insha'Allah</p>
          
          <div className="countdown-grid">
            <div className="countdown-box"><span>{timeLeft.days}</span><label>Days</label></div>
            <div className="countdown-box"><span>{timeLeft.hours}</span><label>Hours</label></div>
            <div className="countdown-box"><span>{timeLeft.minutes}</span><label>Minutes</label></div>
            <div className="countdown-box"><span>{timeLeft.seconds}</span><label>Seconds</label></div>
          </div>
        </div>
      </section>

      {/* 4. Location & Schedule Section */}
      <section className="section-padding events-container" id="events">
        <div className="container fade-in">
          <h2>The Auspicious Events</h2>
          <p className="section-subtitle">Join us for an elegant evening of celebration as we begin this new chapter together.</p>
          
          <div className="event-grid">
            <div className="event-card fade-in delay-1">
              <span className="time-pill">Oct 24 • 7:00 PM</span>
              <h3>Haldi & Mehendi</h3>
              <p style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>The Sweet Home</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginTop: '10px' }}>Join us for a vibrant evening of traditional colors, henna, and joyous celebrations.</p>
            </div>
            <div className="event-card fade-in delay-2">
              <span className="time-pill">Oct 25 • 11:30 AM</span>
              <h3>The Nikah</h3>
              <p style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>Anvaya The Marquee</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginTop: '10px' }}>Witness the sacred exchange of vows and bless the couple as they say "Qubool Hai".</p>
            </div>
            
            <div className="event-card fade-in delay-1">
              <span className="time-pill">Play Now</span>
              <h3>Wedding Games</h3>
              <p style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>Online Competition</p>
              
              <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginTop: '10px' }}>
                Participate in our special cousins and guests games for a chance to win exciting prizes!
                <br /><br />
                <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>Note:</span> A unique code is required to enter the game. If you are interested in playing. Please ask for the code via whatsapp.
              </p>

              {/* Buttons Container */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '25px' }}>
                
                {/* Play Button */}
                <a href="https://bilal-zakiya-nikah-2026.web.app/?open=1" target="_blank" rel="noreferrer" className="btn" style={{ padding: '12px 20px', fontSize: '0.8rem', width: '100%' }}>
                  Start Playing
                </a>

                {/* WhatsApp Button */}
                {/* Make sure to replace YOUR_PHONE_NUMBER with your actual number including the country code, e.g., 919876543210 */}
                <a href="https://wa.me/YOUR_PHONE_NUMBER?text=Hi!%20Could%20I%20please%20get%20my%20unique%20code%20for%20the%20wedding%20games?" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '12px 20px', fontSize: '0.8rem', width: '100%' }}>
                  Ask for Code via WhatsApp
                </a>
                
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 5. Details & Directions */}
      <section className="section-padding container fade-in" id="venue-details">
        <div className="details-box">
          <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent-color)' }}>Anvaya The Marquee</h4>
          <p>Madikeri Road, Guddehosuru<br />Kushalnagar - 571234, Karnataka</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginTop: '20px' }}>Join us as we celebrate in a setting of elegance and warmth. We look forward to sharing this special day with you.</p>
          <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Auto-searching Google Maps Link */}
            <a href="https://www.google.com/maps/search/?api=1&query=Anvaya+The+Marquee,+Madikeri+Road,+Kushalnagar" target="_blank" rel="noreferrer" className="btn">Open in Google Maps</a>
            <a href="#events" className="btn btn-outline">View Schedule</a>
          </div>
        </div>
      </section>

      {/* 6. RSVP Button Section */}
      <section className="rsvp-btn-container fade-in" id="rsvp">
          <h2>Kindly Reply</h2>
          <p className="section-subtitle">Please respond by October 15, 2026</p>
          {/* Your direct Google Form link */}
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfEV2Y_AYPQgkVze-CJvElCjKAJqzkzrh0HZLirqV0-UMUfuw/viewform?usp=sharing&ouid=117723795440602603986" target="_blank" rel="noreferrer" className="btn">RSVP via Google Forms</a>
      </section>

      {/* 7. Closing Section */}
      <footer className="footer fade-in">
        <div className="footer-content">
          <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Awaiting Your Presence</h3>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-light)' }}>
            We look forward to celebrating this special day with you. Your presence and duas will make our celebration truly meaningful.
          </p>
          <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginTop: '40px' }}>With love & prayers,</p>
          
          <h2 style={{ lineHeight: '1.2' }}>
            Bilal <br />
            <span style={{ fontSize: '0.6em', color: 'var(--accent-color)', fontStyle: 'italic' }}>&</span> <br />
            Fathima Zakiya
          </h2>
        </div>
      </footer>
      <Analytics />
    </>
  );
};

export default App;
      

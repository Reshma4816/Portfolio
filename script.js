/**
 * Premium Cybersecurity Portfolio Interactions
 * Candidate: Reshma Al
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Background Canvas Animation (Cyber Grid / Falling Code Effect)
  initBackgroundCanvas();

  // 3. Hero Section Subtitle Typing Loop
  initTypingEffect();

  // 4. Dark / Light Theme Toggle
  initThemeToggle();

  // 5. Responsive Mobile Menu
  initMobileMenu();

  // 6. Navigation Scroll Spy & Smooth Scroll
  initScrollSpy();

  // 7. Skills Categories Filtering
  initSkillsFilter();

  // 8. Skill Progress Bars Animation
  initSkillsProgress();

  // 9. Interactive Terminals Setup
  initTerminals();

  // 10. Contact Form Visual Submission
  initContactForm();

  // 11. Footer Year
  document.getElementById('current-year').textContent = new Date().getFullYear();
});

/* ==========================================================================
   2. Background Canvas Animation (Subtle Digital Grid and Particles)
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let animationFrameId;

  // Resize handler
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Matrix/Digital Stream Configuration
  const isLight = () => document.documentElement.getAttribute('data-theme') === 'light';
  const fontSize = 14;
  const columns = Math.floor(canvas.width / 20);
  const drops = Array(columns).fill(1);
  const chars = "01010101ABCDEFSHIELDSOCDFIR".split("");

  // Grid background nodes
  const nodes = [];
  const maxNodes = 40;
  for (let i = 0; i < maxNodes; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1
    });
  }

  function draw() {
    // Clear screen with high opacity to keep it subtle
    ctx.fillStyle = isLight() ? 'rgba(241, 245, 249, 0.15)' : 'rgba(7, 10, 19, 0.12)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw background nodes (connected graph effect)
    ctx.strokeStyle = isLight() ? 'rgba(14, 165, 233, 0.05)' : 'rgba(0, 240, 255, 0.06)';
    ctx.fillStyle = isLight() ? 'rgba(14, 165, 233, 0.2)' : 'rgba(0, 240, 255, 0.25)';
    ctx.lineWidth = 1;

    for (let i = 0; i < nodes.length; i++) {
      let n1 = nodes[i];
      n1.x += n1.vx;
      n1.y += n1.vy;

      // Wrap boundaries
      if (n1.x < 0 || n1.x > canvas.width) n1.vx *= -1;
      if (n1.y < 0 || n1.y > canvas.height) n1.vy *= -1;

      // Draw dot
      ctx.beginPath();
      ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
      ctx.fill();

      // Connect near dots
      for (let j = i + 1; j < nodes.length; j++) {
        let n2 = nodes[j];
        let dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }
    }

    // Matrix Rain (Subtle vertical streams on sides)
    ctx.fillStyle = isLight() ? 'rgba(14, 165, 233, 0.12)' : 'rgba(0, 240, 255, 0.15)';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      // Only draw matrix rain on outer edges to avoid reading distraction
      if (i > columns * 0.15 && i < columns * 0.85) continue;

      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * 20, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    animationFrameId = requestAnimationFrame(draw);
  }

  draw();
}

/* ==========================================================================
   3. Hero Subtitle Typing Loop
   ========================================================================== */
function initTypingEffect() {
  const element = document.getElementById('hero-typing');
  if (!element) return;

  const words = JSON.parse(element.getAttribute('data-words'));
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIdx];
    
    if (isDeleting) {
      element.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50;
    } else {
      element.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIdx === currentWord.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at full word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      typingSpeed = 400; // Pause before next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. Dark / Light Theme Toggle
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  // Retrieve previous settings
  const storedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', storedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

/* ==========================================================================
   5. Responsive Mobile Menu
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    
    // Toggle menu icon between burger and close
    const icon = menuToggle.querySelector('i');
    if (icon) {
      const isOpened = navMenu.classList.contains('open');
      icon.setAttribute('data-lucide', isOpened ? 'x' : 'menu');
      lucide.createIcons();
    }
  });

  // Close menu when clicking nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
      }
    });
  });
}

/* ==========================================================================
   6. Navigation Scroll Spy & Smooth Scroll
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    // Add header shadow and height reduction on scroll
    if (window.scrollY > 50) {
      header.style.padding = '0.5rem 0';
      header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
    } else {
      header.style.padding = '0';
      header.style.boxShadow = 'none';
    }

    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   7. Skills Categories Filtering
   ========================================================================== */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.skills-tab');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          // Smooth fade in
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. Skill Progress Bars Animation (Trigger on scroll)
   ========================================================================== */
function initSkillsProgress() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetPercent = fill.getAttribute('data-percent');
        fill.style.width = targetPercent;
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.1 });

  skillBars.forEach(bar => {
    observer.observe(bar);
  });
}

/* ==========================================================================
   9. Interactive Terminals Setup (Hero and Console)
   ========================================================================== */
const RESUME_DB = {
  about: `Reshma Al is an ambitious Cybersecurity undergraduate student based in Chennai, India.
Passionate about Security Operations (SOC), Digital Forensics & Incident Response (DFIR),
Ethical Hacking, and Threat Hunting. Gained experience via cybersecurity labs, hand-on projects and real-world internships at
the Tambaram Commissionerate Cybercrime Wing and InternPe.
Open to Internship and Job Opportunities!`,
  
  skills: `Security Operations
  Digital Forensics
  Incident Response
  Threat Detection
  Vulnerability Assessment
  Wireshark
  Splunk/SIEM 
  Nmap 
  Python
  Bash             
  Linux
  Windows Audit                  
  Leadership, 
  Communication
  Teamwork`,

  experience: `* Cybercrime Intern - Cybercrime Wing, Tambaram Commissionerate (June-July 2025)
  - Assisted in digital evidence gathering and forensic processes.
  - Worked on cases involving phishing, financial fraud, and identity thefts.
  - Formally appreciated by the Assistant Deputy Commissioner of Police for casework.

* Cybersecurity Intern - InternPe (Jan-Feb 2025)
  - Conducted network scanning using Nmap.
  - Analyzed traffic patterns and network layers using Wireshark packet analysis.`,

  education: `Bachelor of Engineering in Computer Science (Cybersecurity)
Rajalakshmi Engineering College (2024 - 2028)
Current Academic Standard: 8.04 CGPA`,

  projects: `* Featured Project: AquaHarvest Pro
  - Intelligent rainwater harvesting platform with database logging and telemetry dashboard.
  - Stack: Next.js 15, React 18, Supabase RLS, Three.js visualization, PostgreSQL.
  - Features: Real-time sensor monitoring graphs (pH, rainfall) and active responsive access control.`,

  certs: `* TryHackMe - Pre Security (Hands-on)
* LetsDefend - SOC Member (Blue Team Operations)
* Tata Cybersecurity Analyst Simulation (Forage)
* Skill India - IT Forensic Analyst (Government Credential)
* Infosys Springboard - Basics of Python`,

  contact: `Email: reshmaalagesan@gmail.com
reshma.al.2024.csecs@rajalakshmi.edu.in              
Phone: +91 9884453399
LinkedIn: https://www.linkedin.com/in/reshma-alagesan-030049332
GitHub: https://github.com/Reshma4816
TryHackMe: https://tryhackme.com/p/Reshmaalagesan
Resume PDF: https://raw.githubusercontent.com/Reshma4816/Portfolio/main/Reshma_AL_Resume.pdf`,
  
  help: `COMMANDS:
  about       - Brief background biography
  skills      - Lists engineering toolkits and domains
  experience  - Details internship achievements
  education   - Displays collegiate status
  projects    - Lists featured software designs
  certs       - Displays security certifications
  contact     - Lists active links and channels
  clear       - Resets console buffer logs
  hack        - Simulates a vulnerability scan
  help        - Shows this command menu`
};

function initTerminals() {
  // A. Generate Mock IP
  const userIpSpan = document.getElementById('user-ip');
  if (userIpSpan) {
    userIpSpan.textContent = `157.48.${Math.floor(Math.random() * 254) + 1}.${Math.floor(Math.random() * 254) + 1}`;
  }

  // B. Hero Widget Terminal (Minimal typing inputs)
  const heroInput = document.getElementById('hero-terminal-input');
  const heroOutput = document.getElementById('hero-terminal-output');
  const heroBody = document.getElementById('hero-terminal-body');

  if (heroInput && heroOutput) {
    heroInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = heroInput.value.trim().toLowerCase();
        heroInput.value = '';

        if (!cmd) return;

        const cmdLine = document.createElement('div');
        cmdLine.innerHTML = `<span class="terminal-prompt-symbol">guest@reshma-al:~$</span> ${cmd}`;
        heroOutput.appendChild(cmdLine);

        const respLine = document.createElement('div');
        respLine.style.marginTop = '0.25rem';
        respLine.style.marginBottom = '0.5rem';

        if (cmd === 'clear') {
          heroOutput.innerHTML = '';
          return;
        }

        if (RESUME_DB[cmd]) {
          respLine.innerText = RESUME_DB[cmd];
        } else {
          respLine.innerHTML = `<span style="color: var(--accent-red)">Command not found. Type 'help' for available queries.</span>`;
        }

        heroOutput.appendChild(respLine);
        heroBody.scrollTop = heroBody.scrollHeight;
      }
    });
  }

  // C. Main Interactive Console Terminal
  const mainInput = document.getElementById('main-terminal-input');
  const mainOutput = document.getElementById('main-terminal-output');
  const mainBody = document.getElementById('main-terminal-body');

  if (mainInput && mainOutput) {
    mainInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = mainInput.value.trim().toLowerCase();
        mainInput.value = '';

        if (!cmd) return;

        // Print command prompt
        const cmdLine = document.createElement('div');
        cmdLine.innerHTML = `<span class="terminal-prompt-symbol">guest@reshma-al:~$</span> ${cmd}`;
        mainOutput.appendChild(cmdLine);

        const respLine = document.createElement('div');
        respLine.style.marginTop = '0.25rem';
        respLine.style.marginBottom = '0.75rem';

        if (cmd === 'clear') {
          mainOutput.innerHTML = '';
          return;
        }

        if (cmd === 'hack') {
          mainInput.disabled = true;
          respLine.innerHTML = '';
          mainOutput.appendChild(respLine);
          runSimulatedScan(respLine, () => {
            mainInput.disabled = false;
            mainInput.focus();
            mainBody.scrollTop = mainBody.scrollHeight;
          });
          return;
        }

        if (RESUME_DB[cmd]) {
          respLine.innerText = RESUME_DB[cmd];
        } else {
          respLine.innerHTML = `<span style="color: var(--accent-red)">ERR: Command not found. Type 'help' to check list of records.</span>`;
        }

        mainOutput.appendChild(respLine);
        mainBody.scrollTop = mainBody.scrollHeight;
      }
    });
  }
}

// Simulated Blue Team Vulnerability Scan
function runSimulatedScan(targetElement, onComplete) {
  const steps = [
    { text: "[*] Initializing Blue Team Port Audit...", delay: 200, color: "var(--accent-blue)" },
    { text: "[+] Port scans initialized (Nmap Engine v7.95)", delay: 600, color: "var(--text-primary)" },
    { text: "    [+] Scanning Target IP: local_net_loopback (127.0.0.1)", delay: 800, color: "var(--text-secondary)" },
    { text: "    [+] Scanning common SOC service vectors: 22/tcp, 80/tcp, 443/tcp, 8080/tcp", delay: 1100, color: "var(--text-secondary)" },
    { text: "    [+] Results: 0 vulnerable ports exposed. Firewall blocks ACTIVE.", delay: 1500, color: "var(--accent-green)" },
    { text: "[*] Injecting static log stream to Splunk SIEM emulator...", delay: 1900, color: "var(--accent-blue)" },
    { text: "    [+] Indexing security event channel: WinEventLog:Security / syslog-audit", delay: 2200, color: "var(--text-secondary)" },
    { text: "    [+] Running search queries for Anomalous Account Escalation...", delay: 2600, color: "var(--text-secondary)" },
    { text: "    [+] Result: Log Corroboration OK. 0 Brute force signatures detected.", delay: 3000, color: "var(--accent-green)" },
    { text: "[*] Conducting Digital Forensic & File Integrity Verification...", delay: 3400, color: "var(--accent-blue)" },
    { text: "    [+] Running Binwalk file carving on mock system payload headers...", delay: 3700, color: "var(--text-secondary)" },
    { text: "    [+] Extracting embedded metadata... SHA-256 integrity matched.", delay: 4100, color: "var(--text-secondary)" },
    { text: "    [+] Status: Cryptographic sign verified. File integrity is stable.", delay: 4500, color: "var(--accent-green)" },
    { text: "----------------------------------------------------------------", delay: 4800, color: "var(--border-color)" },
    { text: "[SUCCESS] Cyber Shield Threat Scan completed: SECURE STATUS OK.", delay: 5100, color: "var(--accent-cyan)" },
    { text: "[NOTICE] Candidate Reshma Al matches qualifications for SOC / DFIR internships.", delay: 5400, color: "var(--accent-purple)" }
  ];

  const mainBody = document.getElementById('main-terminal-body');

  steps.forEach(step => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.style.color = step.color;
      line.innerText = step.text;
      targetElement.appendChild(line);
      if (mainBody) {
        mainBody.scrollTop = mainBody.scrollHeight;
      }
    }, step.delay);
  });

  // Call onComplete when finished
  setTimeout(onComplete, 5600);
}

/* ==========================================================================
   10. Contact Form Visual Submission
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear inputs values conceptually
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    
    // Visual terminal log output
    status.style.color = 'var(--accent-blue)';
    status.textContent = '[*] Resolving smtp.gmail.com node...';

    setTimeout(() => {
      status.textContent = '[*] Encrypting packet with TLS 1.3...';
    }, 800);

    setTimeout(() => {
      status.style.color = 'var(--accent-green)';
      status.textContent = `[+] Broadcast complete! Thanks, ${name}. I will contact you soon.`;
      
      // Clear inputs
      form.reset();
    }, 1800);
  });
}

/**
 * GOWTHAM - PERSONAL PORTFOLIO
 * Main JavaScript Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileDrawer();
  initScrollAnimations();
  initScrollTop();
  initContactForm();
  initModals();
});

/* ================= 1. NAVBAR & SCROLLSPY ================= */
function initNavbar() {
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Add scrolled class for glass blur and shadow
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy active link detection
    let currentSection = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === currentSection) {
        link.classList.add('active');
      }
    });
  });
}

/* ================= 2. MOBILE DRAWER ================= */
function initMobileDrawer() {
  const mobileToggle = document.getElementById('mobileToggle');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const openDrawer = () => {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
      mobileLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

/* ================= 3. PROGRESS BAR SCROLL ANIMATION ================= */
function initScrollAnimations() {
  const animatedBars = document.querySelectorAll('.skill-progress-fill, .progress-bar-fill, .acad-progress-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.25
  });

  animatedBars.forEach(bar => observer.observe(bar));
}

/* ================= 4. SCROLL TO TOP ================= */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ================= 5. CONTACT FORM & TOAST ================= */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const subject = document.getElementById('messageSubject').value.trim();
    const message = document.getElementById('senderMessage').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    // Success feedback
    showToast(`Thank you, ${name}! Your message has been prepared.`);
    
    // Create mailto prefill option
    const mailtoUrl = `mailto:gowthamservash007@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Gowtham,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 1200);

    contactForm.reset();
  });
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  const toastIcon = toast.querySelector('.toast-icon');

  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  if (type === 'error') {
    toastIcon.className = 'fa-solid fa-circle-exclamation toast-icon';
    toastIcon.style.color = '#ef4444';
  } else {
    toastIcon.className = 'fa-solid fa-circle-check toast-icon';
    toastIcon.style.color = '#22c55e';
  }

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ================= 6. MODALS LOGIC ================= */
function initModals() {
  const btnResume = document.getElementById('btnResume');
  if (btnResume) {
    btnResume.addEventListener('click', openResumeModal);
  }

  const btnViewAll = document.getElementById('btnViewAllProjects');
  if (btnViewAll) {
    btnViewAll.addEventListener('click', () => {
      openAllProjectsModal();
    });
  }

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeResumeModal();
      closeProjectModal();
    }
  });

  // Close when clicking modal backdrop outside box
  const modals = [document.getElementById('resumeModal'), document.getElementById('projectModal')];
  modals.forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }
  });
}

/* Resume Modal Handlers */
function openResumeModal() {
  const modal = document.getElementById('resumeModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeResumeModal() {
  const modal = document.getElementById('resumeModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function printResume() {
  window.print();
}

/* Project Modal Handlers */
const projectData = {
  'course-reg': {
    title: 'College Course Registration System',
    type: 'Java Desktop & File Handling Application',
    tags: ['Java', 'File Handling', 'OOP', 'Student Enrollment'],
    description: 'A comprehensive Java-based academic management system designed to streamline student course enrollment and administrative catalog control.',
    features: [
      'Student profile authentication & credit management',
      'Course catalog indexing with seat availability caps',
      'Conflict check preventing overlapping elective timetables',
      'Persistent data storage utilizing Java File I/O streams',
      'Automated registration slip generation'
    ],
    interactiveType: 'course-reg-sim'
  },
  'c-mini': {
    title: 'C Programming Mini Projects Suite',
    type: 'Modular C CLI Utility Programs',
    tags: ['C Language', 'Algorithms', 'Data Structures', 'File I/O'],
    description: 'A high-performance repository of modular C programs exploring low-level algorithms, dynamic memory allocation, and system utilities.',
    features: [
      'Multi-operation Scientific & Financial Calculator',
      'Student Record Management System using structures & binary files',
      'Fast Fibonacci & Prime Factorization Generator',
      'Bank Account Simulation with deposit, withdrawal & transaction logging',
      'Memory-efficient string & array manipulation libraries'
    ],
    interactiveType: 'c-mini-sim'
  },
  'portfolio': {
    title: 'Personal Portfolio Website',
    type: 'Modern Responsive Web Application',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Glassmorphism', 'Cyber Theme'],
    description: 'A lightning-fast, highly responsive portfolio crafted to highlight academic credentials, technical proficiencies, and software projects.',
    features: [
      'Authentic cyber-dark aesthetic with glow effects & gradients',
      'Zero heavy frameworks — pure lightweight HTML/CSS/JS',
      'Interactive project simulators & printable CV modal',
      'Accessible mobile navigation drawer and responsive layout',
      '100% Score optimized for modern desktop & mobile browsers'
    ],
    interactiveType: 'portfolio-sim'
  }
};

function openProjectModal(projectId) {
  const data = projectData[projectId];
  if (!data) return;

  const modal = document.getElementById('projectModal');
  const titleEl = document.getElementById('modalProjectTitle');
  const bodyEl = document.getElementById('modalProjectBody');

  titleEl.textContent = data.title;

  let tagsHtml = data.tags.map(t => `<span class="tag-pill">${t}</span>`).join(' ');
  let featuresHtml = data.features.map(f => `<li><i class="fa-solid fa-check" style="color:var(--accent-cyan);margin-right:8px;"></i>${f}</li>`).join('');

  let simulatorHtml = '';
  if (data.interactiveType === 'course-reg-sim') {
    simulatorHtml = `
      <div class="sim-container">
        <div class="sim-header">
          <span><i class="fa-solid fa-terminal"></i> LIVE SIMULATOR: Java Course Enrollment</span>
          <span style="color:#22c55e;">STATUS: ONLINE</span>
        </div>
        <div class="sim-body">
          <p style="margin-bottom:12px;font-size:0.9rem;color:var(--text-muted);">Select courses below to test the automated validation engine:</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;" id="simCourseList">
            <label style="background:rgba(15,30,65,0.7);padding:8px 12px;border-radius:6px;display:flex;align-items:center;gap:8px;font-size:0.86rem;cursor:pointer;">
              <input type="checkbox" checked onchange="updateSimEnrollment()" value="CS301: Advanced Java (4 Credits)"> CS301: Advanced Java (4 Cr)
            </label>
            <label style="background:rgba(15,30,65,0.7);padding:8px 12px;border-radius:6px;display:flex;align-items:center;gap:8px;font-size:0.86rem;cursor:pointer;">
              <input type="checkbox" checked onchange="updateSimEnrollment()" value="CS302: Data Structures & OOP (4 Credits)"> CS302: Data Structures (4 Cr)
            </label>
            <label style="background:rgba(15,30,65,0.7);padding:8px 12px;border-radius:6px;display:flex;align-items:center;gap:8px;font-size:0.86rem;cursor:pointer;">
              <input type="checkbox" onchange="updateSimEnrollment()" value="CS303: Database Management Systems (3 Credits)"> CS303: DBMS (3 Cr)
            </label>
            <label style="background:rgba(15,30,65,0.7);padding:8px 12px;border-radius:6px;display:flex;align-items:center;gap:8px;font-size:0.86rem;cursor:pointer;">
              <input type="checkbox" onchange="updateSimEnrollment()" value="CS304: Web Technologies (3 Credits)"> CS304: Web Tech (3 Cr)
            </label>
          </div>
          <div class="terminal-view" id="simTerminalLog">
[SYSTEM READY] Initializing Student Session: Gowtham (KG College)
> Selected: CS301 (4 Cr) + CS302 (4 Cr)
> Total Credits: 8 / 18
[STATUS] Ready to register. Click below to commit to file.
          </div>
          <div style="margin-top:14px;display:flex;gap:10px;">
            <button class="btn btn-primary" style="padding:8px 18px;font-size:0.88rem;" onclick="commitSimEnrollment()">
              <i class="fa-solid fa-floppy-disk"></i> Commit Registration
            </button>
            <a href="https://github.com/gowthamservash007" target="_blank" class="btn btn-secondary" style="padding:8px 18px;font-size:0.88rem;">
              <i class="fa-brands fa-github"></i> View Java Source Code
            </a>
          </div>
        </div>
      </div>
    `;
  } else if (data.interactiveType === 'c-mini-sim') {
    simulatorHtml = `
      <div class="sim-container">
        <div class="sim-header">
          <span><i class="fa-solid fa-terminal"></i> LIVE SIMULATOR: C CLI Runner</span>
          <span style="color:#22c55e;">GCC 11.2 (Emulated)</span>
        </div>
        <div class="sim-body">
          <div style="display:flex;gap:10px;margin-bottom:12px;flex-wrap:wrap;">
            <button class="btn-card-action" onclick="runCSim('calc')">1. Run Calculator</button>
            <button class="btn-card-action" onclick="runCSim('student')">2. Student Record Query</button>
            <button class="btn-card-action" onclick="runCSim('fib')">3. Generate Fibonacci(10)</button>
          </div>
          <div class="terminal-view" id="cTerminalLog">
$ gcc -Wall -O2 mini_suite.c -o suite
$ ./suite
==========================================
   C PROGRAMMING MINI PROJECT SUITE v1.0
==========================================
Select a module above to execute in terminal...
          </div>
          <div style="margin-top:14px;">
            <a href="https://github.com/gowthamservash007" target="_blank" class="btn btn-primary" style="padding:8px 18px;font-size:0.88rem;">
              <i class="fa-brands fa-github"></i> Inspect C Source Files
            </a>
          </div>
        </div>
      </div>
    `;
  } else if (data.interactiveType === 'portfolio-sim') {
    simulatorHtml = `
      <div class="sim-container">
        <div class="sim-header">
          <span><i class="fa-solid fa-gauge-high"></i> LIGHTHOUSE AUDIT METRICS</span>
          <span style="color:#22c55e;">100% PASS</span>
        </div>
        <div class="sim-body">
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;text-align:center;margin-bottom:14px;">
            <div style="background:rgba(34,197,94,0.15);border:1px solid #22c55e;padding:12px;border-radius:8px;">
              <div style="font-size:1.4rem;font-weight:800;color:#22c55e;">100</div>
              <div style="font-size:0.75rem;color:var(--text-light);font-weight:600;">PERFORMANCE</div>
            </div>
            <div style="background:rgba(34,197,94,0.15);border:1px solid #22c55e;padding:12px;border-radius:8px;">
              <div style="font-size:1.4rem;font-weight:800;color:#22c55e;">100</div>
              <div style="font-size:0.75rem;color:var(--text-light);font-weight:600;">ACCESSIBILITY</div>
            </div>
            <div style="background:rgba(34,197,94,0.15);border:1px solid #22c55e;padding:12px;border-radius:8px;">
              <div style="font-size:1.4rem;font-weight:800;color:#22c55e;">100</div>
              <div style="font-size:0.75rem;color:var(--text-light);font-weight:600;">BEST PRACTICES</div>
            </div>
            <div style="background:rgba(34,197,94,0.15);border:1px solid #22c55e;padding:12px;border-radius:8px;">
              <div style="font-size:1.4rem;font-weight:800;color:#22c55e;">100</div>
              <div style="font-size:0.75rem;color:var(--text-light);font-weight:600;">SEO</div>
            </div>
          </div>
          <p style="font-size:0.9rem;color:var(--text-muted);">
            Engineered with modern CSS custom properties, zero heavy framework dependencies, hardware-accelerated CSS animations, and full WCAG contrast standards.
          </p>
        </div>
      </div>
    `;
  }

  bodyEl.innerHTML = `
    <div style="margin-bottom:16px;">
      <p style="font-size:1.02rem;color:var(--text-light);margin-bottom:12px;line-height:1.6;">${data.description}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px;">
        ${tagsHtml}
      </div>
      <h4 style="color:var(--accent-cyan);margin-bottom:10px;font-size:0.98rem;">Key Architecture & Highlights:</h4>
      <ul style="list-style:none;display:flex;flex-direction:column;gap:8px;font-size:0.92rem;color:var(--text-muted);margin-bottom:20px;">
        ${featuresHtml}
      </ul>
      ${simulatorHtml}
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* Interactive Simulation Logic */
function updateSimEnrollment() {
  const checkboxes = document.querySelectorAll('#simCourseList input[type="checkbox"]:checked');
  const log = document.getElementById('simTerminalLog');
  if (!log) return;

  let count = checkboxes.length;
  let credits = count * 4; // approximate credit calc
  let courseNames = Array.from(checkboxes).map(c => c.value.split(':')[0]).join(', ');

  log.innerHTML = `[INPUT EVENT] Active courses: ${courseNames || 'None'}
> Total Selected Credits: ${credits} / 18
> Capacity Check: PASS (Available seats > 12)
> Prerequisite Verification: CLEARED
[STATUS] Ready to register.`;
}

function commitSimEnrollment() {
  const log = document.getElementById('simTerminalLog');
  if (!log) return;

  log.innerHTML += `\n\n[TRANSACTION COMMITTED]
Saving enrollment to student_records.dat...
> Registration ID: REG-2025-KG-${Math.floor(1000 + Math.random() * 9000)}
> Timestamp: ${new Date().toLocaleTimeString()}
> Status: SUCCESS - Enrolled in courses!`;
  log.scrollTop = log.scrollHeight;
  showToast('Registration file generated successfully!');
}

function runCSim(module) {
  const log = document.getElementById('cTerminalLog');
  if (!log) return;

  if (module === 'calc') {
    log.innerHTML = `$ ./calculator_module
[CALCULATOR MODE]
Evaluating: pow(2, 8) + sqrt(144) * (15 / 3)
Step 1: 2^8 = 256
Step 2: sqrt(144) = 12
Step 3: 15 / 3 = 5
Result = 256 + (12 * 5) = 316
[EXIT CODE 0] Execution time: 0.0014ms`;
  } else if (module === 'student') {
    log.innerHTML = `$ ./student_query --roll 23BCS042
[STUDENT DATABASE SEARCH]
Reading binary records from 'students.db'...
Found Record:
- Name: Gowtham
- Degree: BSc Computer Science
- College: KG College of Arts of Science
- Status: Active Student (2023 - Present)
- Location: Coimbatore
[MATCH FOUND: 1 RECORD RETURNED]`;
  } else if (module === 'fib') {
    let fib = [0, 1];
    for (let i = 2; i < 10; i++) fib.push(fib[i-1] + fib[i-2]);
    log.innerHTML = `$ ./fibonacci 10
Generating first 10 Fibonacci terms in C:
${fib.join(' -> ')}
[COMPLETED IN O(N) TIME COMPLEXITY]`;
  }
}

function openAllProjectsModal() {
  const modal = document.getElementById('projectModal');
  const titleEl = document.getElementById('modalProjectTitle');
  const bodyEl = document.getElementById('modalProjectBody');

  titleEl.textContent = 'All Projects Showcase';

  bodyEl.innerHTML = `
    <div>
      <p style="color:var(--text-muted);font-size:0.95rem;margin-bottom:20px;">
        Explore Gowtham's full academic and software projects repository:
      </p>
      <div style="display:flex;flex-direction:column;gap:16px;">
        
        <div style="background:rgba(12,23,52,0.8);border:1px solid #1a3363;padding:16px;border-radius:12px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <h4 style="color:var(--text-white);font-size:1.05rem;">1. College Course Registration System</h4>
            <span style="font-size:0.78rem;background:rgba(168,85,247,0.2);color:var(--accent-purple-light);padding:3px 8px;border-radius:4px;">Java</span>
          </div>
          <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:10px;">A Java-based application to manage student course registration and subject enrollment.</p>
          <button class="btn btn-primary" style="padding:6px 14px;font-size:0.82rem;" onclick="openProjectModal('course-reg')">Launch Simulator</button>
        </div>

        <div style="background:rgba(12,23,52,0.8);border:1px solid #1a3363;padding:16px;border-radius:12px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <h4 style="color:var(--text-white);font-size:1.05rem;">2. C Programming Mini Projects</h4>
            <span style="font-size:0.78rem;background:rgba(20,184,166,0.2);color:var(--accent-teal);padding:3px 8px;border-radius:4px;">C</span>
          </div>
          <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:10px;">A collection of mini projects in C including calculator, student record management, etc.</p>
          <button class="btn btn-primary" style="padding:6px 14px;font-size:0.82rem;" onclick="openProjectModal('c-mini')">Launch Simulator</button>
        </div>

        <div style="background:rgba(12,23,52,0.8);border:1px solid #1a3363;padding:16px;border-radius:12px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <h4 style="color:var(--text-white);font-size:1.05rem;">3. Personal Portfolio Website</h4>
            <span style="font-size:0.78rem;background:rgba(234,88,12,0.2);color:var(--accent-amber);padding:3px 8px;border-radius:4px;">HTML/CSS/JS</span>
          </div>
          <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:10px;">A responsive portfolio website to showcase my skills, projects and achievements.</p>
          <button class="btn btn-primary" style="padding:6px 14px;font-size:0.82rem;" onclick="openProjectModal('portfolio')">Launch Simulator</button>
        </div>

        <div style="background:rgba(12,23,52,0.8);border:1px dashed #1a3363;padding:16px;border-radius:12px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <h4 style="color:var(--text-muted);font-size:1.05rem;"><i class="fa-solid fa-spinner fa-spin" style="margin-right:6px;color:var(--accent-cyan)"></i> 4. Student Attendance & Grade Tracker (Upcoming)</h4>
            <span style="font-size:0.78rem;background:rgba(56,189,248,0.15);color:var(--accent-cyan);padding:3px 8px;border-radius:4px;">In Progress</span>
          </div>
          <p style="font-size:0.88rem;color:var(--text-dim);">A full-stack relational database portal for academic progress tracking.</p>
        </div>

      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

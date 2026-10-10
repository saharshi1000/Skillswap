
import { useMemo, useState } from "react";
import "./App.css";

const initialSkills = [
  {
    id: 1,
    title: "Python Programming",
    category: "Programming",
    level: "Beginner",
    description: "Learn Python fundamentals, loops, functions and mini projects.",
    teacher: "Ananya Reddy",
    initials: "AR",
    teaches: "Python",
    wants: "Web Development",
    availability: "Evenings",
    mode: "Online",
    icon: "🐍",
  },
  {
    id: 2,
    title: "UI/UX Design",
    category: "Design",
    level: "Intermediate",
    description: "Explore user research, wireframes and beautiful interfaces.",
    teacher: "Rahul Sharma",
    initials: "RS",
    teaches: "UI/UX Design",
    wants: "Python",
    availability: "Weekends",
    mode: "Online",
    icon: "🎨",
  },
  {
    id: 3,
    title: "Web Development",
    category: "Programming",
    level: "Intermediate",
    description: "Build responsive websites using HTML, CSS and React.",
    teacher: "Priya Kumar",
    initials: "PK",
    teaches: "Web Development",
    wants: "Public Speaking",
    availability: "Evenings",
    mode: "Online",
    icon: "💻",
  },
  {
    id: 4,
    title: "Digital Illustration",
    category: "Design",
    level: "Beginner",
    description: "Create digital artwork and learn illustration techniques.",
    teacher: "Meera Singh",
    initials: "MS",
    teaches: "Digital Illustration",
    wants: "Video Editing",
    availability: "Weekends",
    mode: "Online",
    icon: "🖌️",
  },
  {
    id: 5,
    title: "Public Speaking",
    category: "Communication",
    level: "Intermediate",
    description: "Build confidence in presentations and group discussions.",
    teacher: "Arjun Rao",
    initials: "AR",
    teaches: "Public Speaking",
    wants: "UI/UX Design",
    availability: "Evenings",
    mode: "In person",
    icon: "🎤",
  },
  {
    id: 6,
    title: "Video Editing",
    category: "Creative",
    level: "Beginner",
    description: "Learn editing, transitions, storytelling and short videos.",
    teacher: "Sneha Patel",
    initials: "SP",
    teaches: "Video Editing",
    wants: "Digital Illustration",
    availability: "Flexible",
    mode: "Online",
    icon: "🎬",
  },
  {
    id: 7,
    title: "Java Programming",
    category: "Programming",
    level: "Intermediate",
    description: "Practice object-oriented programming and Java projects.",
    teacher: "Karthik R",
    initials: "KR",
    teaches: "Java",
    wants: "Python",
    availability: "Weekends",
    mode: "Online",
    icon: "☕",
  },
  {
    id: 8,
    title: "Excel and Data Analysis",
    category: "Technology",
    level: "Beginner",
    description: "Learn spreadsheets, formulas, charts and data cleaning.",
    teacher: "Divya N",
    initials: "DN",
    teaches: "Excel",
    wants: "Web Development",
    availability: "Evenings",
    mode: "Online",
    icon: "📊",
  },
  {
    id: 9,
    title: "Photography",
    category: "Creative",
    level: "Beginner",
    description: "Understand composition, lighting and creative photography.",
    teacher: "Vikram S",
    initials: "VS",
    teaches: "Photography",
    wants: "Video Editing",
    availability: "Weekends",
    mode: "In person",
    icon: "📸",
  },
];

const categories = [
  { name: "All Skills", icon: "✨", description: "Explore everything" },
  { name: "Programming", icon: "💻", description: "Code and build" },
  { name: "Design", icon: "🎨", description: "Create and design" },
  { name: "Communication", icon: "🎤", description: "Express yourself" },
  { name: "Creative", icon: "🎬", description: "Make something new" },
  { name: "Technology", icon: "⚡", description: "Digital skills" },
];

const initialRequests = [
  {
    id: 101,
    name: "Ananya Reddy",
    initials: "AR",
    offering: "Python Programming",
    learning: "Web Development",
    status: "Pending",
    direction: "received",
  },
  {
    id: 102,
    name: "Rahul Sharma",
    initials: "RS",
    offering: "UI/UX Design",
    learning: "Python",
    status: "Pending",
    direction: "sent",
  },
];

const normalize = (value) => value.trim().toLowerCase();

function App() {
  const [page, setPage] = useState("Home");
  const [skills, setSkills] = useState(initialSkills);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Skills");
  const [matchMode, setMatchMode] = useState("both");
  const [wantedSkill, setWantedSkill] = useState("Python");
  const [offeredSkill, setOfferedSkill] = useState("Web Development");
  const [availability, setAvailability] = useState("Any time");
  const [matchResults, setMatchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [requests, setRequests] = useState(initialRequests);
  const [studentName, setStudentName] = useState("Saharshi");
  const [studentCollege, setStudentCollege] = useState("");
  const [studentBio, setStudentBio] = useState(
    "Student who loves learning new skills and sharing knowledge."
  );
  const [profileOpen, setProfileOpen] = useState(false);
  const [modal, setModal] = useState("");
  const [notice, setNotice] = useState(null);
  const [newSkill, setNewSkill] = useState({
    title: "",
    category: "Programming",
    level: "Beginner",
    description: "",
    teaches: "",
    wants: "",
    availability: "Evenings",
    mode: "Online",
  });
  const [profileDraft, setProfileDraft] = useState({
    name: "Saharshi",
    college: "",
    bio: "Student who loves learning new skills and sharing knowledge.",
  });

  const studentInitials =
    studentName
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "ST";

  const showNotice = (title, message) => {
    setNotice({ title, message });
    window.setTimeout(() => setNotice(null), 3500);
  };

  const goTo = (nextPage) => {
    setPage(nextPage);
    setProfileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredSkills = useMemo(() => {
    const query = normalize(search);

    return skills.filter((skill) => {
      const matchesCategory =
        activeCategory === "All Skills" ||
        skill.category === activeCategory;

      const searchable = [
        skill.title,
        skill.category,
        skill.level,
        skill.description,
        skill.teacher,
        skill.teaches,
        skill.wants,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchable.includes(query);
    });
  }, [skills, search, activeCategory]);

  const calculateMatch = (skill) => {
    const wanted = normalize(wantedSkill);
    const offered = normalize(offeredSkill);
    const teaches = normalize(skill.teaches);
    const wants = normalize(skill.wants);

    const canTeachWanted =
      wanted !== "" &&
      (teaches.includes(wanted) || wanted.includes(teaches));

    const canLearnOffered =
      offered !== "" &&
      (wants.includes(offered) || offered.includes(wants));

    const isMutual = canTeachWanted && canLearnOffered;
    const isMentor = canTeachWanted;

    let relevant = false;

    if (matchMode === "mutual") {
      relevant = isMutual;
    } else if (matchMode === "mentor") {
      relevant = isMentor;
    } else {
      relevant = isMutual || isMentor;
    }

    if (!relevant) return null;

    let score = 65;

    if (isMutual) score += 25;
    if (canTeachWanted) score += 5;
    if (
      availability !== "Any time" &&
      skill.availability === availability
    ) {
      score += 5;
    }

    return {
      ...skill,
      score: Math.min(score, 99),
      isMutual,
      canTeachWanted,
      canLearnOffered,
    };
  };

  const findMatches = (event) => {
    event.preventDefault();

    if (!wantedSkill.trim()) {
      showNotice("Add a learning goal", "Enter the skill you want to learn.");
      return;
    }

    const results = skills
      .filter((skill) => skill.teacher.toLowerCase() !== studentName.toLowerCase())
      .map(calculateMatch)
      .filter(Boolean)
      .sort((a, b) => b.score - a.score);

    setMatchResults(results);
    setHasSearched(true);

    if (results.length === 0) {
      showNotice(
        "No exact matches yet",
        "Try another skill or select a different matching mode."
      );
    }
  };

  const requestSwap = (skill) => {
    const duplicate = requests.some(
      (request) =>
        request.offering === skill.title &&
        request.status === "Pending" &&
        request.direction === "sent"
    );

    if (duplicate) {
      showNotice("Request already sent", "You already have a pending request for this skill.");
      return;
    }

    const request = {
      id: Date.now(),
      name: skill.teacher,
      initials: skill.initials,
      offering: skill.title,
      learning: wantedSkill || "Skill exchange",
      status: "Pending",
      direction: "sent",
    };

    setRequests((previous) => [request, ...previous]);

    showNotice(
      "Request created!",
      `Your skill-exchange request to ${skill.teacher} has been added to your demo dashboard.`
    );
  };

  const changeRequestStatus = (id, status) => {
    setRequests((previous) =>
      previous.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );

    showNotice(
      status === "Accepted" ? "Request accepted" : "Request declined",
      `The demo request is now marked ${status.toLowerCase()}.`
    );
  };

  const addSkill = (event) => {
    event.preventDefault();

    if (!newSkill.title.trim() || !newSkill.teaches.trim()) {
      showNotice("Missing information", "Enter a skill title and the skill you can teach.");
      return;
    }

    const addedSkill = {
      ...newSkill,
      id: Date.now(),
      title: newSkill.title.trim(),
      description:
        newSkill.description.trim() ||
        `Learn ${newSkill.title.trim()} through peer-to-peer learning.`,
      teacher: studentName,
      initials: studentInitials,
      icon: "✨",
    };

    setSkills((previous) => [addedSkill, ...previous]);
    setNewSkill({
      title: "",
      category: "Programming",
      level: "Beginner",
      description: "",
      teaches: "",
      wants: "",
      availability: "Evenings",
      mode: "Online",
    });
    setModal("");

    showNotice("Skill added!", "Your new skill is now visible in Browse Skills.");
  };

  const openProfile = () => {
    setProfileDraft({
      name: studentName,
      college: studentCollege,
      bio: studentBio,
    });
    setProfileOpen(false);
    setModal("profile");
  };

  const saveProfile = (event) => {
    event.preventDefault();

    if (!profileDraft.name.trim()) {
      showNotice("Name required", "Please enter your name.");
      return;
    }

    setStudentName(profileDraft.name.trim());
    setStudentCollege(profileDraft.college.trim());
    setStudentBio(profileDraft.bio.trim());
    setModal("");

    showNotice("Profile updated", "Your demo profile has been updated.");
  };

  function SkillCard({ skill }) {
    return (
      <article className="ss-skill-card">
        <div className="ss-skill-card-top">
          <div className="ss-skill-icon" aria-hidden="true">
            {skill.icon || "✨"}
          </div>
          <span className="ss-skill-badge">{skill.level}</span>
        </div>

        <h3>{skill.title}</h3>
        <p className="ss-skill-description">{skill.description}</p>

        <div className="ss-skill-tags">
          <span className="ss-tag">{skill.category}</span>
          <span className="ss-tag">{skill.mode}</span>
          <span className="ss-tag">{skill.availability}</span>
        </div>

        <div className="ss-skill-card-footer">
          <div className="ss-peer-info">
            <div className="ss-avatar">{skill.initials}</div>
            <div className="ss-peer-copy">
              <strong>{skill.teacher}</strong>
              <span>Peer mentor</span>
            </div>
          </div>

          <button
            className="ss-btn ss-btn-secondary ss-btn-small"
            onClick={() => requestSwap(skill)}
          >
            Connect
          </button>
        </div>
      </article>
    );
  }

  function HomePage() {
    return (
      <div className="ss-page">
        <section className="ss-hero">
          <div className="ss-hero-content">
            <div className="ss-eyebrow">
              ✦ Learn together. Grow together.
            </div>

            <h1>
              Your skills.
              <br />
              Their knowledge.
              <br />
              <span className="ss-gradient-text">One community.</span>
            </h1>

            <p className="ss-hero-description">
              Discover what your classmates know, share what you know,
              and learn new skills together. No payments. No points.
              Just students helping students.
            </p>

            <div className="ss-hero-buttons">
              <button
                className="ss-btn ss-btn-primary ss-btn-large"
                onClick={() => goTo("Browse Skills")}
              >
                Explore skills <span>→</span>
              </button>

              <button
                className="ss-btn ss-btn-outline ss-btn-large"
                onClick={() => goTo("AI Matcher")}
              >
                ✨ Find my match
              </button>
            </div>

            <p className="ss-hero-note">
              ♡ Built for students, powered by peer learning.
            </p>
          </div>

          <div className="ss-hero-visual">
            <div className="ss-hero-art">
              <div className="ss-orbit" />
              <div className="ss-orbit ss-orbit-two" />
              <div className="ss-orbit ss-orbit-three" />

              <div className="ss-hero-center-icon">⇄</div>

              <div className="ss-floating-card ss-floating-card-one">
                <strong>💻 Share your skills</strong>
                <span>Teach what you know</span>
              </div>

              <div className="ss-floating-card ss-floating-card-two">
                <strong>🎯 Discover your match</strong>
                <span>Learn from your peers</span>
              </div>
            </div>
          </div>
        </section>

        <section className="ss-stats-row">
          <div className="ss-stat-card">
            <span className="ss-stat-number">{skills.length}+</span>
            <span className="ss-stat-label">Skills to explore</span>
          </div>
          <div className="ss-stat-card">
            <span className="ss-stat-number">6+</span>
            <span className="ss-stat-label">Learning categories</span>
          </div>
          <div className="ss-stat-card">
            <span className="ss-stat-number">100%</span>
            <span className="ss-stat-label">Free skill exchange</span>
          </div>
          <div className="ss-stat-card">
            <span className="ss-stat-number">1:1</span>
            <span className="ss-stat-label">Peer-to-peer learning</span>
          </div>
        </section>

        <section className="ss-categories-section">
          <div className="ss-section-heading">
            <div className="ss-eyebrow">Explore your interests</div>
            <h2>
              What would you like to <span className="ss-gradient-text">learn?</span>
            </h2>
            <p>
              Choose an area that excites you. There is always a student
              willing to share their knowledge.
            </p>
          </div>

          <div className="ss-categories-grid">
            {categories.slice(1).map((category) => (
              <button
                key={category.name}
                className="ss-category-card"
                onClick={() => {
                  setActiveCategory(category.name);
                  setSearch("");
                  goTo("Browse Skills");
                }}
              >
                <span className="ss-category-icon">{category.icon}</span>
                <strong>{category.name}</strong>
                <span>{category.description}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="ss-featured-section">
          <div className="ss-section-heading">
            <div className="ss-eyebrow">Community favourites</div>
            <h2>
              Skills worth <span className="ss-gradient-text">sharing.</span>
            </h2>
            <p>Start with these skills shared by your fellow students.</p>
          </div>

          <div className="ss-skill-grid">
            {skills.slice(0, 3).map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>

          <div className="ss-text-center ss-mt-3">
            <button
              className="ss-btn ss-btn-outline"
              onClick={() => goTo("Browse Skills")}
            >
              View all skills →
            </button>
          </div>
        </section>

        <section className="ss-cta">
          <div className="ss-eyebrow">Your knowledge has value</div>
          <h2>
            You don't have to learn <span className="ss-gradient-text">alone.</span>
          </h2>
          <p>
            Join a student learning community where you can teach one skill,
            learn another, and grow with people who share your goals.
          </p>
          <button
            className="ss-btn ss-btn-primary ss-btn-large"
            onClick={() => setModal("addSkill")}
          >
            + Share your first skill
          </button>
        </section>
      </div>
    );
  }

  function BrowsePage() {
    return (
      <div className="ss-page">
        <header className="ss-page-header">
          <div className="ss-eyebrow">The student skill library</div>
          <h1>
            Discover your next <span className="ss-gradient-text">skill.</span>
          </h1>
          <p>
            Search for something you want to learn, find a student who can
            help, and start building your skills together.
          </p>
        </header>

        <div className="ss-browse-toolbar">
          <div className="ss-search-box">
            <span className="ss-search-icon">⌕</span>
            <input
              type="search"
              placeholder="Search skills, topics or students..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search skills"
            />
          </div>

          <button
            className="ss-btn ss-btn-secondary"
            onClick={() => setModal("addSkill")}
          >
            + Add a skill
          </button>
        </div>

        <div className="ss-filter-row">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`ss-filter-chip ${
                activeCategory === category.name ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category.name)}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>

        <p className="ss-results-count">
          Showing {filteredSkills.length}{" "}
          {filteredSkills.length === 1 ? "skill" : "skills"}
        </p>

        {filteredSkills.length > 0 ? (
          <div className="ss-skill-grid">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="ss-empty-state">
            <div style={{ fontSize: 35 }}>🔎</div>
            <h3>No skills found</h3>
            <p>Try a different keyword or category.</p>
            <button
              className="ss-btn ss-btn-secondary"
              onClick={() => {
                setSearch("");
                setActiveCategory("All Skills");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    );
  }

  function MatcherPage() {
    return (
      <div className="ss-page">
        <header className="ss-page-header">
          <div className="ss-eyebrow">Smart peer recommendations</div>
          <h1>
            Find your skill <span className="ss-gradient-text">match.</span>
          </h1>
          <p>
            Tell us what you want to learn and what you can share.
            Find a potential learning partner or a one-way mentor.
          </p>
        </header>

        <div className="ss-ai-layout">
          <form className="ss-ai-intro-card" onSubmit={findMatches}>
            <h2>Build your match profile</h2>
            <p>
              Choose your learning goal and matching style to find
              students with relevant skills.
            </p>

            <label>
              I want to learn
              <input
                value={wantedSkill}
                onChange={(event) => setWantedSkill(event.target.value)}
                placeholder="e.g. Python, Java, UI/UX"
                required
              />
            </label>

            <label>
              I can teach
              <input
                value={offeredSkill}
                onChange={(event) => setOfferedSkill(event.target.value)}
                placeholder="e.g. Web Development"
              />
            </label>

            <label>
              Preferred availability
              <select
                value={availability}
                onChange={(event) => setAvailability(event.target.value)}
              >
                <option>Any time</option>
                <option>Evenings</option>
                <option>Weekends</option>
                <option>Flexible</option>
              </select>
            </label>

            <label>
              Matching style
              <select
                value={matchMode}
                onChange={(event) => setMatchMode(event.target.value)}
              >
                <option value="both">All relevant matches</option>
                <option value="mutual">Mutual skill exchange</option>
                <option value="mentor">One-way mentor</option>
              </select>
            </label>

            <button className="ss-btn ss-btn-primary ss-btn-full" type="submit">
              ✨ Find my matches
            </button>

            <p className="ss-small-text ss-mt-2">
              No payments or skill coins. Learning is shared freely.
            </p>
          </form>

          <section className="ss-ai-results">
            <h2>Your recommendations</h2>
            <p>
              {hasSearched
                ? `${matchResults.length} matching ${
                    matchResults.length === 1 ? "student" : "students"
                  } found for your preferences.`
                : "Your recommended peers will appear here after you search."}
            </p>

            {!hasSearched && (
              <div className="ss-empty-state">
                <div style={{ fontSize: 38 }}>✦</div>
                <h3>Meet your next learning partner</h3>
                <p>
                  Enter your learning goal and select Find my matches
                  to see recommendations.
                </p>
              </div>
            )}

            {hasSearched && matchResults.length === 0 && (
              <div className="ss-empty-state">
                <div style={{ fontSize: 35 }}>🌱</div>
                <h3>No exact match yet</h3>
                <p>
                  Try a different learning goal or choose all relevant matches.
                  You can also browse the full skill library.
                </p>
                <button
                  className="ss-btn ss-btn-secondary"
                  onClick={() => goTo("Browse Skills")}
                >
                  Browse skills
                </button>
              </div>
            )}

            {matchResults.length > 0 && (
              <div className="ss-match-list">
                {matchResults.map((match) => (
                  <article className="ss-match-card" key={match.id}>
                    <div className="ss-match-card-top">
                      <div className="ss-match-person">
                        <div className="ss-avatar">{match.initials}</div>
                        <div>
                          <h3>{match.teacher}</h3>
                          <p>
                            {match.category} · {match.availability}
                          </p>
                        </div>
                      </div>

                      <div className="ss-match-score">
                        {match.score}% match
                      </div>
                    </div>

                    <div className="ss-match-skills">
                      <div className="ss-match-skill-box">
                        <span>Can teach</span>
                        <strong>{match.teaches}</strong>
                      </div>
                      <div className="ss-match-skill-box">
                        <span>Wants to learn</span>
                        <strong>{match.wants}</strong>
                      </div>
                    </div>

                    <p className="ss-match-reason">
                      {match.isMutual
                        ? "↔ Both of you have complementary skills. This could be a mutual exchange."
                        : "✦ This student can help with your learning goal. Explore a one-way mentoring session."}
                    </p>

                    <button
                      className="ss-btn ss-btn-secondary"
                      onClick={() => requestSwap(match)}
                    >
                      Send learning request
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    );
  }

  function DashboardPage() {
    const pendingCount = requests.filter(
      (request) => request.status === "Pending"
    ).length;

    const acceptedCount = requests.filter(
      (request) => request.status === "Accepted"
    ).length;

    return (
      <div className="ss-page">
        <header className="ss-dashboard-header">
          <div>
            <div className="ss-eyebrow">Your learning space</div>
            <h1>
              Welcome back, <span className="ss-gradient-text">{studentName}</span>!
            </h1>
            <p>Keep track of your learning connections and skill exchanges.</p>
          </div>

          <button className="ss-btn ss-btn-secondary" onClick={openProfile}>
            ✎ Edit profile
          </button>
        </header>

        <section className="ss-dashboard-stats">
          <div className="ss-dashboard-stat">
            <span>Skills in the library</span>
            <strong>{skills.length}</strong>
          </div>
          <div className="ss-dashboard-stat">
            <span>Pending requests</span>
            <strong>{pendingCount}</strong>
          </div>
          <div className="ss-dashboard-stat">
            <span>Accepted requests</span>
            <strong>{acceptedCount}</strong>
          </div>
          <div className="ss-dashboard-stat">
            <span>Your shared skills</span>
            <strong>
              {skills.filter((skill) => skill.teacher === studentName).length}
            </strong>
          </div>
        </section>

        <div className="ss-dashboard-grid">
          <section className="ss-dashboard-panel">
            <div className="ss-dashboard-panel-header">
              <h2>Skill exchange requests</h2>
              <span className="ss-skill-badge">{requests.length} total</span>
            </div>

            {requests.length === 0 ? (
              <div className="ss-dashboard-empty">
                No requests yet. Browse skills to connect with other students.
              </div>
            ) : (
              <div className="ss-request-list">
                {requests.map((request) => (
                  <article className="ss-request-item" key={request.id}>
                    <div className="ss-request-info">
                      <div className="ss-avatar">{request.initials}</div>
                      <div>
                        <strong>{request.name}</strong>
                        <p>
                          {request.direction === "received"
                            ? "Wants to connect with you"
                            : "Your outgoing request"}
                        </p>
                        <p>
                          {request.offering} ↔ {request.learning}
                        </p>
                        <div className="ss-mt-1">
                          <span
                            className={`ss-status ${
                              request.status === "Pending"
                                ? "ss-status-pending"
                                : request.status === "Accepted"
                                  ? "ss-status-accepted"
                                  : "ss-status-declined"
                            }`}
                          >
                            {request.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {request.status === "Pending" &&
                      request.direction === "received" && (
                        <div className="ss-request-actions">
                          <button
                            className="ss-btn ss-btn-success ss-btn-small"
                            onClick={() =>
                              changeRequestStatus(request.id, "Accepted")
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="ss-btn ss-btn-danger ss-btn-small"
                            onClick={() =>
                              changeRequestStatus(request.id, "Declined")
                            }
                          >
                            Decline
                          </button>
                        </div>
                      )}
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="ss-dashboard-panel">
            <div className="ss-dashboard-panel-header">
              <h2>Your learning journey</h2>
            </div>

            <div className="ss-activity-list">
              <div className="ss-activity-item">
                <div className="ss-activity-icon">🎯</div>
                <div>
                  <strong>Discover your next skill</strong>
                  <p>Use the matcher to find relevant learning partners.</p>
                  <button
                    className="ss-btn ss-btn-ghost ss-btn-small"
                    onClick={() => goTo("AI Matcher")}
                  >
                    Find matches →
                  </button>
                </div>
              </div>

              <div className="ss-activity-item">
                <div className="ss-activity-icon">📚</div>
                <div>
                  <strong>Share what you know</strong>
                  <p>Add a skill and help another student learn something new.</p>
                  <button
                    className="ss-btn ss-btn-ghost ss-btn-small"
                    onClick={() => setModal("addSkill")}
                  >
                    Add a skill →
                  </button>
                </div>
              </div>

              <div className="ss-activity-item">
                <div className="ss-activity-icon">👤</div>
                <div>
                  <strong>Complete your profile</strong>
                  <p>
                    {studentCollege || "Add your college and a short introduction."}
                  </p>
                  <button
                    className="ss-btn ss-btn-ghost ss-btn-small"
                    onClick={openProfile}
                  >
                    Edit profile →
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="ss-cta ss-mt-3">
          <h2>Learning is better together.</h2>
          <p>Find a skill, connect with a peer and take your next step.</p>
          <button
            className="ss-btn ss-btn-primary"
            onClick={() => goTo("Browse Skills")}
          >
            Explore skills →
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="ss-app">
      <nav className="ss-navbar">
        <button
          className="ss-logo"
          onClick={() => goTo("Home")}
          aria-label="SkillSwap home"
        >
          <span className="ss-logo-icon">⇄</span>
          <span>
            Skill<span className="ss-brand-highlight">Swap</span>
          </span>
        </button>

        <div className="ss-nav-links">
          {["Home", "Browse Skills", "AI Matcher", "Dashboard"].map((item) => (
            <button
              key={item}
              className={`ss-nav-link ${page === item ? "active" : ""}`}
              onClick={() => goTo(item)}
            >
              {item === "AI Matcher" ? "✦ AI Matcher" : item}
            </button>
          ))}
        </div>

        <div className="ss-nav-actions">
          <button
            className="ss-btn ss-btn-primary ss-btn-small"
            onClick={() => setModal("addSkill")}
          >
            + Share skill
          </button>

          <button
            className="ss-profile-button"
            onClick={() => setProfileOpen((open) => !open)}
            aria-label="Open profile menu"
            aria-expanded={profileOpen}
          >
            {studentInitials}
          </button>
        </div>

        {profileOpen && (
          <div className="ss-profile-menu">
            <button onClick={openProfile}>👤 Edit profile</button>
            <button onClick={() => goTo("Dashboard")}>📊 Dashboard</button>
            <button onClick={() => setModal("addSkill")}>＋ Add a skill</button>
          </div>
        )}
      </nav>

      <main className="ss-main">
        {page === "Home" && <HomePage />}
        {page === "Browse Skills" && <BrowsePage />}
        {page === "AI Matcher" && <MatcherPage />}
        {page === "Dashboard" && <DashboardPage />}
      </main>

      <footer className="ss-footer">
        <div className="ss-footer-inner">
          <div>
            <div className="ss-footer-brand">
              Skill<span className="ss-brand-highlight">Swap</span>
            </div>
            <p>Share a skill. Learn something new. Grow together.</p>
          </div>

          <div className="ss-footer-links">
            <button onClick={() => goTo("Home")}>Home</button>
            <button onClick={() => goTo("Browse Skills")}>Explore skills</button>
            <button onClick={() => goTo("AI Matcher")}>AI Matcher</button>
            <button onClick={() => goTo("Dashboard")}>Dashboard</button>
          </div>

          <p>© {new Date().getFullYear()} SkillSwap · Student learning community</p>
        </div>
      </footer>

      {modal === "addSkill" && (
        <div
          className="ss-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setModal("");
          }}
        >
          <form className="ss-modal" onSubmit={addSkill}>
            <button
              type="button"
              className="ss-modal-close"
              onClick={() => setModal("")}
              aria-label="Close dialog"
            >
              ×
            </button>

            <h2>Share a skill</h2>
            <p>
              Tell the community what you can teach and what you want to learn.
            </p>

            <label>
              Skill title
              <input
                required
                value={newSkill.title}
                onChange={(event) =>
                  setNewSkill({ ...newSkill, title: event.target.value })
                }
                placeholder="e.g. Python Programming"
              />
            </label>

            <label>
              Category
              <select
                value={newSkill.category}
                onChange={(event) =>
                  setNewSkill({ ...newSkill, category: event.target.value })
                }
              >
                {categories.slice(1).map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Skill level
              <select
                value={newSkill.level}
                onChange={(event) =>
                  setNewSkill({ ...newSkill, level: event.target.value })
                }
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </label>

            <label>
              What can you teach?
              <input
                required
                value={newSkill.teaches}
                onChange={(event) =>
                  setNewSkill({ ...newSkill, teaches: event.target.value })
                }
                placeholder="e.g. Python"
              />
            </label>

            <label>
              What would you like to learn?
              <input
                value={newSkill.wants}
                onChange={(event) =>
                  setNewSkill({ ...newSkill, wants: event.target.value })
                }
                placeholder="e.g. UI/UX Design"
              />
            </label>

            <label>
              Description
              <textarea
                value={newSkill.description}
                onChange={(event) =>
                  setNewSkill({
                    ...newSkill,
                    description: event.target.value,
                  })
                }
                placeholder="Describe what other students can learn from you."
              />
            </label>

            <label>
              Availability
              <select
                value={newSkill.availability}
                onChange={(event) =>
                  setNewSkill({
                    ...newSkill,
                    availability: event.target.value,
                  })
                }
              >
                <option>Evenings</option>
                <option>Weekends</option>
                <option>Flexible</option>
              </select>
            </label>

            <label>
              Learning mode
              <select
                value={newSkill.mode}
                onChange={(event) =>
                  setNewSkill({ ...newSkill, mode: event.target.value })
                }
              >
                <option>Online</option>
                <option>In person</option>
                <option>Both</option>
              </select>
            </label>

            <button
              type="submit"
              className="ss-btn ss-btn-primary ss-modal-submit"
            >
              Publish skill
            </button>
          </form>
        </div>
      )}

      {modal === "profile" && (
        <div
          className="ss-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setModal("");
          }}
        >
          <form className="ss-modal" onSubmit={saveProfile}>
            <button
              type="button"
              className="ss-modal-close"
              onClick={() => setModal("")}
              aria-label="Close dialog"
            >
              ×
            </button>

            <h2>Edit your profile</h2>
            <p>Introduce yourself to your student learning community.</p>

            <label>
              Your name
              <input
                required
                value={profileDraft.name}
                onChange={(event) =>
                  setProfileDraft({
                    ...profileDraft,
                    name: event.target.value,
                  })
                }
                placeholder="Enter your name"
              />
            </label>

            <label>
              College or university
              <input
                value={profileDraft.college}
                onChange={(event) =>
                  setProfileDraft({
                    ...profileDraft,
                    college: event.target.value,
                  })
                }
                placeholder="Enter your college"
              />
            </label>

            <label>
              About you
              <textarea
                value={profileDraft.bio}
                onChange={(event) =>
                  setProfileDraft({
                    ...profileDraft,
                    bio: event.target.value,
                  })
                }
                placeholder="What are you learning or interested in?"
              />
            </label>

            <div className="ss-modal-actions">
              <button
                type="button"
                className="ss-btn ss-btn-outline"
                onClick={() => setModal("")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ss-btn ss-btn-primary"
              >
                Save profile
              </button>
            </div>
          </form>
        </div>
      )}

      {notice && (
        <div className="ss-notice" role="status" aria-live="polite">
          <strong>{notice.title}</strong>
          <p>{notice.message}</p>
        </div>
      )}
    </div>
  );
}

export default App;

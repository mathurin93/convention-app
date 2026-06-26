import React, { useState, useEffect } from 'react';
import { 
  Heart, Coffee, Video, MonitorPlay, Mic, MessageCircle, 
  BookOpen, Users, Music, Info, ChevronRight, X, Calendar, MapPin,
  Utensils, MessageSquare, Send, CheckCircle, Sparkles, ScrollText
} from 'lucide-react';

// --- Color Scheme Constants ---
const colors = {
  primaryBlue: '#0f1a82',
  darkBlue: '#111b2e',
  midBlue: '#283a5c',
  gold: '#cb9d44',
  yellow: '#e7b42c',
  rust: '#c4442b',
  brown: '#a3612b',
  earth: '#7d5432',
  orange: '#cf6e2a',
  lightBg: '#f8fafc',
};

// --- Schedule Data (Extracted from PDF) ---
const scheduleData = {
  friday: [
    { time: "4:00 PM - 5:30 PM", title: "Prayer Service", speaker: "Various", role: "Led by assigned leaders", icon: "Heart", isInteractive: true, details: "Not live streamed using the main zoom or YouTube link; will create secondary semi-private link." },
    { time: "5:30 PM - 6:45 PM", title: "Dinner", speaker: "Lunchroom", role: "", icon: "Coffee" },
    { time: "6:35 PM - 6:50 PM", title: "Pre-Service Hosting", speaker: "Debbie Sargeant & Rennae Byfield", role: "Online Users", icon: "Video" },
    { time: "6:55 PM - 7:00 PM", title: "Official Convention Video", speaker: "", role: "Prerecorded", icon: "MonitorPlay" },
    { time: "7:00 PM - 7:15 PM", title: "Praise and Worship", speaker: "Men's Ministries", role: "", icon: "Music" },
    { time: "7:15 PM - 7:25 PM", title: "Opening Prayer & Scripture", speaker: "TBD", role: "", icon: "BookOpen", isInteractive: true, details: "Add bio and photo here..." },
    { time: "7:25 PM - 7:45 PM", title: "Welcome Address & Testimonies", speaker: "TBD", role: "", icon: "Mic", isInteractive: true, details: "Add bio and photo here..." },
    { time: "7:45 PM - 7:55 PM", title: "Offering", speaker: "Pastor Green", role: "", icon: "Heart", isInteractive: true, details: "Add bio and photo here..." },
    { time: "7:55 PM - 8:10 PM", title: "Praise, Worship & Intro to Speaker", speaker: "TBD", role: "", icon: "Music" },
    { time: "8:10 PM - 9:00 PM", title: "Main Sermon", speaker: "Minister Micheal Hall", role: "Topic: TBD", icon: "Mic", isInteractive: true, details: "Add bio and photo for Minister Micheal Hall here..." },
    { time: "9:00 PM - 9:20 PM", title: "Altar Call & Prayer", speaker: "Minister Michael Hall", role: "", icon: "Heart" },
    { time: "9:20 PM - 9:30 PM", title: "Vote of Thanks & Announcements", speaker: "TBD", role: "", icon: "Info" },
    { time: "9:30 PM - 9:45 PM", title: "Post-Service Hosting", speaker: "Debbie Sargeant & Rennae Byfield", role: "Online Viewers", icon: "MessageCircle", isInteractive: true, details: "For online viewers only in a private room. Main purpose: if anyone made the decision to accept Christ, they can email to connect." }
  ],
  saturday: [
    { time: "8:00 AM - 9:00 AM", title: "Continental Breakfast", speaker: "DoZ Room", role: "", icon: "Coffee" },
    { time: "8:30 AM - 9:50 AM", title: "Prayer Session", speaker: "Pastor Green (Organist)", role: "Live streamed separately", icon: "Heart", isInteractive: true, details: "Add bio and photo here..." },
    { time: "9:00 AM - 10:00 AM", title: "Registration for Kids Classes", speaker: "Foyer", role: "Wristbands distributed", icon: "Users" },
    { time: "9:55 AM - 10:00 AM", title: "Official Convention Video", speaker: "", role: "Prerecorded", icon: "MonitorPlay" },
    { time: "10:00 AM - 10:15 AM", title: "Welcome, Hymn & Prayer", speaker: "Morning Moderator", role: "Morning Service Starts", icon: "Mic", isInteractive: true, details: "Add bio and photo here..." },
    { time: "10:15 AM - 11:35 AM", title: "Sabbath School", speaker: "TBD", role: "", icon: "BookOpen" },
    { time: "11:35 AM - 11:50 AM", title: "Offering, Praise & Worship", speaker: "Pastor Green", role: "Includes Closing Hymn", icon: "Heart" },
    { time: "11:50 AM - 12:00 PM", title: "Closing Remarks", speaker: "TBD", role: "Children reunited with parents", icon: "Info" },
    { time: "12:00 PM - 12:10 PM", title: "Pre-Service Hosting", speaker: "Chris Duff & Lydea Cousins", role: "Online Break", icon: "Video", isInteractive: true, details: "Add bios and photos here..." },
    { time: "12:30 PM - 12:50 PM", title: "Worship Experience", speaker: "Sabbath Main Service", role: "", icon: "Music" },
    { time: "12:50 PM - 1:05 PM", title: "Welcome, Prayer & Scripture", speaker: "TBD", role: "", icon: "BookOpen", isInteractive: true, details: "Add bio and photo here..." },
    { time: "1:05 PM - 1:25 PM", title: "Offering & Worship", speaker: "Pastor Green", role: "", icon: "Heart" },
    { time: "1:25 PM - 1:40 PM", title: "College Reminder", speaker: "TBD", role: "", icon: "Info", isInteractive: true, details: "Add bio and photo here..." },
    { time: "1:40 PM - 1:50 PM", title: "Worship & Speaker Intro", speaker: "TBD", role: "", icon: "Music" },
    { time: "1:50 PM - 2:40 PM", title: "Main Sermon", speaker: "Pastor Christopher McEwan", role: "", icon: "Mic", isInteractive: true, details: "Add bio and photo for Pastor Christopher McEwan here..." },
    { time: "2:40 PM - 3:00 PM", title: "Hymn, Altar Call & Prayer", speaker: "TBD", role: "", icon: "Heart" },
    { time: "3:00 PM - 3:05 PM", title: "Announcements", speaker: "TBD", role: "", icon: "Info" },
    { time: "3:00 PM - 4:30 PM", title: "Official Lunch Break", speaker: "Lunchroom", role: "Waves for elderly/visitors/public", icon: "Coffee" },
    { time: "4:30 PM - 6:00 PM", title: "Children's Ministries", speaker: "Children's Leaders", role: "", icon: "Users", isInteractive: true, details: "Includes Praise & Worship, Welcome, Selection, Scripture Reading, Interviews, Obstacle Course/Treasure Hunt, Sermon, and Vote of Thanks." },
    { time: "6:30 PM", title: "Singspiration", speaker: "Ottawa Musicians & Singers", role: "Informal service", icon: "Music" }
  ],
  sunday: [
    { time: "8:00 AM - 9:30 AM", title: "Prayer Session", speaker: "Pastor Green (Organist)", role: "", icon: "Heart" },
    { time: "9:30 AM - 10:40 AM", title: "Breakfast", speaker: "", role: "", icon: "Coffee" },
    { time: "10:55 AM - 11:00 AM", title: "Official Convention Video", speaker: "", role: "Prerecorded", icon: "MonitorPlay" },
    { time: "11:00 AM - 12:20 PM", title: "Ministerial Workshop", speaker: "Pastor Green", role: "Closing remarks 12:15 PM", icon: "BookOpen", isInteractive: true, details: "Add bio and photo here..." },
    { time: "12:30 PM - 2:30 PM", title: "Women's Ministry", speaker: "Sis. C. Cousins (Moderator)", role: "Women at Work", icon: "Users", isInteractive: true, details: "Title: 'Women at Work in the Home, in the Workplace, and in the Community.' Includes 3 small groups formed with 3 facilitators to discuss family, work, and community." },
    { time: "2:35 PM - 3:00 PM", title: "Break", speaker: "Intermission", role: "", icon: "Coffee" },
    { time: "3:00 PM - 3:50 PM", title: "Conference Update", speaker: "Executive Team", role: "Members only (Zoom)", icon: "Video", isInteractive: true, details: "Add bios and photos here..." },
    { time: "4:00 PM - 7:00 PM", title: "Vendor Booth Expo", speaker: "Expo Room", role: "Brethren to support", icon: "Info" },
    { time: "4:00 PM - 4:10 PM", title: "Youth Worship", speaker: "Youth Worship Team", role: "Fast songs", icon: "Music" },
    { time: "4:10 PM - 4:19 PM", title: "Prayer, Scripture & Welcome", speaker: "TBD", role: "", icon: "BookOpen", isInteractive: true, details: "Add bio and photo here..." },
    { time: "4:19 PM - 5:00 PM", title: "Panel Discussion", speaker: "TBD", role: "", icon: "Users", isInteractive: true, details: "Add bios for panel members here..." },
    { time: "5:00 PM - 5:05 PM", title: "Presentation", speaker: "TBD", role: "", icon: "MonitorPlay", isInteractive: true, details: "Add bio and photo here..." },
    { time: "5:05 PM - 5:25 PM", title: "Altar Call & Prayer", speaker: "Worship Team", role: "", icon: "Heart" },
    { time: "5:25 PM - 5:30 PM", title: "Vote of Thanks", speaker: "TBD", role: "", icon: "Info" },
    { time: "5:35 PM - 6:35 PM", title: "Dinner", speaker: "", role: "Intermission", icon: "Coffee" },
    { time: "6:50 PM - 7:00 PM", title: "Pre-Service Hosting", speaker: "Shawn Wallace & Antonette Whitley-Scott", role: "Online Viewers", icon: "Video", isInteractive: true, details: "Add bios and photos here..." },
    { time: "7:00 PM - 7:15 PM", title: "Praise & Worship", speaker: "TBD", role: "Gospel Service", icon: "Music" },
    { time: "7:15 PM - 7:30 PM", title: "Welcome, Prayer & Scripture", speaker: "TBD", role: "", icon: "BookOpen", isInteractive: true, details: "Add bio and photo here..." },
    { time: "7:30 PM - 7:55 PM", title: "Love Offering & Worship", speaker: "Pastor Green", role: "", icon: "Heart", isInteractive: true, details: "Add bio and photo here..." },
    { time: "7:55 PM - 8:15 PM", title: "Worship Experience & Intro", speaker: "TBD", role: "", icon: "Music" },
    { time: "8:15 PM - 9:00 PM", title: "Sermon", speaker: "Pastor Chris McEwan", role: "", icon: "Mic", isInteractive: true, details: "Add bio and photo for Pastor Chris McEwan here..." },
    { time: "9:00 PM - 9:15 PM", title: "Altar Call & Closing Prayer", speaker: "Pastor Chris McEwan", role: "Includes Closing Hymn", icon: "Heart" },
    { time: "9:15 PM - 9:30 PM", title: "Vote of Thanks & Gift Presentation", speaker: "Pastor Green / Joanna Nichol / Pastor D Severin", role: "", icon: "Users", isInteractive: true, details: "Add bios and photos here..." },
    { time: "9:30 PM - 9:40 PM", title: "Announcements", speaker: "TBD", role: "Slide of major events", icon: "Info" },
    { time: "9:40 PM - 9:50 PM", title: "Post-Service Hosting", speaker: "Shawn Wallace & Antonette Whitley-Scott", role: "Official Close", icon: "MessageCircle", isInteractive: true, details: "For online viewers only in a private room. Main purpose: if anyone made the decision to accept Christ, they can text a number to connect." }
  ]
};

const IconRenderer = ({ name, color }) => {
  const icons = {
    Heart: <Heart color={color} size={20} />,
    Coffee: <Coffee color={color} size={20} />,
    Video: <Video color={color} size={20} />,
    MonitorPlay: <MonitorPlay color={color} size={20} />,
    Mic: <Mic color={color} size={20} />,
    MessageCircle: <MessageCircle color={color} size={20} />,
    BookOpen: <BookOpen color={color} size={20} />,
    Users: <Users color={color} size={20} />,
    Music: <Music color={color} size={20} />,
    Info: <Info color={color} size={20} />,
    Calendar: <Calendar color={color} size={20} />,
    MapPin: <MapPin color={color} size={20} />,
    Sparkles: <Sparkles color={color} size={20} />,
    ScrollText: <ScrollText color={color} size={20} />
  };
  return icons[name] || <Calendar color={color} size={20} />;
};

export default function App() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [activeTab, setActiveTab] = useState('message'); // Defaulting to message to showcase the new tab
  const [modalData, setModalData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [prayerSubmitted, setPrayerSubmitted] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleDaySelect = (day) => {
    // Prevent animating/scrolling if we are already on the selected tab
    if (day === activeTab && !showOverlay) return;
    
    setActiveTab(day);
    setShowOverlay(false);
    
    // Slight delay ensures the DOM has swapped before scrolling smoothly to the top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 10);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    setTimeout(() => setFeedbackSubmitted(false), 4000);
  };

  const handlePrayerSubmit = (e) => {
    e.preventDefault();
    setPrayerSubmitted(true);
    setTimeout(() => setPrayerSubmitted(false), 4000);
  };

  const navItems = [
    { id: 'message', label: 'Message', icon: <ScrollText size={22} /> },
    { id: 'friday', label: 'Friday', icon: <Calendar size={22} /> },
    { id: 'saturday', label: 'Saturday', icon: <Calendar size={22} /> },
    { id: 'sunday', label: 'Sunday', icon: <Calendar size={22} /> },
    { id: 'menu', label: 'Menu', icon: <Utensils size={22} /> },
    { id: 'feedback', label: 'Feedback', icon: <MessageSquare size={22} /> },
    { id: 'prayer', label: 'Prayer', icon: <Heart size={22} /> }
  ];

  return (
    <div className={`min-h-screen font-sans bg-[#f8fafc] text-[#111b2e] transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* --- OVERLAY SCREEN --- */}
      <div 
        className={`fixed inset-0 z-[60] flex flex-col items-center justify-center p-6 text-center transition-all duration-700 transform ${showOverlay ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none -translate-y-10'}`}
        style={{ background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.primaryBlue} 100%)` }}
      >
        <div className="max-w-md w-full text-white space-y-8 animate-fade-in-up">
          <div className="mb-2">
            <p className="uppercase tracking-[0.3em] text-xs font-bold text-[#cb9d44] mb-2">Convention 2026</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">A Weekend of Renewal</h1>
            <p className="text-lg opacity-80 font-light italic text-[#e7b42c]">July 3 - 5, 2026</p>
          </div>

          <div className="space-y-4 w-full mt-8">
            <p className="text-sm font-medium opacity-70 uppercase tracking-widest mb-4">Select Schedule</p>
            
            <button 
              onClick={() => handleDaySelect('message')}
              className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all active:scale-95 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#a3612b] flex items-center justify-center text-white">
                  <ScrollText size={20} />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">Welcome Message</h3>
                  <p className="text-xs text-white/60">Read the President's Letter</p>
                </div>
              </div>
              <ChevronRight className="text-[#cb9d44] group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => handleDaySelect('friday')}
              className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all active:scale-95 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#cb9d44] flex items-center justify-center text-[#111b2e]">
                  <span className="font-bold">1</span>
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">Friday</h3>
                  <p className="text-xs text-white/60">July 3 • Evening Service</p>
                </div>
              </div>
              <ChevronRight className="text-[#cb9d44] group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => handleDaySelect('saturday')}
              className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all active:scale-95 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#e7b42c] flex items-center justify-center text-[#111b2e]">
                  <span className="font-bold">2</span>
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">Saturday</h3>
                  <p className="text-xs text-white/60">July 4 • Full Day</p>
                </div>
              </div>
              <ChevronRight className="text-[#e7b42c] group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => handleDaySelect('sunday')}
              className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all active:scale-95 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#cf6e2a] flex items-center justify-center text-white">
                  <span className="font-bold">3</span>
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">Sunday</h3>
                  <p className="text-xs text-white/60">July 5 • Final Day</p>
                </div>
              </div>
              <ChevronRight className="text-[#cf6e2a] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className={`transition-opacity duration-700 delay-300 ${showOverlay ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 min-h-screen relative'}`}>
        
        {/* Header */}
        <header 
          className="pt-16 pb-8 px-6 text-center text-white shadow-lg relative rounded-b-[2.5rem]"
          style={{ background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.primaryBlue} 100%)` }}
        >
          <p className="uppercase tracking-[0.3em] text-[10px] mb-2 font-bold text-[#cb9d44]">Convention 2026</p>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3">Schedule of Events</h1>
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-white/80">
            <Calendar size={14} /> July 3 - 5, 2026
          </div>
        </header>

        {/* Schedule List & Pages */}
        {/* Adding key={activeTab} forces React to remount this container, re-triggering all entrance animations */}
        <main key={activeTab} className="max-w-2xl mx-auto px-4 py-8 pb-32 md:pb-8 space-y-4 animate-tab-switch">
          
          {/* WELCOME MESSAGE PAGE */}
          {activeTab === 'message' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-[#0f1a82]">Welcome Message</h2>
                <p className="text-[#a3612b] italic mt-2">From the President and Vice-President</p>
              </div>

              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#cb9d44] opacity-5 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#0f1a82] opacity-5 rounded-full -ml-16 -mb-16"></div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-[#0f1a82] mb-8 text-center leading-tight relative z-10" style={{ fontFamily: 'Georgia, serif' }}>
                  Building God's Kingdom Together
                </h3>

                <div className="space-y-5 text-[#111b2e] leading-relaxed relative z-10 text-[15px] md:text-base">
                  <p>Dear Brothers and Sisters,</p>
                  
                  <p>
                    As followers of Christ, we are called to a purpose greater than ourselves—the building of God's Kingdom. This sacred work is not limited to church buildings, programs, or events. It is accomplished every day through our faithfulness, our service, our witness, and our love for one another.
                  </p>
                  
                  <p>
                    God's Kingdom is built whenever we share the Gospel, encourage a struggling believer, serve those in need, or demonstrate Christ-like character in our homes, workplaces, and communities. Every act of kindness, every prayer offered in faith, and every sacrifice made for the cause of Christ contributes to the advancement of His Kingdom.
                  </p>
                  
                  <p>
                    Jesus taught that the Kingdom of God grows from small beginnings. Therefore, we should never underestimate the impact of our individual contributions. When each member faithfully uses the gifts and talents God has entrusted to them, the entire body becomes stronger and more effective in fulfilling God's mission.
                  </p>
                  
                  <p>
                    As we move forward together, let us remain united in purpose, committed to discipleship, and focused on reaching others with the hope found in Jesus Christ. Let us build not for our own recognition, but for the glory of God and the expansion of His Kingdom.
                  </p>
                  
                  <p>
                    May we continue to seek God's guidance, trust His promises, and work diligently until His will is done on earth as it is in heaven.
                  </p>

                  <div className="my-8 py-6 px-5 border-l-4 border-[#cb9d44] bg-[#cb9d44]/10 rounded-r-2xl italic text-[#7d5432] text-sm md:text-base">
                    "Therefore, my beloved brethren, be steadfast, immovable, always abounding in the work of the Lord, knowing that your labor is not in vain in the Lord." <br/>
                    <span className="block mt-2 font-bold not-italic text-[#a3612b]">— 1 Corinthians 15:58</span>
                  </div>

                  <p>May God bless each of you as we labor together in His service.</p>
                  
                  <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col gap-1">
                    <p className="font-bold text-[#0f1a82] italic" style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem' }}>Yours in Christ,</p>
                    <p className="text-gray-500 uppercase tracking-widest text-xs font-bold mt-2">The President & Vice-President</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCHEDULE LIST */}
          {['friday', 'saturday', 'sunday'].includes(activeTab) && scheduleData[activeTab].map((event, index) => (
            <div 
              key={index}
              onClick={() => event.isInteractive && setModalData(event)}
              className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-start gap-4 transition-all duration-300 ${
                event.isInteractive ? 'cursor-pointer hover:-translate-y-1 hover:shadow-md hover:border-[#cb9d44]' : ''
              }`}
              style={{ animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both` }}
            >
              {/* Icon Container */}
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${colors.gold}20`, color: colors.brown }}
              >
                <IconRenderer name={event.icon} color={colors.primaryBlue} />
              </div>
              
              {/* Event Content */}
              <div className="flex-1 pt-1">
                <span className="inline-block px-3 py-1 rounded-md text-[10px] font-bold tracking-wider mb-2" style={{ backgroundColor: `${colors.primaryBlue}10`, color: colors.primaryBlue }}>
                  {event.time}
                </span>
                <h3 className="text-lg font-bold text-[#111b2e] leading-tight mb-1">{event.title}</h3>
                
                {event.speaker && (
                  <p className="text-sm font-medium" style={{ color: colors.rust }}>{event.speaker}</p>
                )}
                {event.role && (
                  <p className="text-xs text-gray-500 mt-1 italic">{event.role}</p>
                )}
              </div>

              {/* Interactive Nudge */}
              {event.isInteractive && (
                <div className="flex-shrink-0 pt-4">
                  <ChevronRight size={20} className="text-gray-300 transition-transform group-hover:text-[#cb9d44]" />
                </div>
              )}
            </div>
          ))}

          {/* FANCIER MENU PAGE */}
          {activeTab === 'menu' && (
            <div className="space-y-8 animate-fade-in-up">
              
              <div className="text-center py-6 px-4 relative overflow-hidden rounded-3xl" style={{ backgroundColor: colors.darkBlue }}>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                <h2 className="text-4xl font-extrabold text-[#cb9d44] tracking-widest uppercase mb-2 relative z-10" style={{ fontFamily: 'Georgia, serif' }}>The Feast</h2>
                <p className="text-white/80 italic font-medium relative z-10 flex items-center justify-center gap-2">
                  <Sparkles size={16} className="text-[#e7b42c]" /> 
                  Fellowship Lunch • Saturday Afternoon 
                  <Sparkles size={16} className="text-[#e7b42c]" />
                </p>
              </div>
              
              {/* Salads Card */}
              <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#cb9d44]/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full" style={{ backgroundColor: colors.gold }}></div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold uppercase tracking-[0.2em] text-[#0f1a82] mb-1" style={{ fontFamily: 'Georgia, serif' }}>Garden Fresh</h3>
                  <div className="w-16 h-0.5 mx-auto bg-[#cb9d44] mb-2"></div>
                </div>

                <div className="space-y-8">
                  <div className="relative">
                    <div className="flex items-baseline w-full mb-1">
                      <h4 className="font-bold text-[#111b2e] text-lg bg-white pr-3 relative z-10">Signature Garden Salad</h4>
                      <div className="flex-grow border-b-2 border-dotted border-gray-300 mx-2 relative z-0"></div>
                      <span className="text-[#cb9d44] font-bold bg-white pl-3 relative z-10"><Heart size={16} fill={colors.gold} className="opacity-50"/></span>
                    </div>
                    <p className="text-sm text-gray-500 italic pr-8">Crisp mixed greens, ripe cherry tomatoes, cucumbers, and shaved carrots served with a light vinaigrette.</p>
                  </div>

                  <div className="relative">
                    <div className="flex items-baseline w-full mb-1">
                      <h4 className="font-bold text-[#111b2e] text-lg bg-white pr-3 relative z-10">Penne Pasta Salad</h4>
                      <div className="flex-grow border-b-2 border-dotted border-gray-300 mx-2 relative z-0"></div>
                      <span className="text-[#cb9d44] font-bold bg-white pl-3 relative z-10"><Heart size={16} fill={colors.gold} className="opacity-50"/></span>
                    </div>
                    <p className="text-sm text-gray-500 italic pr-8">Al dente penne tossed with fresh seasonal vegetables and our signature sundried tomato dressing.</p>
                  </div>
                </div>
              </div>

              {/* Mains Card */}
              <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#c4442b]/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full" style={{ backgroundColor: colors.rust }}></div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold uppercase tracking-[0.2em] text-[#c4442b] mb-1" style={{ fontFamily: 'Georgia, serif' }}>Main Courses</h3>
                  <div className="w-16 h-0.5 mx-auto bg-[#c4442b] mb-2"></div>
                </div>

                <div className="space-y-8">
                  <div className="relative">
                    <div className="flex items-baseline w-full mb-1">
                      <h4 className="font-bold text-[#111b2e] text-lg bg-white pr-3 relative z-10">Authentic Jerk Chicken</h4>
                      <div className="flex-grow border-b-2 border-dotted border-gray-300 mx-2 relative z-0"></div>
                      <span className="text-[#c4442b] font-bold bg-white pl-3 relative z-10"><Utensils size={16}/></span>
                    </div>
                    <p className="text-sm text-gray-500 italic pr-8">Slow-marinated chicken grilled to perfection with traditional, smoky island spices.</p>
                  </div>

                  <div className="relative">
                    <div className="flex items-baseline w-full mb-1">
                      <h4 className="font-bold text-[#111b2e] text-lg bg-white pr-3 relative z-10">BBQ Fried Chicken</h4>
                      <div className="flex-grow border-b-2 border-dotted border-gray-300 mx-2 relative z-0"></div>
                      <span className="text-[#c4442b] font-bold bg-white pl-3 relative z-10"><Utensils size={16}/></span>
                    </div>
                    <p className="text-sm text-gray-500 italic pr-8">Crispy, golden-fried chicken heavily glazed in a rich, tangy, and sweet house-made barbecue sauce.</p>
                  </div>

                  <div className="relative">
                    <div className="flex items-baseline w-full mb-1">
                      <h4 className="font-bold text-[#111b2e] text-lg bg-white pr-3 relative z-10">Herb-Glazed Salmon</h4>
                      <div className="flex-grow border-b-2 border-dotted border-gray-300 mx-2 relative z-0"></div>
                      <span className="text-[#c4442b] font-bold bg-white pl-3 relative z-10"><Utensils size={16}/></span>
                    </div>
                    <p className="text-sm text-gray-500 italic pr-8">Oven-baked Atlantic salmon beautifully topped with a light citrus and fresh herb glaze.</p>
                  </div>
                  
                  <div className="relative">
                    <div className="flex items-baseline w-full mb-1">
                      <h4 className="font-bold text-[#111b2e] text-lg bg-white pr-3 relative z-10">Rice and Peas</h4>
                      <div className="flex-grow border-b-2 border-dotted border-gray-300 mx-2 relative z-0"></div>
                      <span className="text-[#c4442b] font-bold bg-white pl-3 relative z-10"><Utensils size={16}/></span>
                    </div>
                    <p className="text-sm text-gray-500 italic pr-8">A classic Caribbean comfort side infused with rich coconut milk, fresh thyme, and scallions. <br/><span className="text-[#a3612b] font-bold text-xs uppercase mt-1 inline-block">Vegetarian Friendly</span></p>
                  </div>
                </div>
              </div>

              {/* Desserts Card */}
              <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#cf6e2a]/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full" style={{ backgroundColor: colors.orange }}></div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold uppercase tracking-[0.2em] text-[#cf6e2a] mb-1" style={{ fontFamily: 'Georgia, serif' }}>Sweet Endings</h3>
                  <div className="w-16 h-0.5 mx-auto bg-[#cf6e2a] mb-2"></div>
                </div>

                <div className="space-y-8">
                  <div className="relative">
                    <div className="flex items-baseline w-full mb-1">
                      <h4 className="font-bold text-[#111b2e] text-lg bg-white pr-3 relative z-10">Sweet Potato Pudding</h4>
                      <div className="flex-grow border-b-2 border-dotted border-gray-300 mx-2 relative z-0"></div>
                      <span className="text-[#cf6e2a] font-bold bg-white pl-3 relative z-10"><Coffee size={16}/></span>
                    </div>
                    <p className="text-sm text-gray-500 italic pr-8">A rich, heavily spiced traditional pudding baked to a soft, caramelized perfection.</p>
                  </div>

                  <div className="relative">
                    <div className="flex items-baseline w-full mb-1">
                      <h4 className="font-bold text-[#111b2e] text-lg bg-white pr-3 relative z-10">Red Velvet Cake</h4>
                      <div className="flex-grow border-b-2 border-dotted border-gray-300 mx-2 relative z-0"></div>
                      <span className="text-[#cf6e2a] font-bold bg-white pl-3 relative z-10"><Coffee size={16}/></span>
                    </div>
                    <p className="text-sm text-gray-500 italic pr-8">Decadent, incredibly moist layers of red velvet topped with smooth cream cheese frosting.</p>
                  </div>

                  <div className="relative">
                    <div className="flex items-baseline w-full mb-1">
                      <h4 className="font-bold text-[#111b2e] text-lg bg-white pr-3 relative z-10">Classic Vanilla Cake</h4>
                      <div className="flex-grow border-b-2 border-dotted border-gray-300 mx-2 relative z-0"></div>
                      <span className="text-[#cf6e2a] font-bold bg-white pl-3 relative z-10"><Coffee size={16}/></span>
                    </div>
                    <p className="text-sm text-gray-500 italic pr-8">A classic, fluffy sponge cake delicately infused with real, sweet vanilla bean.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FEEDBACK PAGE */}
          {activeTab === 'feedback' && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-[#0f1a82]">Share Your Experience</h2>
                <p className="text-[#a3612b] italic mt-2">We'd love to hear your thoughts and suggestions.</p>
              </div>
              
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                {feedbackSubmitted ? (
                  <div className="text-center py-12 animate-fade-in">
                    <CheckCircle size={48} className="text-[#cb9d44] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-[#111b2e] mb-2">Thank You!</h3>
                    <p className="text-gray-500">Your feedback has been successfully sent. We truly appreciate your time.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-[#111b2e] mb-2">Name (Optional)</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#cb9d44] bg-[#f8fafc]" placeholder="Your Name" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#111b2e] mb-2">Email (Optional)</label>
                      <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#cb9d44] bg-[#f8fafc]" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#111b2e] mb-2">Your Feedback / Suggestions <span className="text-[#c4442b]">*</span></label>
                      <textarea required rows="5" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#cb9d44] resize-none bg-[#f8fafc]" placeholder="Tell us what you loved or how we can improve..."></textarea>
                    </div>
                    <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#0f1a82] text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-[#111b2e] active:scale-95 transition-all">
                      <Send size={18} /> Submit Feedback
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* PRAYER PAGE */}
          {activeTab === 'prayer' && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-[#0f1a82]">Prayer Requests</h2>
                <p className="text-[#a3612b] italic mt-2">We believe in the power of prayer. Share your requests with us.</p>
              </div>
              
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                {prayerSubmitted ? (
                  <div className="text-center py-12 animate-fade-in">
                    <Heart size={48} className="text-[#c4442b] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-[#111b2e] mb-2">Received</h3>
                    <p className="text-gray-500">Your prayer request has been received. We will keep you in our prayers.</p>
                  </div>
                ) : (
                  <form onSubmit={handlePrayerSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-[#111b2e] mb-2">Name (Optional)</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c4442b] bg-[#f8fafc]" placeholder="Your Name" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#111b2e] mb-2">Email (Optional)</label>
                      <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c4442b] bg-[#f8fafc]" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#111b2e] mb-2">Your Prayer Request <span className="text-[#c4442b]">*</span></label>
                      <textarea required rows="5" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c4442b] resize-none bg-[#f8fafc]" placeholder="How can we pray for you?"></textarea>
                    </div>
                    <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#c4442b] text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-[#a3612b] active:scale-95 transition-all">
                      <MessageSquare size={18} /> Send Prayer Request
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* --- APP BOTTOM NAVIGATION --- */}
      {!showOverlay && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-[0_-10px_30px_rgba(0,0,0,0.08)] border-t border-gray-100 md:sticky md:top-0 md:shadow-sm overflow-x-auto no-scrollbar md:pb-0 pb-safe">
          <div className="max-w-2xl mx-auto flex items-center justify-between min-w-max px-2 md:px-0">
            {navItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleDaySelect(tab.id)}
                className={`flex flex-col items-center justify-center w-[4rem] sm:w-[4.5rem] py-3 md:py-4 gap-1 md:flex-row md:w-auto md:px-6 transition-all relative ${
                  activeTab === tab.id ? 'text-[#0f1a82]' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div className={`transition-transform duration-300 ${activeTab === tab.id ? 'scale-110 md:scale-100' : 'scale-100'}`}>
                  {tab.icon}
                </div>
                <span className="text-[8px] sm:text-[10px] md:text-xs uppercase tracking-wide md:tracking-widest font-bold whitespace-nowrap">
                  {tab.label}
                </span>
                
                {/* Active Indicator Line */}
                {activeTab === tab.id && (
                  <div className="absolute top-0 md:bottom-0 md:top-auto left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 md:right-0 w-8 md:w-full h-1 bg-[#cb9d44] rounded-b-full md:rounded-t-full md:rounded-b-none shadow-[0_2px_10px_rgba(203,157,68,0.5)] md:shadow-[0_-2px_10px_rgba(203,157,68,0.5)]"></div>
                )}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* --- MODAL --- */}
      {modalData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#111b2e]/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setModalData(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden relative shadow-2xl animate-scale-in flex flex-col max-h-[85vh]">
            <button 
              onClick={() => setModalData(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X size={16} className="text-[#111b2e]" />
            </button>
            
            <div className="p-8 pb-4" style={{ backgroundColor: `${colors.primaryBlue}10` }}>
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-sm"
                style={{ backgroundColor: colors.gold }}
              >
                <IconRenderer name={modalData.icon} color="#ffffff" />
              </div>
              <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: colors.rust }}>{modalData.time}</p>
              <h2 className="text-2xl font-extrabold text-[#111b2e] leading-tight">{modalData.title}</h2>
              {modalData.speaker && (
                <p className="text-md font-medium mt-2" style={{ color: colors.primaryBlue }}>{modalData.speaker}</p>
              )}
            </div>
            
            <div className="p-8 pt-4 overflow-y-auto">
              {modalData.details ? (
                <div className="prose prose-sm text-gray-600 whitespace-pre-line leading-relaxed">
                  {modalData.details}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic text-center py-6">No additional details available for this session.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Embedded CSS for Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-tab-switch {
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        /* Mobile safe area padding for modern phones */
        @supports (padding-bottom: env(safe-area-inset-bottom)) {
          .pb-safe {
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
      `}} />
    </div>
  );
}
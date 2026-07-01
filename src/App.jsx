import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Heart,
  HandHeart,
  Coffee,
  Video,
  MonitorPlay,
  Mic,
  MessageCircle,
  BookOpen,
  Users,
  Music,
  Info,
  ChevronRight,
  X,
  Calendar,
  MapPin,
  Utensils,
  MessageSquare,
  Send,
  CheckCircle,
  Sparkles,
  ScrollText,
  Bookmark,
  Clock,
  Star,
  ExternalLink,
  Home,
  ChevronDown,
  ChevronsLeftRight,
} from 'lucide-react';

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

const conventionStartDate = new Date('2026-07-03T16:00:00');

const prayerZoomUrl = 'https://us02web.zoom.us/j/89150780802?pwd=R2dHQjB3clNnSWgzZHFsTEJzUGV4dz09';
const prayerZoomLabel = 'Open Prayer Zoom Link';

const hostingDetails =
  'Online Users only. Hosts will welcome online viewers, help guide them through the service, share key announcements, and direct anyone who would like to connect after the service.';

const prayerDetails =
  'This prayer service will be live streamed separately from the main Zoom or YouTube service link.\n\nMeeting ID: 891 5078 0802\nPasscode: 123456';

const dayDates = {
  friday: '2026-07-03',
  saturday: '2026-07-04',
  sunday: '2026-07-05',
};

const dayDisplay = {
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

const daySubtitles = {
  friday: 'July 3 • Evening Service',
  saturday: 'July 4 • Full Day',
  sunday: 'July 5 • Final Day',
};

const asset = (file) => {
  if (!file) return '';
  if (file.startsWith('/')) return encodeURI(file);
  return encodeURI(`/${file}`);
};

const peopleImages = {
  aliciaRose: 'Alicia Rose.jpeg',
  andrewRose: 'Andrew Rose.jpg',
  antonetteWhitley: 'Antonette Whitley.jpeg',
  bishopTreleven: 'Bishop Treleven.jpeg',
  carolBlagrove: 'Carol Blagrove.jpeg',
  christineCousins: 'Christine Cousins.jpg',
  christopherMcEwan: 'Christopher McEwan.jpeg',
  clarenceDuff: 'Clarence Duff.jpeg',
  crystalChambers: 'Crystal Chambers.jpeg',
  davidSeverin: 'David Severin.jpeg',
  davidSmith: 'David Smith.jpeg',
  deborahSargean: 'Deborah Sargean.jpeg',
  flyer: 'flyer.jpg',
  gervainEdwards: 'Gervain Edwards.jpeg',
  hibbertHamilton: 'Hibbert Hamilton.jpeg',
  howardGreen: 'Howard Green.jpeg',
  joannaNichol: 'Joanna Nichol.jpeg',
  kandellHarrison: 'Kandell Harrison.jpg',
  kedeisha: 'Kedeisha.jpeg',
  kimberleyCameron: 'Kimberley Cameron.jpeg',
  latoyaGraham: 'Latoya Graham.jpeg',
  louisGeorge: 'Louis George.jpg',
  lydeaCousins: 'Lydea Cousins.jpeg',
  markHibbert: 'Mark Hibbert.jpeg',
  marlonPalmer: 'Marlon Palmer.jpg',
  mattTrillChambers: 'Matt-Trill Chambers.jpeg',
  mauriceBlagrove: 'Maurice Blagrove.jpeg',
  me: 'me.jpg',
  melletaBrown: 'Meletta Brown.jpg',
  michaelHall: 'Michael Hall.jpeg',
  mrFranklinFala: 'Mr. Franklin Fala.jpeg',
  mrOmariRhoden: 'Mr. Omari Rhoden.jpeg',
  nadiaLake: 'Nadia lake.jpeg',
  pastorHines: 'Pastor Hines.jpg',
  praiseAndWorshipTeam: 'Praise and worship team.jpeg',
  prayerIcon: 'pray-1.png',
  rennaeByfield: 'Rennae Byfield.jpeg',
  rhodaLeone: 'Rhoda Leone.jpeg',
  ricardoSeverin: 'Ricardo Severin.jpg',
  shawnWallace: 'Shawn Wallace.jpeg',
  skyJewels: 'Sky Jewels United Choir.jpg',
  vanessaWhite: 'Vanessa White.jpg',
};

const developerData = {
  title: 'App Creator',
  speaker: 'Bro. Matt Robinson',
  role: 'Servant of God',
  icon: 'MonitorPlay',
  isInteractive: true,
  image: peopleImages.me,
  link: 'https://mattrobinsondeveloper.com/',
  linkLabel: 'Visit Portfolio',
  details:
    'Matt Robinson is a child of God, a devoted husband, and a proud father of three beautiful girls and a God-sent son. His first ministry is his home, where he seeks to model the love, patience, and faithfulness of Christ.\n\nHe serves at the Church of God Sabbath-Keeping Ministries in Brampton as a teacher in the Christian Education Ministry and a youth leader in the Redeemed Youth Ministry. With a heart for discipleship, Matt is passionate about encouraging others, especially the next generation, to grow in faith and walk in their God-given purpose.',
};

const scheduleData = {
  friday: [
    {
      title: 'Prayer Service',
      time: '4:00 PM - 5:30 PM',
      speaker: 'Bro. Marlon Palmer',
      role: 'Live streamed separately',
      icon: 'PrayingHands',
      image: peopleImages.marlonPalmer,
      isInteractive: true,
      details: prayerDetails,
      link: prayerZoomUrl || undefined,
      linkLabel: prayerZoomLabel,
    },
    {
      title: 'Dinner',
      time: '5:30 PM - 6:45 PM',
      speaker: 'Lunchroom',
      icon: 'Coffee',
    },
    {
      title: 'Pre-Service Hosting',
      time: '6:35 PM - 6:50 PM',
      speaker: 'Deborah Sargeant & Rennae Byfield',
      role: 'Online Users only',
      icon: 'Video',
      images: [peopleImages.deborahSargean, peopleImages.rennaeByfield],
      isInteractive: true,
      details: hostingDetails,
    },
    {
      type: 'section',
      title: "Men's Service",
      time: '7:00 PM - 9:30 PM',
      subtitle: 'Executing the Business of The Kingdom',
      speaker: 'Minister Michael Hall',
      role: "Leader of the National Men's Ministry",
      icon: 'Mic',
      image: peopleImages.michaelHall,
      details:
        "A focused evening service for the Men's Ministry under the sub-theme: Executing the Business of The Kingdom.",
      items: [
        {
          title: 'Praise & Worship / Opening Song',
          speaker: "Men's Ministries",
          role: 'Hymnal #231 "To the Work"',
          icon: 'Music',
        },
        {
          title: 'Opening Prayer',
          speaker: 'Minister Andrew Rose',
          icon: 'PrayingHands',
          image: peopleImages.andrewRose,
          isInteractive: true,
        },
        {
          title: 'Scripture Reading',
          role: 'Matthew 10:1-20',
          icon: 'BookOpen',
          isInteractive: true,
        },
        {
          title: 'Welcome Address & Intro to Presenter',
          speaker: 'Pastor Mark Hibbert',
          icon: 'Mic',
          image: peopleImages.markHibbert,
          isInteractive: true,
        },
        {
          title: 'Presentation: Business & Finance',
          speaker: 'Mr. Franklin Fala',
          role: '"Perspectives on Business and Finance for the Ministry"',
          icon: 'MonitorPlay',
          image: peopleImages.mrFranklinFala,
          isInteractive: true,
        },
        {
          title: 'Offering',
          speaker: 'Pastor Howard Green',
          role: 'President of the Church of God Sabbath-Keeping Inc.',
          icon: 'Heart',
          image: peopleImages.howardGreen,
          isInteractive: true,
        },
        {
          title: 'Intro to Second Presenter',
          speaker: 'Pastor David Severin',
          role: 'Moderator',
          icon: 'Mic',
          image: peopleImages.davidSeverin,
          isInteractive: true,
        },
        {
          title: 'Presentation',
          speaker: 'Mr. Omari Rhoden',
          role: '"Sacred Work, Kingdom Business"',
          icon: 'MonitorPlay',
          image: peopleImages.mrOmariRhoden,
          isInteractive: true,
        },
        {
          title: 'Praise and Worship',
          speaker: 'Praise and Worship Team',
          icon: 'Music',
          image: peopleImages.praiseAndWorshipTeam,
        },
        {
          title: 'Intro to Speaker',
          speaker: 'Pastor David Severin',
          icon: 'Mic',
          image: peopleImages.davidSeverin,
          isInteractive: true,
        },
        {
          title: 'Main Sermon',
          speaker: 'Minister Michael Hall',
          role: '"Mission Critical Priorities for The Man of God"',
          icon: 'Mic',
          image: peopleImages.michaelHall,
          isInteractive: true,
        },
        {
          title: 'Altar Call & Prayer',
          speaker: 'Minister Michael Hall',
          icon: 'PrayingHands',
          image: peopleImages.michaelHall,
          isInteractive: true,
        },
        {
          title: 'Vote of Thanks',
          speaker: 'Pastor Mark Hibbert',
          icon: 'Info',
          image: peopleImages.markHibbert,
          isInteractive: true,
        },
        {
          title: 'Announcements',
          speaker: 'Sis. Joanna Nichol',
          icon: 'Info',
          image: peopleImages.joannaNichol,
          isInteractive: true,
        },
      ],
    },
    {
      title: 'Post-Service Hosting',
      time: '9:30 PM - 9:45 PM',
      speaker: 'Deborah Sargeant & Rennae Byfield',
      role: 'Online Users only',
      icon: 'MessageCircle',
      images: [peopleImages.deborahSargean, peopleImages.rennaeByfield],
      isInteractive: true,
      details: hostingDetails,
    },
  ],

  saturday: [
    {
      title: 'Continental Breakfast',
      time: '8:00 AM - 9:00 AM',
      speaker: 'DoZ Room',
      icon: 'Coffee',
    },
    {
      title: 'Prayer Service',
      time: '8:30 AM - 9:50 AM',
      speaker: 'Pastor Hines',
      role: 'Live streamed separately',
      icon: 'PrayingHands',
      image: peopleImages.pastorHines,
      isInteractive: true,
      details: prayerDetails,
      link: prayerZoomUrl || undefined,
      linkLabel: prayerZoomLabel,
    },
    {
      title: 'Registration for Kids Classes',
      time: '9:00 AM - 10:00 AM',
      speaker: 'Foyer',
      role: 'Wristbands distributed',
      icon: 'Users',
    },
    {
      type: 'section',
      title: 'Sabbath Morning Service',
      time: '10:00 AM - 11:45 AM',
      subtitle: "The Church as God's Instrument",
      speaker: 'Pastor Clarence Duff',
      role: 'Sabbath School Teacher',
      icon: 'BookOpen',
      image: peopleImages.clarenceDuff,
      details: 'Sabbath morning service and Sabbath School session.',
      items: [
        {
          title: 'Welcome & Dismissal',
          speaker: 'Bro. David Smith',
          role: 'Morning Moderator. Dismiss children and youth to classes.',
          icon: 'Mic',
          image: peopleImages.davidSmith,
          isInteractive: true,
        },
        {
          title: 'Opening Hymn',
          speaker: 'Congregation',
          role: '#92 "Sound the Battle Cry"',
          icon: 'Music',
        },
        {
          title: 'Opening Prayer',
          speaker: 'Assigned Leader',
          icon: 'PrayingHands',
        },
        {
          title: 'Sabbath School',
          speaker: 'Pastor Clarence Duff',
          role: '"The Church as God\'s instrument"',
          icon: 'BookOpen',
          image: peopleImages.clarenceDuff,
          isInteractive: true,
        },
        {
          title: 'Closing Hymn',
          speaker: 'Congregation',
          role: '#94 "Onward Christian Soldiers"',
          icon: 'Music',
        },
        {
          title: 'Offering, Praise & Worship',
          speaker: 'Pastor Howard Green',
          role: 'President of the Church of God Sabbath-Keeping Inc.',
          icon: 'Heart',
          image: peopleImages.howardGreen,
          isInteractive: true,
        },
        {
          title: 'Closing Prayer',
          speaker: 'Pastor Ricardo Severin',
          icon: 'PrayingHands',
          image: peopleImages.ricardoSeverin,
          isInteractive: true,
        },
        {
          title: 'Closing Remarks & Dismissal',
          speaker: 'Bro. David Smith',
          role: 'Children reunited with parents',
          icon: 'Info',
          image: peopleImages.davidSmith,
        },
      ],
    },
    {
      title: 'Pre-Service Hosting',
      time: '12:00 PM - 12:10 PM',
      speaker: 'Chris Duff & Lydea Cousins',
      role: 'Online Users only',
      icon: 'Video',
      image: peopleImages.lydeaCousins,
      isInteractive: true,
      details: hostingDetails,
    },
    {
      type: 'section',
      title: 'Sabbath Afternoon Service',
      time: '12:30 PM - 3:00 PM',
      subtitle: 'Sabbath Main Service',
      speaker: 'Pastor Christopher McEwan',
      role: 'Main Speaker',
      icon: 'Mic',
      image: peopleImages.christopherMcEwan,
      details: 'The main Sabbath afternoon worship service.',
      items: [
        {
          title: 'Worship Experience',
          speaker: 'Sabbath Main Service',
          role: 'Hymn: #256 "I Am Resolved" & Dancers',
          icon: 'Music',
        },
        {
          title: 'Opening Prayer',
          speaker: 'Pastor Dion Mitchell',
          icon: 'PrayingHands',
          isInteractive: true,
        },
        {
          title: 'Scripture Reading',
          speaker: 'Sis. Melleta Brown',
          role: 'Matt 9:35-10:1',
          icon: 'BookOpen',
          image: peopleImages.melletaBrown,
          isInteractive: true,
        },
        {
          title: 'Official Welcome and Address',
          speaker: 'Bishop Treleven',
          icon: 'Mic',
          image: peopleImages.bishopTreleven,
          isInteractive: true,
        },
        {
          title: 'Selection',
          speaker: 'Sky Jewels United Choir',
          icon: 'Music',
          image: peopleImages.skyJewels,
          isInteractive: true,
        },
        {
          title: 'Offering & Praise',
          speaker: 'Pastor Howard Green',
          role: 'President of the Church of God Sabbath-Keeping Inc.',
          icon: 'Heart',
          image: peopleImages.howardGreen,
          isInteractive: true,
        },
        {
          title: 'Worship Experience',
          speaker: 'Worship Team',
          icon: 'Music',
          image: peopleImages.praiseAndWorshipTeam,
        },
        {
          title: 'Intro of Speaker',
          speaker: 'Sis. Sheree Vernal',
          icon: 'Mic',
          isInteractive: true,
        },
        {
          title: 'Main Sermon',
          speaker: 'Pastor Christopher McEwan',
          role: '"It\'s Harvest Time!"',
          icon: 'Mic',
          image: peopleImages.christopherMcEwan,
          isInteractive: true,
        },
        {
          title: 'Closing Song',
          speaker: 'Praise and Worship',
          icon: 'Music',
        },
        {
          title: 'Altar Call & Closing Prayer',
          speaker: 'Pastor Christopher McEwan',
          icon: 'PrayingHands',
          image: peopleImages.christopherMcEwan,
          isInteractive: true,
        },
        {
          title: 'Announcements',
          speaker: 'Sis. Joanna Nichol',
          icon: 'Info',
          image: peopleImages.joannaNichol,
        },
      ],
    },
    {
      title: 'Lunch',
      time: '3:00 PM - 4:30 PM',
      speaker: 'Lunchroom',
      role: 'Waves for elderly, visitors, and public',
      icon: 'Coffee',
    },
    {
      type: 'section',
      title: "Children's Service",
      time: '4:30 PM - 6:00 PM',
      subtitle: 'Workers for the Kingdom!',
      speaker: 'Sis. Nadia Lake',
      role: "Interim Leader of the National Children's Ministry",
      icon: 'Users',
      image: peopleImages.nadiaLake,
      details: "Children's ministry service under the sub-theme: Workers for the Kingdom!",
      items: [
        {
          title: "Children's Praise & Worship",
          speaker: "Children's Ministry",
          icon: 'Music',
        },
        {
          title: 'Welcome, Prayer & Scripture',
          speaker: 'Syracuse, Nyla Olivierre & Oshawa',
          role: 'Scripture: Matt 9:37-38',
          icon: 'BookOpen',
        },
        {
          title: 'Skit',
          speaker: 'Rexdale Congregation',
          icon: 'Users',
        },
        {
          title: 'Declaration & Choir',
          speaker: 'Everyone',
          icon: 'Music',
        },
        {
          title: 'Interactive Activity',
          speaker: '1st to ten',
          icon: 'Users',
        },
        {
          title: 'Selection, Worship & Sermon',
          speaker: 'Brampton Dancers & Kandell Harrison',
          icon: 'Mic',
          image: peopleImages.kandellHarrison,
          isInteractive: true,
        },
        {
          title: 'Closing Prayer & Vote of Thanks',
          speaker: 'Azariah Providence & Sis. Nadia Lake',
          icon: 'PrayingHands',
          image: peopleImages.nadiaLake,
          isInteractive: true,
        },
      ],
    },
    {
      title: 'Singspiration',
      time: '6:30 PM',
      speaker: 'Venessa White',
      role: 'Informal service of song and worship',
      icon: 'Music',
      image: peopleImages.vanessaWhite,
    },
  ],

  sunday: [
    {
      title: 'Prayer Service',
      time: '8:00 AM - 9:30 AM',
      speaker: 'Pastor Hibbert Hamilton',
      role: 'Live streamed separately',
      icon: 'PrayingHands',
      image: peopleImages.hibbertHamilton,
      isInteractive: true,
      details: prayerDetails,
      link: prayerZoomUrl || undefined,
      linkLabel: prayerZoomLabel,
    },
    {
      title: 'Breakfast',
      time: '9:30 AM - 10:40 AM',
      icon: 'Coffee',
    },
    {
      type: 'section',
      title: 'Ministerial Workshop',
      time: '11:00 AM - 12:15 PM',
      subtitle: 'Prioritizing the Work of the Kingdom',
      speaker: 'Pastor Maurice Blagrove',
      role: 'Vice-President of the Church of God Sabbath-Keeping Inc.',
      icon: 'BookOpen',
      image: peopleImages.mauriceBlagrove,
      details:
        'Ministerial workshop focused on prioritizing the work of the Kingdom.',
      items: [
        {
          title: 'Intro to Speaker',
          speaker: 'Bro. Glenford Lee',
          role: 'Ministerial Workshop',
          icon: 'Mic',
          isInteractive: true,
        },
        {
          title: 'Workshop Presentation',
          speaker: 'Pastor Maurice Blagrove',
          role: '"Prioritizing the Work of the Kingdom" — 1 Cor 3:1-13',
          icon: 'BookOpen',
          image: peopleImages.mauriceBlagrove,
          isInteractive: true,
        },
        {
          title: 'Closing Remarks',
          speaker: 'Pastor Howard Green',
          role: 'President of the Church of God Sabbath-Keeping Inc.',
          icon: 'Info',
          image: peopleImages.howardGreen,
          isInteractive: true,
        },
      ],
    },
    {
      type: 'section',
      title: "Women's Service",
      time: '12:30 PM - 2:30 PM',
      subtitle: "Women's Ministry Service",
      speaker: 'Sis. Carol Blagrove',
      role: "Leader of the National Women's Ministry",
      icon: 'Users',
      image: peopleImages.carolBlagrove,
      details: "Women's Ministry service.",
      items: [
        {
          title: "Women's Praise & Video Presentation",
          speaker: "Women's Ministry",
          icon: 'MonitorPlay',
        },
        {
          title: 'Welcome, Hymn, Prayer & Scripture',
          speaker: 'Sis C. Cousins, Sis M. Gooden, Sis S. Kerr, Sis M. Ricketts',
          role: 'Scripture: John 9:4-5 | Hymn #231',
          icon: 'BookOpen',
          image: peopleImages.christineCousins,
          isInteractive: true,
        },
        {
          title: 'Praise & Worship',
          speaker: 'Sis. Alicia Rose',
          icon: 'Music',
          image: peopleImages.aliciaRose,
        },
        {
          title: 'Discussion & Wrap-up',
          speaker: 'Sis. Rhoda Leone, Sis. Crystal Chambers, Sis. Kimberley Cameron',
          icon: 'Users',
          images: [peopleImages.rhodaLeone, peopleImages.crystalChambers, peopleImages.kimberleyCameron],
          isInteractive: true,
        },
        {
          title: 'Altar Call, Vote of Thanks & Announcements',
          speaker: 'Sis. L. Quarrie, Sis. M. Brown, Sis. Joanna Nichol',
          icon: 'PrayingHands',
          image: peopleImages.joannaNichol,
          isInteractive: true,
        },
      ],
    },
    {
      title: 'Break',
      time: '2:35 PM - 3:00 PM',
      speaker: 'Intermission',
      icon: 'Coffee',
    },
    {
      title: 'Conference Update',
      time: '3:00 PM - 3:50 PM',
      speaker: 'Pastor Howard Green & Pastor Maurice Blagrove',
      role: 'Members only via Zoom',
      icon: 'Video',
      images: [peopleImages.howardGreen, peopleImages.mauriceBlagrove],
      isInteractive: true,
    },
    {
      title: 'Vendor Booth Expo',
      time: '4:00 PM - 7:00 PM',
      speaker: 'New Room',
      role:
        'All are welcome to discover the various goods and services being sold by Vendors within and outside the Church of God Sabbath-Keeping Organization.',
      icon: 'Info',
      isInteractive: true,
    },
    {
      type: 'section',
      title: 'Youth Service',
      time: '4:00 PM - 5:30 PM',
      subtitle: 'Kingdom Work for Your Generation',
      speaker: 'Minister Matt-Trill Chambers',
      role: 'Interim Leader of the National Youth Ministry',
      icon: 'Users',
      image: peopleImages.mattTrillChambers,
      details:
        'Youth service under the sub-theme: Kingdom Work for Your Generation.',
      items: [
        {
          title: 'Youth P&W',
          speaker: 'Youth Ministry',
          icon: 'Music',
        },
        {
          title: 'Prayer & Scripture',
          speaker: 'Aliyah Valentine, Desreen Myers, Jonathan Brown',
          role: 'Sub-theme: Kingdom Work for Your Generation',
          icon: 'BookOpen',
          isInteractive: true,
        },
        {
          title: 'Welcome',
          speaker: 'Youth Ministry',
          icon: 'Mic',
        },
        {
          title: 'Youth Panel Discussion',
          speaker: 'Minister Matt-Trill Chambers',
          role: 'Facilitator.',
          icon: 'Users',
          image: peopleImages.mattTrillChambers,
          isInteractive: true,
        },
        {
          title: 'Altar Call, Prayer & Vote of Thanks',
          speaker: 'Deneil Wilmot & Lianna Hibbert',
          icon: 'PrayingHands',
          isInteractive: true,
        },
      ],
    },
    {
      title: 'Dinner',
      time: '5:35 PM - 6:35 PM',
      speaker: 'Intermission',
      icon: 'Coffee',
    },
    {
      title: 'Pre-Service Hosting',
      time: '6:50 PM - 7:00 PM',
      speaker: 'Shawn Wallace & Antonette Whitley-Scott',
      role: 'Online Users only',
      icon: 'Video',
      images: [peopleImages.shawnWallace, peopleImages.antonetteWhitley],
      isInteractive: true,
      details: hostingDetails,
    },
    {
      type: 'section',
      title: 'Gospel Night Service',
      time: '7:00 PM - 9:30 PM',
      subtitle: 'Final Evening Service',
      speaker: 'Pastor Christopher McEwan',
      role: 'Main Speaker',
      icon: 'Mic',
      image: peopleImages.christopherMcEwan,
      details: 'Final evening service for Convention 2026.',
      items: [
        {
          title: 'Praise, Prayer & Scripture',
          speaker: 'Pastor Louis George & Sis. Marcia Gooden',
          role: 'Hymn #226 "Send the Light" | Matt 20:1-13',
          icon: 'BookOpen',
          images: [peopleImages.louisGeorge],
          isInteractive: true,
        },
        {
          title: 'Official Welcome & Selection',
          speaker: 'Sis. Rhoda Leone & Sky Jewels United Choir',
          icon: 'Music',
          images: [peopleImages.rhodaLeone, peopleImages.skyJewels],
          isInteractive: true,
        },
        {
          title: 'Love Offering',
          speaker: 'Pastor Howard Green',
          role: 'President of the Church of God Sabbath-Keeping Inc.',
          icon: 'Heart',
          image: peopleImages.howardGreen,
          isInteractive: true,
        },
        {
          title: 'Worship & Intro to Speaker',
          speaker: 'Sis. Michaela Simpson',
          icon: 'Mic',
          image: peopleImages.praiseAndWorshipTeam,
          isInteractive: true,
        },
        {
          title: 'Sermon',
          speaker: 'Pastor Christopher McEwan',
          role: '"Fix Your Focus"',
          icon: 'Mic',
          image: peopleImages.christopherMcEwan,
          isInteractive: true,
        },
        {
          title: 'Altar Call & Closing Prayer',
          speaker: 'Pastor Christopher McEwan',
          icon: 'PrayingHands',
          image: peopleImages.christopherMcEwan,
          isInteractive: true,
        },
        {
          title: 'Vote of Thanks',
          speaker: 'Pastor Green / Sis. Joanna Nichol / Pastor D Severin',
          icon: 'Users',
          image: peopleImages.joannaNichol,
          isInteractive: true,
        },
        {
          title: 'Announcements',
          speaker: 'Sis. Latoya Graham',
          role: 'Announcement of major events across the conference',
          icon: 'Info',
          image: peopleImages.latoyaGraham,
          isInteractive: true,
        },
      ],
    },
    {
      title: 'Post-Service Hosting',
      time: '9:40 PM - 9:50 PM',
      speaker: 'Shawn Wallace & Antonette Whitley-Scott',
      role: 'Online Users only',
      icon: 'MessageCircle',
      images: [peopleImages.shawnWallace, peopleImages.antonetteWhitley],
      isInteractive: true,
      details: 'Official close of Convention 2026.',
    },
  ],
};

function isSection(entry) {
  return entry && entry.type === 'section';
}

function PrayerIconBadge({ size = 22, active = true }) {
  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: active ? 1 : 0.55,
      }}
    >
      <HandHeart
        size={size}
        strokeWidth={2.4}
        color={active ? colors.primaryBlue : '#94a3b8'}
      />

      <span
        style={{
          position: 'absolute',
          right: -4,
          bottom: -4,
          width: size * 0.52,
          height: size * 0.52,
          borderRadius: '999px',
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.16)',
        }}
      >
        <Heart
          size={size * 0.28}
          fill={colors.rust}
          color={colors.rust}
          strokeWidth={2.5}
        />
      </span>
    </div>
  );
}

function IconRenderer({ name, color = colors.primaryBlue, size = 20 }) {
  const icons = {
    Heart: <Heart color={color} size={size} />,
    PrayingHands: <PrayerIconBadge size={size} />,
    Coffee: <Coffee color={color} size={size} />,
    Video: <Video color={color} size={size} />,
    MonitorPlay: <MonitorPlay color={color} size={size} />,
    Mic: <Mic color={color} size={size} />,
    MessageCircle: <MessageCircle color={color} size={size} />,
    BookOpen: <BookOpen color={color} size={size} />,
    Users: <Users color={color} size={size} />,
    Music: <Music color={color} size={size} />,
    Info: <Info color={color} size={size} />,
    Calendar: <Calendar color={color} size={size} />,
    MapPin: <MapPin color={color} size={size} />,
    Sparkles: <Sparkles color={color} size={size} />,
    ScrollText: <ScrollText color={color} size={size} />,
  };

  return icons[name || 'Calendar'] || <Calendar color={color} size={size} />;
}

function getCategory(entry) {
  const text = `${entry.title} ${entry.role || ''} ${entry.speaker || ''}`.toLowerCase();
  const words = text.split(/\s+/);

  if (text.includes('gospel night') || text.includes('sermon')) return 'Sermon';
  if (text.includes('prayer') || text.includes('altar')) return 'Prayer';

  if (
    text.includes('breakfast') ||
    text.includes('lunch') ||
    text.includes('dinner') ||
    text.includes('feast')
  ) {
    return 'Meal';
  }

  if (text.includes('worship') || text.includes('praise') || text.includes('hymn')) {
    return 'Worship';
  }

  if (
    text.includes('workshop') ||
    text.includes('presentation') ||
    text.includes('sabbath school')
  ) {
    return 'Teaching';
  }

  if (words.includes('youth') || words.includes("youth's")) return 'Youth';
  if (words.includes('children') || words.includes("children's")) return 'Children';
  if (words.includes('women') || words.includes("women's")) return 'Women';
  if (words.includes('men') || words.includes("men's")) return 'Men';
  if (text.includes('offering')) return 'Offering';
  if (text.includes('video') || text.includes('hosting')) return 'Media';
  if (text.includes('vendor')) return 'Expo';

  return 'Program';
}

function getCategoryStyle(category) {
  const styles = {
    Sermon: {
      bg: `${colors.rust}18`,
      text: colors.rust,
      border: `${colors.rust}33`,
    },
    Prayer: {
      bg: `${colors.primaryBlue}14`,
      text: colors.primaryBlue,
      border: `${colors.primaryBlue}2f`,
    },
    Meal: {
      bg: `${colors.orange}16`,
      text: colors.orange,
      border: `${colors.orange}33`,
    },
    Worship: {
      bg: `${colors.gold}20`,
      text: colors.brown,
      border: `${colors.gold}44`,
    },
    Teaching: {
      bg: `${colors.midBlue}16`,
      text: colors.midBlue,
      border: `${colors.midBlue}33`,
    },
    Youth: {
      bg: '#7c3aed16',
      text: '#6d28d9',
      border: '#7c3aed33',
    },
    Children: {
      bg: '#16a34a16',
      text: '#15803d',
      border: '#16a34a33',
    },
    Women: {
      bg: '#db277716',
      text: '#be185d',
      border: '#db277733',
    },
    Men: {
      bg: '#2563eb16',
      text: '#1d4ed8',
      border: '#2563eb33',
    },
    Offering: {
      bg: `${colors.gold}20`,
      text: colors.brown,
      border: `${colors.gold}44`,
    },
    Media: {
      bg: '#0891b216',
      text: '#0e7490',
      border: '#0891b233',
    },
    Expo: {
      bg: '#9333ea16',
      text: '#7e22ce',
      border: '#9333ea33',
    },
    Program: {
      bg: '#64748b14',
      text: '#475569',
      border: '#64748b2f',
    },
  };

  return styles[category] || styles.Program;
}

function parseClockTime(dateString, timeText) {
  if (!timeText) return null;

  const cleaned = timeText.trim();
  const match = cleaned.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);

  if (!match) return null;

  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const period = match[3].toUpperCase();

  if (period === 'PM' && hour !== 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;

  const date = new Date(`${dateString}T00:00:00`);
  date.setHours(hour, minute, 0, 0);

  return date;
}

function getEventWindow(day, entry) {
  const dateString = dayDates[day];
  if (!dateString || !entry.time) return null;

  const timeParts = entry.time.split(' - ');
  const start = parseClockTime(dateString, timeParts[0]);

  if (!start) return null;

  let end = null;

  if (timeParts[1]) {
    end = parseClockTime(dateString, timeParts[1]);
  }

  if (!end) {
    end = new Date(start.getTime() + 60 * 60 * 1000);
  }

  if (end < start) {
    end.setDate(end.getDate() + 1);
  }

  return { start, end };
}

function topKey(day, index, entry) {
  return `${day}-${index}-${entry.title}-${entry.time || ''}`;
}

function childKey(day, sectionIndex, section, childIndex, child) {
  return `${day}-${sectionIndex}-${section.title}-${childIndex}-${child.title}-${child.speaker || ''}`;
}

function formatCountdown(now) {
  const diff = conventionStartDate.getTime() - now.getTime();

  if (diff <= 0) {
    return {
      started: true,
      days: 'Live',
      hours: '00',
      minutes: '00',
      seconds: '00',
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    started: false,
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
}

function getNowNextForDay(day, now) {
  const entries = scheduleData[day] || [];

  const timedEntries = entries
    .map((entry, index) => ({
      entry,
      key: topKey(day, index, entry),
      window: getEventWindow(day, entry),
    }))
    .filter((item) => item.window)
    .sort((a, b) => {
      if (!a.window || !b.window) return 0;
      return a.window.start.getTime() - b.window.start.getTime();
    });

  const current = timedEntries.find((item) => {
    if (!item.window) return false;
    return now >= item.window.start && now <= item.window.end;
  });

  const next = timedEntries.find((item) => {
    if (!item.window) return false;
    return item.window.start > now;
  });

  if (current) {
    return {
      mode: 'live',
      current,
      next: next || null,
    };
  }

  if (next) {
    return {
      mode: 'upcoming',
      current: null,
      next,
    };
  }

  return {
    mode: 'ended',
    current: null,
    next: null,
  };
}

export default function App() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [activeTab, setActiveTab] = useState('message');
  const [modalData, setModalData] = useState(null);
  const [modalDay, setModalDay] = useState(null);
  const [modalKey, setModalKey] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [prayerSubmitted, setPrayerSubmitted] = useState(false);
  const [savedKeys, setSavedKeys] = useState([]);
  const [now, setNow] = useState(new Date());
  const navScrollRef = useRef(null);
  const [navScrollState, setNavScrollState] = useState({
    left: false,
    right: true,
  });

  const updateNavScrollState = useCallback(() => {
    const el = navScrollRef.current;
    if (!el) return;

    const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);

    setNavScrollState({
      left: el.scrollLeft > 8,
      right: el.scrollLeft < maxScrollLeft - 8,
    });
  }, []);

  useEffect(() => {
    if (showOverlay) return;

    const activeButton = navScrollRef.current?.querySelector(
      `[data-nav-id="${activeTab}"]`
    );

    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });

      setTimeout(updateNavScrollState, 250);
    }
  }, [activeTab, showOverlay, updateNavScrollState]);

  useEffect(() => {
    if (showOverlay) return;

    const el = navScrollRef.current;
    if (!el) return;

    const handleResize = () => updateNavScrollState();

    const frame = requestAnimationFrame(updateNavScrollState);

    window.addEventListener('resize', handleResize);
    el.addEventListener('scroll', updateNavScrollState, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
      el.removeEventListener('scroll', updateNavScrollState);
    };
  }, [showOverlay, updateNavScrollState]);

  const handleNavScroll = () => {
    updateNavScrollState();
  };

  useEffect(() => {
    setIsLoaded(true);
    const stored = localStorage.getItem('conventionSavedEvents');
    if (stored) {
      try {
        setSavedKeys(JSON.parse(stored));
      } catch {
        setSavedKeys([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('conventionSavedEvents', JSON.stringify(savedKeys));
  }, [savedKeys]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const countdown = useMemo(() => formatCountdown(now), [now]);

  const allSavedEntries = useMemo(() => {
    return Object.entries(scheduleData).flatMap(([day, entries]) => {
      return entries.flatMap((entry, entryIndex) => {
        const mainKey = topKey(day, entryIndex, entry);

        if (isSection(entry)) {
          return [
            {
              day,
              key: mainKey,
              entry,
              parentTitle: null,
            },
            ...entry.items.map((child, childIndex) => ({
              day,
              key: childKey(day, entryIndex, entry, childIndex, child),
              entry: child,
              parentTitle: entry.title,
            })),
          ];
        }

        return [
          {
            day,
            key: mainKey,
            entry,
            parentTitle: null,
          },
        ];
      });
    });
  }, []);

  const savedEntryObjects = useMemo(
    () => allSavedEntries.filter((item) => savedKeys.includes(item.key)),
    [allSavedEntries, savedKeys]
  );

  const handleTabSelect = (tab) => {
    if (tab === activeTab && !showOverlay) return;
    setActiveTab(tab);
    setShowOverlay(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 10);
  };

  const toggleSavedKey = (key) => {
    setSavedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const openModal = (entry, day = null, key = null) => {
    setModalData(entry);
    setModalDay(day);
    setModalKey(key);
  };

  const closeModal = () => {
    setModalData(null);
    setModalDay(null);
    setModalKey(null);
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
    { id: 'saved', label: 'Saved', icon: <Bookmark size={22} /> },
    { id: 'menu', label: 'Menu', icon: <Utensils size={22} /> },
    { id: 'feedback', label: 'Feedback', icon: <MessageSquare size={22} /> },
    {
      id: 'prayer',
      label: 'Prayer',
      icon: <PrayerIconBadge size={22} active={activeTab === 'prayer'} />,
    },
  ];

  const renderCategoryPill = (entry, featured = false) => {
    const category = getCategory(entry);
    const categoryStyle = getCategoryStyle(category);

    return (
      <span
        className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase border"
        style={{
          backgroundColor: featured ? 'rgba(203,157,68,0.15)' : categoryStyle.bg,
          color: featured ? colors.gold : categoryStyle.text,
          borderColor: featured ? 'rgba(203,157,68,0.22)' : categoryStyle.border,
        }}
      >
        {category}
      </span>
    );
  };

  const renderNowNext = (day) => {
    const nowNext = getNowNextForDay(day, now);
    const item = nowNext.current || nowNext.next;

    if (!item) {
      return (
        <div className="rounded-[2rem] p-6 bg-white border border-gray-100 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#cb9d44]/15 flex items-center justify-center">
              <CheckCircle size={20} className="text-[#cb9d44]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#a3612b]">
                Day Complete
              </p>
              <h3 className="text-lg font-extrabold text-[#111b2e]">
                This day has ended
              </h3>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Thank you for being part of the convention experience.
          </p>
        </div>
      );
    }

    const entry = item.entry;
    const isLive = nowNext.mode === 'live';

    return (
      <div className="rounded-[2rem] p-5 md:p-6 bg-gradient-to-br from-[#111b2e] to-[#0f1a82] text-white shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-[#cb9d44]/20 blur-2xl"></div>
        <div className="absolute -left-20 bottom-0 w-52 h-52 rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center ${
                  isLive ? 'bg-[#c4442b]' : 'bg-[#cb9d44]'
                }`}
              >
                {isLive ? (
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                ) : (
                  <Clock size={21} className="text-[#111b2e]" />
                )}
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] font-bold text-[#cb9d44]">
                  {isLive ? 'Now Happening' : 'Coming Up Next'}
                </p>
                <p className="text-xs text-white/60 font-medium">
                  {dayDisplay[day]} • {daySubtitles[day]}
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-white/10 text-white border-white/15">
              {getCategory(entry)}
            </span>
          </div>

          <p className="text-[#cb9d44] text-xs font-extrabold tracking-widest uppercase mb-2">
            {entry.time}
          </p>

          <h3 className="text-2xl md:text-3xl font-extrabold leading-tight mb-2">
            {entry.title}
          </h3>

          {isSection(entry) && entry.subtitle && (
            <p className="text-[#cb9d44] font-semibold italic mb-1">
              {entry.subtitle}
            </p>
          )}

          {entry.speaker && (
            <p className="text-white/85 font-semibold">{entry.speaker}</p>
          )}

          {entry.role && (
            <p className="text-white/60 text-sm italic mt-1">{entry.role}</p>
          )}

          <div className="flex gap-3 mt-5">
            {!isSection(entry) && entry.isInteractive && (
              <button
                onClick={() => openModal(entry, day, item.key)}
                className="px-5 py-3 rounded-xl bg-white text-[#0f1a82] font-bold text-sm shadow-lg active:scale-95 transition-all"
              >
                View Details
              </button>
            )}

            <button
              onClick={() => toggleSavedKey(item.key)}
              className="px-5 py-3 rounded-xl bg-white/10 border border-white/15 text-white font-bold text-sm active:scale-95 transition-all flex items-center gap-2"
            >
              <Bookmark
                size={16}
                fill={savedKeys.includes(item.key) ? colors.gold : 'none'}
                className="text-[#cb9d44]"
              />
              {savedKeys.includes(item.key) ? 'Saved' : 'Save'}
            </button>
          </div>

          {nowNext.next && nowNext.current && (
            <div className="mt-5 pt-4 border-t border-white/10">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/45 font-bold mb-1">
                Next
              </p>
              <p className="text-sm text-white/80">
                {nowNext.next.entry.time} • {nowNext.next.entry.title}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderEventCard = (
    event,
    day,
    index,
    keyValue,
    compact = false,
    parentTitle = null
  ) => {
    const isSaved = savedKeys.includes(keyValue);
    const clickable = Boolean(event.isInteractive || event.details || event.link);
    const imagesList = event.images || (event.image ? [event.image] : []);

    return (
      <div
        key={keyValue}
        className={compact ? '' : 'relative'}
        style={{ animation: `fadeInUp 0.45s ease-out ${index * 0.04}s both` }}
      >
        <div
          onClick={() => clickable && openModal(event, day, keyValue)}
          className={`relative overflow-hidden rounded-[1.5rem] p-5 border transition-all duration-300 bg-white text-[#111b2e] border-gray-100 shadow-sm ${
            clickable ? 'cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:border-[#cb9d44] group' : ''
          }`}
        >
          <div className="relative z-10 flex items-start gap-4">
            
            {imagesList.length > 0 ? (
              <div className={`flex ${imagesList.length > 1 ? '-space-x-4' : ''} flex-shrink-0`}>
                {imagesList.slice(0, 3).map((img, i) => (
                  <div
                    key={i}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-cover bg-center shadow-sm relative ${imagesList.length > 1 ? 'border-2 border-white' : 'border border-gray-100'}`}
                    style={{ backgroundImage: `url("${asset(img)}")`, zIndex: 10 - i }}
                  />
                ))}
              </div>
            ) : (
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border border-gray-100 shadow-sm" style={{ backgroundColor: `${colors.gold}20` }}>
                <IconRenderer name={event.icon} color={colors.primaryBlue} size={22} />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {event.time && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase bg-[#0f1a82]/10 text-[#0f1a82]">
                    <Clock size={12} />
                    {event.time}
                  </span>
                )}

                {parentTitle && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase bg-[#cb9d44]/10 text-[#a3612b] border border-[#cb9d44]/20">
                    {parentTitle}
                  </span>
                )}

                {renderCategoryPill(event)}
              </div>

              <h3 className="text-lg md:text-xl font-extrabold leading-tight mb-1 text-[#111b2e]">
                {event.title}
              </h3>

              {event.speaker && (
                <p className="text-sm font-bold text-[#c4442b]">
                  {event.speaker}
                </p>
              )}

              {event.role && (
                <p className="text-xs mt-1 italic leading-relaxed text-gray-500">
                  {event.role}
                </p>
              )}

              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSavedKey(keyValue);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 bg-[#f8fafc] text-[#111b2e] border border-gray-100"
                >
                  <Bookmark
                    size={15}
                    fill={isSaved ? colors.gold : 'none'}
                    className="text-[#cb9d44]"
                  />
                  {isSaved ? 'Saved' : 'Save'}
                </button>

                {clickable && (
                  <div className="ml-auto rounded-full p-2 transition-colors bg-[#cb9d44]/15 group-hover:bg-[#cb9d44]/30">
                    <ChevronRight size={20} className="text-[#cb9d44] animate-bounce-x" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSectionCard = (section, day, index, keyValue) => {
    const isSaved = savedKeys.includes(keyValue);
    const imagesList = section.images || (section.image ? [section.image] : []);

    return (
      <div
        key={keyValue}
        className="rounded-[2rem] overflow-hidden bg-white shadow-2xl border border-[#cb9d44]/20"
        style={{ animation: `fadeInUp 0.45s ease-out ${index * 0.04}s both` }}
      >
        <div
          className="relative min-h-[260px] bg-cover bg-center"
          style={
            section.image
              ? {
                  backgroundImage: `linear-gradient(135deg, rgba(17,27,46,0.92), rgba(15,26,130,0.78)), url("${asset(section.image)}")`,
                }
              : {
                  background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.primaryBlue} 100%)`,
                }
          }
        >
          <div className="absolute -right-16 -top-16 w-44 h-44 rounded-full bg-[#cb9d44]/25 blur-3xl"></div>
          <div className="absolute -left-20 bottom-0 w-56 h-56 rounded-full bg-white/10 blur-3xl"></div>

          <div className="relative z-10 p-6 md:p-7 text-white">
            <div className="flex items-start justify-between gap-4 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10">
                <Star size={14} fill={colors.gold} className="text-[#cb9d44]" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#cb9d44]">
                  Main Section
                </span>
              </div>

              <button
                onClick={() => toggleSavedKey(keyValue)}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center active:scale-95 transition-all"
              >
                <Bookmark
                  size={18}
                  fill={isSaved ? colors.gold : 'none'}
                  className="text-[#cb9d44]"
                />
              </button>
            </div>

            <p className="text-[#cb9d44] text-xs font-extrabold tracking-widest uppercase mb-2">
              {section.time}
            </p>

            <h3 className="text-3xl md:text-4xl font-extrabold leading-tight">
              {section.title}
            </h3>

            {section.subtitle && (
              <p className="text-[#cb9d44] font-semibold italic mt-2">
                {section.subtitle}
              </p>
            )}

            <div className="mt-5 flex items-center gap-4">
              
              {imagesList.length > 0 ? (
                <div className={`flex ${imagesList.length > 1 ? '-space-x-4' : ''} flex-shrink-0`}>
                  {imagesList.slice(0, 3).map((img, i) => (
                    <div
                      key={i}
                      className="w-16 h-16 rounded-2xl bg-cover bg-center border-2 border-white/30 shadow-lg relative"
                      style={{ backgroundImage: `url("${asset(img)}")`, zIndex: 10 - i }}
                    />
                  ))}
                </div>
              ) : (
                <div className="w-16 h-16 rounded-2xl border-2 border-white/30 shadow-lg flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
                  <IconRenderer name={section.icon} color={colors.gold} size={28} />
                </div>
              )}

              <div>
                {section.speaker && (
                  <p className="font-extrabold text-white">{section.speaker}</p>
                )}
                {section.role && (
                  <p className="text-sm text-white/65 italic">{section.role}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 md:p-6 bg-[#f8fafc]">
          {section.details && (
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              {section.details}
            </p>
          )}

          <div className="space-y-4">
            {section.items.map((item, childIndex) =>
              renderEventCard(
                item,
                day,
                childIndex,
                childKey(day, index, section, childIndex, item),
                true,
                section.title
              )
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderTopLevelEvent = (event, day, index, keyValue) => {
    const isSaved = savedKeys.includes(keyValue);
    const category = getCategory(event);
    const categoryStyle = getCategoryStyle(category);
    const clickable = Boolean(event.isInteractive || event.details || event.link);
    const imagesList = event.images || (event.image ? [event.image] : []);

    return (
      <div
        key={keyValue}
        className="rounded-[2rem] overflow-hidden bg-white shadow-xl border border-gray-100"
        style={{ animation: `fadeInUp 0.45s ease-out ${index * 0.04}s both` }}
        onClick={() => clickable && openModal(event, day, keyValue)}
      >
        <div
          className={`p-6 relative overflow-hidden ${
            clickable ? 'cursor-pointer hover:shadow-2xl transition-all group' : ''
          }`}
        >
          <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-[#cb9d44]/10 blur-2xl"></div>

          <div className="relative z-10 flex items-start gap-4">
            
            {imagesList.length > 0 ? (
              <div className={`flex ${imagesList.length > 1 ? '-space-x-4' : ''} flex-shrink-0`}>
                {imagesList.slice(0, 3).map((img, i) => (
                  <div
                    key={i}
                    className={`w-16 h-16 rounded-2xl bg-cover bg-center shadow-sm relative ${imagesList.length > 1 ? 'border-2 border-white' : 'border border-gray-100'}`}
                    style={{ backgroundImage: `url("${asset(img)}")`, zIndex: 10 - i }}
                  />
                ))}
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl border border-gray-100 shadow-sm flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `${colors.gold}20` }}>
                <IconRenderer name={event.icon} color={colors.primaryBlue} size={26} />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {event.time && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase bg-[#0f1a82]/10 text-[#0f1a82]">
                    <Clock size={12} />
                    {event.time}
                  </span>
                )}

                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase border"
                  style={{
                    backgroundColor: categoryStyle.bg,
                    color: categoryStyle.text,
                    borderColor: categoryStyle.border,
                  }}
                >
                  {category}
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-[#111b2e] leading-tight">
                {event.title}
              </h3>

              {event.speaker && (
                <p className="text-sm font-bold text-[#c4442b] mt-1">
                  {event.speaker}
                </p>
              )}

              {event.role && (
                <p className="text-xs italic text-gray-500 mt-1 leading-relaxed">
                  {event.role}
                </p>
              )}

              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSavedKey(keyValue);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 bg-[#f8fafc] text-[#111b2e] border border-gray-100"
                >
                  <Bookmark
                    size={15}
                    fill={isSaved ? colors.gold : 'none'}
                    className="text-[#cb9d44]"
                  />
                  {isSaved ? 'Saved' : 'Save'}
                </button>

                {clickable && (
                  <div className="ml-auto rounded-full p-2 bg-[#cb9d44]/15 group-hover:bg-[#cb9d44]/30 transition-colors">
                    <ChevronRight size={20} className="text-[#cb9d44] animate-bounce-x" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen font-sans text-[#111b2e] transition-opacity duration-700 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundColor: colors.lightBg,
        backgroundImage: `
          radial-gradient(circle at top left, rgba(203,157,68,0.16), transparent 28%),
          radial-gradient(circle at bottom right, rgba(15,26,130,0.12), transparent 34%)
        `,
      }}
    >
      {/* Home Overlay View */}
      <div
        className={`fixed inset-0 z-[60] overflow-y-auto styled-scrollbar transition-all duration-700 transform ${
          showOverlay
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-10'
        }`}
        style={{
          background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.primaryBlue} 100%)`,
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#cb9d44]/20 blur-3xl"></div>
          <div className="absolute -bottom-28 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>

          <div className="max-w-md w-full text-white space-y-8 animate-fade-in-up py-10 relative z-10 pb-20">
            <div className="mb-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-5">
                <Sparkles size={14} className="text-[#cb9d44]" />
                <p className="uppercase tracking-[0.25em] text-[10px] font-bold text-[#cb9d44]">
                  Convention 2026
                </p>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                Focus on the Work of the Kingdom
              </h1>

              <p className="text-lg opacity-80 font-light italic text-[#e7b42c]">
                July 3 - 5, 2026
              </p>

              <div className="flex items-center justify-center gap-2 text-white/60 text-sm mt-3">
                <MapPin size={15} />
                <span>Church of God Sabbath-Keeping Ministries • Toronto</span>
              </div>
            </div>

            <div className="w-full mt-4 mb-2">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#cb9d44] mb-3">
                Countdown
              </p>
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                <div className="rounded-2xl bg-white/10 border border-white/10 p-3">
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#cb9d44]">
                    {countdown.days}
                  </p>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/60 mt-0.5">
                    {countdown.started ? 'Now' : 'Days'}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 border border-white/10 p-3">
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#cb9d44]">
                    {countdown.hours}
                  </p>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/60 mt-0.5">
                    Hours
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 border border-white/10 p-3">
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#cb9d44]">
                    {countdown.minutes}
                  </p>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/60 mt-0.5">
                    Mins
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 border border-white/10 p-3">
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#cb9d44]">
                    {countdown.seconds}
                  </p>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/60 mt-0.5">
                    Secs
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 w-full mt-8">
              <p className="text-sm font-medium opacity-70 uppercase tracking-widest mb-4">
                Select Experience
              </p>

              <button
                onClick={() => handleTabSelect('message')}
                className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all active:scale-95 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#a3612b] flex items-center justify-center text-white">
                    <ScrollText size={20} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg">Welcome Message</h3>
                    <p className="text-xs text-white/60">
                      Read the President&apos;s Letter
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-[#cb9d44] animate-bounce-x" />
              </button>

              {['friday', 'saturday', 'sunday'].map((day, index) => (
                <button
                  key={day}
                  onClick={() => handleTabSelect(day)}
                  className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all active:scale-95 group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center ${
                        day === 'friday'
                          ? 'bg-[#cb9d44] text-[#111b2e]'
                          : day === 'saturday'
                          ? 'bg-[#e7b42c] text-[#111b2e]'
                          : 'bg-[#cf6e2a] text-white'
                      }`}
                    >
                      <span className="font-bold">{index + 1}</span>
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg">{dayDisplay[day]}</h3>
                      <p className="text-xs text-white/60">{daySubtitles[day]}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-[#cb9d44] animate-bounce-x" />
                </button>
              ))}

              <button
                onClick={() => handleTabSelect('saved')}
                className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-[#cb9d44]/15 hover:bg-[#cb9d44]/25 border border-[#cb9d44]/25 transition-all active:scale-95 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#cb9d44] flex items-center justify-center text-[#111b2e]">
                    <Bookmark size={20} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg">My Saved Events</h3>
                    <p className="text-xs text-white/70">
                      {savedKeys.length} saved item{savedKeys.length === 1 ? '' : 's'}
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-[#cb9d44] animate-bounce-x" />
              </button>

              <button
                onClick={() => openModal(developerData)}
                className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-[#283a5c]/90 hover:bg-[#283a5c] border border-[#cb9d44]/20 transition-all active:scale-95 group mt-6 shadow-[0_4px_15px_rgba(40,58,92,0.5)]"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center border border-[#cb9d44]/30 bg-cover bg-center shadow-inner"
                    style={{ backgroundImage: `url("${asset(developerData.image)}")` }}
                  ></div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg text-[#cb9d44]">
                      {developerData.title}
                    </h3>
                    <p className="text-xs text-white/80 font-medium tracking-wide">
                      {developerData.speaker}
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-[#cb9d44] animate-bounce-x" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main App Container */}
      <div
        className={`transition-opacity duration-700 delay-300 ${
          showOverlay ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 min-h-screen relative'
        }`}
      >
        <header
          className="pt-14 pb-9 px-6 text-center text-white shadow-lg relative rounded-b-[2.5rem] overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.primaryBlue} 100%)`,
          }}
        >
          <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-[#cb9d44]/20 blur-3xl"></div>
          <div className="absolute -left-24 bottom-0 w-72 h-72 rounded-full bg-white/10 blur-3xl"></div>

          <div className="relative z-10">
            <p className="uppercase tracking-[0.3em] text-[10px] mb-2 font-bold text-[#cb9d44]">
              Convention 2026
            </p>

            <h1 className="text-3xl md:text-5xl font-extrabold mb-3 leading-tight">
              Focus on the Work of the Kingdom
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-medium text-white/80">
              <span className="inline-flex items-center gap-2">
                <Calendar size={14} /> July 3 - 5, 2026
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} /> Toronto
              </span>
            </div>
          </div>
        </header>

        <main
          key={activeTab}
          className="max-w-2xl mx-auto px-4 py-8 pb-36 md:pb-10 space-y-5 animate-tab-switch"
        >
          {activeTab === 'message' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="text-center mb-8">
                <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#cb9d44]/15 text-[#a3612b] text-[10px] font-extrabold uppercase tracking-[0.25em] mb-4">
                  <Sparkles size={14} />
                  Official Welcome
                </p>

                <h2 className="text-3xl font-extrabold text-[#0f1a82]">
                  Welcome Message
                </h2>

                <p className="text-[#a3612b] italic mt-2">
                  From the President and Vice-President
                </p>
              </div>

              <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border border-[#cb9d44]/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#cb9d44] opacity-5 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#0f1a82] opacity-5 rounded-full -ml-16 -mb-16"></div>

                <h3
                  className="text-2xl md:text-3xl font-bold text-[#0f1a82] mb-8 text-center leading-tight relative z-10"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Building God&apos;s Kingdom Together
                </h3>

                <div className="space-y-5 text-[#111b2e] leading-relaxed relative z-10 text-[15px] md:text-base">
                  <p>Dear Brothers and Sisters,</p>

                  <p>
                    As followers of Christ, we are called to a purpose greater than
                    ourselves—the building of God&apos;s Kingdom. This sacred work is
                    not limited to church buildings, programs, or events. It is
                    accomplished every day through our faithfulness, our service, our
                    witness, and our love for one another.
                  </p>

                  <p>
                    God&apos;s Kingdom is built whenever we share the Gospel, encourage a
                    struggling believer, serve those in need, or demonstrate
                    Christ-like character in our homes, workplaces, and communities.
                    Every act of kindness, every prayer offered in faith, and every
                    sacrifice made for the cause of Christ contributes to the
                    advancement of His Kingdom.
                  </p>

                  <p>
                    Jesus taught that the Kingdom of God grows from small beginnings.
                    Therefore, we should never underestimate the impact of our
                    individual contributions. When each member faithfully uses the
                    gifts and talents God has entrusted to them, the entire body
                    becomes stronger and more effective in fulfilling God&apos;s mission.
                  </p>

                  <p>
                    As we move forward together, let us remain united in purpose,
                    committed to discipleship, and focused on reaching others with the
                    hope found in Jesus Christ. Let us build not for our own
                    recognition, but for the glory of God and the expansion of His
                    Kingdom.
                  </p>

                  <p>
                    May we continue to seek God&apos;s guidance, trust His promises, and
                    work diligently until His will is done on earth as it is in heaven.
                  </p>

                  <div className="my-8 py-6 px-5 border-l-4 border-[#cb9d44] bg-[#cb9d44]/10 rounded-r-2xl italic text-[#7d5432] text-sm md:text-base">
                    &quot;Therefore, my beloved brethren, be steadfast, immovable,
                    always abounding in the work of the Lord, knowing that your labor
                    is not in vain in the Lord.&quot;
                    <br />
                    <span className="block mt-2 font-bold not-italic text-[#a3612b]">
                      — 1 Corinthians 15:58
                    </span>
                  </div>

                  <p>May God bless each of you as we labor together in His service.</p>

                  <div className="pt-8 mt-8 border-t border-gray-100">
                    <p
                      className="font-bold text-[#0f1a82] italic mb-6"
                      style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem' }}
                    >
                      Yours in Christ,
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-14 h-14 rounded-full bg-cover bg-center border-2 border-[#cb9d44] shadow-sm flex-shrink-0"
                          style={{ backgroundImage: `url("${asset(peopleImages.howardGreen)}")` }}
                        ></div>
                        <div>
                          <p className="font-bold text-[#111b2e] text-sm leading-tight">
                            Pastor Howard Green
                          </p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">
                            President of the Church of God Sabbath-Keeping Inc.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div
                          className="w-14 h-14 rounded-full bg-cover bg-center border-2 border-[#283a5c] shadow-sm flex-shrink-0"
                          style={{ backgroundImage: `url("${asset(peopleImages.mauriceBlagrove)}")` }}
                        ></div>
                        <div>
                          <p className="font-bold text-[#111b2e] text-sm leading-tight">
                            Pastor Maurice Blagrove
                          </p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">
                            Vice-President of the Church of God Sabbath-Keeping Inc.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {['friday', 'saturday', 'sunday'].includes(activeTab) && (
            <div className="space-y-5">
              <div className="text-center mb-6">
                <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#cb9d44]/15 text-[#a3612b] text-[10px] font-extrabold uppercase tracking-[0.25em] mb-4">
                  <Calendar size={14} />
                  {daySubtitles[activeTab]}
                </p>

                <h2 className="text-3xl font-extrabold text-[#0f1a82]">
                  {dayDisplay[activeTab]} Schedule
                </h2>

                <p className="text-gray-500 text-sm mt-2">
                  Main sections are highlighted. Tap an item to view more details.
                </p>
              </div>

              {renderNowNext(activeTab)}

              <div className="space-y-6">
                {scheduleData[activeTab].map((entry, index) => {
                  const keyValue = topKey(activeTab, index, entry);

                  if (isSection(entry)) {
                    return renderSectionCard(entry, activeTab, index, keyValue);
                  }

                  return renderTopLevelEvent(entry, activeTab, index, keyValue);
                })}
              </div>
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center mb-8">
                <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#cb9d44]/15 text-[#a3612b] text-[10px] font-extrabold uppercase tracking-[0.25em] mb-4">
                  <Bookmark size={14} />
                  Personal Schedule
                </p>

                <h2 className="text-3xl font-extrabold text-[#0f1a82]">
                  My Saved Events
                </h2>

                <p className="text-[#a3612b] italic mt-2">
                  Keep track of the moments you do not want to miss.
                </p>
              </div>

              {savedEntryObjects.length === 0 ? (
                <div className="bg-white rounded-[2rem] p-10 text-center shadow-sm border border-gray-100">
                  <div className="w-16 h-16 rounded-full bg-[#cb9d44]/15 flex items-center justify-center mx-auto mb-4">
                    <Bookmark size={28} className="text-[#cb9d44]" />
                  </div>

                  <h3 className="text-xl font-extrabold text-[#111b2e] mb-2">
                    No saved events yet
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Go to Friday, Saturday, or Sunday and tap Save on any event or main section.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {savedEntryObjects.map((item, index) => {
                    if (isSection(item.entry)) {
                      return renderSectionCard(item.entry, item.day, index, item.key);
                    }

                    return renderEventCard(
                      item.entry,
                      item.day,
                      index,
                      item.key,
                      false,
                      item.parentTitle
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="space-y-8 animate-fade-in-up">
              <div
                className="text-center py-8 px-4 relative overflow-hidden rounded-[2rem] shadow-xl"
                style={{ backgroundColor: colors.darkBlue }}
              >
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                <h2
                  className="text-4xl font-extrabold text-[#cb9d44] tracking-widest uppercase mb-2 relative z-10"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  The Feast
                </h2>
                <p className="text-white/80 italic font-medium relative z-10 flex items-center justify-center gap-2">
                  <Sparkles size={16} className="text-[#e7b42c]" />
                  Fellowship Lunch • Saturday Afternoon
                  <Sparkles size={16} className="text-[#e7b42c]" />
                </p>
              </div>

              <div className="rounded-2xl bg-[#cb9d44]/10 border border-[#cb9d44]/20 p-5 text-center">
                <p className="text-sm text-[#7d5432] font-bold leading-relaxed">
                  Menu selections are subject to change at the discretion of The Church of God Sabbath-Keeping Inc.
                </p>
              </div>

              {[
                {
                  title: 'Garden Fresh',
                  color: colors.gold,
                  items: [
                    {
                      name: 'Signature Garden Salad',
                      desc: 'Crisp mixed greens, ripe cherry tomatoes, cucumbers, and shaved carrots served with a light vinaigrette.',
                    },
                    {
                      name: 'Penne Pasta Salad',
                      desc: 'Al dente penne tossed with fresh seasonal vegetables and our signature sundried tomato dressing.',
                    },
                  ],
                },
                {
                  title: 'Main Courses',
                  color: colors.rust,
                  items: [
                    {
                      name: 'Authentic Jerk Chicken',
                      desc: 'Slow-marinated chicken grilled to perfection with traditional, smoky island spices.',
                    },
                    {
                      name: 'BBQ Fried Chicken',
                      desc: 'Crispy, golden-fried chicken heavily glazed in a rich, tangy, and sweet house-made barbecue sauce.',
                    },
                    {
                      name: 'Herb-Glazed Salmon',
                      desc: 'Oven-baked Atlantic salmon beautifully topped with a light citrus and fresh herb glaze.',
                    },
                    {
                      name: 'Rice and Peas',
                      desc: 'A classic Caribbean comfort side infused with rich coconut milk, fresh thyme, and scallions. Vegetarian friendly.',
                    },
                  ],
                },
                {
                  title: 'Sweet Endings',
                  color: colors.orange,
                  items: [
                    {
                      name: 'Sweet Potato Pudding',
                      desc: 'A rich, heavily spiced traditional pudding baked to a soft, caramelized perfection.',
                    },
                    {
                      name: 'Red Velvet Cake',
                      desc: 'Decadent, incredibly moist layers of red velvet topped with smooth cream cheese frosting.',
                    },
                    {
                      name: 'Classic Vanilla Cake',
                      desc: 'A classic, fluffy sponge cake delicately infused with real, sweet vanilla bean.',
                    },
                  ],
                },
              ].map((section) => (
                <div
                  key={section.title}
                  className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.05)] border relative overflow-hidden"
                  style={{ borderColor: `${section.color}33` }}
                >
                  <div
                    className="absolute top-0 left-0 w-2 h-full"
                    style={{ backgroundColor: section.color }}
                  ></div>

                  <div className="text-center mb-8">
                    <h3
                      className="text-2xl font-bold uppercase tracking-[0.2em] mb-1"
                      style={{
                        color: section.color,
                        fontFamily: 'Georgia, serif',
                      }}
                    >
                      {section.title}
                    </h3>
                    <div
                      className="w-16 h-0.5 mx-auto mb-2"
                      style={{ backgroundColor: section.color }}
                    ></div>
                  </div>

                  <div className="space-y-8">
                    {section.items.map((item) => (
                      <div className="relative" key={item.name}>
                        <div className="flex items-baseline w-full mb-1">
                          <h4 className="font-bold text-[#111b2e] text-lg bg-white pr-3 relative z-10">
                            {item.name}
                          </h4>
                          <div className="flex-grow border-b-2 border-dotted border-gray-300 mx-2 relative z-0"></div>
                          <span
                            className="font-bold bg-white pl-3 relative z-10"
                            style={{ color: section.color }}
                          >
                            <Utensils size={16} />
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 italic pr-8">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-[#0f1a82]">
                  Share Your Experience
                </h2>
                <p className="text-[#a3612b] italic mt-2">
                  We&apos;d love to hear your thoughts and suggestions.
                </p>
              </div>

              <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100">
                {feedbackSubmitted ? (
                  <div className="text-center py-12 animate-fade-in">
                    <CheckCircle size={48} className="text-[#cb9d44] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-[#111b2e] mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-500">
                      Your feedback has been successfully sent. We truly appreciate your time.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-[#111b2e] mb-2">
                        Name Optional
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#cb9d44] bg-[#f8fafc]"
                        placeholder="Your Name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#111b2e] mb-2">
                        Email Optional
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#cb9d44] bg-[#f8fafc]"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#111b2e] mb-2">
                        Your Feedback / Suggestions{' '}
                        <span className="text-[#c4442b]">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#cb9d44] resize-none bg-[#f8fafc]"
                        placeholder="Tell us what you loved or how we can improve..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-[#0f1a82] text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-[#111b2e] active:scale-95 transition-all"
                    >
                      <Send size={18} /> Submit Feedback
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {activeTab === 'prayer' && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-[#0f1a82]">
                  Prayer Requests
                </h2>
                <p className="text-[#a3612b] italic mt-2">
                  We believe in the power of prayer. Share your requests with us.
                </p>
              </div>

              <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100">
                {prayerSubmitted ? (
                  <div className="text-center py-12 animate-fade-in">
                    <Heart size={48} className="text-[#c4442b] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-[#111b2e] mb-2">
                      Received
                    </h3>
                    <p className="text-gray-500">
                      Your prayer request has been received. We will keep you in our prayers.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handlePrayerSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-[#111b2e] mb-2">
                        Name Optional
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c4442b] bg-[#f8fafc]"
                        placeholder="Your Name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#111b2e] mb-2">
                        Email Optional
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c4442b] bg-[#f8fafc]"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#111b2e] mb-2">
                        Your Prayer Request{' '}
                        <span className="text-[#c4442b]">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c4442b] resize-none bg-[#f8fafc]"
                        placeholder="How can we pray for you?"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-[#c4442b] text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-[#a3612b] active:scale-95 transition-all"
                    >
                      <MessageSquare size={18} /> Send Prayer Request
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Navigation Footer */}
      {!showOverlay && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl shadow-[0_-10px_30px_rgba(0,0,0,0.08)] border-t border-white/50 md:sticky md:top-0 md:shadow-sm overflow-x-auto styled-scrollbar md:pb-0 pb-safe relative">
          
          <div className="max-w-2xl mx-auto flex items-center justify-start md:justify-between gap-1 sm:gap-2 px-3 md:px-0 relative z-0 pb-1.5 md:pb-0 min-w-max">
            {navItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabSelect(tab.id)}
                className={`flex flex-col items-center justify-center w-[4.5rem] sm:w-[5rem] py-3 md:py-4 gap-1 md:flex-row md:w-auto md:px-6 transition-all relative shrink-0 ${
                  activeTab === tab.id
                    ? 'text-[#0f1a82]'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <div
                  className={`transition-transform duration-300 ${
                    activeTab === tab.id ? 'scale-110 md:scale-100' : 'scale-100'
                  }`}
                >
                  {tab.icon}
                </div>

                <span className="text-[8px] sm:text-[10px] md:text-xs uppercase tracking-wide md:tracking-widest font-bold whitespace-nowrap">
                  {tab.label}
                </span>

                {tab.id === 'saved' && savedKeys.length > 0 && (
                  <span className="absolute top-2 right-3 md:right-2 w-5 h-5 rounded-full bg-[#c4442b] text-white text-[10px] font-extrabold flex items-center justify-center">
                    {savedKeys.length}
                  </span>
                )}

                {activeTab === tab.id && (
                  <div className="absolute top-0 md:bottom-0 md:top-auto left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 md:right-0 w-8 md:w-full h-1 bg-[#cb9d44] rounded-b-full md:rounded-t-full md:rounded-b-none shadow-[0_2px_10px_rgba(203,157,68,0.5)] md:shadow-[0_-2px_10px_rgba(203,157,68,0.5)]"></div>
                )}
              </button>
            ))}
            
            {/* Adding Home Button directly into the navigation bar! */}
            <button
              onClick={() => setShowOverlay(true)}
              className="flex flex-col items-center justify-center w-[4.5rem] sm:w-[5rem] py-3 md:py-4 gap-1 md:flex-row md:w-auto md:px-6 transition-all relative shrink-0 text-[#a3612b] hover:text-[#7d5432]"
            >
              <div className="transition-transform duration-300 scale-100">
                <Home size={22} />
              </div>
              <span className="text-[8px] sm:text-[10px] md:text-xs uppercase tracking-wide md:tracking-widest font-bold whitespace-nowrap">
                Home
              </span>
            </button>
          </div>
        </nav>
      )}

      {/* Modern Compact Modal Design */}
      {modalData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#111b2e]/70 backdrop-blur-sm animate-fade-in"
            onClick={closeModal}
          ></div>

          <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden relative shadow-2xl animate-scale-in flex flex-col max-h-[88vh]">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-20 shadow-sm"
            >
              <X size={17} className="text-[#111b2e]" />
            </button>

            {/* Compact Header Layout */}
            <div className="px-6 pt-8 pb-5 bg-white border-b border-gray-100 flex items-start gap-5">
              
              {(() => {
                const modalImagesList = modalData.images || (modalData.image ? [modalData.image] : []);
                
                if (modalImagesList.length > 0) {
                  return (
                    <div className={`flex ${modalImagesList.length > 1 ? '-space-x-5' : ''} flex-shrink-0 mt-1`}>
                      {modalImagesList.slice(0, 3).map((img, i) => (
                        <div 
                          key={i}
                          className={`w-20 h-20 rounded-2xl bg-cover bg-center shadow-sm relative ${modalImagesList.length > 1 ? 'border-2 border-white' : 'border border-gray-100'}`} 
                          style={{ backgroundImage: `url("${asset(img)}")`, zIndex: 10 - i }}
                        />
                      ))}
                    </div>
                  );
                }
                
                return (
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-[#cb9d44]/15 border border-[#cb9d44]/30 flex-shrink-0 mt-1">
                    <IconRenderer name={modalData.icon} color={colors.gold} size={32} />
                  </div>
                );
              })()}
              
              <div className="flex-1 min-w-0 pr-8">
                {modalData.time && (
                  <p className="text-[10px] uppercase tracking-widest font-extrabold mb-1.5 text-[#cb9d44]">
                    {modalData.time}
                  </p>
                )}

                <h2 className="text-xl md:text-2xl font-extrabold text-[#111b2e] leading-tight break-words">
                  {modalData.title}
                </h2>

                {modalData.speaker && (
                  <p className="text-sm font-bold mt-1 text-[#0f1a82]">
                    {modalData.speaker}
                  </p>
                )}

                {modalDay && (
                  <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest font-bold">
                    {dayDisplay[modalDay]} • {daySubtitles[modalDay]}
                  </p>
                )}
              </div>
            </div>

            <div className="p-6 md:p-7 overflow-y-auto bg-gray-50/50 flex-1">
              {modalData.role && (
                <div className="mb-5 px-5 py-4 rounded-2xl bg-white border border-[#cb9d44]/20 shadow-sm">
                  <p className="text-sm text-[#7d5432] italic leading-relaxed">
                    {modalData.role}
                  </p>
                </div>
              )}

              {modalData.details ? (
                <div className="prose prose-sm text-gray-600 whitespace-pre-line leading-relaxed mb-4">
                  {modalData.details}
                </div>
              ) : (
                <p className="text-gray-500 text-sm leading-relaxed mb-2">
                  More details may be shared during the service.
                </p>
              )}

              <div className="flex flex-col gap-3 mt-6">
                {modalKey && (
                  <button
                    onClick={() => toggleSavedKey(modalKey)}
                    className={`w-full inline-flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl shadow-md transition-colors ${
                      savedKeys.includes(modalKey) 
                        ? 'bg-[#f8fafc] text-[#111b2e] border border-gray-200 hover:bg-gray-100'
                        : 'bg-[#111b2e] text-white hover:bg-[#0f1a82]'
                    }`}
                  >
                    <Bookmark
                      size={18}
                      fill={savedKeys.includes(modalKey) ? colors.gold : 'none'}
                      className={savedKeys.includes(modalKey) ? 'text-[#cb9d44]' : 'text-white'}
                    />
                    {savedKeys.includes(modalKey) ? 'Saved' : 'Save Event'}
                  </button>
                )}

                {modalData.link && (
                  <a
                    href={modalData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#cb9d44] text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-[#a3612b] transition-colors"
                  >
                    <ExternalLink size={18} />
                    {modalData.linkLabel || 'Open Link'}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(18px); }
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

            @keyframes bounce-x {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(4px); }
            }

            .animate-bounce-x {
              animation: bounce-x 2s infinite ease-in-out;
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

            /* Sleek, context-aware scrollbars for horizontal overflows */
            .styled-scrollbar::-webkit-scrollbar {
              height: 5px;
              width: 5px;
            }

            .styled-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }

            .styled-scrollbar::-webkit-scrollbar-thumb {
              background-color: rgba(203, 157, 68, 0.35); /* Subtle Gold */
              border-radius: 10px;
            }

            .styled-scrollbar::-webkit-scrollbar-thumb:hover {
              background-color: rgba(203, 157, 68, 0.7);
            }

            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }

            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }

            @supports (padding-bottom: env(safe-area-inset-bottom)) {
              .pb-safe {
                padding-bottom: env(safe-area-inset-bottom);
              }
            }
          `,
        }}
      />
    </div>
  );
}
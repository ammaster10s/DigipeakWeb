import React, { useState, useEffect } from 'react';
import { 
  Box, Settings, Zap, Play, AlertTriangle, ChevronRight, Cpu, MousePointer2,
  Menu, X, Globe, Code, Home, ArrowRight, Terminal, Trash2, Pause, 
  RotateCw, ArrowUp, Bluetooth, Usb, Eye, Ruler, Split, Navigation, 
  ShieldCheck, Rocket, ShoppingCart, Tag, Package, CreditCard, ChevronLeft,
  BookOpen, Clock, Lightbulb, Map, Target, Award, Info, Wrench, GraduationCap,
  Bot, Satellite, Trophy, RefreshCw, FileText, Medal, MapPin, Users, UserCheck,
  Palette, Factory, LineChart, Star, ArrowDown, ArrowLeft, RotateCcw, Timer
} from 'lucide-react';

const DroneSVG = ({ isFlying, rotate, z, size = 120, isFlipping }) => (
  <div
    className={`relative transition-all duration-700 ease-in-out ${isFlipping ? 'animate-flip' : ''}`}
    style={{ transform: `rotate(${rotate}deg) scale(${1 + (z / 200)})` }}
  >
    <svg width={size} height={size} viewBox="0 0 120 120">
      <path d="M40 40L80 80M80 40L40 80" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round"/>
      <rect x="45" y="45" width="30" height="30" rx="8" fill="#334155" />
      <rect x="52" y="52" width="16" height="10" rx="2" fill="#60a5fa" />
      {[ {x: 40, y: 40}, {x: 80, y: 40}, {x: 40, y: 80}, {x: 80, y: 80} ].map((m, i) => (
        <g key={i}>
          <circle cx={m.x} cy={m.y} r="8" fill="#1e293b" />
          <ellipse cx={m.x} cy={m.y} rx="15" ry="3" fill="#94a3b8">
             {isFlying && <animateTransform attributeName="transform" type="rotate" from={`0 ${m.x} ${m.y}`} to={`360 ${m.x} ${m.y}`} dur="0.4s" repeatCount="indefinite" />}
          </ellipse>
        </g>
      ))}
    </svg>
    <style>{`
      @keyframes flip-360 { 0% { transform: rotateX(0deg); } 100% { transform: rotateX(360deg); } }
      .animate-flip { animation: flip-360 0.6s ease-in-out; }
    `}</style>
  </div>
);

const App = () => {
  // --- States ---
  const [lang, setLang] = useState('en'); 
  const [view, setView] = useState('home'); // 'home', 'code', 'shop', 'curriculum'
  const [selectedCourse, setSelectedCourse] = useState(null); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  
  const [connection, setConnection] = useState({ type: null, status: 'disconnected', deviceName: '' });
  const [isScanning, setIsScanning] = useState(false);

  const [workspace, setWorkspace] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(-1);
  const [dronePos, setDronePos] = useState({ x: 0, y: 0, z: 0, rotate: 0, isFlying: false, isFlipping: false });
  const [sensorData, setSensorData] = useState({ tof: 0, opticalFlow: { vx: 0, vy: 0 } });

  // --- Load Custom Fonts ---
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Schoolbell&family=Mali:wght@400;700&family=Itim&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view, selectedCourse]);

  const content = {
    th: {
      nav: { home: "หน้าแรก", code: "ห้องแล็บ", shop: "ร้านค้า", curriculum: "หลักสูตร", connect: "เชื่อมต่อ" },
      hero: {
        badge: "ยินดีต้อนรับสู่ Codelift Academy 🎓",
        title1: "สร้างโดรนตัวแรก",
        title2: "ด้วยมือคุณเอง",
        sub: "เรียนรู้ผ่านการลงมือทำจริง ตั้งแต่การประกอบฮาร์ดแวร์ไปจนถึงการเขียนโค้ดควบคุมด้วยเซนเซอร์อัจฉริยะ",
        btnStart: "เริ่มเรียนเลย",
        btnLab: "เข้าสู่ห้องแล็บ"
      },
      curriculum: {
        title: "หลักสูตรนวัตกรโดรน",
        sub: "12 โมดูลการเรียนรู้ที่ครอบคลุมทุกทักษะแห่งอนาคต",
        duration: "60 นาทีต่อครั้ง",
        backBtn: "กลับไปหน้าหลักสูตร",
        headers: { content: "เนื้อหาหลัก", activity: "กิจกรรม", tip: "Expert Tip" },
        phases: [
          {
            name: "Phase 1: Flight Fundamentals",
            color: "bg-blue-500",
            courses: [
              { 
                id: 1, 
                name: "มหัศจรรย์แห่งการบิน", 
                timeline: ["0-15น. รู้จักโดรน", "15-35น. ฟิสิกส์การบิน", "35-50น. ฝึกบิน Simulator", "50-60น. สรุปเนื้อหา"],
                main: "โดรน Codelift บินได้ด้วยสมดุลของแรง 4 อย่าง:\n\n- แรงยก (Lift): เกิดจากใบพัดหมุนตัดอากาศ\n- น้ำหนัก (Weight): แรงโน้มถ่วงที่ดึงโดรนลงพื้น\n- แรงขับ (Thrust): แรงที่ส่งให้โดรนเคลื่อนที่ไปข้างหน้า\n- แรงต้าน (Drag): แรงเสียดทานอากาศที่คอยฉุดโดรนไว้",
                activity: "ฝึกควบคุมทิศทางผ่าน Simulator โดยจำลองการบินในสภาวะที่มีลมต้านเพื่อให้เข้าใจความสัมพันธ์ของแรงทั้งสี่",
                tip: "หัวใจของการบินคือสมดุล หากแรงยกมากกว่าน้ำหนัก โดรนจะลอยขึ้นทันที!"
              },
              { id: 2, name: "ชำแหละโดรน (Anatomy)", timeline: ["0-15น. รู้จักบอร์ด/มอเตอร์", "15-40น. ระบบควบคุม", "40-55น. ต่อสายสัญญาณ", "55-60น. เกมทดสอบ"], main: "โดรนประกอบด้วย: Flight Controller (ESP32-S3), มอเตอร์ CW/CCW, และเซนเซอร์ LiDAR", activity: "สำรวจบอร์ดและทดลองเสียบสายสัญญาณมอเตอร์", tip: "ใบพัด CW/CCW ต้องใส่ให้ถูกด้าน มิฉะนั้นโดรนจะบินไม่ขึ้น" },
              { id: 3, name: "นักบินมือใหม่ (Safety)", timeline: ["0-15น. กฎความปลอดภัย", "15-45น. ฝึกบินในพื้นที่ปิด", "45-60น. วิเคราะห์ปัญหา"], main: "Pre-flight Checklist: ตรวจ Battery, ใบพัด และพื้นที่ปลอดภัย", activity: "ฝึกบินนิ่ง (Hovering) 30 วินาที", tip: "ในเหตุฉุกเฉิน ให้กด Kill Switch ทันที!" }
            ]
          },
          {
            name: "Phase 2: The Maker & Hardware",
            color: "bg-pink-500",
            courses: [
              { id: 4, name: "ออกแบบโดรนในฝัน (3D)", timeline: ["0-15น. CAD Basics", "15-45น. ออกแบบชิ้นส่วน", "45-60น. ส่งออก STL"], main: "ออกแบบชิ้นส่วนโดรนที่เบาและแข็งแรงโดยใช้หลักวิศวกรรม", activity: "ออกแบบ Canopy หรือ Landing Gear ในแบบของคุณ", tip: "น้ำหนักที่ลดลงทุกกรัมช่วยให้บินได้นานขึ้น" },
              { id: 5, name: "พิมพ์สามมิติและวัสดุ", timeline: ["0-20น. ประเภทพลาสติก", "20-45น. การตั้งค่า Slicer", "45-60น. แกะชิ้นส่วน"], main: "เรียนรู้การใช้ PETG สำหรับโครงโดรนที่ทนทาน", activity: "ตั้งค่าเครื่องพิมพ์และเริ่มพิมพ์ชิ้นส่วนจริง", tip: "15-20% Infill คือจุดสมดุลที่ดีที่สุด" },
              { id: 6, name: "บัดกรีและงานวิศวกรรม", timeline: ["0-15น. Iron Safety", "15-45น. ประกอบวงจร", "45-60น. ตรวจสอบ"], main: "เชื่อมต่อมอเตอร์และบอร์ด ESP32 ด้วยตะกั่วบัดกรี", activity: "บัดกรีขั้วมอเตอร์และประกอบเฟรม", tip: "อย่าแช่หัวแร้งนานเกินไป เดี๋ยวชิปพัง!" }
            ]
          },
          {
            name: "Phase 3: Coding & Autonomous",
            color: "bg-purple-500",
            courses: [
              { id: 7, name: "บล็อกคำสั่งมหัศจรรย์", timeline: ["0-15น. ตรรกะโปรแกรม", "15-45น. ฝึกบินอัตโนมัติ", "45-60น. Debug"], main: "สร้างอัลกอริทึมการบินด้วยการเรียงลำดับบล็อก", activity: "เขียนคำสั่งให้โดรนบินเป็นรูปตัว S", tip: "โดรนทำตามคำสั่งเป๊ะๆ ถ้าโปรแกรมผิด โดรนก็ไปผิดทาง" },
              { id: 8, name: "เปลี่ยนโลกด้วย Python", timeline: ["0-20น. ไวยากรณ์ Python", "20-50น. สั่งการ ESP32", "50-60น. Comparison"], main: "ย้ายจากการลากบล็อกสู่การเขียนโค้ดภาษา Python มืออาชีพ", activity: "เขียนสคริปต์ควบคุมโดรนผ่านคีย์บอร์ด", tip: "การเว้นวรรค (Indentation) ใน Python สำคัญมาก" },
              { id: 9, name: "เซนเซอร์และระบบอัจฉริยะ", timeline: ["0-15น. LiDAR ToF", "15-45น. บินหลบสิ่งกีดขวาง", "45-60น. Semi-Auto"], main: "ใช้เลเซอร์วัดระยะทางเพื่อให้โดรนบินหลบสิ่งกีดขวางได้เอง", activity: "โปรแกรม Follow Hand (บินตามมือ)", tip: "LiDAR ทำงานได้ดีที่สุดในที่สว่าง" }
            ]
          },
          {
            name: "Phase 4: Advanced Skills",
            color: "bg-emerald-500",
            courses: [
              { id: 10, name: "กฎหมายและจริยธรรม", timeline: ["0-25น. CAAT Laws", "25-45น. จริยธรรมการบิน", "45-60น. Quiz"], main: "การจดทะเบียนโดรน กฎระเบียบ 90 เมตร และความเป็นส่วนตัว", activity: "จำลองการขออนุญาตบินจริง", tip: "ความปลอดภัยของผู้อื่นสำคัญที่สุด" },
              { id: 11, name: "โดรนกู้โลก (Rescue)", timeline: ["0-20น. Case Studies", "20-50น. จำลองภารกิจ", "50-60น. Idea"], main: "ประยุกต์ใช้โดรนในการส่งยาหรือสำรวจพื้นที่ภัยพิบัติ", activity: "ออกแบบภารกิจบินกู้ภัยจำลอง", tip: "นวัตกรรมที่ดีต้องช่วยแก้ปัญหาชีวิตคน" },
              { id: 12, name: "นวัตกรตัวจิ๋ว (Graduation)", timeline: ["0-30น. Final Tuning", "30-50น. Pitching", "50-60น. มอบเกียรรียบัตร"], main: "สรุปการเรียนรู้ นำเสนอผลงาน และรับเกียรติบัตร", activity: "Demo การบินนวัตกรรมที่คุณสร้างเอง", tip: "ความล้มเหลวคือส่วนหนึ่งของการเรียนรู้" }
            ]
          }
        ]
      },
      shop: {
        title: "ร้านค้า Codelift Academy",
        sub: "คัดสรรสื่อการสอนและอุปกรณ์นวัตกรรม เพื่อสร้างนวัตกรตัวจิ๋ว",
        buyBtn: "หยิบใส่ตะกร้า",
        currency: "บาท",
        socialProof: "นิยมมากในกลุ่มห้องเรียนพิเศษ STEM",
        categories: [
          {
            name: "1. ชุดโดรนเพื่อการศึกษา (Educational Kits)",
            items: [
              { 
                id: "s1", 
                name: "Codelift Starter Kit", 
                price: "TBA", 
                desc: "ชุดโดรนประกอบเองพื้นฐาน พร้อมบอร์ด ESP32-S3 และชุดเฟรม 3D Printed", 
                icon: <Package />,
                icons: [<Wrench size={14}/>, <Cpu size={14}/>, <GraduationCap size={14}/>],
                labels: ["Assembly", "ESP32 Ready", "Beginner"]
              },
              { 
                id: "s2", 
                name: "Codelift Advanced Bundle", 
                price: 4900, 
                desc: "ชุดโดรนพร้อมเซนเซอร์ LiDAR และ Optical Flow สำหรับการบินอัตโนมัติขั้นสูง", 
                icon: <Rocket />,
                icons: [<Bot size={14}/>, <Satellite size={14}/>, <Trophy size={14}/>],
                labels: ["AI & Auto", "Advanced Sensors", "Pro Portfolio"],
                featured: true
              },
              { 
                id: "s3", 
                name: "Power & Spare Parts Pack", 
                price: 850, 
                desc: "ชุดแบตเตอรี่สำรองและใบพัดสำรองเกรดพรีเมียม เพื่อการเรียนรู้ที่ต่อเนื่อง", 
                icon: <Zap />,
                icons: [<Zap size={14}/>, <RefreshCw size={14}/>],
                labels: ["Power", "Spare Parts"]
              }
            ]
          },
          {
            name: "2. หลักสูตรและเวิร์กช็อป (Courses & Workshops)",
            items: [
              { 
                id: "c1", 
                name: "Codelift Academy Full Access", 
                price: 1500, 
                desc: "สิทธิ์เข้าเรียนหลักสูตรออนไลน์ทั้ง 12 Module ตลอดชีพ พร้อมอัปเดตเนื้อหาใหม่", 
                icon: <BookOpen />,
                icons: [<FileText size={14}/>, <Terminal size={14}/>, <Medal size={14}/>],
                labels: ["Full Curriculum", "Python Mastery", "Certificate"]
              },
              { 
                id: "c2", 
                name: "Weekend Camp (Chiang Rai)", 
                price: 3500, 
                desc: "บัตรเข้าร่วมเวิร์กช็อปแบบเจอตัวที่จังหวัดเชียงราย (2 วัน 1 คืน) รวมที่พักและอาหาร", 
                icon: <MapPin />,
                icons: [<MapPin size={14}/>, <Users size={14}/>, <UserCheck size={14}/>],
                labels: ["Local Event", "Group Project", "Expert Mentoring"]
              }
            ]
          },
          {
            name: "3. บริการงานวิศวกรรม (Engineering Services)",
            items: [
              { 
                id: "v1", 
                name: "Custom 3D Printing Service", 
                price: 300, 
                desc: "บริการปริ้นชิ้นส่วนตามสั่งด้วยวัสดุ PETG-rCF หรือ TPU สำหรับงานวิศวกรรมโดรน", 
                icon: <Palette />,
                icons: [<Palette size={14}/>, <Factory size={14}/>, <Ruler size={14}/>],
                labels: ["Custom Design", "Industrial Grade", "Precision"]
              },
              { 
                id: "v2", 
                name: "Professional Drone Tuning", 
                price: 800, 
                desc: "บริการปรับจูน Flight Controller และ Calibrate เซนเซอร์โดยทีมวิศวกรผู้เชี่ยวชาญ", 
                icon: <Settings />,
                icons: [<Settings size={14}/>, <LineChart size={14}/>],
                labels: ["Tuning", "Performance"]
              }
            ]
          }
        ]
      },
      blockly: {
        title: "ห้องแล็บเขียนโปรแกรม",
        sub: "ท้าทายด้วย 12 ฟังก์ชันการบินอัจฉริยะ",
        run: "เริ่มบิน!",
        clear: "ล้างโค้ด",
        blocks: [
          { id: 'takeoff', label: "บินขึ้น (Takeoff)", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowUp size={16}/> },
          { id: 'land', label: "ลงจอด (Land)", color: "bg-orange-400", border: "border-orange-600", icon: <ArrowDown size={16}/> },
          { id: 'forward', label: "ไปข้างหน้า", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowUp size={16}/> },
          { id: 'backward', label: "ถอยหลัง", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowDown size={16}/> },
          { id: 'left', label: "ไปทางซ้าย", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowLeft size={16}/> },
          { id: 'right', label: "ไปทางขวา", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowRight size={16}/> },
          { id: 'turn_cw', label: "หมุนขวา 90°", color: "bg-indigo-400", border: "border-indigo-600", icon: <RotateCw size={16}/> },
          { id: 'turn_ccw', label: "หมุนซ้าย 90°", color: "bg-indigo-400", border: "border-indigo-600", icon: <RotateCcw size={16}/> },
          { id: 'flip', label: "ตีลังกา (Flip 360)", color: "bg-pink-500", border: "border-pink-600", icon: <RefreshCw size={16}/> },
          { id: 'wait', label: "รอ 1 วินาที", color: "bg-slate-400", border: "border-slate-600", icon: <Timer size={16}/> },
          { id: 'if_tof', label: "ถ้า ToF < 20cm ให้หยุด", color: "bg-emerald-500", border: "border-emerald-600", icon: <Split size={16}/> },
          { id: 'stop', label: "หยุดฉุกเฉิน", color: "bg-red-500", border: "border-red-700", icon: <AlertTriangle size={16}/> }
        ]
      }
    },
    en: {
      nav: { home: "Home", code: "Lab", shop: "Shop", curriculum: "Courses", connect: "Connect" },
      hero: {
        badge: "WELCOME TO CODELIFT ACADEMY 🎓",
        title1: "Build Your Own",
        title2: "Personal Drone",
        sub: "Learning by doing. From hardware assembly to high-level sensor-based coding.",
        btnStart: "Start Learning",
        btnLab: "Open Drone Lab"
      },
      curriculum: {
        title: "Drone Maker Curriculum",
        sub: "12 modules covering future engineering skills",
        duration: "60 mins per session",
        backBtn: "Back to List",
        headers: { content: "Core Content", activity: "Activity", tip: "Expert Tip" },
        phases: [
          {
            name: "Phase 1: Flight Fundamentals",
            color: "bg-blue-500",
            courses: [
              { id: 1, name: "Introduction to Flight", timeline: ["0-15m Intro", "15-35m Physics", "35-50m Sim", "50-60m Summary"], main: "Understand the 4 forces: Lift, Weight, Thrust, and Drag.", activity: "Practice flight control using the Simulator.", tip: "Balance is key for stable flight." },
              { id: 2, name: "Anatomy of Codelift", timeline: ["0-15m Board", "15-40m Control", "40-55m Signal", "55-60m Game"], main: "A drone is a flying robot with ESP32 brain, motors, and sensors.", activity: "Practice wiring the motor signal cables.", tip: "Installing props in the wrong direction is a common error." },
              { id: 3, name: "First Flight & Safety", timeline: ["0-15m Safety", "15-45m Indoor", "45-60m Analysis"], main: "Pre-flight: Check battery, props, and safe radius.", activity: "Practice eye-level hovering for 30 seconds.", tip: "Kill Switch is your best friend in emergencies." }
            ]
          },
          {
            name: "Phase 2: The Maker & Hardware",
            color: "bg-pink-500",
            courses: [
              { id: 4, name: "3D Drone Design", timeline: ["0-15m CAD", "15-45m Parts", "45-60m STL"], main: "Modular design with Aerodynamics and Weight Distribution.", activity: "Design your custom landing gear.", tip: "Every gram saved equals more flight time." },
              { id: 5, name: "3D Printing & Materials", timeline: ["0-20m Plastics", "20-45m Slicing", "45-60m Extract"], main: "Learn why PETG is better than PLA for drone frames.", activity: "Start printing your custom parts.", tip: "15-20% Infill density for strength." },
              { id: 6, name: "Soldering & Assembly", timeline: ["0-15m Iron", "15-45m Circuits", "45-60m Test"], main: "Bond motors to ESP32 using solder.", activity: "Solder motor pads and assemble the frame.", tip: "Don't overheat the chips while soldering." }
            ]
          },
          {
            name: "Phase 3: Coding & Autonomous",
            color: "bg-purple-500",
            courses: [
              { id: 7, name: "Block-based Coding", timeline: ["0-15m Logic", "15-45m Auto", "45-60m Debug"], main: "Sequences and Loops for autonomous flight.", activity: "Program an S-Curve autonomous path.", tip: "The drone follows code exactly as written." },
              { id: 8, name: "Transition to Python", timeline: ["0-20m Syntax", "20-50m ESP32", "50-60m Compare"], main: "Move from blocks to professional Python scripting.", activity: "Control drone via Python keyboard inputs.", tip: "Indentation is critical in Python code." },
              { id: 9, name: "Sensors & AI", timeline: ["0-15m LiDAR", "15-45m Collision", "45-60m Semi-Auto"], main: "LiDAR ToF for smart collision avoidance.", activity: "Program a 'Follow Hand' mode.", tip: "LiDAR works best in well-lit areas." }
            ]
          },
          {
            name: "Phase 4: Advanced Skills",
            color: "bg-emerald-500",
            courses: [
              { id: 10, name: "Laws & Ethics", timeline: ["0-25m CAAT", "25-45m Ethics", "45-60m Quiz"], main: "90m altitude limit and CAAT registration.", activity: "Simulate a community permit application.", tip: "Safety of others is your first priority." },
              { id: 11, name: "Real-world Apps", timeline: ["0-20m Case Studies", "20-50m Mission", "50-60m Idea"], main: "Drones for good: Agriculture and Search & Rescue.", activity: "Simulate a medical delivery mission.", tip: "Innovation must improve human lives." },
              { id: 12, name: "Final Graduation", timeline: ["0-30m Tuning", "30-50m Pitching", "50-60m Ceremony"], main: "Final tuning and project presentation.", activity: "Demo your project and get certified.", tip: "Failure is just another way of learning." }
            ]
          }
        ]
      },
      shop: {
        title: "Codelift Academy Shop",
        sub: "Curated kits and engineering parts for young makers.",
        buyBtn: "Add to Cart",
        currency: "THB",
        socialProof: "Popular in STEM gifted classes",
        categories: [
          {
            name: "1. Educational Kits",
            items: [
              { id: "s1", name: "Codelift Starter Kit", price: "TBA", desc: "Basic assembly kit with ESP32-S3 and 3D Printed frame.", icon: <Package />, icons: [<Wrench size={14}/>, <Cpu size={14}/>], labels: ["Assembly", "ESP32"] },
              { id: "s2", name: "Codelift Advanced Bundle", price: 4900, desc: "Full kit with LiDAR & Optical Flow for autonomous flight.", icon: <Rocket />, icons: [<Bot size={14}/>, <Satellite size={14}/>], labels: ["AI & Auto", "LiDAR"], featured: true },
              { id: "s3", name: "Power & Spare Parts Pack", price: 850, desc: "Premium batteries and propellers pack.", icon: <Zap />, icons: [<Zap size={14}/>, <RefreshCw size={14}/>], labels: ["Power", "Spares"] }
            ]
          },
          {
            name: "2. Courses & Workshops",
            items: [
              { id: "c1", name: "Full Access Online", price: 1500, desc: "Lifetime access to all 12 modules.", icon: <BookOpen />, icons: [<FileText size={14}/>, <Medal size={14}/>], labels: ["Lifetime", "Certificate"] },
              { id: "c2", name: "Weekend Camp", price: 3500, desc: "In-person 2D1N workshop in Chiang Rai.", icon: <MapPin />, icons: [<MapPin size={14}/>, <Users size={14}/>], labels: ["Event", "Expert"] }
            ]
          },
          {
            name: "3. Engineering Services",
            items: [
              { id: "v1", name: "Custom 3D Printing", price: 300, desc: "On-demand PETG-rCF or TPU printing.", icon: <Palette />, icons: [<Palette size={14}/>, <Factory size={14}/>], labels: ["PETG", "Precision"] },
              { id: "v2", name: "Professional Tuning", price: 800, desc: "Expert sensor calibration services.", icon: <Settings />, icons: [<Settings size={14}/>, <LineChart size={14}/>], labels: ["Tuning", "Pro"] }
            ]
          }
        ]
      },
      blockly: {
        title: "Coding Lab",
        sub: "Challenge yourself with 12 advanced flight functions.",
        run: "Run Program",
        clear: "Clear All",
        blocks: [
          { id: 'takeoff', label: "Takeoff", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowUp size={16}/> },
          { id: 'land', label: "Land", color: "bg-orange-400", border: "border-orange-600", icon: <ArrowDown size={16}/> },
          { id: 'forward', label: "Forward", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowUp size={16}/> },
          { id: 'backward', label: "Backward", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowDown size={16}/> },
          { id: 'left', label: "Move Left", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowLeft size={16}/> },
          { id: 'right', label: "Move Right", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowRight size={16}/> },
          { id: 'turn_cw', label: "Turn CW 90°", color: "bg-indigo-400", border: "border-indigo-600", icon: <RotateCw size={16}/> },
          { id: 'turn_ccw', label: "Turn CCW 90°", color: "bg-indigo-400", border: "border-indigo-600", icon: <RotateCcw size={16}/> },
          { id: 'flip', label: "Flip 360", color: "bg-pink-500", border: "border-pink-600", icon: <RefreshCw size={16}/> },
          { id: 'wait', label: "Wait 1s", color: "bg-slate-400", border: "border-slate-600", icon: <Timer size={16}/> },
          { id: 'if_tof', label: "If ToF < 20cm Stop", color: "bg-emerald-500", border: "border-emerald-600", icon: <Split size={16}/> },
          { id: 'stop', label: "Emergency Stop", color: "bg-red-500", border: "border-red-700", icon: <AlertTriangle size={16}/> }
        ]
      }
    }
  };

  const t = content[lang];
  const phaseTextClass = {
    'bg-blue-500': 'text-blue-600',
    'bg-pink-500': 'text-pink-600',
    'bg-purple-500': 'text-purple-600',
    'bg-emerald-500': 'text-emerald-600',
  };
  const phaseSoftClass = {
    'bg-blue-500': 'bg-blue-50',
    'bg-pink-500': 'bg-pink-50',
    'bg-purple-500': 'bg-purple-50',
    'bg-emerald-500': 'bg-emerald-50',
  };

  // --- Handlers ---
  const handleConnect = (type) => {
    setIsScanning(true);
    setTimeout(() => {
      setConnection({ type, status: 'connected', deviceName: type === 'ble' ? 'Codelift_v2_BLE' : 'Serial_Drone_Link' });
      setIsScanning(false);
    }, 1500);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const runProgram = async () => {
    if (workspace.length === 0 || isExecuting) return;
    setIsExecuting(true);
    for (let i = 0; i < workspace.length; i++) {
      setCurrentBlockIndex(i);
      const block = workspace[i];
      await new Promise(resolve => setTimeout(resolve, 800));
      setDronePos(prev => {
        let next = { ...prev };
        switch(block.id) {
          case 'takeoff': next = { ...prev, z: 60, isFlying: true }; break;
          case 'forward': next = { ...prev, y: prev.y - 40 }; break;
          case 'backward': next = { ...prev, y: prev.y + 40 }; break;
          case 'left': next = { ...prev, x: prev.x - 40 }; break;
          case 'right': next = { ...prev, x: prev.x + 40 }; break;
          case 'turn_cw': next = { ...prev, rotate: prev.rotate + 90 }; break;
          case 'turn_ccw': next = { ...prev, rotate: prev.rotate - 90 }; break;
          case 'flip': 
            next = { ...prev, isFlipping: true };
            setTimeout(() => setDronePos(d => ({ ...d, isFlipping: false })), 600);
            break;
          case 'land': next = { ...prev, z: 0, isFlying: false }; break;
          case 'stop': next = { ...prev, z: 0, isFlying: false }; break;
          default: break;
        }
        setSensorData({ 
          tof: next.z + (Math.random() * 2), 
          opticalFlow: { vx: (block.id === 'forward' || block.id === 'backward') ? 1.5 : 0, vy: 0 } 
        });
        return next;
      });
      if (block.id === 'stop') break;
    }
    setIsExecuting(false);
    setCurrentBlockIndex(-1);
  };

  return (
    <div className={`min-h-screen overflow-x-hidden bg-white text-slate-700 ${lang === 'th' ? "font-['Mali',sans-serif]" : "font-['Itim',sans-serif]"}`}>
      <style>{` .school-title { font-family: 'Schoolbell', 'Mali', cursive; } `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-blue-50 h-16 lg:h-20 flex items-center px-4 lg:px-12 shadow-sm">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-3 lg:gap-4 cursor-pointer group" onClick={() => {setView('home'); setSelectedCourse(null);}}>
             <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl lg:rounded-2xl flex items-center justify-center text-blue-500 shadow-lg shadow-blue-100/50 group-hover:scale-110 transition-transform">
               <Navigation size={24} className="lg:size-7" />
             </div>
             <div>
               <h1 className="school-title text-xl lg:text-2xl text-blue-400 leading-none">Codelift</h1>
               <p className="text-[8px] lg:text-[10px] uppercase font-bold tracking-widest text-slate-400">Academy</p>
             </div>
          </div>

          <div className="hidden lg:flex items-center gap-7 text-base">
            <button onClick={() => {setView('home'); setSelectedCourse(null);}} className={`hover:text-blue-500 transition-all ${view === 'home' ? 'text-blue-500 font-bold' : ''}`}>{t.nav.home}</button>
            <button onClick={() => {setView('curriculum'); setSelectedCourse(null);}} className={`hover:text-blue-500 transition-all ${view === 'curriculum' ? 'text-blue-500 font-bold' : ''}`}>{t.nav.curriculum}</button>
            <button onClick={() => {setView('code'); setSelectedCourse(null);}} className={`hover:text-blue-500 transition-all ${view === 'code' ? 'text-blue-500 font-bold' : ''}`}>{t.nav.code}</button>
            <button onClick={() => {setView('shop'); setSelectedCourse(null);}} className={`hover:text-blue-500 transition-all ${view === 'shop' ? 'text-blue-500 font-bold' : ''}`}>{t.nav.shop}</button>
            
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button onClick={() => setLang('th')} className={`px-3 py-1 rounded-lg text-sm transition-all ${lang === 'th' ? 'bg-white shadow-sm text-blue-500 font-bold' : 'text-slate-400'}`}>TH</button>
              <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-lg text-sm transition-all ${lang === 'en' ? 'bg-white shadow-sm text-blue-500 font-bold' : 'text-slate-400'}`}>EN</button>
            </div>

            <button aria-label="Open cart" className="relative cursor-pointer group" onClick={() => setView('shop')}>
               <ShoppingCart size={24} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
               {cart.length > 0 && (
                 <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                   {cart.length}
                 </span>
               )}
            </button>
          </div>
          <div className="flex items-center gap-4 lg:hidden">
            <button aria-label="Open cart" className="relative cursor-pointer group" onClick={() => setView('shop')}>
               <ShoppingCart size={24} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
               {cart.length > 0 && (
                 <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                   {cart.length}
                 </span>
               )}
            </button>
            <button aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="p-2 bg-slate-50 rounded-xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-20 px-6 space-y-6 lg:hidden animate-in slide-in-from-right duration-300">
           <button onClick={() => {setView('home'); setIsMenuOpen(false);}} className="block w-full text-left text-3xl school-title border-b pb-4 pt-4">{t.nav.home}</button>
           <button onClick={() => {setView('curriculum'); setIsMenuOpen(false);}} className="block w-full text-left text-3xl school-title border-b pb-4">{t.nav.curriculum}</button>
           <button onClick={() => {setView('code'); setIsMenuOpen(false);}} className="block w-full text-left text-3xl school-title border-b pb-4">{t.nav.code}</button>
           <button onClick={() => {setView('shop'); setIsMenuOpen(false);}} className="block w-full text-left text-3xl school-title border-b pb-4">{t.nav.shop}</button>
           <div className="flex gap-4 pt-4">
              <button onClick={() => setLang('th')} className={`p-4 rounded-2xl flex-1 border-2 text-lg ${lang === 'th' ? 'border-blue-400 text-blue-400 font-bold bg-blue-50' : 'border-slate-100'}`}>ไทย</button>
              <button onClick={() => setLang('en')} className={`p-4 rounded-2xl flex-1 border-2 text-lg ${lang === 'en' ? 'border-blue-400 text-blue-400 font-bold bg-blue-50' : 'border-slate-100'}`}>English</button>
           </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="pt-16 lg:pt-20 min-h-[calc(100vh-80px)]">
        {view === 'home' && (
          <main className="animate-in fade-in duration-700">
            <section className="pt-14 sm:pt-20 lg:pt-28 pb-14 lg:pb-20 px-4 sm:px-6 text-center max-w-6xl mx-auto">
               <div className="inline-flex max-w-full px-4 sm:px-5 py-2 bg-blue-50 text-blue-500 rounded-full text-[10px] sm:text-xs font-bold mb-6 lg:mb-8 tracking-widest uppercase">
                  {t.hero.badge}
               </div>
               <h2 className="school-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 lg:mb-8 text-slate-800 leading-[1.05]">
                 {t.hero.title1} <br/> <span className="text-blue-400">{t.hero.title2}</span>
               </h2>
               <p className="text-base sm:text-lg md:text-2xl text-slate-500 mb-8 lg:mb-10 leading-relaxed max-w-4xl mx-auto font-light">
                 {t.hero.sub}
               </p>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 lg:mb-12">
                  {(lang === 'th'
                    ? [['12 โมดูล', 'หลักสูตร STEM ครบเส้นทาง'], ['ภาคปฏิบัติ', 'ประกอบ บิน เขียนโค้ด'], ['ESP32-S3', 'พร้อมเซนเซอร์ LiDAR/Flow']]
                    : [['12 Modules', 'Complete STEM pathway'], ['Hands-on', 'Build, fly, and code'], ['ESP32-S3', 'LiDAR and Flow ready']]
                  ).map(([value, label]) => (
                    <div key={value} className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-4">
                      <div className="text-2xl sm:text-3xl font-bold text-slate-800">{value}</div>
                      <div className="text-xs sm:text-sm text-slate-400 mt-1">{label}</div>
                    </div>
                  ))}
               </div>
               <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                  <button onClick={() => setView('curriculum')} className="bg-blue-400 text-white px-8 sm:px-12 py-3.5 sm:py-4 rounded-2xl text-lg sm:text-xl font-bold shadow-xl hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 shadow-blue-200">
                     {t.hero.btnStart}
                  </button>
                  <button onClick={() => setView('code')} className="bg-white border-2 border-slate-200 text-slate-500 px-8 sm:px-12 py-3.5 sm:py-4 rounded-2xl text-lg sm:text-xl font-bold hover:border-blue-400 transition-all flex items-center justify-center gap-3 sm:gap-4 shadow-sm active:scale-95">
                     <Code size={24} /> {t.nav.code}
                  </button>
               </div>
               <div className="mt-14 lg:mt-20 flex justify-center animate-bounce duration-[4000ms]">
                  <DroneSVG isFlying={true} rotate={8} z={80} size={160} />
               </div>
            </section>
          </main>
        )}

        {view === 'curriculum' && (
          <main className="animate-in fade-in duration-700 py-8 sm:py-12 px-4 sm:px-6 lg:px-10 xl:px-16 max-w-7xl mx-auto">
             {!selectedCourse ? (
               <>
                 <div className="text-center mb-10 lg:mb-14">
                    <h2 className="school-title text-3xl sm:text-4xl md:text-5xl mb-3 text-slate-800">{t.curriculum.title}</h2>
                    <p className="text-sm sm:text-lg text-slate-400 flex items-center justify-center gap-2">
                      <Clock size={18} /> {t.curriculum.duration}
                    </p>
                    <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-slate-500 leading-relaxed">
                      {lang === 'th'
                        ? 'ผู้เรียนจะได้เข้าใจการบิน ความปลอดภัย การออกแบบชิ้นส่วน การประกอบวงจร และการเขียนโปรแกรมควบคุมโดรนแบบเป็นขั้นตอน'
                        : 'Students progress from flight safety and drone anatomy to hardware assembly, 3D design, sensor logic, and autonomous programming.'}
                    </p>
                 </div>

                 <div className="grid lg:grid-cols-2 gap-5 lg:gap-7">
                    {t.curriculum.phases.map((phase, pIdx) => (
                      <div key={pIdx} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                         <div className={`${phase.color} p-5 lg:p-6 text-white`}>
                            <h3 className="school-title text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">{phase.name}</h3>
                         </div>
                         <div className="p-3 sm:p-4 lg:p-5 space-y-3 flex-grow">
                            {phase.courses.map((course) => (
                              <div 
                                key={course.id} 
                                onClick={() => setSelectedCourse(course)}
                                className="group cursor-pointer border-b border-slate-50 pb-3 last:border-0 last:pb-0 hover:bg-slate-50/80 p-3 rounded-2xl transition-all"
                              >
                                 <div className="flex items-start gap-3 mb-2">
                                    <div className={`w-8 h-8 shrink-0 rounded-xl ${phaseSoftClass[phase.color]} ${phaseTextClass[phase.color]} flex items-center justify-center text-xs font-bold`}>
                                       {course.id}
                                    </div>
                                    <div className="min-w-0 flex-grow text-base">
                                       <h4 className="font-bold text-slate-700 group-hover:text-blue-500 transition-colors flex items-start justify-between gap-3 leading-snug">
                                         <span>{course.name}</span>
                                         <ChevronRight size={16} className="mt-1 shrink-0 opacity-30 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-1" />
                                       </h4>
                                       <div className="flex flex-wrap gap-2 mt-2">
                                          {course.timeline.slice(0,2).map((item, i) => (
                                            <span key={i} className="text-[10px] sm:text-xs text-slate-400 bg-white px-2 py-0.5 rounded-lg border border-slate-100">{item}</span>
                                          ))}
                                          <span className="text-[10px] sm:text-xs text-blue-400">{lang === 'th' ? 'ดูรายละเอียด' : 'Details'}</span>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                            ))}
                         </div>
                      </div>
                    ))}
                 </div>
               </>
             ) : (
               <div className="animate-in slide-in-from-right duration-500 bg-white rounded-3xl lg:rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden max-w-4xl mx-auto">
                  <div className="bg-slate-50 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100">
                     <button onClick={() => setSelectedCourse(null)} className="flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors font-bold text-sm sm:text-base"><ChevronLeft /> {t.curriculum.backBtn}</button>
                     <div className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 w-fit"><Award size={14} /> Course {selectedCourse.id}</div>
                  </div>
                  <div className="p-5 sm:p-8 lg:p-10">
                     <h2 className="school-title text-3xl sm:text-4xl lg:text-5xl text-slate-800 mb-6 lg:mb-8 leading-tight">{selectedCourse.name}</h2>
                     <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-12">
                        <div className="md:col-span-2 space-y-10">
                           <section>
                              <h4 className="flex items-center gap-3 text-blue-500 font-bold text-lg sm:text-xl mb-3"><BookOpen size={22} /> {t.curriculum.headers.content}</h4>
                              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light bg-blue-50/40 p-4 sm:p-6 rounded-2xl border border-blue-50 whitespace-pre-wrap">{selectedCourse.main}</p>
                           </section>
                           <section>
                              <h4 className="flex items-center gap-3 text-pink-500 font-bold text-lg sm:text-xl mb-3"><Target size={22} /> {t.curriculum.headers.activity}</h4>
                              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light bg-pink-50/40 p-4 sm:p-6 rounded-2xl border border-pink-50">{selectedCourse.activity}</p>
                           </section>
                        </div>
                        <div className="space-y-5">
                           <div className="bg-slate-50 p-5 sm:p-6 rounded-3xl border border-slate-100">
                              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Clock size={14} /> Timeline</h4>
                              <div className="space-y-3">
                                 {selectedCourse.timeline.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm text-slate-500 font-medium leading-snug">
                                       <div className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-blue-400"></div><span>{item}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                           <div className="bg-amber-50 p-5 sm:p-6 rounded-3xl border border-amber-100 relative overflow-hidden">
                              <Lightbulb size={40} className="absolute top-0 right-0 p-2 text-amber-200/50" strokeWidth={3} />
                              <h4 className="text-amber-600 font-bold text-base mb-2 relative z-10 flex items-center gap-2"><Info size={16} /> {t.curriculum.headers.tip}</h4>
                              <p className="text-amber-700/80 text-sm italic relative z-10">"{selectedCourse.tip}"</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
             )}
          </main>
        )}

        {view === 'code' && (
          <main className="animate-in slide-in-from-bottom-6 duration-700 p-4 sm:p-6 lg:p-8 max-w-[1700px] mx-auto">
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-6 lg:mb-8 gap-4 lg:gap-6">
               <div className="max-w-2xl">
                  <h2 className="school-title text-3xl sm:text-4xl text-slate-800 leading-tight">{t.blockly.title}</h2>
                  <p className="text-sm lg:text-base text-slate-500 mt-1 lg:mt-2 font-light">{t.blockly.sub}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] sm:text-xs font-bold text-slate-400">
                    <span className="rounded-full bg-slate-100 px-3 py-1">{lang === 'th' ? 'ลากแนวคิดเป็นลำดับคำสั่ง' : 'Sequence flight commands'}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1">{lang === 'th' ? 'จำลองข้อมูลเซนเซอร์' : 'Live sensor simulation'}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1">{connection.status === 'connected' ? connection.deviceName : (lang === 'th' ? 'ยังไม่เชื่อมต่อ' : 'Disconnected')}</span>
                  </div>
               </div>
               <div className="grid grid-cols-[1fr_auto_1fr] sm:flex sm:flex-wrap gap-2 lg:gap-4 items-center w-full lg:w-auto">
                  <button aria-label="Connect drone" onClick={() => handleConnect('ble')} className={`min-w-0 flex items-center justify-center gap-2 lg:gap-3 px-3 lg:px-6 py-2.5 lg:py-3 rounded-2xl text-sm lg:text-base font-bold border-2 transition-all ${connection.status === 'connected' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-white text-slate-400 border-slate-200 hover:border-blue-300'}`}>
                     <Bluetooth size={18} className={connection.status === 'connected' ? "animate-pulse" : ""} />
                     <span className="truncate max-w-[100px] lg:max-w-none">{isScanning ? (lang === 'th' ? 'กำลังหา...' : 'Scanning...') : (connection.status === 'connected' ? connection.deviceName : 'Connect')}</span>
                  </button>
                  <button aria-label="Clear workspace" onClick={() => setWorkspace([])} className="bg-white border-2 p-2.5 lg:p-3 rounded-2xl text-slate-400 hover:text-red-400 transition-colors"><Trash2 size={20}/></button>
                  <button onClick={runProgram} disabled={isExecuting || workspace.length === 0} className={`min-w-0 px-4 lg:px-12 py-2.5 lg:py-3 rounded-2xl text-white font-bold text-base lg:text-xl shadow-xl transition-all active:scale-95 ${isExecuting || workspace.length === 0 ? 'bg-slate-300' : 'bg-blue-500 hover:bg-blue-600 shadow-blue-200'}`}>
                     {isExecuting ? '...' : t.blockly.run}
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-6 h-auto xl:h-[750px]">
               {/* Blocks Palette */}
               <div className="xl:col-span-3 order-2 xl:order-1 bg-white rounded-3xl p-4 lg:p-5 border border-slate-100 shadow-sm flex flex-col max-h-[420px] xl:max-h-full">
                  <h3 className="text-[10px] lg:text-xs uppercase font-bold text-slate-300 tracking-widest mb-3 lg:mb-4">Toolbox</h3>
                  <div className="flex xl:flex-col overflow-x-auto xl:overflow-y-auto gap-2 lg:gap-3 pb-2 xl:pb-0 scrollbar-hide">
                     {t.blockly.blocks.map(b => (
                       <button key={b.id} onClick={() => setWorkspace([...workspace, {...b, i: Date.now()}])} className={`flex-shrink-0 xl:flex-shrink min-w-[132px] xl:min-w-0 xl:w-full p-2.5 lg:p-3 rounded-xl ${b.color} text-white text-[11px] lg:text-sm font-bold flex items-center gap-2 lg:gap-3 shadow-md border-b-4 ${b.border} active:translate-y-1 transition-all text-left`}>
                          <div className="bg-white/20 p-1 lg:p-1.5 rounded-lg shrink-0">{React.cloneElement(b.icon, { size: 12 })}</div>
                          <span className="leading-snug">{b.label}</span>
                       </button>
                     ))}
                  </div>
               </div>

               {/* Workspace */}
               <div className="xl:col-span-5 order-3 xl:order-2 bg-white rounded-3xl lg:rounded-[2.25rem] p-4 sm:p-6 lg:p-7 border-2 border-slate-50 shadow-inner min-h-[320px] xl:min-h-0 overflow-y-auto relative bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] lg:[background-size:24px_24px]">
                  <div className="bg-slate-800 text-white p-3 lg:p-4 rounded-xl lg:rounded-2xl w-full sm:w-fit flex items-center gap-3 lg:gap-4 mb-4 lg:mb-6 shadow-xl text-sm lg:text-lg ring-4 ring-slate-100">
                     <div className="bg-purple-500 p-1.5 lg:p-2 rounded-lg lg:rounded-xl shrink-0"><Play size={14} fill="white" /></div>
                     <span>{lang === 'th' ? 'จุดเริ่มทำงาน' : 'On Start'}</span>
                  </div>
                  <div className="ml-2 sm:ml-6 lg:ml-10 space-y-2 pb-10">
                     {workspace.map((block, i) => (
                       <div key={block.i} className={`${block.color} text-white p-3 lg:p-4 rounded-xl lg:rounded-2xl w-full max-w-[360px] flex items-center gap-3 lg:gap-4 shadow-md border-b-4 border-black/10 text-xs sm:text-sm lg:text-base transition-all ${currentBlockIndex === i ? 'ring-4 ring-yellow-400 scale-[1.02] z-10 translate-x-1 sm:translate-x-3' : ''}`}>
                          <span className="shrink-0">{React.cloneElement(block.icon, { size: 16 })}</span>
                          <span className="leading-snug">{block.label}</span>
                       </div>
                     ))}
                     {workspace.length === 0 && (
                       <div className="max-w-sm rounded-2xl border border-dashed border-slate-200 bg-white/80 p-5 text-sm text-slate-400">
                         {lang === 'th' ? 'เลือกบล็อกจาก Toolbox เพื่อสร้างลำดับคำสั่งบิน' : 'Choose blocks from the toolbox to build a flight sequence.'}
                       </div>
                     )}
                  </div>
               </div>

               {/* Simulator */}
               <div className="xl:col-span-4 order-1 xl:order-3 space-y-4 lg:space-y-6">
                  <div className="bg-slate-900 rounded-3xl lg:rounded-[2.5rem] aspect-video xl:aspect-square shadow-2xl relative overflow-hidden flex items-center justify-center border-4 border-slate-800">
                     <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] lg:bg-[size:50px_50px]"></div>
                     <div className="z-10 transition-all duration-700" style={{ transform: `translate(${dronePos.x}px, ${dronePos.y}px)` }}>
                        <DroneSVG isFlying={dronePos.isFlying} rotate={dronePos.rotate} z={dronePos.z} size={90} isFlipping={dronePos.isFlipping} />
                     </div>
                     <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 text-[8px] lg:text-[10px] font-mono text-white/40 bg-black/40 px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl backdrop-blur-md">
                        X: {dronePos.x} | Y: {dronePos.y} | Z: {dronePos.z}
                     </div>
                  </div>
                  <div className="bg-white rounded-3xl p-4 lg:p-5 border border-slate-100 shadow-sm grid grid-cols-2 gap-3 lg:gap-4">
                     <div className="p-3 lg:p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center min-w-0">
                        <div className="text-[8px] lg:text-[10px] text-slate-400 font-bold mb-0.5 lg:mb-1 uppercase tracking-tight">ToF Distance</div>
                        <div className="text-sm lg:text-xl font-mono text-blue-500 font-bold">{sensorData.tof.toFixed(1)} cm</div>
                     </div>
                     <div className="p-3 lg:p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center min-w-0">
                        <div className="text-[8px] lg:text-[10px] text-slate-400 font-bold mb-0.5 lg:mb-1 uppercase tracking-tight">Opt. Flow</div>
                        <div className="text-sm lg:text-xl font-mono text-emerald-500 font-bold">{sensorData.opticalFlow.vx.toFixed(1)} m/s</div>
                     </div>
                  </div>
               </div>
            </div>
          </main>
        )}

        {view === 'shop' && (
          <main className="animate-in fade-in duration-700 py-8 sm:py-12 px-4 sm:px-6 lg:px-10 xl:px-16 max-w-7xl mx-auto">
            <div className="text-center mb-10 lg:mb-14">
               <h2 className="school-title text-3xl sm:text-4xl md:text-5xl mb-3 text-slate-800 leading-tight">{t.shop.title}</h2>
               <p className="text-sm sm:text-lg text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">{t.shop.sub}</p>
               <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                 {(lang === 'th'
                   ? [['สำหรับโรงเรียน', 'จัดชุดอุปกรณ์และหลักสูตรให้พร้อมใช้ในห้องเรียน'], ['บริการหลังการขาย', 'มีอะไหล่ ปรับจูน และคำแนะนำจากทีมวิศวกร'], ['เวิร์กช็อป', 'เหมาะกับค่าย STEM ชมรม และโปรเจกต์นักเรียน']]
                   : [['For Schools', 'Kits and lessons prepared for classroom use'], ['After-sales', 'Spares, tuning, and engineer guidance'], ['Workshops', 'Built for STEM camps, clubs, and student projects']]
                 ).map(([title, copy]) => (
                   <div key={title} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                     <div className="text-sm font-bold text-slate-700">{title}</div>
                     <div className="mt-1 text-xs text-slate-400 leading-relaxed">{copy}</div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="space-y-14 lg:space-y-20">
               {t.shop.categories.map((category, catIdx) => (
                 <section key={catIdx}>
                    <h3 className="school-title text-2xl sm:text-3xl text-slate-700 mb-6 lg:mb-8 pb-4 border-b border-slate-100 flex items-start gap-3 leading-tight">
                       <Package className="text-blue-400 shrink-0 mt-1" /> <span>{category.name}</span>
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
                       {category.items.map((item) => (
                         <div key={item.id} className={`bg-white rounded-3xl p-5 sm:p-6 lg:p-8 border-2 transition-all group flex flex-col items-center relative shadow-sm hover:shadow-xl min-w-0 ${item.featured ? 'border-blue-200' : 'border-slate-100'}`}>
                            {item.featured && (
                              <div className="absolute -top-3 bg-orange-500 text-white px-4 py-1 rounded-full text-[10px] font-bold shadow-lg flex items-center gap-2 animate-bounce">
                                 <Star size={10} fill="white" /> Recommended
                              </div>
                            )}
                            
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-5 sm:mb-7 text-4xl text-blue-400 group-hover:rotate-12 transition-transform border border-slate-50">
                               {item.icon && (typeof item.icon === 'string' ? item.icon : React.cloneElement(item.icon, { size: 40 }))}
                            </div>

                            <h4 className="text-base sm:text-lg font-bold text-slate-800 mb-4 text-center leading-snug min-h-[3rem] flex items-center">{item.name}</h4>
                            
                            <div className="flex flex-wrap justify-center gap-2 mb-5">
                               {item.labels.map((label, lIdx) => (
                                 <div key={lIdx} className="flex items-center gap-1.5 bg-slate-50 text-slate-400 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border border-slate-100 leading-tight">
                                    <span className="shrink-0">{item.icons[lIdx]}</span><span>{label}</span>
                                 </div>
                               ))}
                            </div>

                            <p className="text-xs sm:text-sm text-slate-500 text-center mb-6 font-light leading-relaxed flex-grow">
                               {item.desc}
                            </p>

                            <div className="mt-auto w-full flex flex-col items-center gap-4">
                               <div className="text-2xl sm:text-3xl font-bold text-slate-800 text-center leading-tight">
                                  {item.price === "TBA" ? "To be announced" : `${item.price.toLocaleString()} ${t.shop.currency}`}
                               </div>
                               <button 
                                onClick={() => addToCart(item)}
                                className={`w-full py-3.5 sm:py-4 px-3 rounded-2xl text-sm sm:text-base font-bold transition-all flex items-center justify-center gap-3 active:scale-95 ${item.featured ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-200 shadow-lg' : 'bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white'}`}
                               >
                                  <ShoppingCart size={18} /> {t.shop.buyBtn}
                                </button>
                               <div className="flex items-start justify-center gap-2 text-[10px] text-emerald-500 font-bold text-center leading-snug">
                                  <ShieldCheck size={12} className="shrink-0 mt-0.5" /> <span>{t.shop.socialProof}</span>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </section>
               ))}
            </div>

            <div className="mt-16 lg:mt-24 bg-slate-900 rounded-3xl lg:rounded-[3rem] p-6 sm:p-8 lg:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-10 shadow-2xl border-4 border-slate-800 relative overflow-hidden">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
               <div className="relative z-10 space-y-4 max-w-xl text-center md:text-left">
                  <h3 className="school-title text-3xl sm:text-4xl leading-tight">Engineering Powerhouse</h3>
                  <p className="text-slate-400 text-sm sm:text-lg leading-relaxed">ต่อยอดจินตนาการด้วยงานผลิตคุณภาพสูงจาก <span className="text-blue-400 font-bold">Kaiklom Printing</span> เราใช้วัสดุเกรดวิศวกรรมเพื่อโดรนของคุณโดยเฉพาะ</p>
               </div>
               <div className="relative z-10 flex gap-4">
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col items-center">
                     <Factory size={40} className="text-blue-400 mb-2" />
                     <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Kaiklom Printing</span>
                  </div>
               </div>
            </div>
          </main>
        )}
      </div>

      <footer className="py-12 sm:py-16 px-4 sm:px-10 border-t border-slate-50 bg-white mt-8 lg:mt-12">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 lg:gap-12 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
               <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500 shadow-xl shadow-blue-100 shrink-0">
                  <Navigation size={28} />
               </div>
               <div>
                  <span className="school-title text-2xl sm:text-3xl text-blue-400 leading-tight">Codelift Academy</span>
                  <p className="text-slate-400 text-base sm:text-lg mt-1 font-light italic">Learning to Fly.</p>
               </div>
            </div>
            <div className="flex gap-4 sm:gap-8">
               {[<Globe size={24}/>, <Cpu size={24}/>, <Terminal size={24}/>].map((icon, i) => (
                 <div key={i} className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-all cursor-pointer hover:bg-blue-50 hover:shadow-xl hover:-translate-y-2">{icon}</div>
               ))}
            </div>
         </div>
      </footer>
    </div>
  );
};

export default App;

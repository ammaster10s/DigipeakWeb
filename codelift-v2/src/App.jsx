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

const App = () => {
  // --- States ---
  const [lang, setLang] = useState('en');
  const [view, setView] = useState('home'); // 'home', 'code', 'shop', 'curriculum'
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
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
        title: "หลักสูตรนวัตกรโดรนจิ๋ว 🛸",
        sub: "12 บทเรียนสุดสนุกที่จะเปลี่ยนน้องๆ ให้เป็นวิศวกรตัวน้อย",
        duration: "60 นาทีแห่งความสนุก",
        backBtn: "กลับไปเลือกบทเรียน",
        headers: { content: "เราจะได้เรียนอะไรกันนะ?", activity: "มาลงมือทำกันเลย!", tip: "เคล็ดลับจากพี่วิศวกร" },
        phases: [
          {
            name: "Phase 1: พื้นฐานการบินแสนสนุก",
            color: "bg-blue-500",
            courses: [
              {
                id: 1,
                name: "มหัศจรรย์แห่งการบิน",
                timeline: ["0-15น. รู้จักโดรน", "15-35น. พลังวิเศษ 4 อย่าง", "35-50น. ฝึกบิน Simulator", "50-60น. สรุปความสนุก"],
                main: "รู้ไหมว่าโดรนบินได้อย่างไร? 🛸 เหมือนมีพลังวิเศษเลย!\n\n✨ **แรงยก**: ใบพัดหมุนปิ้วๆ สร้างลมช่วยดันให้เราลอยขึ้นฟ้า\n🍎 **แรงโน้มถ่วง**: โลกพยายามดึงเราลงมาข้างล่าง\n💨 **แรงขับ**: พลังจากมอเตอร์ที่พาเราพุ่งไปข้างหน้าอย่างรวดเร็ว\n🌀 **แรงต้าน**: อากาศที่คอยกอดเราไว้ไม่ให้ไปเร็วเกินไป",
                activity: "ลองเป็นนักบินมือโปร! ฝึกควบคุมโดรนในคอมพิวเตอร์ (Simulator) ฝ่าลมพายุเพื่อดูว่าแรงทั้ง 4 ทำงานร่วมกันอย่างไร",
                tip: "หัวใจของการบินคือสมดุล! ถ้าเราสร้างแรงยกได้มากกว่าน้ำหนัก โดรนจะลอยขึ้นทันทีเหมือนลูกโป่งเลย!"
              },
              {
                id: 2,
                name: "ชำแหละหุ่นยนต์บินได้",
                timeline: ["0-15น. ส่องสมองหุ่นยนต์", "15-40น. ระบบสายใย", "40-55น. ลองต่อหัวใจ", "55-60น. เกมทายชิ้นส่วน"],
                main: "มาแอบดูข้างในหุ่นยนต์บินได้กันเถอะ! 🤖\n\n- **สมอง (ESP32)**: สั่งงานทุกอย่างเหมือนคอมพิวเตอร์จิ๋ว\n- **หัวใจ (แบตเตอรี่)**: ส่งพลังงานไฟฟ้าไปทั่วตัว\n- **กล้ามเนื้อ (มอเตอร์)**: ช่วยหมุนใบพัดให้มีพลัง\n- **ตา (เซนเซอร์)**: ช่วยมองเห็นพื้นและสิ่งกีดขวาง",
                activity: "สวมวิญญาณนักประดิษฐ์! สำรวจบอร์ดควบคุมและลองฝึกเสียบสายสัญญาณมอเตอร์ให้ถูกต้องตามสี",
                tip: "ระวังนะ! ใบพัดโดรนมี 2 แบบ (หมุนซ้าย/หมุนขวา) ถ้าใส่ผิดด้าน โดรนจะพยายามมุดดินแทนที่จะบินขึ้นฟ้านะ"
              },
              {
                id: 3,
                name: "โรงเรียนนักบินตัวจิ๋ว",
                timeline: ["0-15น. กฎเหล็กความปลอดภัย", "15-45น. ฝึกบินในห้องแล็บ", "45-60น. ช่วยกันแก้ปัญหา"],
                main: "เป็นนักบินต้องมีวินัย! 👨‍✈️ ก่อนบินเราต้องเช็คความพร้อม:\n\n✅ แบตเต็มหรือยัง?\n✅ ใบพัดแน่นดีไหม?\n✅ มีใครอยู่ใกล้ๆ หรือเปล่า?\n✅ สถานที่กว้างพอให้บินไหม?",
                activity: "ภารกิจ 'นิ่งสนิท': ฝึกบังคับโดรนให้ลอยค้างกลางอากาศ (Hovering) นิ่งๆ เป็นเวลา 30 วินาทีให้ได้!",
                tip: "จำไว้เสมอ! ถ้าเกิดเหตุฉุกเฉินหรือคุมไม่อยู่ ให้กดปุ่ม 'Kill Switch' ทันทีเพื่อความปลอดภัยของทุกคน"
              }
            ]
          },
          {
            name: "Phase 2: นักประดิษฐ์สเตชั่น",
            color: "bg-pink-500",
            courses: [
              {
                id: 4,
                name: "ออกแบบโดรนในฝัน (3D)",
                timeline: ["0-15น. รู้จักโปรแกรมวาดรูป", "15-45น. วาดชิ้นส่วน", "45-60น. ส่งออกไฟล์"],
                main: "มาสร้างบ้านให้โดรนกัน! 🏠 เราจะใช้โปรแกรมคอมพิวเตอร์วาดรูป 3 มิติ:\n\n- วาดรูปทรงที่เท่ที่สุดตามใจชอบ\n- ออกแบบให้ลู่ลมเหมือนเครื่องบินขับไล่\n- สร้างขาตั้งที่แข็งแรงเหมือนขาแมงมุมเพื่อการลงจอดที่นุ่มนวล",
                activity: "ใช้จินตนาการออกแบบ Canopy (หลังคาโดรน) หรือขาตั้งโดรนในแบบของตัวเองให้ไม่ซ้ำใคร",
                tip: "ความลับของวิศวกร: น้ำหนักที่ลดลงทุกๆ 1 กรัม จะช่วยให้โดรนของเราบินได้นานขึ้นและพริ้วขึ้นนะ"
              },
              {
                id: 5,
                name: "เครื่องพิมพ์มหัศจรรย์",
                timeline: ["0-20น. รู้จักพลาสติกวิเศษ", "20-45น. สั่งพิมพ์ของจริง", "45-60น. แกะชิ้นส่วน"],
                main: "เครื่องพิมพ์วิเศษ! 🪄 เปลี่ยนรูปวาดในคอมให้กลายเป็นของที่จับต้องได้จริง\n\n- รู้จักพลาสติก PETG ที่เหนียวและทนทาน\n- ดูเครื่องพิมพ์ค่อยๆ วางเส้นพลาสติกทีละชั้นจนเป็นรูปเป็นร่าง\n- เรียนรู้ว่าทำไมโดรนต้องมีตัวตนที่แข็งแรงแต่เบาหวิว",
                activity: "เตรียมไฟล์และสั่งเครื่องพิมพ์ 3D ให้เริ่มสร้างชิ้นส่วนที่เราออกแบบไว้ด้วยตัวเอง",
                tip: "การตั้งค่า Infill (ความหนาข้างใน) ประมาณ 15-20% คือจุดที่ทำให้ของแข็งแรงกำลังดีและไม่หนักเกินไป"
              },
              {
                id: 6,
                name: "สายใยพลังงาน (บัดกรี)",
                timeline: ["0-15น. ปลอดภัยกับความร้อน", "15-45น. เชื่อมสายไฟ", "45-60น. ตรวจสอบงาน"],
                main: "ต่อสายไฟสายใยพลังงาน! ⚡️\n\n- ใช้ตะกั่วช่วยเชื่อมมอเตอร์เข้ากับสมองของโดรน\n- เรียนรู้การใช้เครื่องมือเหมือนวิศวกรตัวจริงในโรงงาน\n- ฝึกความใจเย็นและสมาธิในการต่อวงจรไฟฟ้าให้สมบูรณ์",
                activity: "ลองใช้หัวแร้งบัดกรีขั้วมอเตอร์เข้ากับเฟรมโดรน และประกอบชิ้นส่วนทั้งหมดเข้าด้วยกัน",
                tip: "ใจเย็นๆ นะ! อย่าแช่หัวแร้งไว้นานเกินไป เพราะความร้อนที่มากไปอาจจะทำให้ชิปคอมพิวเตอร์จิ๋วเสียใจจนพังได้"
              }
            ]
          },
          {
            name: "Phase 3: โค้ดดิ้งหุ่นยนต์อัจฉริยะ",
            color: "bg-purple-500",
            courses: [
              {
                id: 7,
                name: "บล็อกคำสั่งวิเศษ",
                timeline: ["0-15น. เรียนภาษาหุ่นยนต์", "15-45น. สั่งบินอัตโนมัติ", "45-60น. หาจุดผิด"],
                main: "สั่งงานหุ่นยนต์ง่ายๆ แค่ลากวาง! 🧩\n\n- ลากบล็อก 'บินขึ้น' แล้วตามด้วย 'หมุนตัว'\n- สอนโดรนให้รู้ว่าต้องทำอะไรก่อน-หลัง\n- เหมือนการเขียนจดหมายบอกเพื่อนว่าต้องเดินไปทางไหนเพื่อหาขุมทรัพย์",
                activity: "เขียนโปรแกรมชุดแรก! สั่งให้โดรนบินเป็นรูปตัว S หรือวงกลมโดยที่เราไม่ต้องขยับมือคุม",
                tip: "โดรนเป็นเด็กซื่อสัตย์! เขาจะทำตามคำสั่งเราเป๊ะๆ ถ้าเราวางบล็อกผิด โดรนก็ไปผิดทาง เพราะฉะนั้นต้องตรวจเช็คให้ดีนะ"
              },
              {
                id: 8,
                name: "พูดภาษางูกับ Python",
                timeline: ["0-20น. รู้จักภาษา Python", "20-50น. พิมพ์คำสั่งสั่งบิน", "50-60น. เปรียบเทียบผล"],
                main: "พูดภาษาคอมพิวเตอร์เหมือนโปรแกรมเมอร์มือโปร! 🐍\n\n- พิมพ์คำสั่งเท่ๆ แทนการลากบล็อก\n- รู้จักคำว่า Variable (กล่องเก็บของจิ๋ว) และ Loop (การทำซ้ำไม่รู้จบ)\n- ควบคุมโดรนด้วยคีย์บอร์ดเหมือนเรากำลังเล่นเกมสุดมันส์",
                activity: "เขียนโค้ด Python เพื่อเปลี่ยนคีย์บอร์ดคอมพิวเตอร์ให้กลายเป็นรีโมทคอนโทรลโดรน",
                tip: "ภาษา Python ชอบความเป็นระเบียบ! การเว้นวรรค (Indentation) สำคัญมาก ถ้าเว้นไม่ถูก โดรนจะงงจนบินไม่ถูกนะ"
              },
              {
                id: 9,
                name: "โดรนตาโต (เซนเซอร์)",
                timeline: ["0-15น. ติดตั้งเลเซอร์", "15-45น. ฝึกบินหลบสิ่งของ", "45-60น. ระบบกึ่งออโต้"],
                main: "ให้โดรนมีตาอัจฉริยะ! 👀\n\n- ใช้ LiDAR ยิงแสงเลเซอร์ไปข้างหน้าเพื่อวัดว่าชนอะไรไหม\n- เขียนโค้ดให้โดรนหยุดเองทันทีถ้ามีคนหรือของขวางหน้า\n- ทำให้โดรนบินตามเราเหมือนสัตว์เลี้ยงแสนรู้ที่คอยเดินตามเจ้าของ",
                activity: "ภารกิจ 'Follow Hand': เขียนโปรแกรมให้โดรนรักษาระยะห่างจากมือเรา และบินตามมือไปทุกที่!",
                tip: "เซนเซอร์ LiDAR ชอบแสงสว่าง! ถ้าบินในที่มืดๆ โดรนอาจจะมองไม่เห็นและเดินชนกำแพงได้นะ"
              }
            ]
          },
          {
            name: "Phase 4: ยอดนักบินกู้โลก",
            color: "bg-emerald-500",
            courses: [
              {
                id: 10,
                name: "นักบินที่น่ารัก (กฎหมาย)",
                timeline: ["0-25น. กฎการบินเบื้องต้น", "25-45น. มารยาทนักบิน", "45-60น. ตอบคำถามชิงรางวัล"],
                main: "นักบินที่ดีต้องทำตามกฎเพื่อความปลอดภัย! 📜\n\n- อย่าบินสูงเกิน 90 เมตร (ประมาณตึก 30 ชั้นนะ!)\n- เคารพความเป็นส่วนตัว ไม่แอบบินดูบ้านคนอื่น\n- ต้องขออนุญาตและเช็คพื้นที่ก่อนบินเสมอ",
                activity: "จำลองสถานการณ์: ฝึกเขียนคำขออนุญาตบินโดรนในพื้นที่สาธารณะให้ถูกต้องตามกฎหมาย",
                tip: "ความปลอดภัยของคนรอบข้างสำคัญที่สุด! นักบินที่เก่งคือคนที่บินได้อย่างปลอดภัยและไม่รบกวนใคร"
              },
              {
                id: 11,
                name: "โดรนฮีโร่กู้ภัย",
                timeline: ["0-20น. ดูผลงานโดรนฮีโร่", "20-50น. ฝึกภารกิจยาก", "50-60น. สร้างไอเดียใหม่"],
                main: "โดรนไม่ได้มีไว้แค่บินเล่นนะ! 🦸‍♂️ เขาสามารถช่วยเหลือผู้คนได้:\n\n- ส่งยาและอาหารไปให้คนป่วยในที่ห่างไกล\n- บินสำรวจหาคนที่หลงทางในป่าลึก\n- ออกไอเดียสร้างโดรนที่ช่วยแก้ปัญหาต่างๆ ในโลกเรา",
                activity: "ภารกิจ 'ส่งของด่วน': เขียนโปรแกรมควบคุมโดรนให้นำส่งกล่องพยาบาลไปยังจุดหมายที่กำหนด",
                tip: "นวัตกรรมที่ดีที่สุดคือสิ่งที่ช่วยให้ชีวิตเพื่อนมนุษย์ดีขึ้น น้องๆ ทุกคนสามารถเป็นผู้สร้างสิ่งนั้นได้!"
              },
              {
                id: 12,
                name: "วันจบการศึกษานวัตกร",
                timeline: ["0-30น. เตรียมโชว์สุดท้าย", "30-50น. นำเสนอผลงาน", "50-60น. รับเกียรติบัตร"],
                main: "ถึงเวลาโชว์พลังความสร้างสรรค์! 🏆\n\n- ปรับจูนโดรนให้สมบูรณ์แบบที่สุด\n- เล่าเรื่องราวความภูมิใจและสิ่งที่เราสร้างให้เพื่อนๆ ฟัง\n- รับเกียรติบัตรสุดเท่เพื่อประกาศว่าน้องๆ คือวิศวกรตัวจิ๋วแล้ว!",
                activity: "Graduation Demo: บินโชว์ภารกิจสุดเจ๋งที่น้องๆ ออกแบบและเขียนโค้ดขึ้นมาด้วยตัวเอง",
                tip: "ความล้มเหลวไม่ใช่เรื่องน่ากลัว! ถ้าโดรนตกหรือโค้ดบั๊ก นั่นคือโอกาสที่เราจะได้เรียนรู้และเก่งขึ้นกว่าเดิม"
              }
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
                icons: [<Wrench size={14} />, <Cpu size={14} />, <GraduationCap size={14} />],
                labels: ["Assembly", "ESP32 Ready", "Beginner"]
              },
              {
                id: "s2",
                name: "Codelift Advanced Bundle",
                price: 4900,
                desc: "ชุดโดรนพร้อมเซนเซอร์ LiDAR และ Optical Flow สำหรับการบินอัตโนมัติขั้นสูง",
                icon: <Rocket />,
                icons: [<Bot size={14} />, <Satellite size={14} />, <Trophy size={14} />],
                labels: ["AI & Auto", "Advanced Sensors", "Pro Portfolio"],
                featured: true
              },
              {
                id: "s3",
                name: "Power & Spare Parts Pack",
                price: 850,
                desc: "ชุดแบตเตอรี่สำรองและใบพัดสำรองเกรดพรีเมียม เพื่อการเรียนรู้ที่ต่อเนื่อง",
                icon: <Zap />,
                icons: [<Zap size={14} />, <RefreshCw size={14} />],
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
                icons: [<FileText size={14} />, <Terminal size={14} />, <Medal size={14} />],
                labels: ["Full Curriculum", "Python Mastery", "Certificate"]
              },
              {
                id: "c2",
                name: "Weekend Camp (Chiang Rai)",
                price: 3500,
                desc: "บัตรเข้าร่วมเวิร์กช็อปแบบเจอตัวที่จังหวัดเชียงราย (2 วัน 1 คืน) รวมที่พักและอาหาร",
                icon: <MapPin />,
                icons: [<MapPin size={14} />, <Users size={14} />, <UserCheck size={14} />],
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
                icons: [<Palette size={14} />, <Factory size={14} />, <Ruler size={14} />],
                labels: ["Custom Design", "Industrial Grade", "Precision"]
              },
              {
                id: "v2",
                name: "Professional Drone Tuning",
                price: 800,
                desc: "บริการปรับจูน Flight Controller และ Calibrate เซนเซอร์โดยทีมวิศวกรผู้เชี่ยวชาญ",
                icon: <Settings />,
                icons: [<Settings size={14} />, <LineChart size={14} />],
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
          { id: 'takeoff', label: "บินขึ้น (Takeoff)", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowUp size={16} /> },
          { id: 'land', label: "ลงจอด (Land)", color: "bg-orange-400", border: "border-orange-600", icon: <ArrowDown size={16} /> },
          { id: 'forward', label: "ไปข้างหน้า", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowUp size={16} /> },
          { id: 'backward', label: "ถอยหลัง", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowDown size={16} /> },
          { id: 'left', label: "ไปทางซ้าย", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowLeft size={16} /> },
          { id: 'right', label: "ไปทางขวา", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowRight size={16} /> },
          { id: 'turn_cw', label: "หมุนขวา 90°", color: "bg-indigo-400", border: "border-indigo-600", icon: <RotateCw size={16} /> },
          { id: 'turn_ccw', label: "หมุนซ้าย 90°", color: "bg-indigo-400", border: "border-indigo-600", icon: <RotateCcw size={16} /> },
          { id: 'flip', label: "ตีลังกา (Flip 360)", color: "bg-pink-500", border: "border-pink-600", icon: <RefreshCw size={16} /> },
          { id: 'wait', label: "รอ 1 วินาที", color: "bg-slate-400", border: "border-slate-600", icon: <Timer size={16} /> },
          { id: 'if_tof', label: "ถ้า ToF < 20cm ให้หยุด", color: "bg-emerald-500", border: "border-emerald-600", icon: <Split size={16} /> },
          { id: 'stop', label: "หยุดฉุกเฉิน", color: "bg-red-500", border: "border-red-700", icon: <AlertTriangle size={16} /> }
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
        title: "Little Drone Maker Curriculum 🛸",
        sub: "12 fun missions that turn you into a junior engineer!",
        duration: "60 mins of Fun",
        backBtn: "Back to Missions",
        headers: { content: "What will we learn?", activity: "Let's Play!", tip: "Expert Engineer Tip" },
        phases: [
          {
            name: "Phase 1: Fun Flight Basics",
            color: "bg-blue-500",
            courses: [
              {
                id: 1,
                name: "The Magic of Flight",
                timeline: ["0-15m Meet Drones", "15-35m 4 Magic Powers", "35-50m Sim Practice", "50-60m Fun Wrap-up"],
                main: "How do drones fly? 🛸 It's like magic!\n\n✨ **Lift**: Spinning props push air down to lift us up!\n🍎 **Weight**: Gravity pulls us back to Earth.\n💨 **Thrust**: Motor power moves us forward fast!\n🌀 **Drag**: Air resistance gives us a big hug to slow us down.",
                activity: "Be a pro pilot! Practice controlling drones on the computer (Simulator) through windy weather to see how the 4 powers work together.",
                tip: "Balance is the key! If you make more Lift than Weight, your drone will float up like a balloon!"
              },
              {
                id: 2,
                name: "Inside our Flying Robot",
                timeline: ["0-15m Brain Peek", "15-40m Wiring Fun", "40-55m Heart Check", "55-60m Guessing Game"],
                main: "Let's peek inside our flying robot! 🤖\n\n- **Brain (ESP32)**: The tiny computer that thinks for the drone.\n- **Heart (Battery)**: Gives electric energy to everyone.\n- **Muscles (Motors)**: Turn the props with super strength!\n- **Eyes (Sensors)**: Help the drone 'see' the floor and walls.",
                activity: "Little Maker Mode: Explore the control board and practice plugging in motor wires by matching their colors correctly.",
                tip: "Watch out! Drone props have 2 types (Left turn / Right turn). If you put them on backwards, your drone will try to dig a hole instead of flying!"
              },
              {
                id: 3,
                name: "Junior Pilot School",
                timeline: ["0-15m Safety Rules", "15-45m Lab Flight", "45-60m Problem Solving"],
                main: "Brave pilots follow the rules! 👨‍✈️ Check this before takeoff:\n\n✅ Is the battery full?\n✅ Are the props tight?\n✅ Is the area clear of people?\n✅ Do we have enough space to fly?",
                activity: "Mission 'Still as a Statue': Practice eye-level hovering for 30 seconds without moving an inch!",
                tip: "Safety first! If you lose control, just hit the 'Kill Switch' immediately to keep everyone safe."
              }
            ]
          },
          {
            name: "Phase 2: Little Maker Studio",
            color: "bg-pink-500",
            courses: [
              {
                id: 4,
                name: "3D Drone Design",
                timeline: ["0-15m Meet CAD", "15-45m Draw Parts", "45-60m Export Files"],
                main: "Let's build a house for your drone! 🏠 We'll draw in 3D:\n\n- Draw the coolest shapes you can imagine.\n- Make it look fast like a jet plane.\n- Design strong legs that look like a spider's for a soft landing.",
                activity: "Use your imagination to design a custom Canopy (drone roof) or landing gear that is unique to you!",
                tip: "Engineer's Secret: Every single gram you save makes your drone fly longer and move faster!"
              },
              {
                id: 5,
                name: "The Magic Printer",
                timeline: ["0-20m Magic Plastics", "20-45m Real Printing", "45-60m Part Extraction"],
                main: "The Magic Printer! 🪄 Turning computer drawings into real things you can hold.\n\n- Use special PETG plastic that is super tough.\n- Watch the printer build your parts layer by layer.\n- Learn why drones need to be strong but light as a feather.",
                activity: "Prepare your files and start the 3D printer to create the parts you designed yourself!",
                tip: "Setting 'Infill' (the stuff inside) to 15-20% makes things strong but light enough to fly."
              },
              {
                id: 6,
                name: "Power Wires (Soldering)",
                timeline: ["0-15m Heat Safety", "15-45m Wire Joining", "45-60m Quality Check"],
                main: "Connecting the power wires! ⚡️\n\n- Use a hot tool to join motors to the drone's brain.\n- Use real engineer tools just like a pro in a factory.\n- Be patient and focused while building your robot's circuit.",
                activity: "Try soldering motor pads to the drone frame and assemble all the pieces together.",
                tip: "Stay calm! Don't hold the hot tool on the chips for too long, or the tiny computer might get too hot and break."
              }
            ]
          },
          {
            name: "Phase 3: Smart Robot Coding",
            color: "bg-purple-500",
            courses: [
              {
                id: 7,
                name: "Magic Coding Puzzles",
                timeline: ["0-15m Robot Language", "15-45m Auto Flight", "45-60m Bug Hunt"],
                main: "Tell your robot what to do with puzzles! 🧩\n\n- Drag 'Takeoff' and then 'Spin Around'.\n- Teach the drone the right steps to follow.\n- It's like writing a secret treasure map for your robot friend.",
                activity: "Write your first program! Make the drone fly in an S-curve or a circle all by itself.",
                tip: "Drones are very honest! They follow your code exactly. If you place a block wrong, the drone will go the wrong way, so check carefully!"
              },
              {
                id: 8,
                name: "Speak Python like a Pro",
                timeline: ["0-20m Meet Python", "20-50m Type Commands", "50-60m Compare Results"],
                main: "Speak the secret language of computers! 🐍\n\n- Type cool commands instead of dragging blocks.\n- Learn about Variables (toy boxes) and Loops (doing things again).\n- Control your drone using your keyboard like a pro gamer.",
                activity: "Write Python code to turn your computer keyboard into a high-tech drone remote control.",
                tip: "Python loves being tidy! Spaces (Indentation) are very important. If the spaces are wrong, the drone will be too confused to fly."
              },
              {
                id: 9,
                name: "Drone Eyes (Sensors)",
                timeline: ["0-15m Add Lasers", "15-45m Avoid Obstacles", "45-60m Semi-Auto"],
                main: "Give your drone super sight! 👀\n\n- Use LiDAR lasers to measure distance to walls.\n- Code the drone to stop immediately if something is in its way.\n- Make the drone follow you like a loyal pet following its owner.",
                activity: "Mission 'Follow Hand': Program the drone to keep a safe distance and follow your hand wherever it goes!",
                tip: "LiDAR eyes love light! If you fly in the dark, the drone might get blind and bump into things."
              }
            ]
          },
          {
            name: "Phase 4: Super Pilot Hero",
            color: "bg-emerald-500",
            courses: [
              {
                id: 10,
                name: "The Polite Pilot (Laws)",
                timeline: ["0-25m Flight Rules", "25-45m Pilot Manners", "45-60m Quiz Prize"],
                main: "Good pilots follow the rules to keep everyone safe! 📜\n\n- Don't fly higher than 90 meters (that's like 30 floors high!).\n- Respect people's privacy and don't peek in windows.\n- Always ask for permission and check the area before takeoff.",
                activity: "Simulation: Practice writing a permission request to fly your drone in a public park correctly.",
                tip: "The safety of others is the most important thing! A great pilot is one who flies safely and doesn't bother anyone."
              },
              {
                id: 11,
                name: "Superhero Rescue Drone",
                timeline: ["0-20m Hero Stories", "20-50m Hard Missions", "50-60m New Ideas"],
                main: "Drones are not just for fun! 🦸‍♂️ They can help people:\n\n- Deliver medicine and food to sick people in far-away places.\n- Find lost hikers deep in the woods.\n- Dream up new ways drones can save the world and make it better.",
                activity: "Mission 'Emergency Delivery': Program your drone to deliver a medical kit to a specific target spot.",
                tip: "The best inventions are the ones that help humans. You can be the one who builds them!"
              },
              {
                id: 12,
                name: "Maker Graduation Day",
                timeline: ["0-30m Final Prep", "30-50m Show & Tell", "50-60m Certificate"],
                main: "Showtime for your creativity! 🏆\n\n- Tune your drone to be perfect.\n- Share your story and what you built with your friends and family.\n- Get your official certificate to show the world you are now a Little Engineer!",
                activity: "Graduation Demo: Fly a cool mission that you designed and coded all by yourself.",
                tip: "Failure is not scary! If the drone crashes or the code has a bug, it's just a chance to learn and get better!"
              }
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
              { id: "s1", name: "Codelift Starter Kit", price: "TBA", desc: "Basic assembly kit with ESP32-S3 and 3D Printed frame.", icon: <Package />, icons: [<Wrench size={14} />, <Cpu size={14} />], labels: ["Assembly", "ESP32"] },
              { id: "s2", name: "Codelift Advanced Bundle", price: 4900, desc: "Full kit with LiDAR & Optical Flow for autonomous flight.", icon: <Rocket />, icons: [<Bot size={14} />, <Satellite size={14} />], labels: ["AI & Auto", "LiDAR"], featured: true },
              { id: "s3", name: "Power & Spare Parts Pack", price: 850, desc: "Premium batteries and propellers pack.", icon: <Zap />, icons: [<Zap size={14} />, <RefreshCw size={14} />], labels: ["Power", "Spares"] }
            ]
          },
          {
            name: "2. Courses & Workshops",
            items: [
              { id: "c1", name: "Full Access Online", price: 1500, desc: "Lifetime access to all 12 modules.", icon: <BookOpen />, icons: [<FileText size={14} />, <Medal size={14} />], labels: ["Lifetime", "Certificate"] },
              { id: "c2", name: "Weekend Camp", price: 3500, desc: "In-person 2D1N workshop in Chiang Rai.", icon: <MapPin />, icons: [<MapPin size={14} />, <Users size={14} />], labels: ["Event", "Expert"] }
            ]
          },
          {
            name: "3. Engineering Services",
            items: [
              { id: "v1", name: "Custom 3D Printing", price: 300, desc: "On-demand PETG-rCF or TPU printing.", icon: <Palette />, icons: [<Palette size={14} />, <Factory size={14} />], labels: ["PETG", "Precision"] },
              { id: "v2", name: "Professional Tuning", price: 800, desc: "Expert sensor calibration services.", icon: <Settings />, icons: [<Settings size={14} />, <LineChart size={14} />], labels: ["Tuning", "Pro"] }
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
          { id: 'takeoff', label: "Takeoff", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowUp size={16} /> },
          { id: 'land', label: "Land", color: "bg-orange-400", border: "border-orange-600", icon: <ArrowDown size={16} /> },
          { id: 'forward', label: "Forward", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowUp size={16} /> },
          { id: 'backward', label: "Backward", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowDown size={16} /> },
          { id: 'left', label: "Move Left", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowLeft size={16} /> },
          { id: 'right', label: "Move Right", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowRight size={16} /> },
          { id: 'turn_cw', label: "Turn CW 90°", color: "bg-indigo-400", border: "border-indigo-600", icon: <RotateCw size={16} /> },
          { id: 'turn_ccw', label: "Turn CCW 90°", color: "bg-indigo-400", border: "border-indigo-600", icon: <RotateCcw size={16} /> },
          { id: 'flip', label: "Flip 360", color: "bg-pink-500", border: "border-pink-600", icon: <RefreshCw size={16} /> },
          { id: 'wait', label: "Wait 1s", color: "bg-slate-400", border: "border-slate-600", icon: <Timer size={16} /> },
          { id: 'if_tof', label: "If ToF < 20cm Stop", color: "bg-emerald-500", border: "border-emerald-600", icon: <Split size={16} /> },
          { id: 'stop', label: "Emergency Stop", color: "bg-red-500", border: "border-red-700", icon: <AlertTriangle size={16} /> }
        ]
      }
    }
  };

  const t = content[lang];

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
        switch (block.id) {
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

  const DroneSVG = ({ isFlying, rotate, z, size = 120, isFlipping }) => (
    <div
      className={`relative transition-all duration-700 ease-in-out ${isFlipping ? 'animate-flip' : ''}`}
      style={{ transform: `rotate(${rotate}deg) scale(${1 + (z / 200)})` }}
    >
      <svg width={size} height={size} viewBox="0 0 120 120">
        <path d="M40 40L80 80M80 40L40 80" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
        <rect x="45" y="45" width="30" height="30" rx="8" fill="#334155" />
        <rect x="52" y="52" width="16" height="10" rx="2" fill="#60a5fa" />
        {[{ x: 40, y: 40 }, { x: 80, y: 40 }, { x: 40, y: 80 }, { x: 80, y: 80 }].map((m, i) => (
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

  return (
    <div className={`min-h-screen bg-white text-slate-700 ${lang === 'th' ? "font-['Mali',sans-serif]" : "font-['Itim',sans-serif]"}`}>
      <style>{` .school-title { font-family: 'Schoolbell', 'Mali', cursive; } `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-blue-50 h-20 flex items-center px-6 lg:px-12 shadow-sm">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => { setView('home'); setSelectedCourse(null); }}>
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500 shadow-lg shadow-blue-100/50 group-hover:scale-110 transition-transform">
              <Navigation size={28} />
            </div>
            <div>
              <h1 className="school-title text-2xl text-blue-400 leading-none">Codelift</h1>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Academy</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-base">
            <button onClick={() => { setView('home'); setSelectedCourse(null); }} className={`hover:text-blue-500 transition-all ${view === 'home' ? 'text-blue-500 font-bold' : ''}`}>{t.nav.home}</button>
            <button onClick={() => { setView('curriculum'); setSelectedCourse(null); }} className={`hover:text-blue-500 transition-all ${view === 'curriculum' ? 'text-blue-500 font-bold' : ''}`}>{t.nav.curriculum}</button>
            <button onClick={() => { setView('code'); setSelectedCourse(null); }} className={`hover:text-blue-500 transition-all ${view === 'code' ? 'text-blue-500 font-bold' : ''}`}>{t.nav.code}</button>
            <button onClick={() => { setView('shop'); setSelectedCourse(null); }} className={`hover:text-blue-500 transition-all ${view === 'shop' ? 'text-blue-500 font-bold' : ''}`}>{t.nav.shop}</button>

            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button onClick={() => setLang('th')} className={`px-3 py-1 rounded-lg text-sm transition-all ${lang === 'th' ? 'bg-white shadow-sm text-blue-500 font-bold' : 'text-slate-400'}`}>TH</button>
              <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-lg text-sm transition-all ${lang === 'en' ? 'bg-white shadow-sm text-blue-500 font-bold' : 'text-slate-400'}`}>EN</button>
            </div>

            <div className="relative cursor-pointer group" onClick={() => setView('shop')}>
              <ShoppingCart size={24} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}><Menu size={28} /></button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-24 px-6 space-y-6 md:hidden animate-in slide-in-from-right duration-300">
          <button onClick={() => { setView('home'); setIsMenuOpen(false); }} className="block w-full text-left text-3xl school-title border-b pb-4">{t.nav.home}</button>
          <button onClick={() => { setView('curriculum'); setIsMenuOpen(false); }} className="block w-full text-left text-3xl school-title border-b pb-4">{t.nav.curriculum}</button>
          <button onClick={() => { setView('code'); setIsMenuOpen(false); }} className="block w-full text-left text-3xl school-title border-b pb-4">{t.nav.code}</button>
          <button onClick={() => { setView('shop'); setIsMenuOpen(false); }} className="block w-full text-left text-3xl school-title border-b pb-4">{t.nav.shop}</button>
          <div className="flex gap-4">
            <button onClick={() => setLang('th')} className={`p-4 rounded-2xl flex-1 border-2 text-lg ${lang === 'th' ? 'border-blue-400 text-blue-400 font-bold' : 'border-slate-100'}`}>ไทย</button>
            <button onClick={() => setLang('en')} className={`p-4 rounded-2xl flex-1 border-2 text-lg ${lang === 'en' ? 'border-blue-400 text-blue-400 font-bold' : 'border-slate-100'}`}>English</button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="pt-20 min-h-[calc(100vh-80px)]">
        {view === 'home' && (
          <main className="animate-in fade-in duration-700">
            <section className="pt-32 pb-24 px-6 text-center max-w-5xl mx-auto">
              <div className="inline-block px-5 py-2 bg-blue-50 text-blue-500 rounded-full text-xs font-bold mb-8 tracking-widest uppercase">
                {t.hero.badge}
              </div>
              <h2 className="school-title text-6xl md:text-8xl mb-8 text-slate-800 leading-tight">
                {t.hero.title1} <br /> <span className="text-blue-400">{t.hero.title2}</span>
              </h2>
              <p className="text-xl md:text-2xl text-slate-500 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
                {t.hero.sub}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button onClick={() => setView('curriculum')} className="bg-blue-400 text-white px-12 py-4 rounded-2xl text-xl font-bold shadow-xl hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 shadow-blue-200">
                  {t.hero.btnStart}
                </button>
                <button onClick={() => setView('code')} className="bg-white border-2 border-slate-200 text-slate-500 px-12 py-4 rounded-2xl text-xl font-bold hover:border-blue-400 transition-all flex items-center justify-center gap-4 shadow-sm active:scale-95">
                  <Code size={24} /> {t.nav.code}
                </button>
              </div>
              <div className="mt-24 flex justify-center animate-bounce duration-[4000ms]">
                <DroneSVG isFlying={true} rotate={8} z={80} size={200} />
              </div>
            </section>
          </main>
        )}

        {view === 'curriculum' && (
          <main className="animate-in fade-in duration-700 py-12 px-6 lg:px-24 max-w-7xl mx-auto">
            {!selectedCourse ? (
              <>
                <div className="text-center mb-16">
                  <h2 className="school-title text-4xl md:text-5xl mb-4 text-slate-800">{t.curriculum.title}</h2>
                  <p className="text-lg text-slate-400 flex items-center justify-center gap-2">
                    <Clock size={18} /> {t.curriculum.duration}
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {t.curriculum.phases.map((phase, pIdx) => (
                    <div key={pIdx} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                      <div className={`${phase.color} p-5 text-white`}>
                        <h3 className="school-title text-xl font-bold">{phase.name}</h3>
                      </div>
                      <div className="p-6 space-y-4 flex-grow">
                        {phase.courses.map((course) => (
                          <div
                            key={course.id}
                            onClick={() => setSelectedCourse(course)}
                            className="group cursor-pointer border-b border-slate-50 pb-4 last:border-0 last:pb-0 hover:bg-slate-50/50 p-3 rounded-xl transition-all"
                          >
                            <div className="flex items-start gap-3 mb-2">
                              <div className={`w-7 h-7 rounded-lg ${phase.color} bg-opacity-10 flex items-center justify-center text-xs font-bold`} style={{ color: phase.color.replace('bg-', 'text-') }}>
                                {course.id}
                              </div>
                              <div className="flex-grow text-base">
                                <h4 className="font-bold text-slate-700 group-hover:text-blue-500 transition-colors flex items-center justify-between">
                                  {course.name}
                                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-1" />
                                </h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {course.timeline.slice(0, 2).map((item, i) => (
                                    <span key={i} className="text-[10px] text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-100">{item}</span>
                                  ))}
                                  <span className="text-[10px] text-blue-400">...อ่านต่อ</span>
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
              <div className="animate-in slide-in-from-right duration-500 bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden max-w-4xl mx-auto">
                <div className="bg-slate-50 p-6 flex items-center justify-between border-b border-slate-100">
                  <button onClick={() => setSelectedCourse(null)} className="flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors font-bold"><ChevronLeft /> {t.curriculum.backBtn}</button>
                  <div className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2"><Award size={14} /> Course {selectedCourse.id}</div>
                </div>
                <div className="p-8 lg:p-12">
                  <h2 className="school-title text-4xl lg:text-5xl text-slate-800 mb-8">{selectedCourse.name}</h2>
                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="md:col-span-2 space-y-10">
                      <section>
                        <h4 className="flex items-center gap-3 text-blue-500 font-bold text-xl mb-4"><BookOpen size={24} /> {t.curriculum.headers.content}</h4>
                        <p className="text-base text-slate-600 leading-relaxed font-light bg-blue-50/30 p-6 rounded-2xl border border-blue-50 whitespace-pre-wrap">{selectedCourse.main}</p>
                      </section>
                      <section>
                        <h4 className="flex items-center gap-3 text-pink-500 font-bold text-xl mb-4"><Target size={24} /> {t.curriculum.headers.activity}</h4>
                        <p className="text-base text-slate-600 leading-relaxed font-light bg-pink-50/30 p-6 rounded-2xl border border-pink-50">{selectedCourse.activity}</p>
                      </section>
                    </div>
                    <div className="space-y-8">
                      <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Clock size={14} /> Timeline</h4>
                        <div className="space-y-3">
                          {selectedCourse.timeline.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>{item}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100 relative overflow-hidden">
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
          <main className="animate-in slide-in-from-bottom-6 duration-700 p-6 lg:p-8 max-w-[1700px] mx-auto">
            <div className="flex flex-col xl:flex-row justify-between items-end mb-8 gap-6">
              <div className="max-w-2xl">
                <h2 className="school-title text-4xl text-slate-800">{t.blockly.title}</h2>
                <p className="text-base text-slate-500 mt-2 font-light">{t.blockly.sub}</p>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <button onClick={() => handleConnect('ble')} className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-base font-bold border-2 transition-all ${connection.status === 'connected' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-white text-slate-400 border-slate-200 hover:border-blue-300'}`}>
                  <Bluetooth size={20} className={connection.status === 'connected' ? "animate-pulse" : ""} />
                  {connection.status === 'connected' ? connection.deviceName : 'Connect Device'}
                </button>
                <button onClick={() => setWorkspace([])} className="bg-white border-2 p-3 rounded-2xl text-slate-400 hover:text-red-400 transition-colors"><Trash2 size={24} /></button>
                <button onClick={runProgram} disabled={isExecuting || workspace.length === 0} className={`px-12 py-3 rounded-2xl text-white font-bold text-xl shadow-xl transition-all active:scale-95 ${isExecuting || workspace.length === 0 ? 'bg-slate-300' : 'bg-blue-500 hover:bg-blue-600 shadow-blue-200'}`}>
                  {isExecuting ? 'Running...' : t.blockly.run}
                </button>
              </div>
            </div>

            <div className="grid xl:grid-cols-12 gap-6 h-[750px]">
              <div className="xl:col-span-3 bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm overflow-y-auto">
                <h3 className="text-xs uppercase font-bold text-slate-300 tracking-widest mb-6">Blocks Palette</h3>
                <div className="space-y-3">
                  {t.blockly.blocks.map(b => (
                    <button key={b.id} onClick={() => setWorkspace([...workspace, { ...b, i: Date.now() }])} className={`w-full p-3 rounded-xl ${b.color} text-white text-sm font-bold flex items-center gap-3 shadow-md border-b-4 ${b.border} hover:translate-x-2 transition-all`}>
                      <div className="bg-white/20 p-1.5 rounded-lg">{React.cloneElement(b.icon, { size: 14 })}</div>
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="xl:col-span-5 bg-white rounded-[2.5rem] p-8 border-2 border-slate-50 shadow-inner overflow-y-auto relative bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]">
                <div className="bg-slate-800 text-white p-4 rounded-2xl w-fit flex items-center gap-4 mb-6 shadow-xl text-lg ring-4 ring-slate-100">
                  <div className="bg-purple-500 p-2 rounded-xl"><Play size={18} fill="white" /></div>
                  {lang === 'th' ? 'จุดเริ่มทำงาน' : 'On Start'}
                </div>
                <div className="ml-10 space-y-2">
                  {workspace.map((block, i) => (
                    <div key={block.i} className={`${block.color} text-white p-4 rounded-2xl w-full max-w-[320px] flex items-center gap-4 shadow-md border-b-4 border-black/10 text-base transition-all ${currentBlockIndex === i ? 'ring-4 ring-yellow-400 scale-105 z-10 translate-x-4' : ''}`}>
                      {React.cloneElement(block.icon, { size: 20 })} {block.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="xl:col-span-4 space-y-6">
                <div className="bg-slate-900 rounded-[3rem] aspect-square shadow-2xl relative overflow-hidden flex items-center justify-center border-4 border-slate-800">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px:50px]"></div>
                  <div className="z-10 transition-all duration-700" style={{ transform: `translate(${dronePos.x}px, ${dronePos.y}px)` }}>
                    <DroneSVG isFlying={dronePos.isFlying} rotate={dronePos.rotate} z={dronePos.z} size={150} isFlipping={dronePos.isFlipping} />
                  </div>
                  <div className="absolute bottom-6 left-6 text-[10px] font-mono text-white/40 bg-black/40 px-4 py-2 rounded-xl backdrop-blur-md">
                    X: {dronePos.x} | Y: {dronePos.y} | Z: {dronePos.z}
                  </div>
                </div>
                <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase">ToF Distance</div>
                    <div className="text-xl font-mono text-blue-500 font-bold">{sensorData.tof.toFixed(1)} cm</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-bold mb-1 uppercase">Opt. Flow</div>
                    <div className="text-xl font-mono text-emerald-500 font-bold">{sensorData.opticalFlow.vx.toFixed(1)} m/s</div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}

        {view === 'shop' && (
          <main className="animate-in fade-in duration-700 py-12 px-6 lg:px-24 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="school-title text-4xl md:text-5xl mb-4 text-slate-800">{t.shop.title}</h2>
              <p className="text-lg text-slate-400 font-light">{t.shop.sub}</p>
            </div>

            <div className="space-y-24">
              {t.shop.categories.map((category, catIdx) => (
                <section key={catIdx}>
                  <h3 className="school-title text-3xl text-slate-700 mb-10 pb-4 border-b border-slate-100 flex items-center gap-3">
                    <Package className="text-blue-400" /> {category.name}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {category.items.map((item) => (
                      <div key={item.id} className={`bg-white rounded-[3rem] p-10 border-2 transition-all group flex flex-col items-center relative shadow-sm hover:shadow-xl ${item.featured ? 'border-blue-200' : 'border-slate-100'}`}>
                        {item.featured && (
                          <div className="absolute -top-4 bg-orange-500 text-white px-4 py-1 rounded-full text-[10px] font-bold shadow-lg flex items-center gap-2 animate-bounce">
                            <Star size={10} fill="white" /> Recommended
                          </div>
                        )}

                        <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 text-4xl text-blue-400 group-hover:rotate-12 transition-transform border border-slate-50">
                          {item.icon && (typeof item.icon === 'string' ? item.icon : React.cloneElement(item.icon, { size: 40 }))}
                        </div>

                        <h4 className="text-lg font-bold text-slate-800 mb-4 text-center h-12 flex items-center">{item.name}</h4>

                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                          {item.labels.map((label, lIdx) => (
                            <div key={lIdx} className="flex items-center gap-1.5 bg-slate-50 text-slate-400 px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-slate-100">
                              {item.icons[lIdx]} {label}
                            </div>
                          ))}
                        </div>

                        <p className="text-xs text-slate-500 text-center mb-8 font-light leading-relaxed flex-grow">
                          {item.desc}
                        </p>

                        <div className="mt-auto w-full flex flex-col items-center gap-6">
                          <div className="text-3xl font-bold text-slate-800">
                            {item.price === "TBA" ? "To be announced" : `${item.price.toLocaleString()} ${t.shop.currency}`}
                          </div>
                          <button
                            onClick={() => addToCart(item)}
                            className={`w-full py-4 rounded-2xl text-base font-bold transition-all flex items-center justify-center gap-3 active:scale-95 ${item.featured ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-200 shadow-lg' : 'bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white'}`}
                          >
                            <ShoppingCart size={18} /> {t.shop.buyBtn}
                          </button>
                          <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-bold">
                            <ShieldCheck size={12} /> {t.shop.socialProof}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-32 bg-slate-900 rounded-[4rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl border-4 border-slate-800 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
              <div className="relative z-10 space-y-4 max-w-xl text-center md:text-left">
                <h3 className="school-title text-4xl">Engineering Powerhouse</h3>
                <p className="text-slate-400 text-lg">ต่อยอดจินตนาการด้วยงานผลิตคุณภาพสูงจาก <span className="text-blue-400 font-bold">Kaiklom Printing</span> เราใช้วัสดุเกรดวิศวกรรมเพื่อโดรนของคุณโดยเฉพาะ</p>
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

      <footer className="py-20 px-10 border-t border-slate-50 bg-white mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500 shadow-xl shadow-blue-100">
              <Navigation size={28} />
            </div>
            <div>
              <span className="school-title text-3xl text-blue-400">Codelift Academy</span>
              <p className="text-slate-400 text-lg mt-1 font-light italic">Learning to Fly.</p>
            </div>
          </div>
          <div className="flex gap-8">
            {[<Globe size={24} />, <Cpu size={24} />, <Terminal size={24} />].map((icon, i) => (
              <div key={i} className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-500 transition-all cursor-pointer hover:bg-blue-50 hover:shadow-xl hover:-translate-y-2">{icon}</div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

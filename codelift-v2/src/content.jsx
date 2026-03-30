import React from 'react';
import {
    Box, Settings, Zap, Play, AlertTriangle, ChevronRight, Cpu, MousePointer2,
    Menu, X, Globe, Code, Home, ArrowRight, Terminal, Trash2, Pause,
    RotateCw, ArrowUp, Bluetooth, Usb, Eye, Ruler, Split, Navigation,
    ShieldCheck, Rocket
} from 'lucide-react';

export const content = {
    th: {
        nav: { home: "หน้าแรก", code: "ห้องแล็บโดรน", connect: "เชื่อมต่อ" },
        hero: {
            badge: "ยินดีต้อนรับสู่ Codelift Academy 🎓",
            title1: "สร้างโดรนตัวแรก",
            title2: "ด้วยมือคุณเอง",
            sub: "เรียนรู้ผ่านการลงมือทำจริง ตั้งแต่การประกอบฮาร์ดแวร์ไปจนถึงการเขียนโค้ดควบคุมด้วยเซนเซอร์อัจฉริยะ",
            btnStart: "เริ่มเรียนเลย",
            btnLab: "เข้าสู่ห้องแล็บ"
        },
        steps: {
            title: "เส้นทางสู่การเป็นนักสร้าง",
            sub: "4 ขั้นตอนง่ายๆ ที่จะเปลี่ยนคุณให้เป็นโปรด้านโดรน",
            items: [
                { id: 1, title: "เตรียมอุปกรณ์", desc: "แกะกล่องและทำความรู้จักกับชิ้นส่วนโดรน", icon: <Box /> },
                { id: 2, title: "ประกอบโครงร่าง", desc: "ติดตั้งมอเตอร์และแขนโดรนเข้ากับบอร์ดควบคุม", icon: <Settings /> },
                { id: 3, title: "เชื่อมต่อระบบไฟ", desc: "บัดกรีและเสียบสายไฟ พร้อมตรวจสอบความปลอดภัย", icon: <Zap /> },
                { id: 4, title: "สั่งบินด้วยโค้ด", desc: "เขียนโปรแกรมควบคุมผ่านระบบบล็อกคำสั่ง", icon: <Rocket /> }
            ]
        },
        features: [
            { title: "ประกอบง่าย", desc: "ออกแบบมาเพื่อเด็กและผู้เริ่มต้น", icon: <Settings /> },
            { title: "เซนเซอร์จริง", desc: "ใช้ TOF และ Optical Flow เหมือนโดรนระดับโลก", icon: <Eye /> },
            { title: "ปลอดภัย", desc: "มีระบบแจ้งเตือนและโครงป้องกันใบพัด", icon: <ShieldCheck /> }
        ],
        blockly: {
            title: "ห้องแล็บเขียนโปรแกรม",
            sub: "ออกแบบอัลกอริทึมการบินของคุณ",
            run: "เริ่มบิน!",
            clear: "ล้างโค้ด",
            blocks: [
                { id: 'takeoff', label: "บินขึ้น (Takeoff)", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowUp size={18} /> },
                { id: 'forward', label: "ไปข้างหน้า", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowRight size={18} /> },
                { id: 'right', label: "หมุนขวา 90°", color: "bg-indigo-400", border: "border-indigo-600", icon: <RotateCw size={18} /> },
                { id: 'if_tof', label: "ถ้าระยะ TOF < 20cm", color: "bg-pink-500", border: "border-pink-600", icon: <Split size={18} /> },
                { id: 'land', label: "ลงจอด (Land)", color: "bg-orange-400", border: "border-orange-600", icon: <Box size={18} /> }
            ]
        }
    },
    en: {
        nav: { home: "Home", code: "Drone Lab", connect: "Connect" },
        hero: {
            badge: "WELCOME TO CODELIFT ACADEMY 🎓",
            title1: "Build Your Own",
            title2: "Personal Drone",
            sub: "Learning by doing. From hardware assembly to high-level sensor-based coding.",
            btnStart: "Start Learning",
            btnLab: "Open Drone Lab"
        },
        steps: {
            title: "The Maker's Journey",
            sub: "4 simple steps from unboxing to your first flight.",
            items: [
                { id: 1, title: "Preparation", desc: "Unbox and identify all your drone parts.", icon: <Box /> },
                { id: 2, title: "Assembly", desc: "Snap arms and motors to the main frame.", icon: <Settings /> },
                { id: 3, title: "Wiring", desc: "Connect the power and data cables safely.", icon: <Zap /> },
                { id: 4, title: "Coding", desc: "Program your flight logic using blocks.", icon: <Rocket /> }
            ]
        },
        features: [
            { title: "Easy Build", desc: "Designed specifically for kids and beginners.", icon: <Settings /> },
            { title: "Real Sensors", desc: "Learn TOF and Optical Flow technologies.", icon: <Eye /> },
            { title: "Safe & Secure", desc: "Propeller guards and auto-land features.", icon: <ShieldCheck /> }
        ],
        blockly: {
            title: "Drone Coding Lab",
            sub: "Design your custom flight algorithms.",
            run: "Run Code",
            clear: "Clear All",
            blocks: [
                { id: 'takeoff', label: "Takeoff", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowUp size={18} /> },
                { id: 'forward', label: "Move Forward", color: "bg-blue-400", border: "border-blue-600", icon: <ArrowRight size={18} /> },
                { id: 'right', label: "Turn Right 90°", color: "bg-indigo-400", border: "border-indigo-600", icon: <RotateCw size={18} /> },
                { id: 'if_tof', label: "If TOF < 20cm", color: "bg-pink-500", border: "border-pink-600", icon: <Split size={18} /> },
                { id: 'land', label: "Land", color: "bg-orange-400", border: "border-orange-600", icon: <Box size={18} /> }
            ]
        }
    }
};

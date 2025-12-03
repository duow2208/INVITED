import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Heart,
  Music,
  Star,
} from "lucide-react";

export default function PartyInvitation() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);

  const createHeart = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setHearts((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1000);
  };

  const handleConfirm = (e) => {
    e.stopPropagation();
    setShowConfetti(true);

    const pieces = [];
    for (let i = 0; i < 100; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 0.3,
        animationDuration: 2 + Math.random() * 1,
        color: ["#ec4899", "#a855f7", "#f59e0b", "#3b82f6", "#10b981"][
          Math.floor(Math.random() * 5)
        ],
      });
    }
    setConfettiPieces(pieces);

    setTimeout(() => {
      setShowConfetti(false);
      setConfettiPieces([]);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-300 via-fuchsia-300 to-indigo-400 flex items-center justify-center p-4 overflow-hidden relative">

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${piece.left}%`,
                top: "-20px",
                backgroundColor: piece.color,
                animation: `fall ${piece.animationDuration}s linear forwards`,
                animationDelay: `${piece.animationDelay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Overlay Success */}
      {showConfetti && (
        <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none px-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full animate-bounce-in">
            <div className="text-center space-y-4">
              <div className="text-6xl animate-bounce">🎉</div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Yayyy!
              </h3>
              <p className="text-xl font-bold text-gray-800">Tuyệt vời quá! 🥳</p>
              <p className="text-base text-gray-600">
                Mình đã nhận được xác nhận rồi! Hẹn gặp bạn nhé!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Card wrapper */}
      <div
        className="relative w-full max-w-md lg:max-w-lg"
        style={{ perspective: "1500px" }}
      >
        <div
          className="relative w-full cursor-pointer flip-card"
          style={{
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onClick={() => setIsFlipped(!isFlipped)}
          onMouseMove={createHeart}
        >
          {/* FRONT */}
          <div
            className="flip-face relative bg-linear-to-br from-white via-pink-50 to-purple-50 rounded-3xl shadow-2xl overflow-hidden"
            style={{ minHeight: "600px" }}
          >
            <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-br from-pink-400 to-purple-500 opacity-90"></div>

            {hearts.map((heart) => (
              <Heart
                key={heart.id}
                className="absolute text-pink-500 pointer-events-none"
                style={{
                  left: heart.x,
                  top: heart.y,
                  animation: "floatUp 1s ease-out forwards",
                  width: "20px",
                  height: "20px",
                }}
              />
            ))}

            <div className="relative z-10 p-8 pt-24 text-center flex flex-col items-center">
              <Music className="w-16 h-16 text-fuchsia-500 mx-auto mb-4 animate-bounce" />

              <div className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-6">
                <span className="text-white font-bold text-sm">YOU'RE INVITED</span>
              </div>

              <h1 className="text-5xl font-black leading-tight mb-4">
                <span className="bg-linear-to-r from-pink-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
                  Let's Hang
                </span>
                <br />
                <span className="bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Out!
                </span>
              </h1>

              <p className="text-lg text-gray-600 mb-6">Tối 7/12/2025</p>

              <div className="relative inline-block">
                <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-500 rounded-2xl blur-xl opacity-60 animate-pulse"></div>

                <div className="relative bg-white px-8 py-4 rounded-2xl shadow-lg border-2 border-pink-200">
                  <p className="text-base text-gray-700 font-semibold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-fuchsia-500" />
                    Chạm để mở thiệp
                    <Sparkles className="w-5 h-5 text-fuchsia-500" />
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div
            className="flip-face absolute top-0 left-0 w-full bg-linear-to-br from-white via-purple-50 to-pink-50 rounded-3xl shadow-2xl overflow-hidden"
            style={{
              transform: "rotateY(180deg)",
              minHeight: "600px",
            }}
          >
            <div className="relative h-40 bg-linear-to-r from-pink-500 via-fuchsia-500 to-purple-500">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

              <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
                <Sparkles className="w-10 h-10 mb-2 animate-pulse" />
                <h2 className="text-3xl font-black">Chi Tiết Buổi Hẹn</h2>
              </div>
            </div>

            <div className="px-8 py-6 space-y-6">
              {/* Date */}
              <div className="bg-white p-5 rounded-2xl shadow-lg border-2 border-pink-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-pink-400 rounded-xl flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase font-semibold">Ngày</p>
                  <p className="text-xl font-bold text-gray-800">
                    Chủ Nhật, 07/12/2025
                  </p>
                </div>
              </div>

              {/* Time */}
              <div className="bg-white p-5 rounded-2xl shadow-lg border-2 border-purple-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-purple-400 rounded-xl flex items-center justify-center">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase font-semibold">
                    Thời Gian
                  </p>
                  <p className="text-xl font-bold text-gray-800">
                    7:00 PM - Tối Chủ Nhật
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white p-5 rounded-2xl shadow-lg border-2 border-indigo-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-indigo-400 rounded-xl flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase font-semibold">
                    Địa Điểm
                  </p>
                  <p className="text-xl font-bold text-gray-800">Tp. Hồ Chí Minh</p>
                </div>
              </div>

              <p className="text-center text-2xl text-gray-700 font-semibold">
                Mời: <span className="text-pink-600 font-bold">Nguyễn Thị Kim Ngân</span>
              </p>

              <p className="text-center text-sm text-gray-400">
                Nhấn lại để xem mặt trước
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* GLOBAL CSS FIX */}
      <style jsx global>{`
        .flip-card {
          transform-style: preserve-3d;
        }
        .flip-face {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
          }
        }

        @keyframes fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0) rotate(-10deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotate(5deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </div>
  );
}

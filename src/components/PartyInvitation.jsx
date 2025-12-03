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

    // Tạo confetti
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

    // Ẩn confetti sau 4 giây
    setTimeout(() => {
      setShowConfetti(false);
      setConfettiPieces([]);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-rose-300 via-fuchsia-300 to-indigo-400 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Confetti effect */}
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

      {/* Success message overlay */}
      {showConfetti && (
        <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none px-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full animate-bounce-in">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="text-5xl sm:text-6xl animate-bounce">🎉</div>
              <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Yayyy!
              </h3>
              <p className="text-lg sm:text-xl font-bold text-gray-800">
                Tuyệt vời quá! 🥳
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Mình đã nhận được xác nhận rồi! Sẽ là một buổi gặp mặt thật vui
                đấy!
              </p>
              <div className="flex justify-center gap-2 text-xl sm:text-2xl">
                ✨💖🎊🌟💫
              </div>
              <p className="text-xs sm:text-sm text-gray-500 italic pt-2">
                Hẹn gặp bạn nhé! See you soon! 👋
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-40 h-40 bg-pink-300/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-300/30 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div
        className="relative w-full max-w-md lg:max-w-lg"
        style={{ perspective: "1500px" }}
      >
        <div
          className="relative w-full cursor-pointer"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)",
          }}
          onClick={() => setIsFlipped(!isFlipped)}
          onMouseMove={createHeart}
        >
          {/* Mặt trước */}
          <div
            className="relative bg-linear-to-br from-white via-pink-50 to-purple-50 rounded-3xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden"
            style={{ backfaceVisibility: "hidden", minHeight: "600px" }}
          >
            {/* Decorative top wave */}
            <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-br from-pink-400 to-purple-500 opacity-90">
              <svg
                className="absolute bottom-0 w-full"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0 C300,60 900,60 1200,0 L1200,120 L0,120 Z"
                  fill="white"
                  fillOpacity="1"
                />
              </svg>
            </div>

            {/* Floating hearts animation */}
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

            <div className="relative z-10 p-6 sm:p-8 lg:p-10 pt-20 sm:pt-24 flex flex-col items-center text-center">
              {/* Decorative stars */}
              <div className="absolute top-16 sm:top-20 left-6 sm:left-10">
                <Star
                  className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-yellow-400 animate-spin"
                  style={{ animationDuration: "3s" }}
                />
              </div>
              <div className="absolute top-24 sm:top-32 right-8 sm:right-12">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400 animate-bounce" />
              </div>
              <div className="absolute top-20 sm:top-28 right-16 sm:right-24">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 fill-purple-400 animate-pulse" />
              </div>

              {/* Main content */}
              <div className="mb-6 sm:mb-8">
                <Music className="w-12 h-12 sm:w-16 sm:h-16 text-fuchsia-500 mx-auto mb-3 sm:mb-4 animate-bounce" />
                <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4 sm:mb-6">
                  <span className="text-white font-bold text-xs sm:text-sm tracking-wider">
                    YOU'RE INVITED
                  </span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 leading-tight">
                <span className="bg-linear-to-r from-pink-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                  Let's Hang
                </span>
                <br />
                <span className="bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent drop-shadow-sm">
                  Out!
                </span>
              </h1>

              <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-linear-to-r from-pink-500 via-fuchsia-500 to-purple-500 rounded-full mb-4 sm:mb-6"></div>

              <p className="text-base sm:text-lg text-gray-600 max-w-xs sm:max-w-sm mb-6 sm:mb-8 leading-relaxed px-2">
                Tối 6/12/2025{" "}
              </p>

              <div className="relative inline-block">
                <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-500 rounded-2xl blur-xl opacity-60 animate-pulse"></div>
                <div className="relative bg-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-lg border-2 border-pink-200">
                  <p className="text-sm sm:text-base text-gray-700 font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-fuchsia-500" />
                    Chạm để mở thiệp
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-fuchsia-500" />
                  </p>
                </div>
              </div>

              {/* Bottom decoration */}
              <div className="mt-8 sm:mt-12 flex gap-2 sm:gap-3 justify-center">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"
                    style={{
                      animation: "pulse 2s ease-in-out infinite",
                      animationDelay: `${i * 0.2}s`,
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Bottom decorative wave */}
            <div className="absolute bottom-0 left-0 w-full">
              <svg
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="w-full h-20"
              >
                <path
                  d="M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z"
                  fill="url(#gradient)"
                  fillOpacity="0.3"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Mặt sau */}
          <div
            className="absolute top-0 left-0 w-full bg-linear-to-br from-white via-purple-50 to-pink-50 rounded-3xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              minHeight: "600px",
            }}
          >
            {/* Decorative header */}
            <div className="relative h-32 sm:h-40 bg-linear-to-r from-pink-500 via-fuchsia-500 to-purple-500 overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="absolute top-4 left-4 w-16 sm:w-20 h-16 sm:h-20 bg-white/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 right-4 w-24 sm:w-32 h-24 sm:h-32 bg-white/20 rounded-full blur-2xl"></div>

              <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 mb-2 animate-pulse" />
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Chi Tiết Buổi Hẹn
                </h2>
              </div>

              <svg
                className="absolute bottom-0 w-full"
                viewBox="0 0 1200 80"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z"
                  fill="white"
                />
              </svg>
            </div>

            <div className="px-6 sm:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
              {/* Info cards */}
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-r from-pink-400 to-rose-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white p-4 sm:p-5 rounded-2xl shadow-lg border-2 border-pink-100 flex items-center gap-3 sm:gap-4 group-hover:scale-105 transition-transform">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-pink-400 to-rose-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Ngày
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-gray-800">
                      Thứ Bảy, 06/12/2025
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-r from-purple-400 to-fuchsia-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white p-4 sm:p-5 rounded-2xl shadow-lg border-2 border-purple-100 flex items-center gap-3 sm:gap-4 group-hover:scale-105 transition-transform">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-purple-400 to-fuchsia-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Thời Gian
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-gray-800">
                      7:00 PM - Tối thứ Bảy
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-r from-fuchsia-400 to-indigo-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white p-4 sm:p-5 rounded-2xl shadow-lg border-2 border-indigo-100 flex items-center gap-3 sm:gap-4 group-hover:scale-105 transition-transform">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-fuchsia-400 to-indigo-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Địa Điểm
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-gray-800">
                      {" "}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Tp. Hồ Chí Minh
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-center text-xl sm:text-2xl text-gray-700 font-semibold mt-2">
                Mời:{" "}
                <span className="text-pink-600 font-bold">
                  Nguyễn Thị Kim Ngân
                </span>
              </p>

              <p className="text-center text-xs sm:text-sm text-gray-400 font-medium pt-1 sm:pt-2">
                Nhấn lại để xem mặt trước 
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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

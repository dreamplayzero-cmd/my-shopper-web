import { motion } from 'motion/react';

export default function Splash({ onLogin }: { onLogin: (type: string) => void }) {
  const isWebApp = window.location.hostname.includes('style-shopper') || window.location.hostname.includes('my-shopper-2026');
  
  if (isWebApp) {
    return (
      <main
        className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden"
        style={{
          backgroundImage: 'url("/terrazzo_bg_final.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'luminosity',
          backgroundColor: '#f0f8ff'
        }}
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[0.5px] pointer-events-none" />

        <header className="w-full pt-16 md:pt-32 flex flex-col items-center z-10 px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-6xl tracking-[0.3em] text-black mb-2 drop-shadow-sm font-bold"
          >
            MY SHOPPER
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-xs uppercase tracking-[0.4em] text-on-surface-variant font-bold"
          >
            당신을 위한 퍼스널 스타일 아카이브
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.5 }}
            className="mt-4 font-sans text-[8px] uppercase tracking-[0.15em] text-on-surface-variant font-light"
          >
            Powered by Local SQLite High-Speed Indexing Engine & Firebase Cloud Infrastructure
          </motion.p>
        </header>

        <section className="w-full max-w-[400px] px-6 flex flex-col gap-8 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <img
              alt="Editorial Daily Flatlay"
              className="w-full h-full object-cover"
              src="/daily_flatlay_final.png"
            />
          </motion.div>

          <div className="flex flex-col gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onLogin('kakao')}
              className="flex items-center justify-center w-full h-14 bg-[#FEE500] rounded-full text-sm font-semibold transition-colors shadow-md text-black"
            >
              카카오 계정으로 로그인
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onLogin('google')}
              className="flex items-center justify-center w-full h-14 bg-white border border-outline-variant rounded-full text-sm font-semibold hover:bg-surface-container-low transition-colors shadow-sm text-black"
            >
              구글 계정으로 계속하기
            </motion.button>
          </div>
        </section>

        <footer className="w-full py-8 px-6 z-10">
          <div className="flex justify-center gap-8 border-t border-outline-variant/30 pt-4">
            <a className="text-[10px] text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors" href="#">개인정보 처리방침</a>
            <a className="text-[10px] text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors" href="#">이용약관</a>
          </div>
          <p className="mt-4 text-center text-[10px] text-outline uppercase tracking-[0.3em]">
            © 2026 STYLIST AI INC. ALL RIGHTS RESERVED.
          </p>
        </footer>
      </main>
    );
  }

  return (
    <main 
      className="relative w-full h-full flex flex-col items-center justify-between overflow-hidden pb-safe"
      style={{ backgroundColor: '#F4F6F7' }}
    >
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.08]"
        style={{
          backgroundImage: 'url("/ocean_terrazzo_bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'contrast(1.15) brightness(0.95)',
        }}
      />
      <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none z-0" />

      <header className="w-full pt-16 md:pt-24 flex flex-col items-center z-10 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-[32px] tracking-[0.2em] text-on-surface mb-2 drop-shadow-sm font-bold uppercase"
        >
          Aether
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.3 }}
          className="font-sans text-[12px] tracking-[0.2em] text-on-surface-variant font-bold uppercase"
        >
          Personal Style Archive
        </motion.p>
      </header>

      <section className="w-full max-w-[300px] px-4 flex flex-col items-center justify-center z-10 flex-1 my-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white bg-white"
        >
          <img
            alt="Editorial Daily Flatlay"
            className="w-full h-full object-cover mix-blend-multiply"
            src="/daily_flatlay_final.png"
          />
        </motion.div>
      </section>

      <section className="w-full max-w-[320px] px-6 z-10 flex flex-col gap-4 mb-8">
        <div className="flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onLogin('kakao')}
            className="flex items-center justify-center w-full h-14 bg-[#FEE500] rounded-full text-[15px] font-semibold text-black transition-colors shadow-md"
          >
            카카오 계정으로 로그인
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onLogin('google')}
            className="flex items-center justify-center w-full h-14 bg-white border border-outline-variant rounded-full text-[15px] font-semibold text-black hover:bg-surface-container-low transition-colors shadow-sm"
          >
            구글 계정으로 계속하기
          </motion.button>
        </div>
      </section>

      <footer className="w-full pb-8 px-6 z-10">
        <div className="flex justify-center gap-8 border-t border-outline-variant/30 pt-4">
          <a className="text-[10px] text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors" href="#">개인정보 처리방침</a>
          <a className="text-[10px] text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors" href="#">이용약관</a>
        </div>
        <p className="mt-4 text-center text-[10px] text-outline uppercase tracking-[0.3em]">
          © 2026 STYLIST AI INC. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </main>
  );
}

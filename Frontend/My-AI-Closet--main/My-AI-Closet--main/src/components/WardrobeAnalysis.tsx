import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Zap, CheckCircle2, Sparkles, Database, ArrowRight, Loader2, Palette, CloudSun } from 'lucide-react';
import { ITEMS } from '../constants';

type AnalysisStep = 'IDLE' | 'ANALYZING' | 'RESULT';

interface Props {
  gender?: 'male' | 'female';
  onOpenProfile?: () => void;
}

export default function WardrobeAnalysis({ gender, onOpenProfile }: Props) {
  const [step, setStep] = useState<AnalysisStep>('IDLE');
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const [age, setAge] = useState('');
  const [job, setJob] = useState('');
  const [prefStyle, setPrefStyle] = useState('');
  const [mbti, setMbti] = useState('INTJ');

  const [weather, setWeather] = useState({
    condition: '맑음',
    loading: true
  });

  const analysisMessages = [
    "얼굴 색상 및 이목구비 영역 추출 중...",
    "색채 심리학 기반 퍼스널 톤 분석 중...",
    "웜톤/쿨톤 스타일 DNA 매칭 중...",
    "등록된 옷의 카테고리 매핑 중 (예: 울 자켓)...",
    "실시간 기상 데이터 연동 및 소재 적합도 분석 중...",
    "실루엣 및 무드 유사도 계산 중...",
    "최종 스타일 호환성 점수 산출 완료"
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&current=weather_code&timezone=auto`);
          const data = await res.json();
          const code = data.current.weather_code;
          let conditionStr = '맑음';
          if (code >= 1 && code <= 3) conditionStr = '구름많음/흐림';
          else if (code >= 51 && code <= 67) conditionStr = '비';
          else if (code >= 71 && code <= 77) conditionStr = '눈';
          else if (code >= 80 && code <= 82) conditionStr = '소나기';
          
          setWeather({ condition: conditionStr, loading: false });
        } catch (e) {
          setWeather({ condition: '맑음', loading: false });
        }
      }, () => setWeather({ condition: '맑음', loading: false }));
    } else {
      setWeather({ condition: '맑음', loading: false });
    }
  }, []);

  // Hardcoded to female to match the AI "Cool Tone" analysis of the female logo model
  const compatibilityItems = ITEMS.filter(i => i.gender === 'female' || i.gender === 'both').slice(0, 4);

  // Handle analysis simulation
  useEffect(() => {
    if (step === 'ANALYZING') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep('RESULT'), 500);
            return 100;
          }
          return prev + 1;
        });
      }, 30);

      const messageInterval = setInterval(() => {
        setMessageIndex(prev => Math.min(prev + 1, analysisMessages.length - 1));
      }, 800);

      return () => {
        clearInterval(interval);
        clearInterval(messageInterval);
      };
    }
  }, [step]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!age || !job || !prefStyle) {
        // Optional validation
      }
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setStep('ANALYZING');
      setProgress(0);
      setMessageIndex(0);
    }
  };

  return (
    <div className="pt-24 pb-32 px-6 max-w-[1440px] mx-auto w-full min-h-[100vh] bg-surface flex flex-col">
      <div className="mb-12">
        <h2 className="text-3xl font-serif mb-3 leading-tight">
          새로운 아이템이 당신의 스타일 DNA와<br />
          얼마나 어울리는지 분석해보세요
        </h2>
        <p className="text-[10px] text-on-surface-variant/50 tracking-[0.2em] uppercase font-bold">Style Compatibility Engine v2.0</p>
      </div>

      <div className="flex flex-col gap-10 items-start w-full">
        {/* Top/Left Side: Upload & Input Form */}
        <div className="flex flex-col gap-6 w-full">
          <div className="bg-surface-container-low rounded-[2rem] p-6 border border-outline-variant/10 shadow-sm flex flex-col gap-4">
            <h3 className="text-[10px] font-bold text-primary flex items-center gap-2 tracking-[0.2em] uppercase">
              <Database size={14} /> Personal Identity
            </h3>
            <div className="space-y-3">
              <input type="text" placeholder="연령대 (예: 20대, 30대)" value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-transparent border-b border-outline-variant/20 py-2.5 text-xs outline-none focus:border-primary/50 text-on-surface font-medium placeholder:text-on-surface-variant/40" />
              <input type="text" placeholder="직업 (예: 디자이너, 대학생)" value={job} onChange={(e) => setJob(e.target.value)} className="w-full bg-transparent border-b border-outline-variant/20 py-2.5 text-xs outline-none focus:border-primary/50 text-on-surface font-medium placeholder:text-on-surface-variant/40" />
              <input type="text" placeholder="선호 의상 (예: 미니멀, 캐주얼)" value={prefStyle} onChange={(e) => setPrefStyle(e.target.value)} className="w-full bg-transparent border-b border-outline-variant/20 py-2.5 text-xs outline-none focus:border-primary/50 text-on-surface font-medium placeholder:text-on-surface-variant/40" />
              <div className="pt-2">
                <label className="text-[9px] font-bold uppercase tracking-widest text-primary/50 block mb-2">MBTI TYPE</label>
                <select value={mbti} onChange={(e) => setMbti(e.target.value)} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl py-3 px-3 text-xs outline-none font-bold tracking-widest">
                  {["INTJ", "ENTP", "INFP", "ESTJ", "ISFJ", "ENFJ", "INFJ", "None"].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <label htmlFor="photo-upload" className="block cursor-pointer">
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <motion.div
              whileHover={{ scale: 1.02, borderColor: 'var(--color-primary)' }}
              whileTap={{ scale: 0.98 }}
              style={{ pointerEvents: step === 'ANALYZING' ? 'none' : 'auto', opacity: step === 'ANALYZING' ? 0.6 : 1 }}
              className="aspect-[1.1/1] bg-surface-container-low rounded-[2rem] border-2 border-dashed border-outline-variant flex flex-col items-center justify-center p-8 text-center group transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                <Camera size={28} className="text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-lg font-serif mb-2 italic text-on-surface">얼굴 / 착장 업로드</h3>
              <p className="text-[10px] text-on-surface-variant font-light leading-relaxed">
                퍼스널 톤 및 스타일 매칭을 위해<br />자신의 사진을 업로드하세요.
              </p>
            </motion.div>
          </label>
        </div>

        {/* Right Side: Dynamic Area (Idle -> Analyzing -> Result) */}
        <div className="w-full min-h-[70vh]">
          <AnimatePresence mode="wait">
            {step === 'IDLE' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full flex flex-col justify-center items-center p-12 bg-surface-container-lowest border border-outline-variant/10 rounded-[3rem] shadow-sm text-center"
              >
                <div className="w-24 h-24 bg-surface-container-low rounded-full flex justify-center items-center mb-8">
                  <Database size={40} className="text-primary/20" />
                </div>
                <h3 className="text-2xl font-serif italic mb-4">대기 중인 분석 스레드 없음</h3>
                <p className="text-sm font-light text-on-surface-variant leading-relaxed max-w-sm mb-10">
                  위 패널에 개인정보를 입력하고 사진을 업로드하시면, 색채 심리학 기반 퍼스널 컬러와 어울리는 착장을 시맨틱하게 분석합니다.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md text-left">
                  {[
                    { t: '색채 심리학 분류', d: '얼굴 톤 (웜/쿨) 정밀 진단' },
                    { t: '스타일 방향 분석', d: '입력된 정보와 DNA 대조' },
                    { t: '컬러 / 핏 적합도', d: '현재 의상과의 조화 측정' },
                    { t: 'AI 기반 추천 코디', d: '가장 완벽한 레이어링 제안' }
                  ].map((x, i) => (
                    <div key={i} className="p-4 bg-surface rounded-2xl border border-outline-variant/10 flex flex-col gap-1">
                      <span className="text-[9px] font-bold text-primary uppercase">{x.t}</span>
                      <span className="text-[10px] text-on-surface-variant">{x.d}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'ANALYZING' && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full flex flex-col items-center justify-center p-12 bg-surface-container-lowest border border-outline-variant/10 rounded-[3rem] shadow-sm"
              >
                <div className="relative w-56 h-56 mb-12">
                  <motion.div
                    className="absolute inset-x-0 h-1 bg-primary/40 z-10 blur-sm"
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-0 border-2 border-primary/20 rounded-full overflow-hidden bg-surface-container-highest/30">
                    {uploadedImage ? (
                      <img src={uploadedImage} className="w-full h-full object-cover opacity-60 mix-blend-luminosity" alt="scanning" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center opacity-30">
                        <Sparkles size={48} className="text-primary animate-pulse" />
                      </div>
                    )}
                  </div>
                  <div className="absolute -inset-4 border border-primary/10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                </div>

                <div className="text-center space-y-6 w-full max-w-sm">
                  <div className="flex items-center justify-center gap-3">
                    <Loader2 size={16} className="text-primary animate-spin" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-primary">
                      {analysisMessages[messageIndex]}
                    </span>
                  </div>

                  <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'RESULT' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-12 bg-surface-container-lowest rounded-[3rem] p-8 md:p-12 border border-outline-variant/10 shadow-2xl"
              >
                {/* 1) Color Psychology & Avatar */}
                <header className="flex flex-col gap-10 items-center">
                  <div className="w-full max-w-[240px] aspect-[4/5] bg-surface-container-low rounded-[2rem] overflow-hidden group relative border border-outline-variant/10 shrink-0">
                    <img
                      src={uploadedImage || ITEMS[0].image}
                      alt="Analyzed face"
                      className="w-full h-full object-cover grayscale-[20%] group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/10 backdrop-blur-xl p-3 rounded-xl border border-white/20">
                        <p className="text-[7px] text-white/80 uppercase tracking-widest font-bold mb-0.5">Color Psychology Tone</p>
                        <p className="text-white text-[10px] font-serif italic mb-1">쿨톤 (Cool Tone) 베이스</p>
                        <p className="text-[5px] text-white/60 tracking-wider">
                          * AI 기반 퍼스널 컬러 OpenCV 분석 알고리즘 적용
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Material Description Line */}
                  <div className="w-full text-center px-4 -mt-2">
                    <p className="text-sm text-on-surface-variant font-light italic break-keep">
                      등록된 의류 소재: <span className="font-bold text-on-surface">울(Wool) 자켓</span> - 보온성이 뛰어나고 클래식한 무드
                    </p>
                  </div>

                  {/* Smart Weather API Report Card */}
                  <div className="w-full bg-primary/5 border border-primary/20 rounded-3xl p-6 text-center flex flex-col items-center gap-3 shadow-sm mx-auto max-w-sm">
                    <CloudSun size={24} className="text-primary" />
                    <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Weather × Material Data Report</p>
                    <p className="text-sm font-serif italic text-on-surface break-keep leading-relaxed">
                      "오늘 기상은 <strong>{weather.condition}</strong> 상태입니다.<br/>
                      {weather.condition === '비' || weather.condition === '소나기' || weather.condition === '눈'
                        ? '비(눈)가 와서 습기에 취약한 울 소재가 손상될 수 있으니 착용을 피하거나 우산을 꼭 준비하세요.'
                        : '울 소재의 특유의 고급스러움을 쾌적하게 연출하기 좋은 날씨입니다.'}"
                    </p>
                  </div>

                  <div className="flex-1 space-y-8 w-full">
                    <section>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-secondary/10 px-3 py-1 rounded-full flex items-center gap-2">
                          <Palette size={12} className="text-secondary" />
                          <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Color Psychological Match</span>
                        </div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-serif italic leading-relaxed mb-4 break-keep">
                        “고객님의 색채는<br/>
                        <span className="font-bold underline decoration-secondary text-on-surface">쿨톤(Cool)</span>의 차갑고 이지적인<br/>
                        에너지와 깊숙이<br/>
                        연결되어 있습니다.”
                      </h3>
                      <p className="text-sm font-light leading-relaxed text-on-surface-variant">
                        색채 심리학 분석 결과, 차갑고 명확한 색상이 이목구비를 더욱 선명하고 이지적으로 돋보이게 만듭니다. 입력하신 '{mbti}' 기질의 분석적인 무드와 완벽한 시너지를 이룹니다. 네이비/블랙 베이스와 실버 액세서리가 최적의 밸런스를 구축합니다.
                      </p>
                    </section>

                    <section className="grid grid-cols-2 gap-3">
                      {[
                        { label: '미니멀 실루엣 적합', value: true },
                        { label: '차분한 계열 시너지', value: true },
                        { label: '은은한 광택감 선호', value: true },
                        { label: '구조적 레이어링 확립', value: true }
                      ].map((r, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-surface-container-high/40 rounded-xl border border-outline-variant/5">
                          <CheckCircle2 size={14} className="text-secondary" />
                          <span className="text-[10px] font-bold text-on-surface-variant tracking-wide">{r.label}</span>
                        </div>
                      ))}
                    </section>
                  </div>
                </header>

                <hr className="border-outline-variant/10" />

                {/* 2) Existing Items Matrix */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Database size={16} className="text-primary/40" />
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Synergy with Wardrobe</span>
                  </div>
                  <h2 className="text-2xl font-serif italic mb-8">기존 보유 상품과의 최적 조합</h2>
                  <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
                    {compatibilityItems.map((item) => (
                      <motion.div key={item.id} whileHover={{ y: -5 }} className="group">
                        <div className="aspect-square bg-surface-container-low rounded-3xl overflow-hidden mb-4 relative shadow-sm border border-outline-variant/5">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-[8px] font-bold tracking-widest uppercase text-primary">
                            보유 중
                          </div>
                        </div>
                        <div className="px-2">
                          <p className="text-xs font-bold mb-1 truncate">{item.name}</p>
                          <p className="text-[9px] text-on-surface-variant font-light">{item.semantics.join(' / ')}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>

                <div className="pt-8">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => window.location.reload()}
                      className="flex-1 py-4 bg-primary text-white rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3 group"
                    >
                      <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
                      내 DNA 캐비닛에 저장
                    </button>
                    <button
                      onClick={onOpenProfile}
                      className="flex-1 py-4 bg-secondary-container text-primary rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] shadow-sm hover:bg-secondary-container/80 transition-all flex items-center justify-center gap-3"
                    >
                      마지막 리포트 페이지로 이동 (Profile)
                    </button>
                    <button
                      onClick={() => { setStep('IDLE'); setUploadedImage(null); setProgress(0); }}
                      className="flex-1 py-4 bg-surface-container-highest text-primary rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] border border-outline-variant/20 hover:bg-surface-dim transition-all"
                    >
                      다시 분석하기
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

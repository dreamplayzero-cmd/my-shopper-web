import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Zap, CheckCircle2, Sparkles, Database, ArrowRight, Loader2, Palette, CloudSun } from 'lucide-react';
import { ITEMS } from '../constants';
import MaterialScanner from './MaterialScanner';

type AnalysisStep = 'IDLE' | 'ANALYZING' | 'RESULT';

interface Props {
  gender?: 'male' | 'female';
  onOpenProfile?: () => void;
}

export default function WardrobeAnalysis({ gender, onOpenProfile }: Props) {
  const [step, setStep] = useState<AnalysisStep>('IDLE');
  const [progress, setProgress] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const [age, setAge] = useState('');
  const [job, setJob] = useState('');
  const [prefStyle, setPrefStyle] = useState('');
  const [mbti, setMbti] = useState('INTJ');

  const [weather, setWeather] = useState({
    condition: '맑음',
    loading: true
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      setStep('ANALYZING');
      setProgress(0);
    }
  };

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

  const compatibilityItems = ITEMS.filter(i => i.gender === (gender || 'female') || i.gender === 'both').slice(0, 4);

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
      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div className="pt-24 pb-32 px-6 max-w-[1440px] mx-auto w-full min-h-[100vh] bg-surface">
      <div className="mb-12">
        <h2 className="text-3xl font-serif mb-3 leading-tight">
          새로운 아이템이 당신의 스타일 DNA와<br />
          얼마나 어울리는지 분석해보세요
        </h2>
        <p className="text-[10px] text-on-surface-variant/50 tracking-[0.2em] uppercase font-bold">Style Compatibility Engine v2.0</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        
        {/* LEFT COLUMN: Input & Upload */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
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

          <div className="bg-surface-container-lowest rounded-[2rem] border border-outline-variant/20 p-8 shadow-sm h-full flex flex-col justify-center items-center">
            <div className="w-full max-w-sm mx-auto flex flex-col items-center">
              <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                <Camera size={32} className="text-primary" />
              </div>
              <h2 className="text-2xl font-serif mb-4 text-center">의류 스캔 & 업로드</h2>
              <p className="text-sm text-on-surface-variant font-light text-center mb-8 break-keep">
                분석하고 싶은 의류 사진을 업로드하시면, Style DNA 엔진이 소재와 핏을 정밀 스캔합니다.
              </p>
              
              {!uploadedImage ? (
                <label className="w-full h-48 border-2 border-dashed border-primary/30 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 transition-colors group relative overflow-hidden">
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
                  <Database className="text-primary/50 mb-3 group-hover:scale-110 transition-transform" size={28} />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-primary">Upload Image</span>
                  <span className="text-xs text-on-surface-variant mt-2 font-medium">Click to browse</span>
                </label>
              ) : (
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-outline-variant/20 group">
                  <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="cursor-pointer px-6 py-3 bg-white text-primary rounded-full text-xs font-bold uppercase tracking-widest hover:bg-surface transition-colors shadow-xl">
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                      Change Image
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Analysis Results */}
        <div className="w-full lg:w-2/3">
          <AnimatePresence mode="wait">
            {step === 'IDLE' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full flex flex-col justify-center items-center bg-surface-container-low/30 rounded-[2rem] border border-outline-variant/20 p-12 text-center"
              >
                <Database size={48} className="text-primary/20 mb-6" />
                <h3 className="text-xl font-serif text-on-surface/50 mb-2">대기 중...</h3>
                <p className="text-sm text-on-surface-variant/50">좌측에서 이미지를 업로드하면 분석이 시작됩니다.</p>
              </motion.div>
            )}

            {step === 'ANALYZING' && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden p-12 text-center h-full flex flex-col justify-center items-center border border-outline-variant/10 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
                <Loader2 size={48} className="text-primary animate-spin mb-8 mx-auto" />
                <h2 className="text-3xl font-serif mb-4 tracking-tight">분석중입니다...</h2>
                <div className="w-full max-w-sm mx-auto h-2 bg-surface-container-high rounded-full overflow-hidden shadow-inner mb-6">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <p className="text-sm text-on-surface-variant font-medium tracking-wide">
                  {progress < 30 ? '의류 소재 및 패턴 스캔 중...' : 
                   progress < 70 ? '스타일 DNA 매핑 및 색채 분석 중...' : 
                   '최종 최적화 데이터 생성 중...'}
                </p>
              </motion.div>
            )}

            {step === 'RESULT' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-12 bg-surface-container-lowest rounded-[3rem] p-8 md:p-12 border border-outline-variant/10 shadow-2xl"
              >
                <header className="flex flex-col gap-10 items-center">
                  <div className="w-full max-w-[240px] aspect-[4/5] bg-surface-container-low rounded-[2rem] overflow-hidden group relative border border-outline-variant/10 shrink-0">
                    <img src={uploadedImage || ITEMS[0].image} alt="Analyzed" className="w-full h-full object-cover grayscale-[20%]" />
                  </div>
                  <div className="w-full text-center px-4 mt-2">
                    <MaterialScanner imageUrl={uploadedImage || ITEMS[0].image} />
                  </div>
                  <div className="w-full bg-primary/5 border border-primary/20 rounded-3xl p-6 text-center flex flex-col items-center gap-3 shadow-sm mx-auto max-w-sm">
                    <CloudSun size={24} className="text-primary" />
                    <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Weather × Material Report</p>
                    <p className="text-sm font-serif italic text-on-surface break-keep leading-relaxed">
                      "오늘 기상은 <strong>{weather.condition}</strong> 상태입니다."
                    </p>
                  </div>
                </header>

                <hr className="border-outline-variant/10 my-10" />

                {/* 색채 심리 분석 Section */}
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <Palette size={24} className="text-primary/70" />
                    <h2 className="text-2xl font-serif italic">색채 심리 & 퍼스널 컬러 분석</h2>
                  </div>
                  <div className="flex flex-col md:flex-row gap-6 mb-10">
                    <div className="flex-1 bg-white rounded-[2rem] p-8 shadow-sm border border-outline-variant/10 flex flex-col items-center text-center group hover:shadow-md transition-shadow">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-300 via-indigo-300 to-purple-400 mb-6 shadow-inner flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Sparkles size={24} className="text-white" />
                      </div>
                      <h4 className="font-bold text-lg mb-3 text-on-surface">분석 결과: 쿨톤 (Cool Tone)</h4>
                      <p className="text-sm text-on-surface-variant font-medium leading-relaxed break-keep">
                        스캔된 의상은 청량하고 차가운 베이스의 <strong>쿨톤 계열</strong>입니다. 이지적이고 세련된 인상을 주며, 심리적으로 차분함과 신뢰감을 부여하는 효과가 뛰어납니다.
                      </p>
                    </div>
                    <div className="flex-1 bg-white rounded-[2rem] p-8 shadow-sm border border-outline-variant/10 flex flex-col items-center text-center group hover:shadow-md transition-shadow">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-200 via-orange-200 to-amber-300 mb-6 shadow-inner flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Palette size={24} className="text-white" />
                      </div>
                      <h4 className="font-bold text-lg mb-3 text-on-surface">웜톤(Warm Tone) 믹스매치 가이드</h4>
                      <p className="text-sm text-on-surface-variant font-medium leading-relaxed break-keep">
                        실버 주얼리나 화이트/네이비 아이템과 매치하면 쿨톤의 모던함이 극대화됩니다. 부드러운 분위기를 원한다면 <strong>파스텔 웜톤</strong>(소프트 베이직) 아이템을 레이어드 해보세요.
                      </p>
                    </div>
                  </div>
                </section>

                <hr className="border-outline-variant/10 my-10" />

                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <Database size={16} className="text-primary/40" />
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Synergy with Wardrobe</span>
                  </div>
                  <h2 className="text-2xl font-serif italic mb-8">기존 보유 상품과의 최적 조합</h2>
                  <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
                    {compatibilityItems.map((item) => (
                      <div key={item.id} className="group">
                        <div className="aspect-square bg-surface-container-low rounded-3xl overflow-hidden mb-4 relative shadow-sm border border-outline-variant/5">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain p-6" />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="pt-8 mb-8">
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
                      내 옷장 매칭 결과 보기
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

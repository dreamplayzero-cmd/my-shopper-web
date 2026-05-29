import { useState } from 'react';
import { motion } from 'motion/react';
import { LogOut, Calendar, Repeat, ChevronDown, Filter, User, Sparkles, Shirt } from 'lucide-react';
import { OUTFITS, Outfit } from '../constants';
import { PERSONA_DATA, Persona } from '../constants/personas';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface ProfileProps {
  onLogout: () => void;
  onResetDNA: () => void;
  selectedPersonas: Persona[];
  mbti: string;
  setMbti: (v: string) => void;
  state: string;
  setState: (v: string) => void;
}

export default function Profile({ onLogout, onResetDNA, selectedPersonas, mbti, setMbti, state, setState, gender }: ProfileProps & { gender: 'male' | 'female' }) {
  const [sortBy, setSortBy] = useState<'latest' | 'most'>('latest');
  const [profileGender, setProfileGender] = useState(gender === 'male' ? '남성' : '여성');
  const [occupation, setOccupation] = useState('');
  const [concerns, setConcerns] = useState('');

  const radarData = [
    { subject: 'Comfort', A: 85, fullMark: 100 },
    { subject: 'Clean', A: 72, fullMark: 100 },
    { subject: 'Urban', A: 90, fullMark: 100 },
    { subject: 'Unique', A: 65, fullMark: 100 },
    { subject: 'Active', A: 78, fullMark: 100 },
    { subject: 'Feminine', A: 60, fullMark: 100 },
  ];

  const sortedOutfits = [...OUTFITS].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.lastWorn).getTime() - new Date(a.lastWorn).getTime();
    } else {
      return b.wearCount - a.wearCount;
    }
  });

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 pt-16 pb-16 flex flex-col gap-6">
      {/* Profile Header */}
      <section className="flex flex-col items-center gap-4 border-b border-outline-variant/20 pb-6">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary p-1 bg-surface shrink-0">
          <img
            className="w-full h-full object-cover rounded-full"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
            alt="User profile"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col items-center gap-3 mb-4">
            <h1 className="text-xl font-serif italic uppercase tracking-wider text-primary break-words">Alexandria Sterling</h1>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={onResetDNA}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-white text-[9px] font-bold uppercase tracking-widest hover:bg-primary/80 transition-all shadow-md"
              >
                <Repeat size={14} className="animate-spin-slow" />
                스타일 DNA 다시 테스트
              </button>
              {/* Unused Settings button removed */}
              <button
                onClick={onLogout}
                className="p-2.5 rounded-full bg-surface-container border border-outline-variant/30 hover:bg-red-50 text-red-600 transition-all hover:scale-110"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>

          <div className="bg-surface-container-lowest/50 rounded-2xl px-5 py-4 mb-6 w-full border border-outline-variant/10 text-left shadow-sm flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-on-surface">
              <User size={14} className="text-primary" fill="currentColor" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em]">AI Engine</span>
            </h2>

            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-primary/50">MBTI Type</label>
                <div className="relative">
                  <select
                    value={mbti}
                    onChange={(e) => setMbti(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest outline-none appearance-none cursor-pointer"
                  >
                    {["INFJ", "ENFP", "INTJ", "ENTP", "ISTJ", "ESTJ", "None"].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-primary/50">Psychology State (정서 상태)</label>
                <div className="relative">
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest outline-none appearance-none cursor-pointer"
                  >
                    {["CALM", "ENERGY", "CONFIDENCE"].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40" />
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-3 border-t border-outline-variant/10 pt-3">
              <div className="w-full flex gap-3">
                <div className="relative">
                  <select
                    value={profileGender}
                    onChange={(e) => setProfileGender(e.target.value)}
                    className="w-full bg-transparent border-b border-outline-variant/20 py-1.5 text-[10px] appearance-none outline-none font-medium"
                  >
                    <option value="남성">남성</option>
                    <option value="여성">여성</option>
                  </select>
                </div>
              </div>

              <div className="w-full">
                <input
                  type="text"
                  value={occupation}
                  placeholder="연령 및 직업"
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full bg-transparent border-b border-outline-variant/20 py-1.5 text-[10px] outline-none font-medium"
                />
              </div>

              <div className="w-full">
                <input
                  type="text"
                  value={concerns}
                  placeholder="체형 및 고민 사항"
                  onChange={(e) => setConcerns(e.target.value)}
                  className="w-full bg-transparent border-b border-outline-variant/20 py-1.5 text-[10px] outline-none font-medium"
                />
              </div>
            </div>

            <button 
              onClick={() => {
                const webAppResultUrl = 'https://style-shopper.web.app/result'; 
                const queryParams = new URLSearchParams({
                  ageGroup: occupation, 
                  job: occupation,           
                  style: concerns        
                }).toString();
                window.location.href = `${webAppResultUrl}?${queryParams}`;
              }}
              className="w-full mt-4 bg-primary text-white py-3 rounded-xl text-[11px] font-bold tracking-widest hover:bg-primary/80 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles size={16} />
              맞춤 추천 결과 보기 (웹앱 연동)
            </button>
          </div>

          <div className="flex justify-center md:justify-start gap-8">
            <div className="text-center md:text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant opacity-50">전체 코디</p>
              <p className="text-xl font-serif">{OUTFITS.length}</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant opacity-50">사용 빈도</p>
              <p className="text-xl font-serif">84%</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant opacity-50">스타일 DNA</p>
              <p className="text-xl font-serif uppercase text-primary">Active Sportive</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-surface-container-low/50 rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden flex flex-col">

        {/* Top: Visual DNA Radar */}
        <div className="p-6 flex-1 border-b border-outline-variant/10 flex flex-col items-center justify-center bg-surface-container-lowest/30">
          <h2 className="text-lg font-serif italic mb-1">Style DNA Blueprint</h2>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface-variant/60 mb-6">개인화된 패션 성향 지표</p>

          <div className="w-full max-w-[280px] aspect-square flex items-center justify-center bg-surface rounded-full shadow-inner border border-outline-variant/5">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#E5E2DD" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#000000', fontSize: 9, fontWeight: 700 }} />
                <Radar name="DNA" dataKey="A" stroke="#000000" fill="#000000" fillOpacity={0.10} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom: Insights & Origin Personas */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-serif">스타일 DNA 인사이트</h3>
              <button onClick={onResetDNA} className="text-[9px] font-bold text-primary uppercase tracking-widest underline underline-offset-4 hover:opacity-70 transition-opacity">
                DNA 재분석
              </button>
            </div>

            <p className="text-on-surface-variant font-light text-sm leading-relaxed mb-8 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/5">
              당신의 시맨틱 프로필은 <strong>도시적인 실용성(Urban Utility)</strong>과 <strong>깔끔한 미니멀리즘(Clean Minimalist)</strong> 미학을 강조하고 있습니다.
              타인은 당신의 옷차림을 "세련되고 감각적인 스타일"로 인식할 가능성이 높습니다. 현재 옷장은 지적인 느낌을 주는 실루엣과 저채도 톤에 집중되어 있습니다.
            </p>

            <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/70 mb-3 ml-1">최종 분석 기반 데이터 (업로드 + 페르소나 + 추천)</h3>
            <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2 snap-x">
              {[
                { id: 'user-upload', image: profileGender === '남성' ? '/male_model.png' : '/female_model.png', category: 'MV MODEL', mood: 'My Upload' },
                ...selectedPersonas.slice(0, 3)
              ].map((item) => (
                <div key={item.id} className="relative shrink-0 w-28 aspect-square rounded-xl overflow-hidden group shadow-sm border border-outline-variant/10 snap-center">
                  <img src={item.image} alt={item.mood} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-2.5">
                    <span className="text-white text-[7px] font-black uppercase tracking-widest leading-none mb-1">{item.category}</span>
                    <span className="text-white/90 text-[8px] italic leading-tight truncate">{item.mood}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Custom Recommendation Algorithm Section */}
      <section className="w-full bg-surface-container-low/50 rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden flex flex-col mb-4 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-serif flex items-center gap-2 mb-1 text-primary">
            <Sparkles size={20} />
            AI 맞춤 추천 알고리즘
          </h2>
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
            업로드한 의상과 스타일 DNA를 결합한 쿠팡형 추천 시스템
          </p>
        </div>

        {/* Section A: Matches with Uploaded Outfit */}
        <div className="mb-8">
          <ul className="list-disc pl-5 mb-4 text-sm font-bold text-on-surface">
            <li>고객님이 업로드한 의상(로고송 뮤비 모델)과 완벽하게 매치되는 코디</li>
          </ul>
          <div className="flex overflow-x-auto gap-4 snap-x pb-2">
            {/* Card 1: Main Model Match */}
            <div className="shrink-0 w-[280px] bg-white rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden flex snap-center">
              <div className="w-[110px] h-full shrink-0">
                <img src={profileGender === '남성' ? '/male_model.png' : '/female_model.png'} alt="Main Model Match" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary/50">MV MODEL MATCH</span>
                    <span className="bg-[#E8F5E9] text-[#2E7D32] px-1.5 py-0.5 rounded text-[8px] font-bold">✨ NEW</span>
                  </div>
                  <h4 className="font-serif italic text-sm leading-tight text-on-surface mb-4">라이트 그린 가디건 & 데님 믹스매치</h4>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-[8px] font-bold text-on-surface-variant uppercase tracking-widest">최근: NEW MATCH</p>
                  <button className="text-[10px] font-bold underline underline-offset-4 hover:opacity-70 text-on-surface">
                    룩 확인하기
                  </button>
                </div>
              </div>
            </div>

            {(profileGender === '여성' 
              ? [
                  { img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=300', category: '추천 코디', title: '[2030 추천] 페미닌 시크 룩', tags: ['모던', '오피스룩', '세련됨'] },
                  { img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=300', category: '추천 코디', title: '[데이트 추천] 블랙 오프숄더 니트', tags: ['니트', '블랙', '페미닌'] },
                  { img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=300', category: '추천 코디', title: '[편안한] 화이트 와이드 슬랙스', tags: ['슬랙스', '화이트', '루즈핏'] }
                ] 
              : [
                  { img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=300', category: '추천 코디', title: '[여름 추천] 스트라이프 셔츠', tags: ['스트라이프', '루즈핏', '포인트'] },
                  { img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=300', category: '추천 코디', title: '[포멀] 리넨 블레이저', tags: ['블레이저', '리넨', '포멀'] },
                  { img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=300', category: '추천 코디', title: '[시크] 블랙진 긴바지', tags: ['블랙진', '긴바지', '캐주얼'] }
                ]
            ).map((item, idx) => (
              <div key={idx} className="shrink-0 w-[220px] md:w-[240px] bg-white rounded-sm border border-outline-variant/10 shadow-sm overflow-hidden flex flex-col snap-center relative">
                <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center z-10 text-primary shadow-sm border border-outline-variant/20">
                  <Shirt size={12} />
                </div>
                <div className="w-full aspect-[3/4] md:aspect-[4/5] bg-[#F5F5F5] flex items-center justify-center overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-4 flex flex-col bg-white">
                  <span className="text-[10px] font-bold text-on-surface-variant mb-1">{item.category}</span>
                  <h4 className="font-bold text-xs md:text-sm text-on-surface mb-3 leading-snug">{item.title}</h4>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="bg-surface-container text-on-surface-variant px-2 py-0.5 rounded text-[9px] font-medium">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section B: Persona Similar Items */}
        <div>
          <div className="mb-4 ml-1">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-1">
              <Sparkles size={16} /> 사용자 선택의상 맞춤추천
            </h3>
            <p className="text-[10px] text-on-surface-variant mt-1">업로드한 의상과 스타일 DNA를 결합한 쿠팡형 추천 시스템</p>
          </div>
          <div className="flex overflow-x-auto gap-4 snap-x pb-2">
            {(profileGender === '남성'
              ? [
                  { img: '/personas/M_37.png', title: '데일리 캐주얼 룩', category: 'DAILY CASUAL' },
                  { img: '/세미캐주얼2.jpeg', title: '클래식 위켄드 룩', category: 'CLASSIC CASUAL' },
                  { img: '/personas/UK_02.png', title: '어반 세미캐주얼', category: 'URBAN SEMI-CASUAL' }
                ]
              : [
                  { img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=300', title: '클래식 모던룩', category: 'CLASSIC MODERN' },
                  { img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=300', title: '세미오버핏 재킷', category: 'SEMI-OVERFIT' },
                  { img: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=300', title: '루즈핏 데님 룩', category: 'CAMPUS DENIM' }
                ]
            ).map((item, idx) => (
              <div key={idx} className="shrink-0 w-[280px] bg-white rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden flex snap-center">
                <div className="w-[110px] h-full shrink-0">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[8px] font-black uppercase tracking-widest text-primary/50 break-words flex-1 pr-1 leading-tight">
                        {item.category}
                      </span>
                      <div className="bg-[#E8F5E9] text-[#2E7D32] px-1.5 py-0.5 rounded text-[8px] font-bold flex flex-col items-center shrink-0 leading-tight">
                        <span>추천</span>
                        <span>98%</span>
                      </div>
                    </div>
                    <h4 className="font-serif italic text-sm leading-tight text-on-surface mb-4 mt-2">
                      {item.title}
                    </h4>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-[8px] font-bold text-on-surface-variant uppercase tracking-widest">연관도 높음</p>
                    <button className="text-[10px] font-bold underline underline-offset-4 hover:opacity-70 text-on-surface">
                      룩 확인하기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Outfits Section (Replaces Outfit Collections) */}
      <section className="w-full mb-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-serif">AI 추천 알고리즘</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-1">
              {profileGender === '남성' ? '남성 맞춤 AI 최종 추천' : '여성 맞춤 AI 최종 추천'}
            </p>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
          {(profileGender === '여성' ? [
            { image: '/60769.jpg', category: '페미닌 데일리', mood: '단정한 오피스룩', notes: '세련된 출근룩' },
            { image: '/15430.jpg', category: '프레피 오피스', mood: '단정한 스쿨걸 무드', notes: '러블리한 오피스 스타일' },
            { image: '/1085099.jpg', category: '캐주얼 릴렉스', mood: '일상 데일리룩', notes: '편안한 루즈핏 데님' },
            { image: '/1873.jpg', category: '로맨틱 페미닌', mood: '쉬폰 플로럴 블라우스', notes: '화사한 핑크 스커트 룩' }
          ] : [
            { image: '/세미캐주얼1.png', category: '여름 세미캐주얼', mood: '세련된 오피스룩', notes: '여름 비즈니스' },
            { image: '/세미캐주얼2.jpeg', category: '클래식 위켄드', mood: '편안한 주말룩', notes: '녹색남방 포인트' },
            { image: '/정장1.jpeg', category: '비즈니스 정장 1', mood: '격식있는 비즈니스룩', notes: '깔끔한 수트' },
            { image: '/정장2.jpeg', category: '비즈니스 정장 2', mood: '깔끔한 수트 스타일', notes: '어반 포멀' }
          ]).map((persona, idx) => (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="shrink-0 w-[280px] bg-surface-container-lowest border border-outline-variant/20 rounded-2xl overflow-hidden flex h-[130px] group snap-center shadow-sm"
            >
              <div className="w-1/3 h-full overflow-hidden shrink-0">
                <img
                  className="w-full h-full object-cover object-top"
                  src={persona.image}
                  alt={persona.mood}
                />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary/40 break-words flex-1 pr-1 leading-tight">{persona.category}</span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-secondary-container rounded text-[9px] font-bold uppercase tracking-tight shrink-0">
                      <Sparkles size={10} />
                      NEW
                    </div>
                  </div>
                  <h3 className="text-sm font-serif italic mb-1">{persona.mood}</h3>
                  <p className="text-[10px] text-on-surface-variant line-clamp-1">{persona.notes || '맞춤 추천 의상'}</p>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2 opacity-50">
                    <Calendar size={12} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">오늘 추천됨</span>
                  </div>
                  <button className="text-[9px] font-bold uppercase tracking-widest underline underline-offset-4 hover:opacity-60 transition-opacity">
                    자세히
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

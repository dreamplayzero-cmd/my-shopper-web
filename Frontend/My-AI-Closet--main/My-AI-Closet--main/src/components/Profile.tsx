import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LogOut, Calendar, Repeat, ChevronDown, Filter, User, Sparkles } from 'lucide-react';
import { OUTFITS, Outfit } from '../constants';
import { PERSONA_DATA, Persona } from '../constants/personas';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import Result from './Result';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
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
  const [occupation, setOccupation] = useState(gender === 'male' ? '30대 남성' : '20대 여성');
  const [concerns, setConcerns] = useState('하체가 조금 통통한 편이고 어깨가 좁아 보임');
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);

  useEffect(() => {
    setProfileGender(gender === 'male' ? '남성' : '여성');
    setOccupation(gender === 'male' ? '30대 남성' : '20대 여성');
  }, [gender]);

  useEffect(() => {
    const fetchAiRecs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'reference_styles'));
        const allItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // 랜덤으로 4개의 진짜 학습 데이터 추출
        const shuffled = allItems.sort(() => 0.5 - Math.random()).slice(0, 4);
        
        // 만약 DB가 비어있다면 목업 데이터를 사용
        if (shuffled.length === 0) {
          setAiRecommendations([
            { id: '1', style_name: '모던 비즈니스 캐주얼', category_combination: '아우터+하의', mood: '98% 매치' },
            { id: '2', style_name: '미니멀 데일리 룩', category_combination: '상의+하의', mood: '95% 매치' },
            { id: '3', style_name: '세미 포멀 오피스', category_combination: '아우터+상의', mood: '92% 매치' },
            { id: '4', style_name: '편안한 위켄드 룩', category_combination: '상의+하의', mood: '90% 매치' }
          ]);
        } else {
          setAiRecommendations(shuffled);
        }
      } catch (error) {
        console.error("Error fetching AI recs:", error);
      }
    };
    fetchAiRecs();
  }, [state, mbti, gender]);

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
      <section className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 border-b border-outline-variant/20 pb-6 w-full overflow-x-auto">
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-primary p-1 bg-surface shrink-0">
          <img
            className="w-full h-full object-cover rounded-full"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
            alt="User profile"
          />
        </div>

        <div className="flex-1 text-center md:text-left w-full flex flex-col items-center md:items-start md:min-w-[400px]">
          <div className="flex flex-col items-center md:items-start gap-3 mb-4 w-full">
            <h1 className="text-xl font-serif italic uppercase tracking-wider text-primary break-words">Alexandria Sterling</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <button
                onClick={onResetDNA}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-white text-[9px] font-bold uppercase tracking-widest hover:bg-primary/80 transition-all shadow-md"
              >
                <Repeat size={14} className="animate-spin-slow" />
                DNA 리셋
              </button>
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
              <div className="flex flex-col gap-2 flex-1">
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

              <div className="flex flex-col gap-2 flex-1">
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

            <div className="flex-1 flex flex-row items-center gap-4 border-t border-outline-variant/10 pt-4">
              <div className="w-1/4">
                <div className="relative">
                  <select
                    value={profileGender}
                    onChange={(e) => setProfileGender(e.target.value)}
                    className="w-full bg-transparent border-b border-outline-variant/20 py-2 text-[10px] appearance-none outline-none focus:border-primary/50 cursor-pointer font-medium"
                  >
                    <option value="남성">성별: 남성</option>
                    <option value="여성">성별: 여성</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none opacity-40" />
                </div>
              </div>

              <div className="w-1/4">
                <input
                  type="text"
                  value={occupation}
                  placeholder="연령 및 직업"
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full bg-transparent border-b border-outline-variant/20 py-2 text-[10px] outline-none focus:border-primary/50 font-medium placeholder:text-on-surface-variant/40"
                />
              </div>

              <div className="w-1/2">
                <input
                  type="text"
                  value={concerns}
                  placeholder="체형 및 고민 사항"
                  onChange={(e) => setConcerns(e.target.value)}
                  className="w-full bg-transparent border-b border-outline-variant/20 py-2 text-[10px] outline-none focus:border-primary/50 font-medium placeholder:text-on-surface-variant/40"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-start gap-8 shrink-0">
            <div className="text-center md:text-left shrink-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant opacity-50">전체 코디</p>
              <p className="text-xl font-serif">{OUTFITS.length}</p>
            </div>
            <div className="text-center md:text-left shrink-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant opacity-50">사용 빈도</p>
              <p className="text-xl font-serif">84%</p>
            </div>
            <div className="text-center md:text-left shrink-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant opacity-50">스타일 DNA</p>
              <p className="text-xl font-serif uppercase text-primary">Active Sportive</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-surface-container-low/50 rounded-2xl border border-outline-variant/10 shadow-sm overflow-x-auto flex flex-col md:flex-row">

        {/* Top: Visual DNA Radar */}
        <div className="p-6 flex-1 border-b md:border-b-0 md:border-r border-outline-variant/10 flex flex-col items-center justify-start pt-10 bg-surface-container-lowest/30">
          <h2 className="text-lg font-serif italic mb-1 text-center w-full">Style DNA Blueprint</h2>
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
        <div className="p-6 flex-1 flex flex-col justify-between md:min-w-[400px]">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-serif">스타일 DNA 인사이트</h3>
              <button onClick={onResetDNA} className="text-[9px] font-bold text-primary uppercase tracking-widest underline underline-offset-4 hover:opacity-70 transition-opacity">
                DNA 재분석
              </button>
            </div>

            <div className="flex flex-col gap-3 mb-8">
              <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/10">
                <div className="flex items-center gap-2 mb-2">
                  <User size={14} className="text-primary" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Semantic Profile</span>
                </div>
                <p className="text-sm text-on-surface-variant font-light leading-relaxed break-keep">
                  주로 <strong>도시적 실용성</strong>과 <strong>미니멀리즘</strong>을 선호하시네요. 현재 지적이고 세련된 무드의 저채도 실루엣이 옷장의 주를 이룹니다.
                </p>
              </div>

              <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-primary" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">AI Custom Solution</span>
                </div>
                <p className="text-sm font-serif italic text-on-surface break-keep leading-relaxed">
                  "<strong>'소재의 대비(Texture Contrast)'</strong>를 활용해 보세요. 업로드하신 매끄러운 텍스처에 린넨이나 울 아우터를 매치하면 더욱 입체적인 룩이 완성됩니다."
                </p>
              </div>
            </div>

            <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/70 mb-3 ml-1">최종 분석 기반 데이터 (업로드 + 페르소나)</h3>
            <div className="flex flex-wrap gap-4 pb-2">
              {[
                ...selectedPersonas,
                { id: 'user-upload', image: gender === 'male' ? '/male_model.png' : '/female_model.png', category: 'MV MODEL', mood: 'My Upload' }
              ].map((persona) => (
                <div key={persona.id} className="relative w-32 md:w-48 lg:w-56 aspect-square rounded-2xl overflow-hidden group shadow-md border border-outline-variant/10">
                  <img src={persona.image} alt={persona.mood} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4">
                    <span className="text-white text-[10px] font-black uppercase tracking-widest leading-none mb-2">{persona.category}</span>
                    <span className="text-white/90 text-xs italic leading-tight truncate">{persona.mood}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Outfit Collections Replaced by Naver Shopping Result */}
      <section className="w-full mt-12 bg-white rounded-[2rem] overflow-hidden shadow-2xl p-6 border border-outline-variant/10">
        <h2 className="text-2xl font-serif italic mb-2 text-center">네이버 쇼핑 추천</h2>
        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-center mb-8">당신의 스타일 DNA에 완벽하게 어울리는 아이템</p>
        <Result gender={gender} />
        
        {/* 옷에 대한 추가 설명 */}
        <div className="mt-12 bg-surface-container-low p-6 rounded-2xl text-center">
            <h3 className="text-sm font-bold text-on-surface mb-2">스타일리스트의 추가 코멘트</h3>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
                위 추천된 아이템들은 고객님의 '쿨톤' 베이스와 'Active Sportive' 성향을 반영하여 선별되었습니다.<br/>
                특히 린넨 소재나 가벼운 나일론 아우터를 매치하면 일교차가 큰 날씨에도 쾌적하고 세련된 룩을 완성할 수 있습니다.
            </p>
        </div>
      </section>

      {/* AI Recommendation Algorithm Section */}
      <section className="w-full mb-16 mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={20} className="text-primary" />
              <h2 className="text-2xl font-serif">AI 맞춤 추천 알고리즘</h2>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-1">
              업로드 의상 + 스타일 DNA 맞춤 추천
            </p>
          </div>
        </div>

        {/* Combined Row: Personas first, then MV Model Match */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-on-surface mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
            맞춤 코디 및 유사 아이템 추천
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-4">
            {aiRecommendations.length > 0 ? aiRecommendations.map((outfit, idx) => {
              // 성별에 따라 고정된 4개의 이미지 배열 사용
              const maleImages = ['세미캐주얼1.png', '세미캐주얼2.jpeg', '정장1.jpeg', '정장2.jpeg'];
              const maleText = [
                { style_name: '편안한 데일리 캐주얼 룩', category: '아우터+하의', mood: '99% 매치' },
                { style_name: '활동성 좋은 세미 캐주얼', category: '상의+하의', mood: '95% 매치' },
                { style_name: '비즈니스 미팅 세미 정장', category: '아우터+상의', mood: '92% 매치' },
                { style_name: '클래식 포멀 네이비 수트', category: '상/하의 셋업', mood: '90% 매치' }
              ];
              const femaleImages = ['15430.jpg', '1873.jpg', '1085099.jpg', '60769.jpg'];
              const femaleText = [
                { style_name: '미니멀 데님 스타일링', category: '상의+하의', mood: '98% 매치' },
                { style_name: '화사한 데이트룩 스커트', category: '상의+하의', mood: '95% 매치' },
                { style_name: '편안한 조거 팬츠 코디', category: '하의 단품', mood: '93% 매치' },
                { style_name: '우아한 패턴 원피스 코디', category: '원피스 단품', mood: '90% 매치' }
              ];
              const imageSrc = gender === 'male' ? `/datasets/final_male/${maleImages[idx % 4]}` : `/datasets/final_female/${femaleImages[idx % 4]}`;
              const textData = gender === 'male' ? maleText[idx % 4] : femaleText[idx % 4];

              return (
              <motion.div
                key={outfit.id}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl overflow-hidden flex h-[160px] md:h-[180px] group shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="w-2/5 h-full overflow-hidden shrink-0 relative bg-surface-container-low">
                  <img 
                    className={`w-full h-full object-cover transition-transform duration-700 ${gender === 'male' && idx === 1 ? 'scale-[1.15] origin-top' : ''}`}
                    src={imageSrc} 
                    alt={textData.style_name} 
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=300'; }}
                  />
                  <div className="absolute top-2 left-2 bg-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">AI PICK</div>
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-primary/40 leading-tight line-clamp-1 mr-1">{textData.category}</span>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-tight bg-secondary-container text-on-surface shrink-0">
                        <Sparkles size={10} />
                        {textData.mood}
                      </div>
                    </div>
                    <h3 className="text-[13px] font-serif italic mb-1 leading-tight break-keep">{textData.style_name}</h3>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold text-on-surface">{outfit.season ? `${outfit.season} 추천` : '사계절 추천'}</span>
                    <button 
                      onClick={() => {}}
                      className="text-[10px] font-bold border-b border-on-surface pb-0.5 hover:text-primary hover:border-primary transition-colors"
                    >
                      코디 보기
                    </button>
                  </div>
                </div>
              </motion.div>
            )}) : (
              <div className="col-span-full py-8 text-center text-sm text-on-surface-variant">AI 학습 데이터를 불러오는 중입니다...</div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}

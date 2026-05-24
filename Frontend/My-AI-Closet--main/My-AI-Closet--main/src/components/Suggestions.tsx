import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, CloudSun, Thermometer, Wind, Check, Bookmark, Loader2 } from 'lucide-react';
import { OUTFITS, ITEMS, Outfit } from '../constants';
import MaterialScanner from './MaterialScanner';

interface Props {
  gender: 'male' | 'female' | 'both';
  onResetDNA: () => void;
  onGoToWardrobe?: () => void;
  onOpenMatchAnalysis?: () => void;
  onOpenProfile?: () => void;
}

export default function Suggestions({ gender, onResetDNA, onGoToWardrobe, onOpenMatchAnalysis, onOpenProfile }: Props) {
  const [weather, setWeather] = useState({
    temp: 24,
    condition: '맑음',
    location: '위치 확인 중...',
    wind: '3.2m/s',
    feelsLike: 26,
    loading: true
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,weather_code,wind_speed_10m&timezone=auto`);
          const data = await res.json();
          const current = data.current;

          let conditionStr = '맑음';
          const code = current.weather_code;
          if (code >= 1 && code <= 3) conditionStr = '구름많음/흐림';
          else if (code >= 51 && code <= 67) conditionStr = '비';
          else if (code >= 71 && code <= 77) conditionStr = '눈';
          else if (code >= 80 && code <= 82) conditionStr = '소나기';
          else if (code >= 45 && code <= 48) conditionStr = '안개';

          setWeather({
            temp: Math.round(current.temperature_2m),
            condition: conditionStr,
            location: '현재 위치 (GPS)',
            wind: `${current.wind_speed_10m}km/h`,
            feelsLike: Math.round(current.apparent_temperature),
            loading: false
          });
        } catch (e) {
          console.error('Weather fetch error', e);
          setWeather(prev => ({ ...prev, location: '수집 실패 (Seoul, KR)', loading: false }));
        }
      }, (error) => {
        console.error('Geolocation error', error);
        setWeather({ temp: 24, condition: '맑음', location: '접근 거부됨 (Seoul)', wind: '3.2m/s', feelsLike: 26, loading: false });
      });
    } else {
      setWeather(prev => ({ ...prev, location: 'GPS 미지원', loading: false }));
    }
  }, []);

  const filteredByGender = OUTFITS.filter(o =>
    o.gender === gender || o.gender === 'both'
  );

  const weatherRecommendations = filteredByGender.filter(o => {
    if (o.minTemp && o.maxTemp) {
      return weather.temp >= o.minTemp && weather.temp <= o.maxTemp;
    }
    return true;
  });

  const getOccasionOutfits = (occasion: string) => filteredByGender.filter(o => o.occasion === occasion);

  // Diverse outfit selection logic
  const weatherOutfit = weatherRecommendations[0] || filteredByGender[0];
  const campusOutfit = getOccasionOutfits('CAMPUS')[0] || filteredByGender.find(o => o.id !== weatherOutfit?.id) || filteredByGender[1];
  const officeOutfit = getOccasionOutfits('OFFICE')[0] || filteredByGender.find(o => o.id !== weatherOutfit?.id && o.id !== campusOutfit?.id) || filteredByGender[2];
  const streetOutfit = getOccasionOutfits('STREET')[0] || filteredByGender[3] || filteredByGender[0];
  const minimalOutfit = getOccasionOutfits('MINIMAL')[0] || filteredByGender[4] || filteredByGender[1];

  return (
    <div className="pt-24 pb-40 min-h-screen max-w-[1440px] mx-auto bg-surface">
      {/* Weather Briefing Section */}
      <section className="px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-low rounded-[2rem] p-6 border border-outline-variant/10 shadow-sm flex flex-col gap-6"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-secondary-container rounded-full flex items-center justify-center text-primary shadow-inner shrink-0">
              {weather.loading ? <Loader2 size={32} className="animate-spin" /> : <CloudSun size={32} />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Real-time Weather</span>
                <span className="text-[8px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">{weather.location}</span>
              </div>
              <h2 className="text-3xl font-serif italic mb-2">
                {weather.temp}°C {weather.condition}
              </h2>
              <div className="flex gap-4 opacity-40 text-[10px] font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1"><Wind size={12} /> {weather.wind}</span>
                <span className="flex items-center gap-1"><Thermometer size={12} /> Feels like {weather.feelsLike}°C</span>
              </div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-outline-variant/30" />
          <div className="w-full">
            <p className="text-on-surface-variant font-light leading-relaxed italic text-sm">
              "현재 위치의 날씨는 {weather.temp}도, {weather.condition} 상태입니다. 날씨 데이터 기반으로 통기성 및 스타일 DNA를 유지하면서도 쾌적함을 극대화할 착장을 분석했습니다."
            </p>
          </div>
        </motion.div>
      </section>

      {/* Material Scanner Widget */}
      <section className="px-6 mb-16">
        <MaterialScanner />
      </section>

      {/* Sequences */}
      <UnrolledOutfitTrack title="Weather-Matched Vision" outfit={weatherOutfit} delay={0.1} onGoToWardrobe={onGoToWardrobe} onOpenMatchAnalysis={onOpenMatchAnalysis} userGender={gender} trackIdx={0} />
      <UnrolledOutfitTrack title="Campus Core / 캠퍼스" outfit={campusOutfit} delay={0.2} onGoToWardrobe={onGoToWardrobe} onOpenMatchAnalysis={onOpenMatchAnalysis} userGender={gender} trackIdx={1} />
      <UnrolledOutfitTrack title="Office Professional / 오피스" outfit={officeOutfit} delay={0.3} onGoToWardrobe={onGoToWardrobe} onOpenMatchAnalysis={onOpenMatchAnalysis} userGender={gender} trackIdx={2} />
      <UnrolledOutfitTrack title="Street Essence / 스트릿" outfit={streetOutfit} delay={0.4} onGoToWardrobe={onGoToWardrobe} onOpenMatchAnalysis={onOpenMatchAnalysis} userGender={gender} trackIdx={3} />
      <UnrolledOutfitTrack title="Minimal Edge / 미니멀" outfit={minimalOutfit} delay={0.5} onGoToWardrobe={onGoToWardrobe} onOpenMatchAnalysis={onOpenMatchAnalysis} userGender={gender} trackIdx={4} />

      {/* AI Insights Section (Compact) */}
      <section className="mt-8 px-4 xl:px-6">
        <div className="bg-primary text-white rounded-3xl p-6 flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden w-full">
          <Sparkles size={24} className="text-secondary-container flex-shrink-0" />
          <p className="w-full text-xs font-serif italic leading-relaxed text-center break-keep">
            "클린 미니멀 감성을 위해 통기성이 뛰어난 오버사이즈 핏을 추천합니다."
          </p>
          <div className="flex flex-col gap-3 w-full mt-2">
            <button
              onClick={onResetDNA}
              className="w-full px-6 py-3.5 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all backdrop-blur-md"
            >
              스타일 DNA 업데이트
            </button>
            <button
              onClick={onOpenProfile}
              className="w-full px-6 py-3.5 bg-white hover:bg-gray-100 text-primary rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg"
            >
              내 프로필 관리
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function UnrolledOutfitTrack({ title, outfit, delay, onGoToWardrobe, onOpenMatchAnalysis, userGender, trackIdx }: { title: string; outfit?: Outfit; delay: number; onGoToWardrobe?: () => void; onOpenMatchAnalysis?: () => void; userGender: string; trackIdx: number }) {
  if (!outfit) return null;

  // STRICT gender filtering
  const genderItems = ITEMS.filter(item => item.gender === userGender || item.gender === 'both');

  const getByCategory = (cat: string, seqIdx: number) => {
    const items = genderItems.filter(i => i.category === cat);
    if (items.length === 0) {
      return ITEMS.filter(i => i.category === cat)[0];
    }
    // Use a more unique seed for index selection to ensure diversity across tracks
    const outfitSeed = outfit.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = (trackIdx + seqIdx + outfitSeed + (outfit.matchPercentage % items.length)) % items.length;
    return items[index];
  };

  const sequence = [
    { label: 'Outer / 외투', item: getByCategory('outer', 0) },
    { label: 'Top / 상의', item: getByCategory('tops', 1) },
    { label: 'Bottom / 하의', item: getByCategory('bottoms', 2) },
    { label: 'Shoes / 신발', item: getByCategory('shoes', 3) },
    { label: 'Acc / 패션잡화', item: getByCategory('accessories', 4) }
  ];

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 px-6 mb-4">
        <div className="w-1 h-6 bg-primary rounded-full" />
        <h3 className="text-xl font-serif italic text-on-surface">{title}</h3>
      </div>

      <div className="flex overflow-x-auto gap-4 px-6 pb-6 items-stretch snap-x snap-mandatory">
        {sequence.map((seq, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + (idx * 0.1) }}
            className="shrink-0 w-[140px] md:w-[160px] snap-center flex flex-col group/item"
          >
            <div className="relative w-full aspect-[4/5] bg-surface-container-low rounded-2xl p-4 flex flex-col justify-between border border-outline-variant/10 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
              <p className="text-[9px] font-bold text-on-surface-variant/50 uppercase tracking-widest z-10">{seq.label}</p>
              <div className="absolute inset-0 flex items-center justify-center p-6 mt-4">
                <img src={seq.item?.image} alt={seq.label} className="w-full h-full object-contain mix-blend-multiply group-hover/item:scale-110 transition-transform duration-700" />
              </div>
            </div>
            <div className="mt-3 px-2 flex flex-col gap-0.5">
              <p className="font-serif italic text-base leading-tight truncate text-on-surface">{seq.item?.name}</p>
              <p className="text-[8px] text-on-surface-variant/60 font-bold uppercase tracking-widest">{seq.item?.color} | {seq.item?.gender}</p>
            </div>
          </motion.div>
        ))}

        <div className="shrink-0 w-[180px] snap-center flex flex-col justify-center pl-2">
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/10 flex flex-col gap-3 shadow-sm h-auto justify-center ring-1 ring-black/5">
            <button onClick={onGoToWardrobe} className="w-full py-3 bg-primary text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.1em] shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5">
              <Check size={12} /> 사용하기 (입기)
            </button>
            <button onClick={onOpenMatchAnalysis} className="w-full py-3 bg-secondary-container text-primary rounded-xl text-[10px] font-bold uppercase tracking-[0.1em] shadow-sm hover:bg-secondary-container/80 transition-all flex items-center justify-center gap-1.5">
              AI 상세 분석 (Board)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

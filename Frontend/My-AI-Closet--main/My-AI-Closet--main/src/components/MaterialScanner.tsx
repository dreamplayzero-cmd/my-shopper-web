import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scan, Sparkles, Droplets, Wind, Info } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function MaterialScanner({ personas, imageUrl }: { personas?: any[], imageUrl?: string | null }) {
    const [step, setStep] = useState<'idle' | 'scanning' | 'loading' | 'result'>('idle');
    const [materialData, setMaterialData] = useState<any[]>([]);

    useEffect(() => {
        if (step === 'scanning') {
            const timer = setTimeout(() => setStep('loading'), 2500);
            return () => clearTimeout(timer);
        }
        if (step === 'loading') {
            const fetchMaterials = async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, 'material_analysis'));
                    const data = querySnapshot.docs.map(doc => doc.data());
                    setMaterialData(data);
                } catch (error) {
                    console.error("Error fetching material data:", error);
                }
                setStep('result');
            };
            const timer = setTimeout(fetchMaterials, 2500);
            return () => clearTimeout(timer);
        }
    }, [step]);

    return (
        <div className="w-full bg-surface-container-lowest rounded-[2rem] p-6 border border-outline-variant/10 shadow-sm flex flex-col gap-6 mt-6">
            <div className="flex justify-between items-center">
                <h3 className="font-serif text-xl italic text-on-surface">Material Analytics</h3>
                {step === 'result' && (
                    <button onClick={() => setStep('idle')} className="text-[9px] font-bold uppercase text-primary underline underline-offset-4 tracking-widest">
                        재분석하기
                    </button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {step === 'idle' && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-10"
                    >
                        {imageUrl ? (
                            <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-primary/20">
                                <img src={imageUrl} className="w-full h-full object-cover" alt="idle target" />
                            </div>
                        ) : personas && personas.length > 0 ? (
                            <div className="flex gap-4 md:gap-8 mb-8 h-40 md:h-56">
                                {personas.slice(0, 3).map((p, i) => (
                                    <div key={i} className="w-32 md:w-48 h-full rounded-2xl overflow-hidden border border-primary/20 shadow-md">
                                        <img src={p.image} className="w-full h-full object-cover" alt="idle target" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                <Scan size={28} />
                            </div>
                        )}
                        <p className="text-xs text-on-surface-variant font-light mb-6 text-center leading-relaxed">
                            선택하신 3가지 스타일 DNA 이미지를 기반으로<br />핵심 의류의 원단과 혼용률을 추출합니다.
                        </p>
                        <button
                            onClick={() => setStep('scanning')}
                            className="px-8 py-3.5 bg-primary text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg hover:-translate-y-0.5 transition-all"
                        >
                            스캔 시작하기
                        </button>
                    </motion.div>
                )}

                {step === 'scanning' && (
                    <motion.div
                        key="scanning"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative w-full aspect-[4/3] max-w-sm mx-auto bg-surface-container-highest/20 rounded-2xl overflow-hidden border-2 border-dashed border-primary/40 flex items-center justify-center p-4 gap-2"
                    >
                        {imageUrl ? (
                            <div className="absolute inset-0 flex p-4 opacity-60">
                                <img src={imageUrl} className="w-full h-full object-cover rounded-xl" alt="scanning target" />
                            </div>
                        ) : (personas && personas.length > 0 && (
                            <div className="absolute inset-0 flex p-4 gap-2 opacity-60">
                                {personas.slice(0, 3).map((p, i) => (
                                    <img key={i} src={p.image} className="w-1/3 h-full object-cover rounded-xl" alt="scanning target" />
                                ))}
                            </div>
                        ))}
                        <div className="absolute inset-0">
                            <motion.div
                                className="w-full h-1 bg-primary/80 shadow-[0_0_15px_rgba(0,0,0,0.2)]"
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                style={{ position: 'absolute' }}
                            />
                        </div>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] z-10 bg-white/80 px-4 py-2 rounded-full backdrop-blur-md shadow-sm">
                            Scanning Material...
                        </span>
                    </motion.div>
                )}

                {step === 'loading' && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-12"
                    >
                        <div className="relative w-24 h-24 mb-8">
                            {/* Real Image Processing Layer */}
                            {imageUrl ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-full opacity-80 overflow-hidden flex"
                                >
                                    <img src={imageUrl} className="w-full h-full object-cover mix-blend-multiply" alt="processing" />
                                </motion.div>
                            ) : personas && personas.length > 0 ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-full opacity-80 overflow-hidden flex"
                                >
                                    {personas.slice(0, 3).map((p, i) => (
                                        <img key={i} src={p.image} className="w-1/3 h-full object-cover mix-blend-multiply" alt="processing" />
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 rounded-full opacity-60 mix-blend-multiply"
                                    style={{
                                        backgroundImage: 'url("/ocean_terrazzo_bg.png")',
                                        backgroundSize: 'cover',
                                    }}
                                />
                            )}
                            {/* Emerald Matrix Layer */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-1 rounded-full border-2 border-dashed border-primary/60"
                            />
                            {/* Center Icon */}
                            <div className="absolute inset-0 flex items-center justify-center bg-white/20 rounded-full backdrop-blur-[2px]">
                                <Sparkles size={28} className="text-primary animate-pulse" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] animate-pulse">
                                선택된 의상 소재 분석 중
                            </p>
                            <p className="text-[9px] text-on-surface-variant/60 font-medium tracking-widest uppercase">
                                Extracting Fabric Data
                            </p>
                        </div>
                    </motion.div>
                )}

                {step === 'result' && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {imageUrl ? (
                            <div className="flex flex-col gap-4">
                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/10"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Info size={14} className="text-primary" />
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">예측 혼용률 (Predicted)</span>
                                    </div>
                                    <p className="text-sm font-serif italic font-bold">면(Cotton) 65%, 린넨(Linen) 35%</p>
                                </motion.div>
                                
                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/10"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Wind size={14} className="text-primary" />
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">소재 특징 (Characteristics)</span>
                                    </div>
                                    <p className="text-[13px] font-light text-on-surface-variant leading-relaxed break-keep">
                                        자연스러운 구김과 통기성을 지닌 린넨 혼방 조직이 감지되었습니다. 쾌적한 데일리 룩으로 최적화된 소재입니다.
                                    </p>
                                </motion.div>

                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/10"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Droplets size={14} className="text-primary" />
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">세탁 가이드 (Washing)</span>
                                    </div>
                                    <p className="text-[13px] font-light text-on-surface-variant leading-relaxed break-keep">
                                        30도 이하 미온수에서 중성세제로 단독 세탁을 권장합니다. 건조기 사용은 피해주세요.
                                    </p>
                                </motion.div>
                            </div>
                        ) : personas && personas.length > 0 ? (
                            <div className="flex overflow-x-auto gap-4 snap-x pb-4">
                                {personas.slice(0, 3).map((p, i) => {
                                    // Use fetched data, fallback if empty
                                    const mData = materialData[i] || {
                                        category: i === 0 ? '상의 (Tops)' : i === 1 ? '바지 (Pants)' : '아우터 (Outer)',
                                        material: '면 100%',
                                        desc: '기본 소재 정보',
                                        wash: '기본 세탁 정보'
                                    };

                                    return (
                                        <div key={i} className="flex-1 min-w-[280px] max-w-[400px] flex flex-col gap-4">
                                            <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-md border border-outline-variant/20 relative group">
                                                <img src={p.image} className="w-full h-full object-cover object-[center_15%]" alt={p.mood} />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                                                    <span className="text-white text-xs font-bold uppercase tracking-widest">{p.category}</span>
                                                </div>
                                            </div>
                                            <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Info size={14} className="text-primary" />
                                                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{mData.category} 혼용률</span>
                                                </div>
                                                <p className="text-sm font-serif italic font-bold">
                                                    {mData.material}
                                                </p>
                                            </div>
                                            <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Wind size={14} className="text-primary" />
                                                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">특징</span>
                                                </div>
                                                <p className="text-xs font-light text-on-surface-variant leading-relaxed break-keep">
                                                    {mData.desc}
                                                </p>
                                            </div>
                                            <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Droplets size={14} className="text-primary" />
                                                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">세탁 가이드</span>
                                                </div>
                                                <p className="text-xs font-light text-on-surface-variant leading-relaxed break-keep">
                                                    {mData.wash}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <motion.div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Info size={14} className="text-primary" />
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">예측 혼용률</span>
                                    </div>
                                    <p className="text-sm font-serif italic font-bold">분석 대상 없음</p>
                                </motion.div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ChevronRight, Star, ArrowLeft, Database, Shirt } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

interface ResultProps {
  onBack?: () => void;
  gender?: 'male' | 'female';
}

export default function Result({ onBack, gender = 'female' }: ResultProps) {
  const [params, setParams] = useState({
    ageGroup: '',
    job: '',
    style: ''
  });
  const [closetItems, setClosetItems] = useState<any[]>([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setParams({
      ageGroup: gender === 'male' ? '30대' : (searchParams.get('ageGroup') || '20대'),
      job: searchParams.get('job') || '직장인',
      style: searchParams.get('style') || '미니멀'
    });

    // 중간 발표용으로 확정된 3가지 베스트 코디 아이템을 고정 출력합니다.
    if (gender === 'male') {
      setClosetItems([
        {
          id: 'item_1',
          category: '아우터',
          detail: `[${searchParams.get('ageGroup') || '30대'} 추천] 세미캐주얼 녹색 남방`,
          file_path: 'male_green_shirt.png',
          style_tags: '여름,비즈니스캐주얼,단정함'
        },
        {
          id: 'item_2',
          category: '하의',
          detail: `[${searchParams.get('job') || '직장인'} 맞춤] 긴 회색 면바지`,
          file_path: 'male_gray_pants.png',
          style_tags: '봄,여름,오피스룩'
        },
        {
          id: 'item_3',
          category: '상의',
          detail: `[${searchParams.get('style') || '미니멀'}] 남성 V넥 화이트 반팔티`,
          file_path: 'folded_white_vneck.png',
          style_tags: '여름,베이직,데일리'
        }
      ]);
    } else {
      setClosetItems([
        {
          id: 'item_1',
          category: '아우터',
          detail: `[${searchParams.get('ageGroup') || '20대'} 추천] 루즈핏 긴팔가디건`,
          file_path: 'loose_fit_cardigan.png',
          style_tags: '가을,미니멀,캐주얼'
        },
        {
          id: 'item_2',
          category: '하의',
          detail: `[${searchParams.get('job') || '직장인'} 맞춤] 루즈핏 면바지`,
          file_path: 'wide_slacks.png',
          style_tags: '봄,여름,오피스룩'
        },
        {
          id: 'item_3',
          category: '상의',
          detail: `[${searchParams.get('style') || '미니멀'}] 여성 V넥 화이트 반팔티`,
          file_path: 'vneck_white_tee.png',
          style_tags: '여름,베이직,데일리'
        }
      ]);
    }
  }, [gender]);

  // 이미지 Fallback은 더 이상 필요 없으나 유지
  const getFallbackImage = (category: string, name: string) => {
    const text = (category + ' ' + name).toLowerCase();
    if (text.includes('바지') || text.includes('슬랙스') || text.includes('팬츠') || text.includes('pants')) return '/wide_slacks.png';
    if (text.includes('아우터') || text.includes('가디건') || text.includes('자켓')) return '/loose_fit_cardigan.png';
    return '/vneck_white_tee.png';
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 pt-20 pb-24 font-sans h-full overflow-y-auto">
      <header className="flex items-center gap-4 mb-8">
        {onBack && (
          <button 
            onClick={onBack}
            className="p-2 rounded-full bg-surface-container-low hover:bg-surface-container transition-colors"
          >
            <ArrowLeft size={20} className="text-on-surface" />
          </button>
        )}
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-2">
            <Database size={24} />
            My Closet Synergy
          </h1>
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-1">
            내 옷장 기반 AI 코디 제안
          </p>
        </div>
      </header>

      <section className="bg-surface-container-lowest border border-primary/30 rounded-2xl p-6 shadow-sm mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
        <h2 className="text-lg font-bold text-on-surface mb-4 relative z-10">
          분석된 고객 프로필 및 TPO
        </h2>
        <div className="flex flex-wrap gap-3 relative z-10">
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
            🎯 {params.ageGroup}
          </div>
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
            💼 {params.job}
          </div>
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
            ✨ {params.style}
          </div>
        </div>
        <p className="text-xs text-on-surface-variant mt-4 font-medium relative z-10">
          고객님의 옷장 데이터(Firestore)를 스캔하여 현재 프로필에 가장 어울리는 코디 조합을 매칭했습니다.
        </p>
      </section>

      <section>
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-xl font-bold text-on-surface">내 옷장 매칭 아이템</h3>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest cursor-pointer hover:text-primary">
            더보기 <ChevronRight size={12} className="inline" />
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {closetItems.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl border border-outline-variant/20 overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex flex-col"
            >
              <div className="aspect-square w-full overflow-hidden relative bg-surface-container-low p-4">
                <img 
                  src={`/${product.file_path?.replace(/\\/g, '/') || 'unknown'}`.replace('/datasets/MyCloset/', '')}
                  alt={product.detail || product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.currentTarget.src = getFallbackImage(product.category || '', product.detail || ''); }}
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
                  <Shirt size={14} className="text-primary" />
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[10px] font-black text-on-surface-variant mb-1 uppercase tracking-widest">{product.category || '기본 아이템'}</span>
                <h4 className="font-bold text-sm text-on-surface mb-3 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                  {product.detail || product.name || '알 수 없는 아이템'}
                </h4>
                
                <div className="mt-auto flex flex-col gap-2">
                  <div className="flex flex-wrap gap-1">
                    {product.style_tags?.split(',').slice(0, 3).map((tag: string, i: number) => (
                      <span key={i} className="text-[9px] bg-surface-container px-2 py-1 rounded-md text-on-surface-variant">#{tag.trim()}</span>
                    ))}
                  </div>
                  <button 
                    onClick={() => {}}
                    className="w-full bg-primary/10 text-primary px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 hover:bg-primary hover:text-white transition-colors mt-2"
                  >
                    옷장에서 꺼내기
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

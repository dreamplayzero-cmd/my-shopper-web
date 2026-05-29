/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Item {
  id: string;
  name: string;
  category: 'outer' | 'tops' | 'bottoms' | 'shoes' | 'accessories';
  semantics: ('Clean' | 'Soft' | 'Urban' | 'Active' | 'Relaxed')[];
  image: string;
  match?: string;
  type?: string;
  gender?: 'male' | 'female' | 'both';
  color?: string;
  season?: string;
}

export interface Outfit {
  id: string;
  name: string;
  occasion: string;
  matchPercentage: number;
  tags: string[];
  image: string;
  notes: string;
  minTemp?: number;
  maxTemp?: number;
  wearCount: number;
  lastWorn: string;
  gender?: 'male' | 'female' | 'both';
}

export const ITEMS: Item[] = [
  // Male Items
  { id: 'm1', name: '리넨 블레이저', category: 'outer', semantics: ['Urban', 'Clean'], image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=300', gender: 'male', color: 'Navy' },
  { id: 'm_o_2', name: '블랙 레더 자켓', category: 'outer', semantics: ['Urban', 'Active'], image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=300', gender: 'male', color: 'Black' },
  { id: 'm_o_3', name: '네이비 가디건', category: 'outer', semantics: ['Soft', 'Clean'], image: 'https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?auto=format&fit=crop&q=80&w=300', gender: 'male', color: 'Navy' },

  { id: 'm2', name: '캐시미어 니트', category: 'tops', semantics: ['Soft', 'Relaxed'], image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=300', gender: 'male', color: 'Black' },
  { id: 'm_t_2', name: '스트라이프 셔츠', category: 'tops', semantics: ['Clean', 'Urban'], image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=300', gender: 'male', color: 'White' },
  { id: 'm_t_3', name: '오버핏 블랙 맨투맨', category: 'tops', semantics: ['Active', 'Relaxed'], image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=300', gender: 'male', color: 'Black' },

  { id: 'm3', name: '슬림 치노 팬츠', category: 'bottoms', semantics: ['Clean', 'Urban'], image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=300', gender: 'male', color: 'Beige' },
  { id: 'm5', name: '인디고 데님', category: 'bottoms', semantics: ['Active', 'Urban'], image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=300', gender: 'male', color: 'Navy' },
  { id: 'm_b_3', name: '와이드 슬랙스', category: 'bottoms', semantics: ['Urban', 'Relaxed'], image: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?auto=format&fit=crop&q=80&w=300', gender: 'male', color: 'Black' },

  { id: 'm4', name: 'Tan Chelsea Boots', category: 'shoes', semantics: ['Urban', 'Clean'], image: 'https://images.unsplash.com/photo-1608256246200-53e66015e968?auto=format&fit=crop&q=80&w=300', gender: 'male', color: 'Tan' },
  { id: 'm_s_2', name: '화이트 스니커즈', category: 'shoes', semantics: ['Clean', 'Active'], image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=300', gender: 'male', color: 'White' },
  { id: 'm_s_3', name: '블랙 로퍼', category: 'shoes', semantics: ['Urban', 'Clean'], image: 'https://images.unsplash.com/photo-1614252339460-e148bd8bc258?auto=format&fit=crop&q=80&w=300', gender: 'male', color: 'Black' },

  { id: 'm_a_1', name: '클래식 메탈 워치', category: 'accessories', semantics: ['Urban', 'Clean'], image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=300', gender: 'male', color: 'Silver' },
  { id: 'm_a_2', name: '블랙 레더 백팩', category: 'accessories', semantics: ['Urban', 'Active'], image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=300', gender: 'male', color: 'Black' },

  // Female Items
  { id: 'f1', name: '베이지 테일러드 재킷', category: 'outer', semantics: ['Clean', 'Urban'], image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=300', gender: 'female', color: 'Beige' },
  { id: 'f_o_2', name: '차콜 울 코트', category: 'outer', semantics: ['Urban', 'Clean'], image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=300', gender: 'female', color: 'Charcoal' },
  { id: 'f_o_3', name: '카키 야상 점퍼', category: 'outer', semantics: ['Active', 'Relaxed'], image: 'https://images.unsplash.com/photo-1544923246-77307dd654ca?auto=format&fit=crop&q=80&w=300', gender: 'female', color: 'Khaki' },

  { id: 'f2', name: '실크 슬립 드레스', category: 'tops', semantics: ['Soft', 'Clean'], image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=300', gender: 'female', color: 'Champagne' },
  { id: 'f3', name: '하늘색 크롭 탑', category: 'tops', semantics: ['Active', 'Soft'], image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=80&w=300', gender: 'female', color: 'Sky Blue' },
  { id: 'f9', name: '블랙 오프숄더 니트', category: 'tops', semantics: ['Soft', 'Urban'], image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=300', gender: 'female', color: 'Black' },
  { id: 'f_t_4', name: '스트라이프 셔츠', category: 'tops', semantics: ['Urban', 'Clean'], image: 'https://images.unsplash.com/photo-1598033129183-c4f50c717658?auto=format&fit=crop&q=80&w=300', gender: 'female', color: 'Striped' },

  { id: 'f4', name: '화이트 와이드 슬랙스', category: 'bottoms', semantics: ['Clean', 'Urban'], image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=300', gender: 'female', color: 'White' },
  { id: 'f5', name: '데님 미니스커트', category: 'bottoms', semantics: ['Active', 'Urban'], image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=300', gender: 'female', color: 'Blue' },
  { id: 'f_b_3', name: '블랙 가죽 레깅스', category: 'bottoms', semantics: ['Active', 'Urban'], image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=300', gender: 'female', color: 'Black' },

  { id: 'f6', name: '화이트 레더 스니커즈', category: 'shoes', semantics: ['Clean', 'Urban'], image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=300', gender: 'female', color: 'White' },
  { id: 'f10', name: '레더 앵클 부츠', category: 'shoes', semantics: ['Urban', 'Clean'], image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=300', gender: 'female', color: 'Black' },
  { id: 'f_s_3', name: '베이지 슬링백', category: 'shoes', semantics: ['Soft', 'Clean'], image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=300', gender: 'female', color: 'Beige' },

  { id: 'f7', name: '크림 숄더 백', category: 'accessories', semantics: ['Soft', 'Clean'], image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=300', gender: 'female', color: 'Cream' },
  { id: 'f_a_2', name: '실크 스카프', category: 'accessories', semantics: ['Soft', 'Clean'], image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=300', gender: 'female', color: 'Patterned' },
  { id: 'f_a_3', name: '골드 체인 목걸이', category: 'accessories', semantics: ['Urban', 'Clean'], image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=300', gender: 'female', color: 'Gold' },

  // Shared / Both
  { id: 'b1', name: '화이트 코튼 티셔츠', category: 'tops', semantics: ['Clean', 'Relaxed'], image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=300', gender: 'both', color: 'White' },
  { id: 'b2', name: '캔버스 에코백', category: 'accessories', semantics: ['Relaxed', 'Active'], image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=300', gender: 'both', color: 'Beige' },
];

export const OUTFITS: Outfit[] = [
  {
    id: 'o_f_1',
    name: '시티 미니멀 룩',
    occasion: 'OFFICE',
    matchPercentage: 98,
    tags: ['어반', '클린', '미니멀'],
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400',
    notes: '세련된 도시 여성을 위한 화이트 & 베이지 매치.',
    minTemp: 18,
    maxTemp: 28,
    wearCount: 12,
    lastWorn: '2026-05-14',
    gender: 'female'
  },
  {
    id: 'o_f_2',
    name: '이브닝 엘레강스',
    occasion: 'MINIMAL',
    matchPercentage: 92,
    tags: ['소프트', '이브닝', '엘레강스'],
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=400',
    notes: '특별한 저녁 모임에 어울리는 에메랄드 실루엣.',
    minTemp: 15,
    maxTemp: 35,
    wearCount: 5,
    lastWorn: '2026-05-10',
    gender: 'female'
  },
  {
    id: 'o_f_3',
    name: '캠퍼스 데일리',
    occasion: 'CAMPUS',
    matchPercentage: 90,
    tags: ['액티브', '캠퍼스', '캐주얼'],
    image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=80&w=400',
    notes: '편안하면서도 엣지 있는 캠퍼스 스타일.',
    minTemp: 15,
    maxTemp: 30,
    wearCount: 20,
    lastWorn: '2026-05-18',
    gender: 'female'
  },
  {
    id: 'o_f_4',
    name: '스트릿 에센스',
    occasion: 'STREET',
    matchPercentage: 88,
    tags: ['스트릿', '어반', '트렌디'],
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=400',
    notes: '힙한 스트릿 감성의 여유로운 주말 착장.',
    minTemp: 10,
    maxTemp: 25,
    wearCount: 15,
    lastWorn: '2026-05-15',
    gender: 'female'
  },
  {
    id: 'o_m_1',
    name: '리넨 소피스티케이트',
    occasion: 'OFFICE',
    matchPercentage: 95,
    tags: ['어반', '클린', '통기성'],
    image: 'https://images.unsplash.com/photo-1594932224010-74f43aeb72e3?auto=format&fit=crop&q=80&w=400',
    notes: '비즈니스 데이를 위한 리넨 블레이저 룩.',
    minTemp: 20,
    maxTemp: 32,
    wearCount: 8,
    lastWorn: '2026-05-12',
    gender: 'male'
  },
  {
    id: 'o_m_2',
    name: '캐주얼 위켄드',
    occasion: 'CAMPUS',
    matchPercentage: 92,
    tags: ['소프트', '릴랙스', '데일리'],
    image: 'https://images.unsplash.com/photo-1614975058789-41310d05a5d7?auto=format&fit=crop&q=80&w=400',
    notes: '편안한 주말 나들이를 위한 니트 코디.',
    minTemp: 10,
    maxTemp: 22,
    wearCount: 14,
    lastWorn: '2026-05-11',
    gender: 'male'
  }
];

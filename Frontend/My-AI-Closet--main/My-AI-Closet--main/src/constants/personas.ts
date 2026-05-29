export interface MaterialData {
  composition: string;
  characteristics: string;
  washing: string;
}

export interface Persona {
  id: string;
  category: string;
  image: string;
  mood: string;
  tags: string[];
  gender: 'male' | 'female';
  materialData?: MaterialData;
}

function inferMaterialData(tags: string[], mood: string): MaterialData {
  const t = (tags.join(' ') + ' ' + mood).toLowerCase();
  
  if (t.includes('denim') || t.includes('jeans')) {
    return {
      composition: "면 98%, 스판덱스 2%",
      characteristics: "견고한 내구성과 은은한 스판감으로 데일리 활동성에 최적화된 고밀도 데님 원단입니다.",
      washing: "이염 방지를 위해 뒤집어서 단독 찬물 세탁을 권장합니다."
    };
  } else if (t.includes('knit') || t.includes('sweater')) {
    return {
      composition: "아크릴 60%, 울 40%",
      characteristics: "포근한 터치감과 뛰어난 보온성을 지녔으며, 구김이 잘 가지 않는 소프트 니트 소재입니다.",
      washing: "울 전용 세제를 사용하여 30도 미온수에서 손세탁 또는 드라이클리닝을 권장합니다."
    };
  } else if (t.includes('suit') || t.includes('office') || t.includes('slacks') || t.includes('formal')) {
    return {
      composition: "폴리에스터 70%, 레이온 25%, 폴리우레탄 5%",
      characteristics: "매끄러운 광택감과 텐션감이 돋보이며, 장시간 착용해도 실루엣이 유지되는 테일러드 원단입니다.",
      washing: "소재의 형태 유지를 위해 반드시 드라이클리닝을 권장합니다."
    };
  } else if (t.includes('skirt') || t.includes('dress') || t.includes('feminine') || t.includes('lovely')) {
    return {
      composition: "면 60%, 나일론 40%",
      characteristics: "바스락거리는 경쾌한 질감과 우수한 통기성으로 우아한 실루엣을 연출하는 혼방 소재입니다.",
      washing: "세탁망에 넣어 중성세제로 기계 세탁이 가능하며, 자연 건조를 권장합니다."
    };
  } else if (t.includes('street') || t.includes('cargo') || t.includes('active')) {
    return {
      composition: "나일론 70%, 코튼 30%",
      characteristics: "가벼운 중량감과 우수한 발수 기능을 갖추어 야외 활동과 스트릿 룩에 적합한 기능성 소재입니다.",
      washing: "중성세제를 사용하여 찬물 세탁을 권장하며 섬유유연제 사용은 피해주세요."
    };
  } else {
    return {
      composition: "면 80%, 폴리에스터 20%",
      characteristics: "통기성이 우수하고 구김이 적어 활동량이 많은 데일리 룩으로 최적화된 부드러운 혼방 소재입니다.",
      washing: "30도 이하 미온수에서 중성세제로 세탁을 권장합니다. 기계 건조는 피해주세요."
    };
  }
}

const RAW_PERSONA_DATA: Omit<Persona, 'materialData'>[] = [
  { id: 'FK_01', category: 'Feminine Korean', image: '/personas/FK_01.png', mood: 'Daily Denim', tags: ['Comfort', 'Daily', 'Denim'], gender: 'female' },
  { id: 'FK_02', category: 'Feminine Korean', image: '/personas/FK_02.png', mood: 'Classic Skirt', tags: ['Clean', 'Classic', 'Feminine'], gender: 'female' },
  { id: 'FK_03', category: 'Feminine Korean', image: '/personas/FK_03.png', mood: 'Midi Skirt', tags: ['Soft', 'Urban', 'Elegance'], gender: 'female' },
  { id: 'FK_07', category: 'Feminine Korean', image: '/personas/FK_07.png', mood: 'Pattern Skirt', tags: ['Unique', 'Pattern', 'Vibrant'], gender: 'female' },
  { id: 'FK_08', category: 'Feminine Korean', image: '/personas/FK_08.png', mood: 'Chino Pants', tags: ['Practical', 'Clean', 'Casual'], gender: 'female' },
  { id: 'FK_09', category: 'Feminine Korean', image: '/personas/FK_09.png', mood: 'Straight Fit', tags: ['Active', 'Urban', 'Minimal'], gender: 'female' },
  { id: 'FK_011', category: 'Feminine Korean', image: '/personas/FK_011.png', mood: 'Clean Daily', tags: ['Clean', 'Comfort', 'Soft'], gender: 'female' },
  { id: 'FK_012', category: 'Feminine Korean', image: '/personas/FK_012.png', mood: 'Romantic Skirt', tags: ['Feminine', 'Soft', 'Romantic'], gender: 'female' },
  { id: 'FK_013', category: 'Feminine Korean', image: '/personas/FK_013.png', mood: 'MZ Daily 01', tags: ['Youth', 'Trendy', 'Urban'], gender: 'female' },
  { id: 'FK_014', category: 'Feminine Korean', image: '/personas/FK_014.png', mood: 'MZ Daily 02', tags: ['Active', 'Comfort', 'Practical'], gender: 'female' },
  { id: 'F_47', category: 'Feminine Korean', image: '/personas/F_47.jpeg', mood: 'Office Look Pink Slacks', tags: ['Office', 'Clean', 'Feminine'], gender: 'female' },
  { id: 'FK_016', category: 'Feminine Korean', image: '/personas/FK_016.png', mood: 'MZ Daily 04', tags: ['Unique', 'Street', 'Active'], gender: 'female' },
  { id: 'FK_017', category: 'Feminine Korean', image: '/personas/FK_017.png', mood: 'MZ Daily 05', tags: ['Relaxed', 'Soft', 'Natural'], gender: 'female' },
  { id: 'F_36', category: 'Feminine Korean', image: '/personas/F_36.png', mood: 'Seongsu Chic', tags: ['Urban', 'Chic', 'Sophisticated'], gender: 'female' },
  { id: 'F_37', category: 'Feminine Korean', image: '/personas/F_37.png', mood: 'MZ Street', tags: ['Street', 'Night', 'Vibrant'], gender: 'female' },
  { id: 'F_38', category: 'Feminine Korean', image: '/personas/F_38.png', mood: 'Minimalist', tags: ['Minimal', 'Clean', 'Essential'], gender: 'female' },
  { id: 'F_41', category: 'Feminine Korean', image: '/personas/F_41.png', mood: 'Lovely Pink', tags: ['Feminine', 'Soft', 'Lovely'], gender: 'female' },
  { id: 'F_42', category: 'Feminine Korean', image: '/personas/F_42.png', mood: 'Lovely Yellow', tags: ['Bright', 'Cheerful', 'Soft'], gender: 'female' },
  { id: 'F_43', category: 'Feminine Korean', image: '/personas/F_43.jpeg', mood: 'Summer Shorts 01', tags: ['Active', 'Summer', 'Casual'], gender: 'female' },
  { id: 'F_44', category: 'Feminine Korean', image: '/personas/F_44.jpeg', mood: 'Summer Shorts 02', tags: ['Practical', 'Comfort', 'Summer'], gender: 'female' },
  { id: 'F_45', category: 'Feminine Korean', image: '/personas/F_45.jpeg', mood: 'Feminine Dress', tags: ['Feminine', 'Elegance', 'Soft'], gender: 'female' },
  { id: 'F_46', category: 'Feminine Korean', image: '/personas/F_46.jpeg', mood: 'Trendy Young Street', tags: ['Trendy', 'Youth', 'Street'], gender: 'female' },
  { id: 'UK_01', category: 'Urban semi-suit', image: '/personas/UK_01.png', mood: 'Dandy Semi-suit', tags: ['Urban', 'Formal', 'Clean'], gender: 'male' },
  { id: 'UK_02', category: 'Urban Korean', image: '/personas/UK_02.png', mood: 'Classic Casual', tags: ['Classic', 'Daily', 'Comfort'], gender: 'male' },
  { id: 'UK_03', category: 'Urban Korean', image: '/personas/UK_03.png', mood: 'Modern Look', tags: ['Modern', 'Urban', 'Minimal'], gender: 'male' },
  { id: 'UK_05', category: 'Urban semi-suit', image: '/personas/UK_05.png', mood: 'Modern Semi-suit', tags: ['Professional', 'Urban', 'Clean'], gender: 'male' },
  { id: 'UK_06', category: 'Urban Korean', image: '/personas/UK_06.png', mood: 'Layered Style', tags: ['Unique', 'Layered', 'Urban'], gender: 'male' },
  { id: 'UK_08', category: 'Urban Korean', image: '/personas/UK_08.png', mood: 'Relaxed Vacation', tags: ['Relaxed', 'Natural', 'Comfort'], gender: 'male' },
  { id: 'UK_09', category: 'Urban Korean', image: '/personas/UK_09.png', mood: '3040 Relaxed Knit', tags: ['Soft', 'Comfort', 'Sophisticated'], gender: 'male' },
  { id: 'M_37', category: 'Urban Korean', image: '/personas/M_37.png', mood: 'Daily Casual Look', tags: ['Comfort', 'Daily', 'Urban'], gender: 'male' },
  { id: 'UK_10', category: 'Urban Korean', image: '/personas/UK_10.png', mood: 'Layered Brown Shirt', tags: ['Urban', 'Casual', 'Classic'], gender: 'male' },
  { id: 'UK_11', category: 'Urban Korean', image: '/personas/UK_11.png', mood: 'Layered Denim Shirt', tags: ['Daily', 'Casual', 'Urban'], gender: 'male' },
  { id: 'M_33', category: 'Urban Korean', image: '/personas/M_33.png', mood: 'Street Cargo', tags: ['Street', 'Active', 'Cargo'], gender: 'male' },
  { id: 'M_34', category: 'Urban Korean', image: '/personas/M_34.png', mood: 'Graphic Cargo', tags: ['Unique', 'Graphic', 'Street'], gender: 'male' },
  { id: 'M_35', category: 'Urban semi-suit', image: '/personas/M_35.jpeg', mood: 'Semi-suit Look 01', tags: ['Formal', 'Urban', 'Modern'], gender: 'male' },
  { id: 'M_36', category: 'Urban semi-suit', image: '/personas/M_36.jpeg', mood: 'Semi-suit Look 02', tags: ['Clean', 'Professional', 'Modern'], gender: 'male' },
];

export const PERSONA_DATA: Persona[] = RAW_PERSONA_DATA.map(p => ({
  ...p,
  materialData: inferMaterialData(p.tags, p.mood)
}));

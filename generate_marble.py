from PIL import Image, ImageDraw, ImageFilter
import random

def create_marbled_terrazzo(input_path, output_path):
    base = Image.open(input_path).convert('RGB')
    w, h = base.size
    
    # Create marble pattern
    marble = Image.new('RGB', (w, h), (255, 255, 255))
    draw = ImageDraw.Draw(marble)
    
    # Add soft bluish and emerald streaks
    for _ in range(15):
        x1 = random.randint(0, w)
        y1 = random.randint(0, h)
        x2 = x1 + random.randint(-w//2, w//2)
        y2 = y1 + random.randint(-h//2, h//2)
        color = (200, 230, 255) if random.random() > 0.5 else (180, 255, 210)
        draw.line([x1, y1, x2, y2], fill=color, width=random.randint(50, 150))
    
    # Blur the marble pattern
    marble = marble.filter(ImageFilter.GaussianBlur(radius=60))
    
    # Convert base to grayscale then back to RGB to keep texture but lose its color
    base_tex = base.convert('L').convert('RGB')
    
    # Blend base texture with marble pattern
    # High alpha for marble to keep it "transparent/white/bluish"
    final = Image.blend(base_tex, marble, 0.8)
    
    final.save(output_path)

if __name__ == "__main__":
    create_marbled_terrazzo('홈페이지 대문시안.png', 'c:/Users/User/Desktop/Team flow - My Shopper/Frontend/My-AI-Closet--main/My-AI-Closet--main/public/terrazzo_bg_final.png')

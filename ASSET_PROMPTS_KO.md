# Codex 이미지 기능용 에셋 프롬프트 (2D 횡스크롤)

아래 프롬프트는 첨부한 두 캐릭터(백합 소년 / 사슬 소녀)를 유지한 채 게임용 에셋을 뽑기 위한 세트입니다.

## 1) 캐릭터 스프라이트 시트

### A. 사슬 소녀 (플레이어 1)
- **프롬프트**
  - "2D side-scroller game sprite sheet, full body anime girl with long blue hair, white robe with cross motif, chain weapon and spiked mace, transparent background, 8-direction clean line art, game-ready, 48px grid, 8 frames idle, 8 frames run, 6 frames jump, 6 frames attack, consistent proportions"
- **네거티브**
  - "blurry, extra limbs, watermark, text, cropped feet"
- **권장 출력**: 2048x2048 PNG, 투명 배경

### B. 백합 소년 (플레이어 2 / 지원)
- **프롬프트**
  - "2D side-scroller sprite sheet, cheerful brown-haired anime boy with green eyes, white robe and lilies, holding lily branch, fantasy priest style, transparent background, 8 frames idle, 8 run, 6 jump, 8 spotlight cast animation, clean outlines"
- **네거티브**
  - "realistic photo, low contrast, text, logo"
- **권장 출력**: 2048x2048 PNG

## 2) 스포트라이트/이펙트
- **프롬프트**
  - "VFX spritesheet for holy spotlight beam, radial bloom, dust particles, fantasy sanctum style, additive glow, transparent background, 12-frame loop"
- **권장 출력**: 1024x1024 PNG

## 3) 배경 (패럴랙스 4레이어)

### Layer 1: 원거리 하늘/달빛
- "moonlit gothic sanctuary sky, soft clouds, painterly 2D background, seamless horizontal tile"

### Layer 2: 성벽 실루엣
- "dark cathedral silhouette parallax layer, side-scrolling seamless tile"

### Layer 3: 기둥/아치
- "ruined arches and pillars, 2D platformer background layer, seamless"

### Layer 4: 전경 장식
- "foreground candles, thorn vines, broken statues, silhouette style, seamless side-scroll"

## 4) 적 캐릭터
- **그림자 망령**
  - "small shadow wraith enemy for 2D side-scroller, purple-black ghost body, bright eyes, 8-frame float, 6-frame hit, transparent background"
- **철갑 기사**
  - "armored undead knight enemy sprite sheet, heavy walk cycle 8 frames, attack 8 frames, damaged 4 frames"

## 5) 장애물
- "spike trap sprite sheet, idle and trigger animation"
- "falling chandelier hazard sprite, chain + impact frames"
- "holy barrier gate obstacle, open/close animation"

## 6) UI
- "fantasy HUD pack, HP bar, energy bar, skill icons for chain attack and spotlight, Korean-friendly readable style"

## 7) 애니메이션 통일 규칙
- 기준 해상도: 캐릭터 256x256 프레임
- Pivot: 발 중앙
- 조명 방향: 좌상단 고정
- 외곽선 두께: 2px
- 색감: 저채도 다크 배경 + 캐릭터 포인트 고채도


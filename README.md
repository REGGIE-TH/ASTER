# Lily & Chain: Spotlight Run

첨부된 두 캐릭터 콘셉트를 메인으로 한 **2D 횡스크롤 액션 프로토타입**입니다.

## 왜 GitHub에서 안 보이냐? (현재 화면 기준)
지금 스크린샷 상태는 GitHub 원격 저장소에 아직 초기 커밋만 있는 상태입니다.
즉, 제가 여기서 만든 파일들이 **원격(main)** 으로 push 되기 전이라 다운로드할 수 없습니다.

## 1) 먼저 업로드(push)하세요
아래를 로컬(이 프로젝트 폴더)에서 1회 실행:

```bash
git remote -v
# remote 없으면 추가
git remote add origin https://github.com/<YOUR_ID>/ASTER.git

# 현재 브랜치 push
git push -u origin main
```

push 후 GitHub 새로고침하면 `index.html`, `game.js`, `assets/`, `.github/workflows/`가 보여야 정상입니다.

## 2) 그다음 다운로드

### A. 전체 소스 ZIP
- GitHub 저장소 페이지에서 **Code → Download ZIP**
- 직접 링크:
  - `https://github.com/<YOUR_ID>/ASTER/archive/refs/heads/main.zip`

### B. Actions 아티팩트 ZIP
- `Actions` 탭 → **Build Download ZIP** 실행
- Run 상세 → `Artifacts` → `lily-chain-game-zip` 다운로드

### C. Releases ZIP (권장)
```bash
git tag v1.0.0
git push origin v1.0.0
```
- `Releases` 탭에서 `lily-chain-game.zip` 다운로드

## 3) 로컬 바로 실행

### macOS / Linux
```bash
./run.sh
```

### Windows
```bat
run.bat
```

브라우저에서 `http://localhost:8000` 접속.

## 배포용 ZIP 수동 생성
```bash
bash scripts/package_game.sh
```
생성물: `dist/lily-chain-game.zip`

## 에셋 재생성
```bash
python3 tools/generate_svg_assets.py
```

## 에셋 제작 가이드
- `ASSET_PROMPTS_KO.md` 참고

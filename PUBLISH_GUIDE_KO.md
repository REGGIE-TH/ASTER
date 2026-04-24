# GitHub 업로드/다운로드 빠른 가이드

## 0) 지금 다운로드가 안 되는 이유
원격 저장소에 아직 최신 파일이 push되지 않았기 때문입니다.

## 1) 업로드
```bash
git remote add origin https://github.com/<YOUR_ID>/ASTER.git  # 이미 있으면 생략
git push -u origin main
```

## 2) 다운로드
- 소스 전체 ZIP: `https://github.com/<YOUR_ID>/ASTER/archive/refs/heads/main.zip`
- Actions 아티팩트: `Actions > Build Download ZIP > Artifacts`
- Release ZIP: 태그 push 후 `Releases`에서 다운로드

## 3) Release ZIP 자동 업로드 트리거
```bash
git tag v1.0.0
git push origin v1.0.0
```

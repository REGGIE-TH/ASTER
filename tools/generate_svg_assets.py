from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPR = ROOT / "assets" / "sprites"
BG = ROOT / "assets" / "background"
SPR.mkdir(parents=True, exist_ok=True)
BG.mkdir(parents=True, exist_ok=True)


def save(path: Path, content: str):
    path.write_text(content, encoding="utf-8")


def sprite_sheet(filename: str, body: str, frames: int, w: int = 128, h: int = 128):
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{w*frames}" height="{h}" viewBox="0 0 {w*frames} {h}">',
        '<rect width="100%" height="100%" fill="none"/>',
    ]
    for i in range(frames):
        x = i * w
        parts.append(f'<g transform="translate({x},0)">{body(i, w, h)}</g>')
    parts.append('</svg>')
    save(SPR / filename, "\n".join(parts))


def chain_body(i, w, h):
    bob = (i % 2) * 2
    arm = -18 + (i % 4) * 4
    return f'''
    <ellipse cx="64" cy="115" rx="34" ry="10" fill="#1d1f2a" opacity="0.55"/>
    <path d="M38 {112-bob} Q64 {96-bob} 90 {112-bob} L84 54 L44 54 Z" fill="#efefef" stroke="#d0d0d0"/>
    <circle cx="64" cy="42" r="18" fill="#3e5ea8"/>
    <path d="M44 60 Q{28+arm} 78 20 96" stroke="#9db4eb" stroke-width="5" fill="none"/>
    <path d="M84 60 Q{104-arm} 82 108 100" stroke="#9db4eb" stroke-width="5" fill="none"/>
    <circle cx="20" cy="96" r="8" fill="#97a6c9"/>
    <circle cx="108" cy="100" r="8" fill="#97a6c9"/>
    '''


def lily_body(i, w, h):
    stem = 88 + (i % 3) * 4
    return f'''
    <ellipse cx="64" cy="115" rx="34" ry="10" fill="#1d1f2a" opacity="0.55"/>
    <path d="M38 112 Q64 96 90 112 L84 54 L44 54 Z" fill="#efefef" stroke="#d0d0d0"/>
    <circle cx="64" cy="42" r="18" fill="#5a4a4a"/>
    <path d="M64 60 L{stem} 24" stroke="#7ea689" stroke-width="4"/>
    <ellipse cx="{stem}" cy="24" rx="10" ry="6" fill="#f5fff2" stroke="#9eb5a1"/>
    <ellipse cx="{stem+10}" cy="18" rx="8" ry="5" fill="#f5fff2" stroke="#9eb5a1"/>
    '''


def wraith_body(i, w, h):
    wob = (i % 3) * 3
    return f'''
    <ellipse cx="64" cy="112" rx="20" ry="8" fill="#1d1f2a" opacity="0.4"/>
    <path d="M64 {28+wob} C38 {28+wob}, 28 50, 32 72 C36 92, 48 102, 64 110 C80 102, 92 92, 96 72 C100 50, 90 {28+wob}, 64 {28+wob} Z" fill="#5c2a6d"/>
    <circle cx="56" cy="58" r="4" fill="#fff"/>
    <circle cx="72" cy="58" r="4" fill="#fff"/>
    '''


sprite_sheet("chain_girl_sheet.svg", chain_body, frames=8)
sprite_sheet("lily_boy_sheet.svg", lily_body, frames=8)
sprite_sheet("wraith_sheet.svg", wraith_body, frames=6)

save(
    SPR / "spike.svg",
    '''<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
<polygon points="8,88 48,12 88,88" fill="#8d8fa8"/>
<polygon points="30,88 48,52 66,88" fill="#7a7f95"/>
</svg>''',
)

save(
    SPR / "pillar.svg",
    '''<svg xmlns="http://www.w3.org/2000/svg" width="128" height="220" viewBox="0 0 128 220">
<rect x="16" y="14" width="96" height="206" fill="#4a4d68"/>
<rect x="30" y="42" width="68" height="150" fill="#2f3146"/>
</svg>''',
)

save(
    SPR / "spotlight.svg",
    '''<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
<defs><radialGradient id="g"><stop offset="0%" stop-color="#fff8bf" stop-opacity="0.9"/>
<stop offset="100%" stop-color="#fff8bf" stop-opacity="0"/></radialGradient></defs>
<circle cx="256" cy="256" r="240" fill="url(#g)"/>
</svg>''',
)

save(
    BG / "far.svg",
    '''<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
<rect width="100%" height="100%" fill="#0b0f1f"/>
<circle cx="980" cy="120" r="52" fill="#dcdff4" opacity="0.2"/>
<path d="M0 350 L180 250 L360 350 L520 240 L700 350 L900 230 L1100 350 L1280 280 L1280 720 L0 720 Z" fill="#222b4a"/>
</svg>''',
)

save(
    BG / "mid.svg",
    '''<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
<rect width="100%" height="100%" fill="none"/>
<path d="M0 520 L120 420 L220 520 L340 430 L460 520 L580 390 L700 520 L850 410 L980 520 L1120 420 L1280 520 L1280 720 L0 720 Z" fill="#1b2138"/>
</svg>''',
)

print("SVG assets generated.")

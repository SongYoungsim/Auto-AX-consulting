# Auto AX — 무료 정적 웹 호스팅 배포 가이드 (`DEPLOY.md`)

**Auto AX**는 별도의 빌드 과정이나 백엔드 서버가 필요 없는 **Zero-build Vanilla ES Modules** 정적 웹 애플리케이션입니다. 아래 4가지 무료 호스팅 옵션 중 원하는 방식을 선택해 즉시 공개 URL로 배포할 수 있습니다.

> **사전 준비**: `.gitignore`, `.github/workflows/deploy-pages.yml`, `vercel.json`, `netlify.toml` 설정 파일이 이미 프로젝트 루트에 포함되어 있습니다.

---

## 호스팅 옵션 비교

| 옵션 | 플랜 | 주요 장점 | 배포 방식 |
| --- | --- | --- | --- |
| **A. GitHub Pages** | 완전 무료 | GitHub 저장소 연동, 커스텀 도메인 무료 HTTPS 지원 | `main` 브랜치 Push 자동 배포 |
| **B. Cloudflare Pages** | 무료 (Free) | 무제한 대역폭, 글로벌 엣지 CDN | `npx wrangler pages deploy` |
| **C. Vercel** | 무료 (Hobby) | 빠른 CLI 배포 및 미리보기 URL 자동 생성 | `npx vercel --prod` |
| **D. Netlify** | 무료 (Starter) | 간편한 CLI 및 드래그 앤 드롭 배포 지원 | `npx netlify-cli deploy --prod --dir=.` |

---

## 공통 1단계: Git 저장소 초기화 (최초 1회)

GitHub Pages를 사용하거나 Git 기반 자동 배포를 연동하려면 프로젝트 폴더(`c:\projects\test`)에서 Git을 초기화합니다.

```powershell
cd c:\projects\test
git init
git branch -M main
git add .
git commit -m "chore: initial Auto AX app and deployment configs"
```

---

## 옵션 A: GitHub Pages (완전 무료 · 커스텀 도메인 지원)

`.github/workflows/deploy-pages.yml` 워크플로우가 이미 구성되어 있어 `main` 브랜치에 Push할 때마다 자동으로 배포됩니다.

### 1. GitHub 원격 저장소 생성 및 Push

GitHub에서 새 저장소(예: `auto-ax`)를 생성한 뒤 아래 명령어를 실행합니다. (`<USERNAME>`을 본인 GitHub 아이디로 변경하세요.)

```powershell
git remote add origin https://github.com/<USERNAME>/auto-ax.git
git push -u origin main
```

### 2. GitHub Pages 설정 활성화 (최초 1회)

1. GitHub 저장소의 **Settings** → **Pages** 메뉴로 이동합니다.
2. **Build and deployment** → **Source**를 **`GitHub Actions`**로 선택합니다.
3. 저장소 상단 **Actions** 탭에서 `Deploy Auto AX to GitHub Pages` 워크플로우가 완료되면 `https://<USERNAME>.github.io/auto-ax/` 주소로 접속할 수 있습니다.
4. *(선택)* **Custom domain** 항목에 보유 도메인을 입력하고 DNS(`CNAME` 또는 `A` 레코드)를 연결하면 무료 HTTPS가 자동 적용됩니다.

---

## 옵션 B: Cloudflare Pages (무료 무제한 대역폭)

대역폭 제한 없이 전 세계 엣지 네트워크로 빠르게 서빙하고 싶을 때 적합합니다.

```powershell
cd c:\projects\test
npx wrangler login
npx wrangler pages deploy . --project-name=auto-ax
```

- 최초 실행 시 브라우저에서 Cloudflare 로그인 승인이 진행됩니다.
- 배포가 완료되면 터미널에 `https://auto-ax.pages.dev` 형식의 배포 URL이 출력됩니다.

---

## 옵션 C: Vercel (무료 Hobby)

`vercel.json` (`cleanUrls: true`) 설정이 포함되어 있어 명령어 한 줄로 배포할 수 있습니다.

```powershell
cd c:\projects\test
npx vercel --prod
```

- 최초 실행 시 Vercel 계정 로그인 및 프로젝트 연결 질문에 `Enter`(기본값)로 응답하면 루트 디렉터리(`.`)가 그대로 배포됩니다.
- 배포 완료 후 프로덕션 URL(`https://<project>.vercel.app`)이 출력됩니다.

---

## 옵션 D: Netlify (무료 Starter)

`netlify.toml` (`publish = "."`) 설정이 포함되어 있어 빌드 단계 없이 즉시 정적 배포됩니다.

```powershell
cd c:\projects\test
npx netlify-cli login
npx netlify-cli deploy --prod --dir=.
```

- 최초 실행 시 `Create & configure a new project`를 선택해 사이트 이름을 지정하면 즉시 프로덕션 URL(`https://<site-name>.netlify.app`)로 배포됩니다.

---

## 배포 후 확인 사항

- 배포된 URL에 접속하여 상단 헤더의 **`사용 가이드`**, **`데모 데이터 초기화`** 버튼 및 4개 탭(`1. 현황 입력` ~ `4. 고객 보고서`)이 정상 작동하는지 확인하세요.
- 모든 입력 데이터는 각 사용자의 브라우저 `localStorage`(`auto_ax_state_v1`)에 개별 저장되므로, 별도 DB 없이 여러 컨설턴트나 고객사가 동시에 접속해도 데이터가 섞이지 않습니다.

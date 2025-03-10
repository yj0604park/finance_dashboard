# Finance Manager

금융 거래를 관리하고 추적하는 웹 애플리케이션입니다.

## 기술 스택

- React
- TypeScript
- Material-UI
- Jest & React Testing Library

## 시작하기

### 필수 조건

- Node.js 16.x 이상
- Yarn 패키지 매니저

### 설치

```bash
cd dashboard
yarn install
```

### 개발 서버 실행

```bash
yarn start
```

### 테스트 실행

```bash
yarn test
```

## 프로젝트 구조

```
dashboard/
├── src/
│   ├── components/     # 재사용 가능한 컴포넌트
│   ├── pages/         # 페이지 컴포넌트
│   ├── services/      # API 서비스
│   ├── types/         # TypeScript 타입 정의
│   └── utils/         # 유틸리티 함수
└── public/            # 정적 파일
```

## 테스트

- Jest와 React Testing Library를 사용하여 단위 테스트 및 통합 테스트를 실행합니다.
- GitHub Actions를 통해 자동화된 테스트를 실행합니다.

## 기여하기

1. 이슈를 생성하여 변경 사항을 논의합니다.
2. 새로운 브랜치를 생성합니다.
3. 변경 사항을 커밋합니다.
4. Pull Request를 생성합니다. 
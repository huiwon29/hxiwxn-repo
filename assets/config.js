// ===================================================================
// 스테이지 설정: 게임 이름/이모지/비밀번호는 이 파일에서만 수정하면 됩니다.
// passwordHash는 비밀번호의 SHA-256 해시입니다.
// 비밀번호를 바꾸려면: 터미널에서  printf '%s' "새비밀번호" | shasum -a 256
// 주의: 실제 비밀번호를 이 파일(주석 포함)에 적지 마세요 — 소스 보기로 노출됩니다.
// ===================================================================
const STAGES = [
  { n: 1, emoji: "⏰", name: "퇴근 시간 퀴즈",     passwordHash: "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4" },
  { n: 2, emoji: "🏃", name: "함께 하실건가요?",   passwordHash: "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4" },
  { n: 3, emoji: "🎫", name: "복권 긁기",          passwordHash: "556d7dc3a115356350f1f9910b1af1ab0e312d4b3e4fc788d2da63668f36d017" },
  { n: 4, emoji: "🎰", name: "행운의 룰렛",        passwordHash: "79f06f8fde333461739f220090a23cb2a79f6d714bee100d0e4b4af249294619" },
  { n: 5, emoji: "⏳", name: "조기 퇴근 요청하기", passwordHash: "ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d" },
  { n: 6, emoji: "🎁", name: "선물 상자",          passwordHash: "3ada92f28b4ceda38562ebf047c6ff05400d4c572352a1142eedfef67d21e662" },
  { n: 7, emoji: "📝", name: "스피드 퀴즈",        passwordHash: "eaf89db7108470dc3f6b23ea90618264b3e8f8b6145371667c4055e9c5ce9f52" },
  { n: 8, emoji: "🖐️", name: "3초 챌린지",         passwordHash: "2926a2731f4b312c08982cacf8061eb14bf65c1a87cc5d70e864e079c6220731" },
  { n: 9, emoji: "🎉", name: "마지막 카운트다운",  passwordHash: "888df25ae35772424a560c7152a1de794440e0ea5cfee62828333a456a506e05" },
];

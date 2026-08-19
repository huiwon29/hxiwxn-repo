// ===================================================================
// 스테이지 설정: 게임 이름/이모지/비밀번호는 이 파일에서만 수정하면 됩니다.
// passwordHash는 비밀번호의 SHA-256 해시입니다.
// 비밀번호를 바꾸려면: 터미널에서  printf '%s' "새비밀번호" | shasum -a 256
// (현재 임시 비밀번호: 스테이지 1 = 1111, 2 = 2222, ... 9 = 9999)
// ===================================================================
const STAGES = [
  { n: 1, emoji: "⏰", name: "퇴근 시간 퀴즈",     passwordHash: "0ffe1abd1a08215353c233d6e009613e95eec4253832a761af28ff37ac5a150c" },
  { n: 2, emoji: "🏃", name: "함께 하실건가요?",   passwordHash: "edee29f882543b956620b26d0ee0e7e950399b1c4222f5de05e06425b4c995e9" },
  { n: 3, emoji: "🎫", name: "복권 긁기",          passwordHash: "318aee3fed8c9d040d35a7fc1fa776fb31303833aa2de885354ddf3d44d8fb69" },
  { n: 4, emoji: "🎰", name: "행운의 룰렛",        passwordHash: "79f06f8fde333461739f220090a23cb2a79f6d714bee100d0e4b4af249294619" },
  { n: 5, emoji: "⏳", name: "조기 퇴근 요청하기", passwordHash: "c1f330d0aff31c1c87403f1e4347bcc21aff7c179908723535f2b31723702525" },
  { n: 6, emoji: "🎁", name: "선물 상자",          passwordHash: "d7697570462f7562b83e81258de0f1e41832e98072e44c36ec8efec46786e24e" },
  { n: 7, emoji: "📝", name: "스피드 퀴즈",        passwordHash: "41c991eb6a66242c0454191244278183ce58cf4a6bcd372f799e4b9cc01886af" },
  { n: 8, emoji: "🖐️", name: "3초 챌린지",         passwordHash: "2926a2731f4b312c08982cacf8061eb14bf65c1a87cc5d70e864e079c6220731" },
  { n: 9, emoji: "🎉", name: "마지막 카운트다운",  passwordHash: "888df25ae35772424a560c7152a1de794440e0ea5cfee62828333a456a506e05" },
];

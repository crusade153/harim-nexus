<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Harim Team Nexus | Global Enterprise Edition</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
    <style>
        body { 
          font-family: 'Pretendard', sans-serif; 
          background-color: #F8F9FB;
          letter-spacing: -0.025em;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slideUp 0.6s ease-out forwards; }
    </style>
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react@^19.2.3",
    "react-dom/": "https://esm.sh/react-dom@^19.2.3/",
    "react/": "https://esm.sh/react@^19.2.3/",
    "vite": "https://esm.sh/vite@^7.3.0",
    "@vitejs/plugin-react": "https://esm.sh/@vitejs/plugin-react@^5.1.2"
  }
}
</script>
</head>
<body class="bg-[#F8F9FB] text-gray-900 overflow-hidden">
    <div id="root"></div>
    <script type="module" src="/index.tsx"></script>
</body>
</html>
import React, { useState, useEffect, useCallback } from 'react';
import { AppData, User, Task, Post, Schedule } from './types';
import { api } from './services/api';
import { Icons } from './components/Icons';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Kanban from './components/Kanban';
import Community from './components/Community';
import Calendar from './components/Calendar';
import Team from './components/Team';

type TabType = '대시보드' | '업무보드' | '소통광장' | '팀일정' | '조직도';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<AppData | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('대시보드');
  const [loading, setLoading] = useState(false);

  const refreshData = useCallback(async () => {
    const res = await api.fetchData();
    setData({ ...res });
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(true);
      refreshData().then(() => setLoading(false));
    }
  }, [user, refreshData]);

  const handleSaveTask = async (task: Partial<Task>) => {
    await api.saveIssue(task);
    setTimeout(refreshData, 1200);
  };

  const handleSavePost = async (post: Partial<Post>) => {
    await api.savePost(post);
    setTimeout(refreshData, 1200);
  };

  const handleSaveSchedule = async (schedule: Partial<Schedule>) => {
    await api.saveSchedule(schedule);
    setTimeout(refreshData, 1200);
  };

  if (loading && user) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-6 text-gray-900 font-black tracking-tight animate-pulse">하림 원가TF 데이터 동기화 중...</p>
      </div>
    );
  }

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex overflow-hidden">
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col h-screen shrink-0 shadow-sm z-20">
        <div className="p-8 mb-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-red-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">H</div>
          <div>
            <span className="font-black text-gray-900 text-lg block leading-none tracking-tighter">원가TF NEXUS</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 block">Team Workspace</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto no-scrollbar">
          <MenuBtn active={activeTab === '대시보드'} onClick={() => setActiveTab('대시보드')} icon={<Icons.Dashboard />} label="대시보드" />
          <MenuBtn active={activeTab === '업무보드'} onClick={() => setActiveTab('업무보드')} icon={<Icons.Strategic />} label="업무 보드" />
          <MenuBtn active={activeTab === '소통광장'} onClick={() => setActiveTab('소통광장')} icon={<Icons.WarRoom />} label="소통 광장" />
          <MenuBtn active={activeTab === '팀일정'} onClick={() => setActiveTab('팀일정')} icon={<Icons.Operational />} label="팀 캘린더" />
          <div className="h-px bg-gray-50 my-6 mx-4"></div>
          <MenuBtn active={activeTab === '조직도'} onClick={() => setActiveTab('조직도')} icon={<Icons.Members />} label="조직도" />
        </nav>

        <div className="p-6">
          <div className="bg-gray-50 rounded-[2rem] p-5 border border-gray-100 shadow-inner">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-md" style={{ backgroundColor: user.아바타색상 || '#E31E24' }}>
                {user.이름[0]}
              </div>
              <div className="overflow-hidden text-left">
                <p className="text-sm font-black text-gray-900 truncate tracking-tight">{user.이름} {user.직위}</p>
                <p className="text-[10px] text-gray-400 font-bold truncate tracking-tighter uppercase">{user.부서}</p>
              </div>
            </div>
            <button onClick={() => setUser(null)} className="w-full py-2.5 text-[11px] font-black text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all flex items-center justify-center gap-2">
              <Icons.Logout className="w-3.5 h-3.5" /> 로그아웃
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-10 shrink-0 z-10 text-left">
          <div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">{activeTab}</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</p>
          </div>
          <div className="flex items-center gap-4">
             <button className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all relative">
               <Icons.Bell className="w-5 h-5" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full ring-2 ring-white"></span>
             </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 no-scrollbar">
          {data && (
            <div className="max-w-[1600px] mx-auto text-left">
              {activeTab === '대시보드' && <Dashboard data={data} />}
              {activeTab === '업무보드' && <Kanban issues={data.tasks} members={data.members} onSave={handleSaveTask} />}
              {activeTab === '소통광장' && <Community posts={data.posts} user={user} onSave={handleSavePost} />}
              {activeTab === '팀일정' && <Calendar schedules={data.schedules} onSave={handleSaveSchedule} />}
              {activeTab === '조직도' && <Team members={data.members} />}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const MenuBtn = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-[1.25rem] text-sm font-black transition-all active:scale-[0.98] ${
      active 
        ? 'bg-red-600 text-white shadow-xl shadow-red-100' 
        : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    <span className={active ? 'text-white' : 'text-gray-400'}>{icon}</span>
    <span className="tracking-tight">{label}</span>
  </button>
);

export default App;
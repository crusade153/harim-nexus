
// Types for priorities, task status and post categories
export type 우선순위 = '긴급' | '높음' | '보통' | '낮음' | 'HIGH' | 'MEDIUM' | 'LOW' | 'EMERGENCY';
export type 업무상태 = '대기' | '진행중' | '완료' | '중단' | 'BACKLOG' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD';
export type 현안유형 = '예외현안' | '지식공유' | '공지사항' | 'STRATEGIC' | 'OPERATIONAL' | 'WAR_ROOM';

export interface User {
  사번: string;
  employeeId: string;
  이메일: string;
  email: string;
  이름: string;
  name: string;
  권한: '관리자' | '팀원';
  직위: string;
  position: string;
  부서: string;
  department: string;
  아바타색상: string;
  avatarColor: string;
  전문분야: string[];
  expertise: string[];
  업무부하?: number;
  currentStatus?: 'available' | 'busy';
}

export interface Comment {
  id: string;
  작성자: string;
  내용: string;
  작성일: string;
}

export interface Task {
  id: string;
  제목: string;
  title: string;
  내용: string;
  content: string;
  상태: 업무상태;
  status: 업무상태;
  우선순위: 우선순위;
  priority: 우선순위;
  담당자이름: string;
  assigneeName: string;
  담당자이메일: string;
  assigneeEmail: string;
  마감일: string;
  dueDate: string;
  업데이트일: string;
  updatedAt: string;
  댓글: Comment[];
  projectId?: string;
  tags: string[];
  kudos: number;
  type?: 현안유형;
}

// Issue is often used as an alias for Task in the API logic
export type Issue = Task;

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'ON_TRACK' | 'AT_RISK' | 'DELAYED';
  progress: number;
}

export interface Post {
  id: string;
  유형: 현안유형;
  제목: string;
  내용: string;
  작성자: string;
  작성일: string;
  조회수: number;
  좋아요: number;
}

export interface Schedule {
  id: string;
  이름: string;
  name: string;
  유형: string;
  type: string;
  날짜: string;
  date: string;
  비고: string;
  note: string;
  email: string;
}

export interface AppData {
  user: User | null;
  tasks: Task[];
  posts: Post[];
  members: User[];
  schedules: Schedule[];
  projects: Project[];
  activities: Activity[];
}

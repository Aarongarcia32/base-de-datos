import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LoginForm } from './components/LoginForm';
import { HomeView } from './components/HomeView';
import { SubjectsView } from './components/SubjectsView';
import { TeachersView } from './components/TeachersView';
import { HistoryView } from './components/HistoryView';

// Mock video data
const mockVideos = [
  {
    id: '1',
    title: 'Introducción al Cálculo Diferencial - Límites y Derivadas',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
    teacher: 'Dr. Carlos Mendoza',
    teacherAvatar: 'https://images.unsplash.com/photo-1700616466971-a4e05aa89e7d?w=400',
    views: '15K',
    duration: '24:15',
    uploadDate: 'hace 2 días',
    category: 'Matemáticas',
  },
  {
    id: '2',
    title: 'Química Orgánica: Hidrocarburos y sus Propiedades',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
    teacher: 'Dra. María González',
    teacherAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    views: '12K',
    duration: '18:45',
    uploadDate: 'hace 3 días',
    category: 'Ciencias',
  },
  {
    id: '3',
    title: 'La Revolución Francesa: Causas y Consecuencias',
    thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800',
    teacher: 'Prof. Juan Ramírez',
    teacherAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    views: '8.5K',
    duration: '32:10',
    uploadDate: 'hace 5 días',
    category: 'Historia',
  },
  {
    id: '4',
    title: 'Python para Principiantes: Variables y Tipos de Datos',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    teacher: 'Ing. Roberto López',
    teacherAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    views: '25K',
    duration: '28:30',
    uploadDate: 'hace 1 semana',
    category: 'Programación',
  },
  {
    id: '5',
    title: 'English Grammar: Present Perfect vs Simple Past',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800',
    teacher: 'Prof. David Smith',
    teacherAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    views: '18K',
    duration: '15:20',
    uploadDate: 'hace 4 días',
    category: 'Inglés',
  },
  {
    id: '6',
    title: 'Teoría de Conjuntos y Lógica Matemática',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800',
    teacher: 'Dr. Carlos Mendoza',
    teacherAvatar: 'https://images.unsplash.com/photo-1700616466971-a4e05aa89e7d?w=400',
    views: '9.2K',
    duration: '21:45',
    uploadDate: 'hace 6 días',
    category: 'Matemáticas',
  },
  {
    id: '7',
    title: 'Física: Cinemática y Movimiento Rectilíneo Uniforme',
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800',
    teacher: 'Dra. María González',
    teacherAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    views: '14K',
    duration: '26:00',
    uploadDate: 'hace 1 semana',
    category: 'Ciencias',
  },
  {
    id: '8',
    title: 'Literatura Latinoamericana: Realismo Mágico',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
    teacher: 'Lic. Ana Torres',
    teacherAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    views: '7.8K',
    duration: '35:15',
    uploadDate: 'hace 2 semanas',
    category: 'Lengua y Literatura',
  },
  {
    id: '9',
    title: 'JavaScript Avanzado: Async/Await y Promises',
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800',
    teacher: 'Ing. Roberto López',
    teacherAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    views: '31K',
    duration: '42:20',
    uploadDate: 'hace 3 días',
    category: 'Programación',
  },
  {
    id: '10',
    title: 'Técnicas de Dibujo: Perspectiva y Composición',
    thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
    teacher: 'Mtra. Laura Fernández',
    teacherAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    views: '6.5K',
    duration: '19:50',
    uploadDate: 'hace 1 semana',
    category: 'Arte',
  },
  {
    id: '11',
    title: 'Álgebra Lineal: Matrices y Determinantes',
    thumbnail: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=800',
    teacher: 'Dr. Carlos Mendoza',
    teacherAvatar: 'https://images.unsplash.com/photo-1700616466971-a4e05aa89e7d?w=400',
    views: '11K',
    duration: '29:30',
    uploadDate: 'hace 5 días',
    category: 'Matemáticas',
  },
  {
    id: '12',
    title: 'Historia del Arte: Renacimiento Italiano',
    thumbnail: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800',
    teacher: 'Prof. Juan Ramírez',
    teacherAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    views: '9.8K',
    duration: '38:00',
    uploadDate: 'hace 1 semana',
    category: 'Historia',
  },
];

export default function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('home');
  const [videoHistory, setVideoHistory] = useState<any[]>([]);

  const handleLogin = (user: any) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveView('home');
  };

  const handleVideoClick = (videoId: string) => {
    const video = mockVideos.find((v) => v.id === videoId);
    if (video) {
      // Add to history if not already there
      const existingIndex = videoHistory.findIndex((v) => v.id === videoId);
      if (existingIndex === -1) {
        const now = new Date();
        const historyItem = {
          ...video,
          watchedDate: now.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          watchedPercentage: Math.floor(Math.random() * 100), // Random progress for demo
        };
        setVideoHistory([historyItem, ...videoHistory]);
      } else {
        // Move to top of history
        const updatedHistory = [...videoHistory];
        const [item] = updatedHistory.splice(existingIndex, 1);
        setVideoHistory([item, ...updatedHistory]);
      }
    }
    // In a real app, this would navigate to video player
    alert(`Reproduciendo: ${video?.title}`);
  };

  const handleRemoveFromHistory = (videoId: string) => {
    setVideoHistory(videoHistory.filter((v) => v.id !== videoId));
  };

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          activeView={activeView}
          onViewChange={setActiveView}
        />

        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-20'
          }`}
        >
          {activeView === 'home' && (
            <HomeView videos={mockVideos} onVideoClick={handleVideoClick} />
          )}
          {activeView === 'trending' && (
            <HomeView
              videos={[...mockVideos].sort((a, b) => {
                const viewsA = parseInt(a.views.replace('K', '000'));
                const viewsB = parseInt(b.views.replace('K', '000'));
                return viewsB - viewsA;
              })}
              onVideoClick={handleVideoClick}
            />
          )}
          {activeView === 'subjects' && <SubjectsView />}
          {activeView === 'teachers' && <TeachersView />}
          {activeView === 'history' && (
            <HistoryView
              history={videoHistory}
              onVideoClick={handleVideoClick}
              onRemoveFromHistory={handleRemoveFromHistory}
            />
          )}
          {activeView === 'library' && (
            <HomeView videos={mockVideos} onVideoClick={handleVideoClick} />
          )}
        </main>
      </div>
    </div>
  );
}

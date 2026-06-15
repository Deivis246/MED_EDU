import React from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, BarChart2, LogOut, Activity, ClipboardCheck, FlaskConical } from "lucide-react";
import { getEstudiante, clearEstudiante } from "@/lib/store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const estudiante = getEstudiante() ?? { nombre: "Estudiante", cedula: "", curso: "Medicina" };

  const handleLogout = () => {
    clearEstudiante();
    setLocation("/login");
  };

  const navItems = [
    { label: "Módulos", path: "/dashboard", icon: BookOpen },
    { label: "Pretest", path: "/pretest", icon: ClipboardCheck },
    { label: "Postest", path: "/postest", icon: FlaskConical },
    { label: "Progreso", path: "/progreso", icon: BarChart2 },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground dark">
      {/* Sidebar */}
      <aside className="w-[230px] flex-shrink-0 flex flex-col border-r border-border bg-card">
        {/* Brand */}
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-lg text-primary">
            <Activity size={24} />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">Plataforma Educativa</span>
        </div>

        {/* Student Info */}
        <div className="px-6 py-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 bg-primary/10 border border-primary/30 text-primary">
              <AvatarFallback className="bg-transparent">{estudiante.nombre.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{estudiante.nombre}</p>
              <p className="text-xs text-muted-foreground truncate">{estudiante.curso}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = location === item.path;
            const Icon = item.icon;
            return (
              <Link href={item.path} key={item.path}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors ${
                    isActive 
                      ? "bg-primary/15 text-primary font-medium" 
                      : "text-muted-foreground hover:bg-secondary hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut size={18} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-[100dvh] overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

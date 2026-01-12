import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, History, PenLine, Zap } from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: "/", label: "Tableau de bord", icon: LayoutDashboard },
  { path: "/historique", label: "Historique", icon: History },
  { path: "/saisie", label: "Saisie", icon: PenLine },
];

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-foreground">
                Smart Energy Tracker
              </h1>
              <p className="text-xs text-muted-foreground">
                Suivi de consommation
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="relative px-4 py-2 rounded-lg transition-colors"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/10 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span
                    className={`relative flex items-center gap-2 text-sm font-medium ${
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md md:hidden">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex flex-col items-center gap-1 px-4 py-2"
              >
                <div
                  className={`p-2 rounded-xl transition-colors ${
                    isActive ? "bg-primary/10" : ""
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                </div>
                <span
                  className={`text-xs font-medium ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-32 md:pb-16">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-16 md:bottom-0 left-0 right-0 py-2 text-center bg-background/80 backdrop-blur-sm border-t border-border md:border-t-0">
        <p className="text-xs text-muted-foreground">ENSA Berrechid</p>
      </footer>
    </div>
  );
};

export default AppLayout;

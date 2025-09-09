import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/components/AuthProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import History from "./pages/History";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="*" element={
                  <ProtectedRoute>
                    <SidebarProvider>
                      <div className="min-h-screen flex w-full bg-background">
                        <AppSidebar />
                        <div className="flex-1 flex flex-col">
                          <header className="h-16 flex items-center border-b bg-card px-6">
                            <SidebarTrigger className="mr-4" />
                            <h1 className="text-lg font-semibold">
                              Multi Swap Hub
                            </h1>
                            <div className="ml-auto flex items-center space-x-2">
                              <div className="flex items-center space-x-1 text-sm">
                                <div className="h-2 w-2 rounded-full bg-success"></div>
                                <span className="text-muted-foreground">Live</span>
                              </div>
                            </div>
                          </header>
                          <main className="flex-1 overflow-auto">
                            <Routes>
                              <Route path="/" element={<Index />} />
                              <Route path="/swap" element={<Index />} />
                              <Route path="/history" element={<History />} />
                              <Route path="/wallet" element={<Wallet />} />
                              <Route path="/settings" element={<Settings />} />
                              <Route path="/analytics" element={<Index />} />
                              <Route path="/profile" element={<Settings />} />
                              <Route path="*" element={<NotFound />} />
                            </Routes>
                          </main>
                        </div>
                      </div>
                    </SidebarProvider>
                  </ProtectedRoute>
                } />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;

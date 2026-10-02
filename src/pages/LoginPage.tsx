import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cpu, Mail, Lock, ArrowRight } from 'lucide-react';
import { Github } from '../components/ui/GithubIcon';
import { Button, Input, Card, Badge } from '../components/ui/Primitives';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('alex.rivera@dev.io');
  const [password, setPassword] = useState('••••••••••••');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 bg-radial-gradient">
      <Card className="w-full max-w-md space-y-6 border-slate-200 dark:border-slate-800 shadow-2xl p-8">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="p-2 rounded-xl bg-indigo-600 text-white">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
              Git<span className="text-indigo-600 dark:text-indigo-400">Insight</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome back</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Log in to access your developer & career intelligence dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-4 h-4" />}
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="w-4 h-4" />}
            required
          />

          <Button type="submit" isLoading={isLoading} className="w-full" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            Sign In to Dashboard
          </Button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-semibold text-slate-400">
            <span className="bg-white dark:bg-slate-900 px-2">Or continue with</span>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleSubmit}
          className="w-full"
          icon={<Github className="w-4 h-4 text-slate-800 dark:text-slate-200" />}
        >
          Sign in with GitHub OAuth
        </Button>

        <p className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            Register now
          </Link>
        </p>
      </Card>
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cpu, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { Github } from '../components/ui/GithubIcon';
import { Button, Input, Card } from '../components/ui/Primitives';
import { useAuth } from '../context/AuthContext';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex.rivera@dev.io');
  const [username, setUsername] = useState('alexrivera-dev');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(name, email, username);
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
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Create your account</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Start analyzing your GitHub repositories and career intelligence.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={<UserIcon className="w-4 h-4" />}
            required
          />

          <Input
            label="GitHub Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={<Github className="w-4 h-4" />}
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-4 h-4" />}
            required
          />

          <Button type="submit" isLoading={isLoading} className="w-full" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            Create Developer Account
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            Log in
          </Link>
        </p>
      </Card>
    </div>
  );
};

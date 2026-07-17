import { UserProfile } from '@/lib/store';

function getAdminUsernames(): string[] {
  const raw = process.env.NEXT_PUBLIC_ADMIN_USERNAMES ?? 'admin';
  return raw
    .split(',')
    .map((name) => name.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminUsername(username: string): boolean {
  return getAdminUsernames().includes(username.trim().toLowerCase());
}

export function canAccessAdmin(profile: UserProfile | null): boolean {
  return profile !== null && isAdminUsername(profile.username);
}

export function getAdminUsernamesHint(): string {
  return getAdminUsernames().join(', ');
}

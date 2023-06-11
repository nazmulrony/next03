import getAllUsers from '@/lib/getAllUsers';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Users',
};

export default async function UsersPage() {
    const userData: Promise<User[]> = getAllUsers();
    const users = await userData;
    console.log('test');

    const content = (
        <section>
            <h2>
                <Link href="/">Back to Home</Link>
            </h2>
            <br />
            {users.map((user) => (
                <>
                    <p key={user.id}>
                        <Link href={`/users/${user.id}`}>{user.name}</Link>
                    </p>
                    <br />
                </>
            ))}
        </section>
    );

    return content;
}
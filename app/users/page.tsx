import getAllUsers from '@/lib/getAllUsers';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';

export const metadata: Metadata = { title: 'Users' };

export default async function UsersPage() {
    const userData: Promise<User[]> = getAllUsers();
    const users = await userData;

    const content = (
        <section>
            <h2>
                <Link href="/"> Back to home</Link>
            </h2>
            <br />
            {users.map((user) => (
                <Fragment key={user.id}>
                    <p>
                        <Link href={`/users/${user.id}`}>{user.name}</Link>
                    </p>
                    <br />
                </Fragment>
            ))}
        </section>
    );
    return content;
}

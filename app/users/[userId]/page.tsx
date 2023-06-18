import getUser from '@/lib/getUser';
import getUserPosts from '@/lib/getUserPosts';
import UserPosts from './components/UserPosts';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import getAllUsers from '@/lib/getAllUsers';

type Params = {
    params: {
        userId: string;
    };
};

export async function generateMetadata({
    params: { userId },
}: Params): Promise<Metadata> {
    const userData: Promise<User> = getUser(userId);
    const user = await userData;
    return {
        title: user.name,
        description: `This is the post page of ${user.name}`,
    };
}

export default async function page({ params: { userId } }: Params) {
    const userData: Promise<User> = getUser(userId);
    const userPostData: Promise<Post[]> = getUserPosts(userId);

    //this is to way to parallel data fetching
    // const [user, userPost] = await Promise.all([userData, userPostData]);

    const user = await userData;
    return (
        <div>
            <h1>{user.name}</h1>
            <Suspense fallback={<h2>Loading...</h2>}>
                <UserPosts promise={userPostData} />
            </Suspense>
        </div>
    );
}

export async function generateStaticParams() {
    const usersData: Promise<User[]> = getAllUsers();
    const users = await usersData;
    return users.map((user) => ({
        userId: user.id.toString(),
    }));
}

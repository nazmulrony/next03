export default async function getUserPosts(userId: string) {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
        { next: { revalidate: 50 } }
    );
    if (!res.ok) throw new Error('Failed to fetch user posts');
    return res.json();
}

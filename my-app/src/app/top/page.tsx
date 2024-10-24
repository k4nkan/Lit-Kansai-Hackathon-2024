import Link from 'next/dist/client/link';

export default function Home() {
  return (
    <div>
      <div>this is top page</div>
      <ul>
        <li>
          <Link href="/top">Top Page</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/connect">Connect</Link>
        </li>
      </ul>
    </div>
  );
}
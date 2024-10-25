import SimpleText from '@/componets/hedder';
import Link from 'next/dist/client/link';

export default function Home() {
  return (
    <div>
      <div>this is top page</div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/connect">Connect</Link>
        </li>
        <SimpleText text="こんにちは、世界！" />
      </ul>
    </div>
  );
}

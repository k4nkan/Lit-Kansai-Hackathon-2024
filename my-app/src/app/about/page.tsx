import Link from 'next/dist/client/link';

export default function Home() {
  return (
    <div>
      <div>this is about page</div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>
    </div>
  );
}

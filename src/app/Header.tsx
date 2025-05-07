import Link from "next/link";

const PATHS = [['Home', '/'], ['Pagination', '/pagination']]

export default function Header() {
  return (
    <header className="flex gap-[24px] flex-wrap items-center justify-center">
      {PATHS.map(([text, pathname]) => (
        <Link
          key={pathname}
          className='flex items-center gap-2 hover:underline hover:underline-offset-4'
          href={pathname}
        >
          {text}
        </Link>
      ))}
    </header>
  );
}

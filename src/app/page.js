import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl leading-1 bg-blue-300 text-blue-800 mt-5 ">Welcome to Image Editor</h1>
      <Link href="/image-picker">
        <p className="text-2xl bg-amber-300 text-amber-800 mt-5 ">Choose an image to edit</p>
      </Link>
    </div>
  );
}

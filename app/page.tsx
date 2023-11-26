"use client";
import Signin from "./(auth)/signin/page";

export default function Root() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Signin />
    </main>
  );
}

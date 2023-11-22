"use client";
import Signup from "./(auth)/signup/page";

export default function Root() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Signup />
    </main>
  );
}

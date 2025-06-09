import { metadata } from "../../metadata";

export { metadata };

export default function ClassLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  )}
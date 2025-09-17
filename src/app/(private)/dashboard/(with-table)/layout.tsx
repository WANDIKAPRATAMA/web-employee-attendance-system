import Outer from "@/components/atoms/outer";

export default function Layout({ children }: ChildrenProps) {
  return (
    <Outer.Col className="md:p-6 lg:p-8 min-h-screen">{children}</Outer.Col>
  );
}

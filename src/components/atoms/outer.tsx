// components/layout/Outer.tsx
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type OuterProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  className?: string;
};

const baseClasses = "flex";

const Outer = ({ children, className, ...props }: OuterProps) => {
  return (
    <div className={twMerge(baseClasses, className)} {...props}>
      {children}
    </div>
  );
};

// Row variations
const Row = ({ children, className, ...props }: OuterProps) => {
  return (
    <div
      className={twMerge(baseClasses, "flex-row items-center gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
};

// Column variations
const Col = ({ children, className, ...props }: OuterProps) => {
  return (
    <div
      className={twMerge(baseClasses, "flex-col gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
};

// Common layout patterns for Row
Row.Start = ({ children, className, ...props }: OuterProps) => (
  <Row className={twMerge("justify-start", className)} {...props}>
    {children}
  </Row>
);

Row.Center = ({ children, className, ...props }: OuterProps) => (
  <Row className={twMerge("justify-center", className)} {...props}>
    {children}
  </Row>
);

Row.End = ({ children, className, ...props }: OuterProps) => (
  <Row className={twMerge("justify-end", className)} {...props}>
    {children}
  </Row>
);

Row.Between = ({ children, className, ...props }: OuterProps) => (
  <Row className={twMerge("justify-between", className)} {...props}>
    {children}
  </Row>
);

Row.Around = ({ children, className, ...props }: OuterProps) => (
  <Row className={twMerge("justify-around", className)} {...props}>
    {children}
  </Row>
);

Row.Evenly = ({ children, className, ...props }: OuterProps) => (
  <Row className={twMerge("justify-evenly", className)} {...props}>
    {children}
  </Row>
);

// Common layout patterns for Col
Col.Start = ({ children, className, ...props }: OuterProps) => (
  <Col className={twMerge("items-start", className)} {...props}>
    {children}
  </Col>
);

Col.Center = ({ children, className, ...props }: OuterProps) => (
  <Col className={twMerge("items-center", className)} {...props}>
    {children}
  </Col>
);

Col.End = ({ children, className, ...props }: OuterProps) => (
  <Col className={twMerge("items-end", className)} {...props}>
    {children}
  </Col>
);

Col.Stretch = ({ children, className, ...props }: OuterProps) => (
  <Col className={twMerge("items-stretch", className)} {...props}>
    {children}
  </Col>
);

Col.Between = ({ children, className, ...props }: OuterProps) => (
  <Col className={twMerge("justify-between", className)} {...props}>
    {children}
  </Col>
);

// Attach variations to main Outer component
Outer.Row = Row;
Outer.Col = Col;

export default Outer;

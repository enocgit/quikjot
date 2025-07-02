import React from "react";

type Props = {
  renderBreadcrumb: () => React.ReactNode;
  children: React.ReactNode;
};

export default function SectionWithBreadcrumb({
  renderBreadcrumb,
  children,
}: Props) {
  return (
    <section className="space-y-5">
      <div>{renderBreadcrumb()}</div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

import { Bold, Link, Paragraph } from "@reacticulum/components";

	let theme = {
    background: "315",
    primary: "ff2",
    secondary: "fco",
  };

const pages = [
  {
    name: "index",
    label: "Home",
  },
  {
    name: "page_two",
    label: "Page Two",
  },
];

declare const REACTICULUM_PAGE: string;

export function Navigation() {
  const currentPage = REACTICULUM_PAGE;
  return (
    <>
      {pages.map((page) =>
        page.name === currentPage ? (
          <CurrentPage link={`:/page/${page.name}.mu`} label={page.label} />
        ) : (
          <PageLink link={`:/page/${page.name}.mu`} label={page.label} />
        ),
      )}
    </>
  );
}

function CurrentPage({ link, label }: { link: string; label: string }) {
  return (
    <Link bold color={theme.primary} to={link}>
      {label}
    </Link>
  );
}

function PageLink({ link, label }: { link: string; label: string }) {
  return (
   
      <Link underline color={theme.secondary} to={link}>
        {label}
      </Link>

  );
}

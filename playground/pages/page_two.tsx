import { H1, Link, Paragraph } from "@reacticulum/components";

export default function PageTwo() {
	return (
		<>
			<H1>Page two</H1>
			<Paragraph>this is page two</Paragraph>
			<Link to=":/page/index.mu">go back to page one</Link>
		</>
	);
}
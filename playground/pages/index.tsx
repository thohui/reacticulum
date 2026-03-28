import { Color, H1, H2, Link } from '@reacticulum/components';

export default function IndexPage() {
	const created = new Date().toDateString();
	return (
		<>
			<H1>Hello world</H1>
			<H2>Created on <Color hex="f00">{created}</Color></H2>
			<Link to=":/page/page_two.mu">go to page two</Link>
		</>
	);
}
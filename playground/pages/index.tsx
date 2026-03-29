import { Color, H1, H2, Link, Paragraph } from "@reacticulum/components";

export const config = {
	dynamic: true
};

export default function IndexPage() {
	const time = new Date().toTimeString();
	return (
		<>
			<H1>Header 1</H1>
			<H2>Header 2</H2>
			<Paragraph>Paragraph</Paragraph>
			<H2>
				Time <Color hex="f00">{time}</Color>
			</H2>
			<Paragraph>
				<Link to=":/page/page_two.mu">go to page two</Link>
			</Paragraph>
		</>
	);

}

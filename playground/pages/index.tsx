import { Color, H1, H2, Link, Radio, Paragraph } from "@reacticulum/components";

export default function IndexPage() {
  const created = new Date().toDateString();
  return (
    <>
      <H1>Header 1</H1>
      <H2>Header 2</H2>
      <Paragraph>Paragraph</Paragraph>
      <H2>
        Created on <Color hex="f00">{created}</Color>
      </H2>
      <Paragraph>
        <Link to=":/page/page_two.mu">go to page two</Link>
      </Paragraph>

      <Paragraph>
        Radio buttons
        <Radio group="options" value="option1" checked label="option1" />
        <Radio group="options" value="option2" label="option2" />
      </Paragraph>
    </>
  );
}

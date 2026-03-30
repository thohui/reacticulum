import { Color, H1, H2, Link, Paragraph, Radio, Underline } from "@reacticulum/components";

export default function IndexPage() {
  const created = new Date().toDateString();
  return (
    <>
      <H1> </H1>
      <H2>
        Made with: Reacticulum check out: https://github.com/thohui/reacticulum
      </H2>

      <Paragraph>Paragraph</Paragraph>
      <H2>
        Created on <Color hex="f00">{created}</Color>
      </H2>
      <Paragraph>
        <Underline>
          <Link to=":/page/demo.mu">go to demo page</Link>
        </Underline>
      </Paragraph>

      <Paragraph>
        Radio buttons <br />
        <Radio group="options" value="option1" checked label="option1" />
        <Radio group="options" value="option2" label="option2" />
      </Paragraph>
    </>
  );
}
